'use client'
import { useSignInMutation } from '@/shared/api'
import { loginSchema } from '@/shared/lib/schemas'
import { ZodLogin } from '@/shared/lib/types/zodLoginTypes'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { PATH } from '@/shared/lib/path'
import React from 'react'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'
import { oauth } from '@/shared/lib/utils/oauth'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()
  const [login] = useSignInMutation()
  const handleOauthGithub = () => oauth()
  const methods = useForm<ZodLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const onSubmit = (data: ZodLogin) => {
    login(data).then(res => {
      if (res.data) {
        // window.location.replace(PATH.HOME)
        router.replace(PATH.HOME)
        methods.reset()
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <Cards onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={'text-center text-h1'} children={'Sign In'} />
        <div className={'flex flex-row justify-around'}>
          <div className={'flex items-center gap-16 mt-[13px] mb-[24px]'}>
            <Image src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" onClick={handleOauthGithub} />
            <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleOauthGithub} />
          </div>
        </div>
        <div className="mb-[24px]">
          <Input name="email" label="Email" type="email" />
        </div>
        <div className="mb-[34px]">
          <Input name="password" label="Password" type="password" />
        </div>
        <Link
          href={PATH.FORGOT_PASSWORD}
          className="text-right text-regular_text14 text-dark-100 mb-[24px] block"
          children={'Forgot Password'}
        />
        <div className="mb-[24px]">
          <Button variant="primary" type="submit" width="100%" children={'Sign In'} />
        </div>
        <div className="text-regular_text16 mb-[6px] text-center" children={'Don’t have an account?'} />
        <Link href={PATH.SIGNUP} className="text-h3 text-center block text-accent-500 weight-600" children={'Sign Up'} />
      </Cards>
    </FormProvider>
  )
}

export default Page
