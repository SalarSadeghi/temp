export interface paginationResponse<T> {
  data: T[];
  total: number;
  page: string | number;
  size: string | number;
  hasMore: boolean;
}

export type Order = "asc" | "desc";
