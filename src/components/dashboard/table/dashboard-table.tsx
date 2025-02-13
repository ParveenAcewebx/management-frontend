import DateRangePicker from '@/components/date-range-picker'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { TablePagination } from './table-pagination'
import { TableViewOptions } from './table-view-options'

type DashboardTableProps<TData> = {
  data?: TData[]
  columns: ColumnDef<TData, unknown>[]
  pageCount?: number
  isPending: boolean
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  selectedDate?: Date
}

export function DashboardTable<TData>({
  globalFilter,
  setGlobalFilter,
  data = [],
  columns,
  pageCount = 1,
  isPending,
  pagination,
  setPagination
}: DashboardTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  // Define selectedDate state here
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  
  // filter date data
  const tableData = useMemo(() => {
    if (selectedDate) {
      return data?.filter(item => {
        const itemDate = new Date(item.date)
        return (
          itemDate.getFullYear() === selectedDate.getFullYear() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getDate() === selectedDate.getDate()
        )
      })
    }
    return isPending ? Array(10).fill({}) : data
  }, [isPending, data, selectedDate])

  const tableColumns = useMemo(
    () =>
      isPending
        ? columns?.map(column => ({
            ...column,
            cell: () => <Skeleton className='my-1 h-6 min-w-3' />
          }))
        : columns,
    [isPending, columns]
  )

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      sorting,
      pagination,
      globalFilter,
      columnVisibility,
      rowSelection
    }
  })

  // Calculate total amount
  // const totalAmount = useMemo(() => {
  //   if (isPending) return 0
  //   return data?.reduce((sum, item) => sum + (item.amount || 0), 0)
  // }, [data, isPending])

  return (
    <>
      <div className=' flex items-center justify-between !gap-4'>
        
        <TableViewOptions table={table} />
      </div>
      <div className='mt-4 rounded-xl bg-background p-4 shadow-sm lg:p-8'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={columns.length - 1} className='font-bold'>
                    Total
                  </TableCell>
                  {/* <TableCell className='font-bold'>{totalAmount}</TableCell> */}
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination pagination={pagination} table={table} />
    </>
  )
}
