'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetExpCat } from '@/hooks/blog/use-get-catsubcat'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'
import { cn } from '@/lib/utils'
import {
  AddExpenseForm,
  AddExpenseFormSchema
} from '@/schemas/add-expense-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const getCategoryOptions = (list: string[] | undefined) => {
  if (!list || !list.length) return []

  return list.map(item => ({
    id: item.categoryName,
    label: item.categoryName,
    value: item.categoryName
  }))
}

const getSubCategoryOptions = (
  expenseCategoryData: string[],
  selectedcategory: string
) => {
  if (!selectedcategory || !selectedcategory.length) return []
  const cat = expenseCategoryData.filter(
    cat => cat.categoryName === selectedcategory
  )

  const subCat = cat[0].subCategory
  return subCat.map(item => ({
    id: item,
    label: item,
    value: item
  }))
}

export const paidByData = [
  'Parveen',
  'Pawan',
  'Pankaj',
  'Amit',
  'Virender',
  'Himanshu',
  'Charu',
  'Jashan',
  'Navjot',
  'Harman'
]
export default function AddExpense() {
  const form = useForm<AddExpenseForm>({
    resolver: zodResolver(AddExpenseFormSchema),
    defaultValues: {
      expenseTitle: '',
      description: '',
      paymentDate: new Date(),
      category: '',
      subCategory: '',
      amount: '',
      paymentMethod: '',
      paymentRemark: '',
      paidBy: ''
    }
  })

  const { toast } = useToast()
  const selectedcategory = form.watch('category')
  const { data: expCat, isPending, isError, error } = useGetExpCat()

  const expenseCategoryData = expCat?.data.data

  const categories = getCategoryOptions(expenseCategoryData)
  const subCategories = getSubCategoryOptions(
    expenseCategoryData,
    selectedcategory
  )
  if (isError) throw new Error(error.message)

  // form is submitted
  async function handleSubmit(values: AddExpenseForm) {
    console.log('values111', values)
    try {
      const payload = {
        expenseTitle: values.expenseTitle,
        description: values.description,
        paymentDate: values.paymentDate.toISOString(),
        category: values.category,
        subCategory: values.subCategory,
        amount: parseFloat(values.amount),
        paymentMethod: values.paymentMethod,
        paymentRemark: values.paymentRemark,
        paidBy: values.paidBy
      }

      const response = await api.post('/expense/add', payload)
      console.log('response:', response)
      form.reset()
      toast({
        description: 'Expense added successfully!'
      })
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <section className='container space-y-10 py-6'>
          <h1 className='text-4xl font-bold text-primary'>Add Expense</h1>
          <Form {...form}>
            <div className='m-auto grid w-full grid-cols-3 items-center justify-center gap-4'>
              <FormField
                control={form.control}
                name='expenseTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the expense name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='paymentDate'
                render={({ field }) => {
                  const [popoverOpen, setPopoverOpen] = useState(false)

                  return (
                    <FormItem className=''>
                      <FormLabel>Expense Date</FormLabel>
                      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick the expense date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={date => {
                              const adjustedDate = date
                                ? new Date(date.setHours(12, 0, 0, 0))
                                : null
                              field.onChange(adjustedDate)
                              setPopoverOpen(false) // Close calendar on selection
                            }}
                            disabled={date =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Please select the date.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Please select category.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='subCategory'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending || isError}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isPending ? 'Loading...' : 'Select a subcategory'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCategories?.map(teamOption => (
                          <SelectItem
                            key={teamOption.id}
                            value={teamOption.value}
                          >
                            {teamOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Please select subcategory.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>Please enter the amount.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='paidBy'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid by</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending || isError}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isPending ? 'Loading...' : 'Select a paidBy'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paidByData.map(item => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Please select subcategory.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name='paidBy'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid by</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Paid by' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Parveen'>Parveen</SelectItem>
                          <SelectItem value='Pawan'>Pawan</SelectItem>
                          <SelectItem value='Pankaj'>Pankaj</SelectItem>
                          <SelectItem value='Amit'>Amit</SelectItem>
                          <SelectItem value='Virender'>Virender</SelectItem>
                          <SelectItem value='Himanshu'>Himanshu</SelectItem>
                          <SelectItem value='Charu'>Charu</SelectItem>
                          <SelectItem value='Jashan'>Jashan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Please select paid by.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name='paymentMethod'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the payment method.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='paymentRemark'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Remark</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the payment remark.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
          <div className='flex justify-end'>
            <Button type='submit'>Submit</Button>
          </div>
        </section>
      </form>
    </Form>
  )
}
