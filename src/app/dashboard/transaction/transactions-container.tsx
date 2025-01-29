'use client'

import { DashboardTable } from '@/components/dashboard/table/dashboard-table'
import { useGetTransactions } from '@/hooks/transaction/use-get-transaction'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './transactions-columns'

export default function TransactionsContainer() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const {
    data: transaction,
    isPending,
    isError,
    error
  } = useGetTransactions(pagination.pageSize, pagination.pageIndex + 1)

  if (isError) throw new Error(error.message)

  return (
    <DashboardTable
      data={transaction?.data?.data?.data}
      columns={columns}
      isPending={isPending}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
