'use client'
import { DashboardTable } from '@/components/dashboard/table/dashboard-table'
import DateRangePicker from '@/components/date-range-picker'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetExpCat } from '@/hooks/blog/use-get-catsubcat'
import { useGetExpenseTable } from '@/hooks/expense-table/use-get-expense-table'
import { PaginationState } from '@tanstack/react-table'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Columns } from './expense-columns'
import { paidByData } from './add/page'

export default function ExpenseContainer() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 12)),
    to: new Date()
  })

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  )
  const [paidBy, setPaidBy] = useState<string | undefined>('')

  const {
    data: expenseData,
    isPending,
    isError,
    error
  } = useGetExpenseTable(
    pagination.pageSize,
    pagination.pageIndex + 1,
    date?.from
      ? new Date(date.from.setHours(0, 0, 0, 0)).toISOString().split('T')[0]
      : undefined,
    date?.to
      ? new Date(date.to.setHours(23, 59, 59, 999)).toISOString().split('T')[0]
      : undefined,
    selectedCategory,
    paidBy,
    globalFilter
  )

  const pageCount = expenseData?.data?.totalPages || 1
  console.log('----pageCount--', pageCount)

  console.log('-expenseData---', expenseData)
  const { data: expCat } = useGetExpCat()
  const expenseCategoryData = expCat?.data.data

  const categories =
    expenseCategoryData?.map(item => ({
      id: item.categoryName,
      label: item.categoryName,
      value: item.categoryName
    })) || []

  if (isError) throw new Error(error.message)
  console.log('---Date---', date)
  return (
    <>
      <div className='mt-5 flex gap-5'>
        {/* Search Filter */}
        <div className='relative flex items-center'>
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

        {/* Filter Date Range Picker */}
        <DateRangePicker setDate={setDate} date={date} />
        {/* {JSON.stringify(date)} */}

        {/* Filter Category */}
        <Select onValueChange={value => setSelectedCategory(value)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            {categories.map(item => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Paid By */}
        <div className='relative flex items-center'>
          <Select onValueChange={value => setPaidBy(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Paid By' />
            </SelectTrigger>
            <SelectContent>
              {paidByData.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Expense Table */}
      <DashboardTable
        data={expenseData?.data?.data || []}
        columns={Columns}
        isPending={isPending}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageCount={pageCount} // Pass total pages from API
      />
    </>
  )
}
