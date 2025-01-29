import { z } from 'zod'

export const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })
    
export const requiredDate = (fieldName: string) =>
  z.date({
    required_error: ` ${fieldName} is required.`,
  })

export const minLengthString = (min: number, fieldName: string) =>
  z
    .string()
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters long`
    })
