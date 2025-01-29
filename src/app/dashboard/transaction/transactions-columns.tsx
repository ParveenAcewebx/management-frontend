import { TableColumnHeader } from '@/components/dashboard/table/table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Transaction } from '@/types/transaction-type'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'

export const columns: ColumnDef<Transaction>[] = [
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
        onCheckedChange={value => row?.toggleSelected(!!value)}
        aria-label='Select Row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'transactionId',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Transaction ID' />
    )
  },
  {
    accessorKey: 'invoiceId',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Invoice ID' />
    )
  },
  {
    accessorKey: 'receiver',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Receiver' />
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Number(row?.original?.amount))

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      const formatted = format(
        new Date(row?.original?.createdAt),
        'yyyy-MM-dd HH:mm'
      )
      return <div>{formatted}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
