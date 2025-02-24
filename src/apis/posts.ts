import axios from 'axios';
import { multipartInstance, instance, serverInstance } from './instance';
import { ApiError } from '@/types/auth';
import { Post, PostStatus, PaginatedResponse } from '@/types/blog';
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
      '/media-files',
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
    const requestData = {
      title: postData.title.trim(),
      content: postData.content.trim(),
      summary: postData.summary?.trim(),
      thumbnailId: postData.thumbnailId,
      status: postData.status,
      tags: Array.isArray(postData.tags) ? postData.tags : [],
    };

    console.log('Creating post with data:', requestData);

    // 서버가 ID만 반환하므로 string 타입으로 응답을 받음
    const response = await instance.post<string>('/posts', requestData);

    console.log('Server response:', response.data);

    // 응답이 문자열(ID)인 경우를 처리
    if (typeof response.data === 'string') {
      return {
        id: response.data,
        ...requestData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '', // 실제 userId는 서버에서 설정됨
        viewCount: 0,
        tags: [], // 태그 정보는 목록 조회 시 가져올 수 있음
        user: {
          // 사용자 정보도 목록 조회 시 가져올 수 있음
          id: '',
          username: '',
        },
      } as Post;
    }

    throw new Error('게시글 생성 실패: 잘못된 서버 응답 형식');
  } catch (error) {
    console.error('Create post error:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getPostErrorMessage(errorResponse));
    }
    throw error;
  }
};

// 서버 사이드용 getPosts
export const getPostsServer = async ({
  page = 0,
  size = 20,
  search,
  tags,
  userId,
}: {
  page?: number;
  size?: number;
  search?: string;
  tags?: string[];
  userId?: string;
}): Promise<PaginatedResponse<Post>> => {
  try {
    const searchParams = new URLSearchParams();

    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    if (search) searchParams.append('search', search);
    if (userId) searchParams.append('userId', userId);
    if (tags?.length) {
      tags.forEach((tag) => searchParams.append('tags', tag));
    }

    const response = await serverInstance.get<PaginatedResponse<Post>>(
      `/posts?${searchParams.toString()}`,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getPostErrorMessage(errorResponse));
    }
    throw error;
  }
};

// 클라이언트 사이드용 getPosts
export const getPosts = async ({
  page = 0,
  size = 20,
  search,
  tags,
  userId,
}: {
  page?: number;
  size?: number;
  search?: string;
  tags?: string[];
  userId?: string;
}): Promise<PaginatedResponse<Post>> => {
  try {
    const searchParams = new URLSearchParams();

    searchParams.append('page', page.toString());
    searchParams.append('size', size.toString());

    if (search) searchParams.append('search', search);
    if (userId) searchParams.append('userId', userId);
    if (tags?.length) {
      tags.forEach((tag) => searchParams.append('tags', tag));
    }

    const response = await instance.get<PaginatedResponse<Post>>(
      `/posts?${searchParams.toString()}`,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getPostErrorMessage(errorResponse));
    }
    throw error;
  }
};

// 게시글 상세 조회
export const getPost = async (postId: string): Promise<Post> => {
  try {
    const response = await instance.get<Post>(`/posts/${postId}`);
    console.log('Server response data:', response.data); // 서버 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiError;
      throw new Error(getPostErrorMessage(errorResponse));
    }
    throw error;
  }
};
