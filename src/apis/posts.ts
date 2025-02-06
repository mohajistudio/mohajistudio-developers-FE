import axios from 'axios';
import { multipartInstance } from './instance';
import { ApiError } from '@/types/auth';

export interface UploadedFile {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  fileName: string;
  originalFileName: string;
  contentType: string;
  size: number;
}

/**
 * 게시글 미디어 파일 업로드
 * @param files - 업로드할 파일 또는 파일 배열
 * @returns 업로드된 파일 정보 배열
 */
export const uploadMediaFiles = async (
  files: File | File[],
): Promise<UploadedFile[]> => {
  try {
    const fileArray = Array.isArray(files) ? files : [files];

    // 파일 크기 검증
    const totalSize = fileArray.reduce((sum, file) => sum + file.size, 0);
    const hasOversizedFile = fileArray.some(
      (file) => file.size > 20 * 1024 * 1024,
    );

    if (hasOversizedFile) {
      throw new Error('파일 크기는 개당 최대 20MB를 초과할 수 없습니다.');
    }

    if (totalSize > 100 * 1024 * 1024) {
      throw new Error('전체 파일 크기는 100MB를 초과할 수 없습니다.');
    }

    // 파일 형식 검증
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
    ];
    const hasInvalidFile = fileArray.some(
      (file) => !validTypes.includes(file.type),
    );

    if (hasInvalidFile) {
      throw new Error(
        '지원하지 않는 파일 형식입니다. 이미지 또는 동영상 파일만 업로드 가능합니다.',
      );
    }

    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await multipartInstance.post<UploadedFile[]>(
        '/posts/media',
        formData,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Upload error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            headers: error.config?.headers,
            data: error.config?.data,
          },
        });

        const status = error.response?.status;
        const errorCode = error.response?.data?.code;
        const errorMessage = error.response?.data?.message;

        if (status === 401) {
          throw new Error(
            `인증 오류: ${errorMessage || '로그인이 필요합니다.'}`,
          );
        } else if (status === 400) {
          if (errorCode === 'MF0001') {
            throw new Error('파일을 찾을 수 없습니다.');
          } else if (errorCode === 'MF0004') {
            throw new Error(
              '잘못된 파일 형식입니다. 이미지 또는 동영상 파일만 업로드 가능합니다.',
            );
          }
          throw new Error(errorMessage || '잘못된 요청입니다.');
        } else if (status === 404) {
          throw new Error(errorMessage || '사용자를 찾을 수 없습니다.');
        } else if (status === 500) {
          throw new Error(
            errorMessage || '파일 업로드에 실패했습니다. 다시 시도해주세요.',
          );
        }
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('파일 업로드 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};
