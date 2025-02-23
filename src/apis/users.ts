import { serverInstance } from './instance';
import type { User } from '@/types/blog';
import type { PaginatedResponse } from '@/types/blog';
import type { ApiError } from '@/types/auth';
import { getUserErrorMessage } from '@/utils/handle-error';
import axios from 'axios';

// 개발자 목록 조회 (서버 컴포넌트용)
export const getDevelopers = async (): Promise<User[]> => {
  try {
    const response = await serverInstance.get<PaginatedResponse<User>>(
      '/users',
      {
        params: {
          role: 'ROLE_DEVELOPER',
          size: 100, // 충분히 큰 수로 설정하여 모든 개발자를 가져옴
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
