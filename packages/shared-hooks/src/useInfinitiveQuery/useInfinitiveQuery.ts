import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// Shape that your queryFn must return
type PageData<T, Cursor> = {
  data: T[];
  nextCursor: Cursor | null;
};

export function useInfiniteScroll<TData, TCursor = number>({
  queryKey,
  queryFn,
  initialPageParam,
  getNextPageParam = (lastPage) => lastPage.nextCursor,
  ...options
}: {
  queryKey: QueryKey;
  queryFn: (cursor: TCursor | null) => Promise<PageData<TData, TCursor>>;
  initialPageParam: TCursor | null;
  getNextPageParam?: (
    lastPage: PageData<TData, TCursor>,
  ) => TCursor | null | undefined;
} & Omit<
  UseInfiniteQueryOptions<PageData<TData, TCursor>>,
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam as TCursor | null),
    initialPageParam,
    getNextPageParam,
    ...options,
  });
}

export const useIntersectionObserver = (
  onIntersect: () => void,
  enabled: boolean,
) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Fix: Check if entries[0] exists before accessing isIntersecting
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [onIntersect, enabled]);

  return targetRef;
};
