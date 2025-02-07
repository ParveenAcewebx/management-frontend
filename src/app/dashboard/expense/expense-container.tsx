'use client'
import { DashboardTable } from '@/components/dashboard/table/dashboard-table'

import { useGetExpenseTable } from '@/hooks/expense-table/use-get-expense-table'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { Columns } from './expense-columns'

export default function ExpenseContainer() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const {
    data: expenseData,
    isPending,
    isError,
    error
  } = useGetExpenseTable(pagination.pageSize, pagination.pageIndex + 1)


  if (isError) throw new Error(error.message)
  return (
    <DashboardTable
      data={expenseData?.data.data || []}
      columns={Columns}
      isPending={isPending}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
