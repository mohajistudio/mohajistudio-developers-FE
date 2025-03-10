import { serverInstance } from './instance';
import type { User, UserDetail } from '@/types/blog';
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
