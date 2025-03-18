import { serverInstance } from './instance';
import type { User, UserDetail, MediaFile } from '@/types/blog';
import type { PaginatedResponse } from '@/types/blog';
import type { ApiError } from '@/types/auth';
import { getUserErrorMessage } from '@/utils/handle-error';
import axios from 'axios';
import { instance } from './instance';

// 개발자 목록 조회 (서버 컴포넌트용)
export const getDevelopers = async (): Promise<User[]> => {
  try {
    const response = await serverInstance.get<PaginatedResponse<User>>(
      '/users',
      {
        params: {
          role: 'ROLE_DEVELOPER',
          size: 100,
        },
      },
    );

    return response.data.content;
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getUserErrorMessage(errorResponse));
    }
    throw error;
  }
};

// 사용자 상세 정보 조회
export const getUserDetail = async (nickname: string): Promise<UserDetail> => {
  try {
    const response = await instance.get<UserDetail>(`/users/${nickname}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user detail:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getUserErrorMessage(errorResponse));
    }
    throw error;
  }
};

// 사용자 프로필 업데이트
export const updateUserProfile = async (
  userId: string,
  data: {
    nickname?: string;
    jobRole?: string;
    bio?: string;
    profileImageId?: string;
    contacts?: Array<{
      contactTypeId: string;
      displayName: string;
      url: string;
    }>;
  },
): Promise<void> => {
  try {
    // console.log(`프로필 업데이트 API 호출: /users/${userId}`, data);
    await instance.patch(`/users/${userId}`, data);
  } catch (error) {
    console.error('Failed to update user profile:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getUserErrorMessage(errorResponse));
    }
    throw new Error('프로필 업데이트에 실패했습니다.');
  }
};

// 미디어 파일 업로드
// TODO: 해당 기능은 테스트 중
export const uploadMedia = async (formData: FormData): Promise<MediaFile> => {
  try {
    const response = await instance.post<MediaFile>('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload media:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getUserErrorMessage(errorResponse));
    }
    throw new Error('파일 업로드에 실패했습니다.');
  }
};
