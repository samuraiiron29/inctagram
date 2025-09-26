'use client'
import { useSignInMutation } from '@/shared/api'
import { loginSchema } from '@/shared/lib/schemas'
import { ZodLogin } from '@/shared/lib/types/zodLoginTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { PATH } from '@/shared/lib/path'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Oauth } from '@/features/auth/oauth/Oauth'
import { t } from 'i18next'
import { Button, Cards, Input } from '@/shared/ui/base'

function Page() {
  const router = useRouter()
  const [login, {error}] = useSignInMutation()
  const methods = useForm<ZodLogin>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: { email: '', password: '' },
  })
  const handleSignUp = () => router.replace(PATH.SIGNUP)
  const onSubmit = (data: ZodLogin) => {

    login(data).unwrap().then(res =>{
      if (res) {
        // window.location.replace(PATH.HOME)
        router.replace(PATH.HOME)
        methods.reset()
      }
    }
      
    ).catch(err => {
      // const message = err?.data?.messages || 'Ошибка авторизации'
      console.log(err)
      // methods.setError('email', { type: 'server', message })
      // methods.setError('password', { type: 'server', message })
    })
    // login(data).then(res => {
    //   if (res.data) {
    //     // window.location.replace(PATH.HOME)
    //     router.replace(PATH.HOME)
    //     methods.reset()
    //   } else if (res.error) {
    //     console.log(error)
    //   }
    // })
  }

  return (
    <div className="mt-4 w-[378px] h-[678px]">
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center my-[20px]">
            <span className="text-h1" children={t('auth.signIn')} />
            <Oauth />
            <Input type="email" name="email" width="300px" label={t('auth.email')} />
            <Input type="password" name="password" width="300px" label={t('auth.password')} />
            
            <Link
              href={PATH.FORGOT_PASSWORD}
              className="ml-auto mr-7 mb-6 text-regular_text14 text-dark-100 "
              children={t('auth.forgotPassword')}
            />
            <Button variant="primary" type="submit" width="100%" children={t('auth.signIn')} />
            <p className="mt-2.5 mb-2.5" children={t('auth.additionalElements.doNotHaveAnAccount')} />
            <span className="text-h3 text-accent-500 cursor-pointer" onClick={handleSignUp} children={t('auth.signUp')} />
          </div>
        </Cards>
      </FormProvider>
    </div>
  )
}

export default Page