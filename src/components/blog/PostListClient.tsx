'use client';

import { useState, useCallback } from 'react';
import { Post, PaginatedResponse } from '@/types/blog';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getPosts } from '@/apis/posts';

interface PostListClientProps {
  initialData: PaginatedResponse<Post>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PostListClient({
  initialData,
  searchParams,
}: PostListClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialData.content);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(!initialData.last);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;

    try {
      const nextPage = page + 1;
      const response = await getPosts({
        page: nextPage,
        size: 20,
        search: searchParams.search as string,
        tags: Array.isArray(searchParams.tags)
          ? searchParams.tags
          : searchParams.tags
            ? [searchParams.tags]
            : undefined,
      });

      setPosts((prev) => [...prev, ...response.content]);
      setPage(nextPage);
      setHasMore(!response.last);
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
    }
  }, [page, searchParams, hasMore]);

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
  });

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
