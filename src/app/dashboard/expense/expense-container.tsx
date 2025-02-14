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
import { useState, useEffect } from 'react'
import { DateRange } from 'react-day-picker'
import { paidByData } from './add/page'
import { Columns } from './expense-columns'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ExpenseContainer() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL params
  const [globalFilter, setGlobalFilter] = useState(searchParams.get('search') || '')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(searchParams.get('page')) - 1 || 0,
    pageSize: Number(searchParams.get('pageSize')) || 10
  })

  const initialFrom = searchParams.get('startDate')
    ? new Date(searchParams.get('startDate')!)
    : new Date(new Date().setDate(new Date().getDate() - 12))
  const initialTo = searchParams.get('endDate')
    ? new Date(searchParams.get('endDate')!)
    : new Date()

  const [date, setDate] = useState<DateRange | undefined>({ from: initialFrom, to: initialTo })

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    searchParams.get('category') || undefined
  )
  const [paidBy, setPaidBy] = useState<string | undefined>(searchParams.get('paidBy') || '')

  const {
    data: expenseData,
    isPending,
    isError,
    error
  } = useGetExpenseTable(
    pagination.pageSize,
    pagination.pageIndex + 1,
    date?.from?.toISOString().split('T')[0],
    date?.to?.toISOString().split('T')[0],
    selectedCategory,
    paidBy,
    globalFilter
  )
console.log("--expenseData--",expenseData)
  const pageCount = expenseData?.data?.totalPages || 1

  const { data: expCat } = useGetExpCat()
  const expenseCategoryData = expCat?.data.data

  const categories =
    expenseCategoryData?.map(item => ({
      id: item.categoryName,
      label: item.categoryName,
      value: item.categoryName
    })) || []

  // Update URL parameters whenever filters change
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('pageSize', String(pagination.pageSize))
    params.set('page', String(pagination.pageIndex + 1))

    if (date?.from) params.set('startDate', date.from.toISOString().split('T')[0])
    if (date?.to) params.set('endDate', date.to.toISOString().split('T')[0])
    if (globalFilter) params.set('search', globalFilter)
    if (selectedCategory) params.set('category', selectedCategory)
    if (paidBy) params.set('paidBy', paidBy)

    router.push(`?${params.toString()}`)
  }, [pagination, date, globalFilter, selectedCategory, paidBy])

  if (isError) throw new Error(error.message)

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

        {/* Filter Category */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
        <Select value={paidBy} onValueChange={setPaidBy}>
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

      {/* Expense Table */}
      <DashboardTable
        data={expenseData?.data?.data || []}
        columns={Columns}
        isPending={isPending}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageCount={pageCount}
      />
    </>
  )
}
