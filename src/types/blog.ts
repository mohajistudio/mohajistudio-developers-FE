// 게시글 상태 enum
export enum PostStatus {
  DRAFT = 'DRAFT', // 임시저장
  PUBLISHED = 'PUBLISHED', // 발행됨
}

// 사용자 정보 타입
export interface User {
  id: string; // UUID
  username: string;
  profileImage?: string;
  // 필요한 다른 사용자 정보들...
}

// 태그 타입
export interface Tag {
  id: string; // UUID
  name: string;
}

// 게시글 작성 시 필요한 데이터 타입
export interface WritePostData {
  title: string;
  content: string;
  summary: string;
  thumbnail?: string;
  tags: string[];
  status: PostStatus;
}

// 게시글 응답 데이터 타입 (DTO 기반)
export interface Post {
  id: string; // UUID
  user: User;
  title: string;
  summary: string;
  thumbnail?: string;
  status: PostStatus;
  publishedAt: string; // ISO 날짜 문자열
  tags: Tag[];
  content: string; // 마크다운 내용
  viewCount: number;
}

// 게시글 목록 조회시 사용할 타입
export interface PostListItem {
  id: string;
  title: string;
  summary: string;
  thumbnail?: string;
  user: User;
  publishedAt: string;
  tags: Tag[];
  viewCount: number;
}

// 페이지네이션을 위한 타입
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// 게시글 필터링/정렬 옵션
export interface PostFilters {
  tag?: string;
  username?: string;
  status?: PostStatus;
  sortBy?: 'latest' | 'popular'; // 최신순 | 인기순
}
