import api from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useGetExpenseTable(
  pageSize: number,
  page: number,
  startDate?: string,
  endDate?: string,
  category?: string,
  paidBy?: string,
  search?: string
) {
  return useQuery({
    queryKey: ['expense', pageSize, page, startDate, endDate, category, paidBy, search],
    queryFn: async () => {
      const response = await api.get(`expense/list`, {
        params: {
          pageSize,
          page,
          startDate,
          endDate,
          category,
          paidBy,
          search,
        },
      })
      return response.data // Ensure API returns totalPages
    },
    placeholderData: keepPreviousData,
  })
}

