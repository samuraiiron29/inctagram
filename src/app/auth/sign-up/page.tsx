'use client'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import type { Error, ZodInputs } from '@/shared/lib/types'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useSignUpMutation } from '@/shared/api'
import { registrationSchema } from '@/shared/lib/schemas'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { Button } from '@/shared/ui/base/Button/Button'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useTranslation } from 'react-i18next'
import { useSignUpText } from '@/shared/lib/hooks/useSignUpText'
import { PATH } from '@/shared/lib/path'

const Page = () => {
  const [isModal, setIsModal] = useState(false)
  const [email, setEmail] = useState('')
  const [singUp] = useSignUpMutation()
  const { t } = useTranslation()
  const signUpText = useSignUpText(t)
  const methods = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'all',
  })

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

  const onSubmit = async (data: ZodInputs) => {
    try {

      await singUp({ userName: data.firstName, email: data.email, password: data.password }).unwrap()
      methods.reset({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
      })
      setEmail(data.email)
      setIsModal(true)
    } catch (error) {
      const er = error as Error
      if (er.status === 400 && er.data.messages.length > 0) {
        const message = er.data.messages[0].message

        if (message.includes('email')) {
          methods.setError('email', { type: 'server', message: er.data.messages[0].message })
        } else if (message.includes('firstName')) {
          methods.setError('firstName', { message: er.data.messages[0].message })
        } else {
          console.log('unknown error')
          methods.setError('root', { message: 'unknown error' })
        }
      } else {
        console.log('servers error', error)
      }
    }
  }

  return (
    <div className="mt-4 w-[378px] h-[678px]">
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={'flex flex-col items-center my-[20px]'}>
            <div className="">
              <span className={'text-h1'}>{signUpText.signUp}</span>
            </div>
            <div className={'flex items-center gap-16 mt-[13px] mb-[24px]'}>
              <Image onClick={handleGitHubLogin} src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
              <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleGoogleLogin} />
            </div>
            <Input type={'default'} name="firstName" width={'300px'} label={signUpText.username} />
            <Input type="email" name="email" width={'300px'} label={signUpText.email} />
            <Input type="password" name="password" width={'300px'} label={signUpText.password} />
            <Input type={'password'} name="confirmPassword" width={'300px'} label={signUpText.passwordConfirm} />
            <Controller
              {...methods.register('rememberMe')}
              name="rememberMe"
              control={methods.control}
              render={({ field }) => {
                return (
                  <div className="flex justify-center text-center w-full my-4 gap-3">
                    <Checkbox checked={field.value} onChange={checked => field.onChange(checked)} />
                    {signUpText.agree()}
                  </div>
                )
              }}
            />

            <Button type="submit" variant={'primary'} disabled={!methods.formState.isValid} width={'100%'}>
              {signUpText.signUp}
            </Button>
            <p className="mt-2.5">{signUpText.doYouHaveAnAccount}</p>
            <span className="text-h3 text-accent-500">{signUpText.signIn}</span>
          </div>
        </Cards>
      </FormProvider>
      {isModal && (
        <Modal open={isModal} onClose={() => setIsModal(false)} modalTitle={signUpText.emailSent}>
          <div className="flex flex-col">
            <p className="pb-4">{`${signUpText.weHaveSent} ${email}`}</p>
            <div className=" flex justify-end">
              <Button children={'OK'} onClick={() => setIsModal(false)} /> {/* todo: или роутер.пуш на страницу авторизации*/}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// Qwerty12345!@#

export default Page
