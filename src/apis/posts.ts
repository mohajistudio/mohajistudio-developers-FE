import axios from 'axios';
import { multipartInstance, instance } from './instance';
import { ApiError } from '@/types/auth';
import { Post, PostStatus } from '@/types/blog';
import {
  getPostErrorMessage,
  getMediaErrorMessage,
} from '@/utils/handle-error';

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

    const response = await multipartInstance.post<UploadedFile[]>(
      '/posts/media',
      formData,
    );
    return response.data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

interface CreatePostRequest {
  title: string;
  content: string;
  summary?: string;
  thumbnailId?: string;
  status: PostStatus;
  tags: string[];
}

export const createPost = async (postData: CreatePostRequest) => {
  try {
    // 요청 데이터 검증
    if (!postData.title || !postData.content || !postData.status) {
      throw new Error('필수 필드가 누락되었습니다.');
    }

    // 명시적으로 API 스펙에 맞는 데이터 구성
    const requestData = {
      title: postData.title.trim(),
      content: postData.content.trim(),
      summary: postData.summary?.trim(),
      thumbnailId: postData.thumbnailId,
      status: postData.status,
      tags: Array.isArray(postData.tags) ? postData.tags : [],
    };

    console.log('Sending request:', {
      url: '/posts',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: requestData,
    });

    const response = await instance.post<Post>('/posts', requestData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getPostErrorMessage(errorResponse));
    }
    throw error;
  }
};
