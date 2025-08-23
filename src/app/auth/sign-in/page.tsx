'use client'
import { useSignInMutation } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import { loginSchema } from '@/shared/lib/schemas'
import { ZodLogin } from '@/shared/lib/types/zodLoginTypes'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { PATH } from '@/shared/lib/path'
import React from 'react'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'

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

  const methods = useForm<ZodLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmitHandler = (data: ZodLogin) => {
    login(data).then(res => {
      if (res.data) {
        window.location.replace(PATH.HOME)
        methods.reset()
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <Cards onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <div className={'text-center text-h1'}>Sign In</div>
        <div className={'flex flex-row justify-around'}>
          <div className={'flex items-center gap-16 mt-[13px] mb-[24px]'}>
            <Image onClick={handleGitHubLogin} src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
            <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleGoogleLogin} />
            {/* .. */}
          </div>
        </div>
        <div className="mb-[24px]">
          <Input name="email" label="Email" type="email" />
        </div>
        <div className="mb-[34px]">
          <Input name="password" label="Password" type="password" />
        </div>
        <Link href="/auth/forgot-password" className="text-right text-regular_text14 text-[#8D9094] mb-[24px] block">
          Forgot Password
        </Link>
        {/* .. */}
        <div className="mb-[24px]">
          <Button variant="primary" type="submit" width="100%">
            Sign In
          </Button>
        </div>
        <div className="text-regular_text16 mb-[6px] text-center">Don’t have an account?</div>
        <Link href={'/auth/sign-up'} className="text-h3 text-center block text-[#397DF6] weight-600">
          Sign Up
        </Link>
      </Cards>
    </FormProvider>
  )
}

export default Page
