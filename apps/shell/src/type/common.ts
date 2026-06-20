export interface Unit {
  id: number;
  name: string;
  unitId: string;
  code: string;
  level: number;
  parentCode: string | null;
}

export interface IServiceCommunicateResponse<T> {
  isSuccess: boolean;
  requestId?: string;
  data?: T;
  error?: {
    messages: string[];
    statusCode: number;
  };
}

export type ApiError = IServiceCommunicateResponse<null>;

export interface paginationResponse<T> {
  data: T[];
  total: number;
  page: string | number;
  size: string | number;
  hasMore: boolean;
}

export type Order = "asc" | "desc";
