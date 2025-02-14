import { z } from 'zod'
import { requiredString,requiredDate } from './helpers-schema'

export const AddExpenseFormSchema = z.object({
  expenseTitle: requiredString('Expense title'),
  description: requiredString('Description'),
  category: requiredString('category'),
  subCategory: requiredString('subCategory'),
  paymentDate: requiredDate('Expense Date'),
  amount: requiredString('Amount'),
  paymentRemark:requiredString('Remark'),
  paymentMethod:requiredString('Payment Method'),
  paidBy:requiredString('Paid by'),
  paymentRecipet:requiredString('Reciept')

})

export type AddExpenseForm = z.infer<typeof AddExpenseFormSchema>


