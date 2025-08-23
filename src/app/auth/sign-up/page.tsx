'use client'

import { useSignUpMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'
import { registrationSchema } from '@/shared/lib/schemas'
import { ZodInputs, type Error } from '@/shared/lib/types'
import { Button } from '@/shared/ui/base/Button'
import { Cards } from '@/shared/ui/base/Cards'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { Input } from '@/shared/ui/base/Input'
import { Modal } from '@/shared/ui/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

function Page() {
  // Qwerty12345!@#
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [signUp] = useSignUpMutation()
  const methods = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: ZodInputs) => {
    try {
      await signUp({ userName: data.firstName, email: data.email, password: data.password }).unwrap()
      setEmail(data.email)
      setIsModal(true)
      methods.reset()
    } catch (error) {
      const er = error as Error
      if (er?.status === 400 && er?.data?.messages?.length) {
        const message = er.data.messages[0].message || ''
        if (message.includes('email')) methods.setError('email', { type: 'server', message })
        else if (message.includes('firstName')) methods.setError('firstName', { message })
        else methods.setError('root', { type: 'server', message: 'unknown error' })
      } else console.log('servers error', error)
    }
  }
  const handlerLogin = () => router.replace(PATH.AUTH.LOGIN)

  const handleGitHubLogin = () => {
    // const GITHUB_REDIRECT_URL = 'http://localhost:3000/auth/github'
    const redirectUrl = process.env.NODE_ENV === 'development' ? PATH.AUTH.GITHUB_REDIRECT_URL_DEV : PATH.AUTH.GITHUB_REDIRECT_URL_PROD
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`)
  }

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
    // const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google'
    const redirectUrl = process.env.NODE_ENV === 'development' ? PATH.AUTH.GOOGLE_REDIRECT_URL_DEV : PATH.AUTH.GOOGLE_REDIRECT_URL_PROD
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile` +
      `&response_type=code&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&client_id=${clientId}`
    window.location.assign(url)
  }

  const closeModal = () => {
    setIsModal(false)
    // router.replace(PATH.AUTH.LOGIN)
  }

  return (
    <div className="mt-4 w-[378px] h-[678px]">
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center my-[20px]">
            <span className="text-h1">{t('auth.signUp')}</span>
            <div className="flex items-center gap-16 mt-[13px] mb-[24px]">
              <Image src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" onClick={handleGitHubLogin} />
              <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleGoogleLogin} />
            </div>

            <Input type="default" name="firstName" width="300px" label={t('auth.username')} />
            <Input type="email" name="email" width="300px" label={t('auth.email')} />
            <Input type="password" name="password" width="300px" label={t('auth.password')} />
            <Input type="password" name="confirmPassword" width="300px" label={t('auth.passwordConfirm')} />

            <Controller
              {...methods.register('rememberMe')}
              name="rememberMe"
              control={methods.control}
              render={({ field }) => (
                <div className="flex justify-center text-center w-full my-4 gap-3">
                  <Checkbox checked={field.value} onChange={checked => field.onChange(checked)} />
                  <div className="inline-flex justify-center items-center text-center flex-wrap gap-x-1">
                    <p className="text-small_text">{t('auth.additionalElements.iAgreeToThe')} </p>
                    <p className="text-small-link cursor-pointer" onClick={() => router.push(PATH.AUTH.TERMS_OF_SERVICE)}>
                      {t('auth.termsOfService')}
                    </p>
                    <p className="text-small_text"> {t('auth.additionalElements.and')} </p>
                    <p className="text-small-link cursor-pointer" onClick={() => router.push(PATH.AUTH.PRIVACY_POLICY)}>
                      {t('auth.privacyPolicy')}
                    </p>
                  </div>
                </div>
              )}
            />
            <Button type="submit" variant="primary" width="100%" disabled={!methods.formState.isValid} children={t('auth.signUp')} />

            <p className="mt-2.5">{t('auth.additionalElements.doYouHaveAnAccount')}</p>
            <span className="text-h3 text-accent-500 cursor-pointer" onClick={handlerLogin}>
              {t('auth.signIn')}
            </span>
          </div>
        </Cards>
      </FormProvider>

      <Modal open={isModal} onClose={closeModal} modalTitle={t('auth.emailSent')}>
        <div className="flex flex-col">
          <p className="pb-4">{`${t('auth.additionalElements.weHaveSent')} ${email}`}</p>
          <div className="flex justify-end">
            <Button onClick={closeModal} children={'OK'} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Page
