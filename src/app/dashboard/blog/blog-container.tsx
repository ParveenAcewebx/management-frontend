'use client'

import { DashboardTable } from '@/components/dashboard/table/dashboard-table'
import { useGetBlogs } from '@/hooks/blog/use-get-blogs'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './blog-columns'

export default function BlogContainer() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const {
    data: blogs,
    isPending,
    isError,
    error
  } = useGetBlogs(pagination.pageSize, pagination.pageIndex + 1)
  if (isError) throw new Error(error.message)
  return (
    <DashboardTable
      data={blogs?.data.data}
      columns={columns}
      isPending={isPending}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
