'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

// signIn validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string().min(5, {
    message: 'Password must be at least 6 characters.'
  })
})

type formpe = z.infer<typeof formSchema>

export default function ProfileForm() {
  // ...
  const router = useRouter()

  const [isSigningIn, setIsSigningIn] = useState(false)
  console.log(isSigningIn)
  const form = useForm<formpe>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setIsSigningIn(true)

    const email = data.username
    const password = data.password
    try {
      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false
      })
      setIsSigningIn(false)

      if (signInResponse?.status === 401) {
        toast.error('Invalid email or password')
        return
      }

      if (!signInResponse?.ok) {
        toast.error(signInResponse?.error || 'An error occurred')
        return
      }

      form.reset()
      router.push('/dashboard')
    } catch {
      setIsSigningIn(false)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded bg-white p-6 shadow-md'>
        <h1 className='mb-6 text-center text-2xl font-bold'>Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='remember-me' />
                <label htmlFor='remember-me' className='text-sm text-gray-700'>
                  Remember me
                </label>
              </div>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button type='submit' className='w-full'>
              Sign in
            </Button>
          </form>

          <p className='mt-6 text-center text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <a
              href='#'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Sign up
            </a>
          </p>
        </Form>
      </div>
    </div>
  )
}
