import api from '@/lib/api'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetExpCat() {
  return useQuery({
    queryKey: ['expCat'],
    queryFn: async () => {
      return await api.get(
        `/expense/category`
      )
      // return await api.get<ApiResponse<PaginatedResponse<Transaction>>>(
      //   `/transaction?pageSize=${pageSize}&page=${page}`
      // )
    },
    placeholderData: keepPreviousData
  })
}
