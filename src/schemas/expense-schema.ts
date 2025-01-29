import { z } from 'zod'
import { requiredString,requiredDate } from './helpers-schema'

export const createExpenseFormSchema = z.object({
  expenseName: requiredString('Expense'),
  description: requiredString('Description'),
  category: requiredString('category'),
  subCat: requiredString('sub category'),
  expenseDate: requiredDate('Expense Date'),
})

export type CreateExpenseForm = z.infer<typeof createExpenseFormSchema>


