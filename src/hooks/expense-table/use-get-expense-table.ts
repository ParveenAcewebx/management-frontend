import api from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetExpenseTable(pageSize: number, page: number) {
  return useQuery ({
    queryKey: ['expense', pageSize, page],
    queryFn: async () => {
      return await api.get(
        `expense/list`
      )
      // return await api.get<ApiResponse<PaginatedResponse<Transaction>>>(
      //   `/transaction?pageSize=${pageSize}&page=${page}`
      // )
    },
    placeholderData: keepPreviousData
  })
}
