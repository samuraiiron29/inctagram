'use client'
import { useSignInMutation } from '@/shared/api'
import { loginSchema } from '@/shared/lib/schemas'
import { ZodLogin } from '@/shared/lib/types/zodLoginTypes'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { PATH } from '@/shared/lib/path'
import React from 'react'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Oauth } from '@/features/auth/oauth/Oauth'
import { t } from 'i18next'

function Page() {
  const router = useRouter()
  const [login] = useSignInMutation()
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
    <div className="mt-4 w-[378px] h-[678px]">
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center my-[20px]">
            <span className="text-h1">{t('auth.signIn')}</span>
            <Oauth />
            <Input type="email" name="email" width="300px" label="Email" />
            <Input name="password" label="Password" width="300px" type="password" />

            <Link
              href={PATH.FORGOT_PASSWORD}
              className="ml-auto mr-7 mb-6 text-regular_text14 text-dark-100 "
              children={t('auth.forgotPassword')}
            />
            <div className="mb-[24px]">
              <Button variant="primary" type="submit" width="100%" children={'Sign In'} />
            </div>
            <div className="text-regular_text16 mb-[6px] text-center" children={'Don’t have an account?'} />
            <Link href={PATH.SIGNUP} className="text-h3 text-center block text-accent-500 weight-600" children={'Sign Up'} />
          </div>
        </Cards>
      </FormProvider>
    </div>
  )
}

export default Page
