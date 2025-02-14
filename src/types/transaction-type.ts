export type Transaction = {
  id: number
  userId: string
  transactionId: string
  invoiceId: string
  receiver: string
  amount: string
  createdAt: Date
  updatedAt: Date
}

export type ExpenseItem={
  id:string
  email:string
  date: string
  category: string
  subCategory: string
  paidBy: string
  amount: number
  paymentMethod: string
  remarks: string
  description: string
  paymentRecipet:string
}