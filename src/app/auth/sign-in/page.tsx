'use client'
import { useAppDispatch } from '@/shared/lib/hooks'
import { loginSchema } from '@/shared/lib/schemas'
import { loginType } from '@/shared/lib/types/zodLoginTypes'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { PATH } from '@/shared/lib/path'
import React from 'react'
import { Button } from '@/shared/ui/base/Button/Button'
import { useSignInMutation } from '@/shared/api'

function Page() {
  const [login] = useSignInMutation()

  const dispatch = useAppDispatch()

  const handleGitHubLogin = () => {
    // const GITHUB_REDIRECT_URL = 'http://localhost:3000/auth/github'
    const redirect_url = process.env.NODE_ENV === 'development' ? PATH.AUTH.GITHUB_REDIRECT_URL_DEV : PATH.AUTH.GITHUB_REDIRECT_URL_PROD
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirect_url}`
  }
  const handleGoogleLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
    // const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google'
    const redirect_url = process.env.NODE_ENV === 'development' ? PATH.AUTH.GOOGLE_REDIRECT_URL_DEV : PATH.AUTH.GOOGLE_REDIRECT_URL_PROD
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${redirect_url}&client_id=${CLIENT_ID}`
    window.location.assign(url)
  }

  const methods = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  // const onSubmitHandler = async (data: loginType) => {
  //     try {
  //       await login({userName: '', email: data.email, password: data.password }).unwrap()
  //       methods.reset({
  //         email: '',
  //         password: '',
  //       })
  //     } catch (error) {
  //       const er = error as Error
  //       if (er.status === 400 && er.data.messages.length > 0) {
  //         const message = er.data.messages[0].message

  //         if (message.includes('email')) {
  //           methods.setError('email', { type: 'server', message: er.data.messages[0].message })
  //         }
  //         else {
  //           methods.setError('root', { message: 'unknown error' })
  //         }
  //       } else {
  //       }
  //     }
  //   }

  const onSubmitHandler = (data: loginType) => {
    login(data).then(res => {
      if (res.data) {
        dispatch(setIsLoggedIn(true))
        methods.reset()
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <Cards onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <div>Sign In</div>
        <div className={'flex flex-row justify-around'}>
          <div className={'flex items-center gap-16 mt-[13px] mb-[24px]'}>
            <Image onClick={handleGitHubLogin} src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
            <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleGoogleLogin} />
          </div>
        </div>
        <span>Email</span>
        <Input name="email" label="email" type="email" />
        <span>Password</span>
        <Input name="password" label="password" type="password" />
        <Button type="submit" width="100%">
          Sign In
        </Button>
      </Cards>
    </FormProvider>
  )
}

export default Page
