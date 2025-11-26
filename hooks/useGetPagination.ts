import {
  useQuery,
  keepPreviousData,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query";
import { PaginatedResponse, PaginationParams } from "@/types/api";

/**
 * Hook Generic để xử lý Pagination cho mọi resource (Courses, Users, Orders...)
 * @param queryKey - Key cơ bản của query (VD: ['courses'])
 * @param apiFn - Hàm gọi API trả về PaginatedResponse
 * @param params - Tham số phân trang (page, limit, search...)
 * @param options - Các options thêm của React Query (optional)
 */
export const useGetPagination = <TData>(
  queryKey: QueryKey,
  apiFn: (params: PaginationParams) => Promise<PaginatedResponse<TData>>,
  params: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<TData>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...queryKey, "list", params],

    queryFn: () => apiFn(params),

    placeholderData: keepPreviousData,

    ...options,
  });
};
