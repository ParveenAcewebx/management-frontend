import { TableColumnHeader } from '@/components/dashboard/table/table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ExpenseItem } from '@/types/transaction-type'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
    header: 'Payment Date',
    cell: ({ getValue }) => {
      const dateValue = getValue<string>()
      return dateValue ? format(new Date(dateValue), 'yyyy-MM-dd') : ''
    }
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
      <TableColumnHeader column={column} title='SubCategory' />
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
    accessorKey: 'paymentRecipet',
    header: 'Receipt',
    cell: ({ row }) => {
      console.log("row-----",row)
      const url = row.original.paymentRecipet
      return url ? (
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          View Receipt
        </a>
      ) : (
        'No Receipt'
      )
    }
  },
  {
    accessorKey: 'action',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Action' />
    ),
    cell: ({ row }) => {
      const expense = row.original
      const router = useRouter()
      const [open, setOpen] = useState(false)

      // Handle Edit
      const handleEdit = () => {
        console.log('editing Data:', expense)
        router.push('/dashboard/expense/add')
      }

      // Handle Delete
      const handleDelete = () => {
        console.log('Deleting data:', expense)
        setOpen(false)
      }

      return (
        <div className='flex'>
          {/* Edit Button */}
          <Button
            variant='ghost'
            size='icon'
            className='text-green-600 hover:bg-green-300'
            onClick={handleEdit}
          >
            <Edit className='h-5 w-5' />
          </Button>

          {/* Delete Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <Button
              variant='ghost'
              size='icon'
              className='text-red-600 hover:bg-red-300'
              onClick={() => setOpen(true)}
            >
              <Trash2 className='h-5 w-5' />
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Expense</DialogTitle>
              </DialogHeader>
              <div className='p-4'>
                Are you sure you want to delete this expense?
              </div>
              <DialogFooter>
                <Button variant='destructive' onClick={handleDelete}>
                  Confirm Delete
                </Button>
                <Button variant='outline' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
  }
]
