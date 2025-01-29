import api from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useAddExpenseTable() {
  return useQuery({
    queryKey: ['expenseData'],
    queryFn: async () => {
      return await api.get(
        `/expense/add`
      )
    },
    placeholderData: keepPreviousData
  })
}
