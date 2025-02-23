import { serverInstance } from './instance';
import type { Tag } from '@/types/blog';
import type { PaginatedResponse } from '@/types/blog';

// 태그 목록 조회 (서버 컴포넌트용)
export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await serverInstance.get<PaginatedResponse<Tag>>('/tags', {
      params: {
        size: 100, // 충분히 큰 수로 설정하여 모든 태그를 가져옴
      },
    });

    return response.data.content;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
};
