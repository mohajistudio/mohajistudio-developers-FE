import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      observerRef.current.observe(node);
    },
    [hasMore, onLoadMore],
  );

  return loadMoreRef;
}
