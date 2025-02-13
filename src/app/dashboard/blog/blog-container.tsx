'use client'

import { DashboardTable } from '@/components/dashboard/table/dashboard-table'
import { useGetBlogs } from '@/hooks/blog/use-get-blogs'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './blog-columns'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function BlogContainer() {
  const [globalFilter, setGlobalFilter] = useState('')
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
    <>
      {/* search filter */}
      <div className='mt-4 relative flex items-center'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <SearchIcon className='h-4 w-4 text-muted-foreground' />
        </span>
        <Input
          placeholder='Search'
          value={globalFilter}
          onChange={event => setGlobalFilter(event.target.value)}
          className='w-48 bg-background pl-9 lg:w-72'
        />
      </div>
      <DashboardTable
        data={blogs?.data.data}
        columns={columns}
        isPending={isPending}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  )
}
