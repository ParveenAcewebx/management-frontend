import api from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetBlogs(pageSize: number, page: number) {
  return useQuery ({
    queryKey: ['blogposts', pageSize, page],
    queryFn: async () => {
      return await api.get(
        `/faq`
      )
      // return await api.get<ApiResponse<PaginatedResponse<Transaction>>>(
      //   `/transaction?pageSize=${pageSize}&page=${page}`
      // )
    },
    placeholderData: keepPreviousData
  })
}
  