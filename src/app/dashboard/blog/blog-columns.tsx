import { TableColumnHeader } from '@/components/dashboard/table/table-column-header'
import { Checkbox } from '@/components/ui/checkbox'

import { Transaction } from '@/types/transaction-type'
import { ColumnDef } from '@tanstack/react-table'

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
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select Row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Transaction ID' />
    )
  },
  {
    accessorKey: 'question',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Invoice ID' />
    )
  },
  {
    accessorKey: 'answer',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Receiver' />
    ),
    cell: ({ row }) => {
      const formatted = row?.original?.answer

      return <div>{formatted}</div>
    }
  },
  
]
