// import {
//   useInfiniteQuery,
//   UseInfiniteQueryOptions,
// } from "@tanstack/react-query";

// type InfiniteQueryParams<T, Cursor> = {
//   queryKey: unknown[];
//   queryFn: (
//     cursor: Cursor | null
//   ) => Promise<{ data: T[]; nextCursor: Cursor | null }>;
//   initialPageParam: Cursor | null;
//   getNextPageParam?: (lastPage: {
//     nextCursor: Cursor | null;
//   }) => Cursor | null | undefined;
//   options?: Omit<
//     UseInfiniteQueryOptions,
//     "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
//   >;
// };

// export function useInfiniteScroll<T, Cursor = number>({
//   queryKey,
//   queryFn,
//   initialPageParam,
//   getNextPageParam = (lastPage) => lastPage.nextCursor,
//   options,
// }: InfiniteQueryParams<T, Cursor>) {
//   return useInfiniteQuery({
//     queryKey,
//     queryFn: ({ pageParam }) => queryFn(pageParam as Cursor | null),
//     initialPageParam,
//     getNextPageParam,
//     ...options,
//   });
// }
import { useInfiniteQuery } from "@tanstack/react-query";

// Shape that your queryFn must return
type PageData<T, Cursor> = {
  data: T[];
  nextCursor: Cursor | null;
};

export function useInfiniteScroll<T, Cursor = number>({
  queryKey,
  queryFn,
  initialPageParam,
  getNextPageParam = (lastPage) => lastPage.nextCursor,
  options,
}: {
  queryKey: unknown[];
  queryFn: (cursor: Cursor | null) => Promise<PageData<T, Cursor>>;
  initialPageParam: Cursor | null;
  getNextPageParam?: (
    lastPage: PageData<T, Cursor>
  ) => Cursor | null | undefined;
  options?: any;
}) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam as Cursor | null),
    initialPageParam,
    getNextPageParam,
    ...options,
  });
}
