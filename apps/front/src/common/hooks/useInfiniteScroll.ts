import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasNextPage,
  isLoading,
}: UseInfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isLoading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasNextPage, isLoading],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1, // dispara cuando el 10% del sentinel es visible
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return { sentinelRef };
};
