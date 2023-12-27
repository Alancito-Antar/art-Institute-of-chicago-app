export interface DataResponse<T> {
  data: T;
}

export interface PagedDataResponse<T> extends DataResponse<T> {
  data: T;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

export interface PaginationParams {
  limit?: number; // Items per page
  page?: number; // Current page
}
