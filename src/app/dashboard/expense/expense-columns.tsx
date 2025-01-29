import { TableColumnHeader } from '@/components/dashboard/table/table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { ExpenseItem } from '@/types/transaction-type'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

// Define the column definitions with proper typing
export const Columns: ColumnDef<ExpenseItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select Row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'paymentDate',
    header: ({ column }) => <TableColumnHeader column={column} title='Date' />,
    filterFn: 'equals'
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Category' />
    )
  },
  {
    accessorKey: 'subCategory',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='subCategory' />
    )
  },

  {
    accessorKey: 'paidBy',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Paid by' />
    )
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Payment Method' />
    )
  },
  {
    accessorKey: 'paymentRemark',
    header: ({ column }) => <TableColumnHeader column={column} title='Remark' />
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Description' />
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <TableColumnHeader column={column} title='Amount' />
  },
  {
    accessorKey: 'receipt',
    header: 'Receipt',
    cell: () => {
      return (
        <Link
          href='/dashboard/expense-table/reciept-form'
          rel='noopener noreferrer'
          className='text-blue-500'
        >
          View Reciept
        </Link>
      )
    }
  }
]
