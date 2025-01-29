import { LoginForm, loginFormSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingButton from '../loading-button'
import PasswordInput from '../password-input'
import { Button } from '../ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

type SigninDialogProps = {
  setIsSigninDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSignupDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsForgotPasswordDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SigninDialog({
  setIsSigninDialogOpen,
  setIsSignupDialogOpen,
  setIsForgotPasswordDialogOpen
}: SigninDialogProps) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const router = useRouter()
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSubmit({ email, password }: LoginForm) {
    setIsSigningIn(true)

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
      router.push('/dashboard/teams')
    } catch {
      setIsSigningIn(false)
      toast.error('An unexpected error occurred')
    }
  }

  function handleOpenSignupDialog() {
    setIsSigninDialogOpen(false)
    setIsSignupDialogOpen(true)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Welcome Back!</DialogTitle>
        <DialogDescription className='sr-only'>
          Please sign in to your account using your email and password. If you
          don’t have an account, use the sign up option.
        </DialogDescription>
      </DialogHeader>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
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
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-end'>
            <Button
              variant='link'
              className='text-sm text-primary'
              type='button'
              onClick={() => {
                setIsSigninDialogOpen(false)
                setIsForgotPasswordDialogOpen(true)
              }}
            >
              Forgot password?
            </Button>
          </div>

          <div className='flex flex-col items-center space-y-4 pt-4'>
            <LoadingButton
              loading={isSigningIn}
              className='w-1/2'
              loadingText='Signing In...'
            >
              Sign In
            </LoadingButton>
            <p className='text-sm text-muted-foreground'>
              <span>Don&apos;t have an account?</span>{' '}
              <Button
                onClick={handleOpenSignupDialog}
                variant='link-secondary'
                type='button'
              >
                Sign up
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
