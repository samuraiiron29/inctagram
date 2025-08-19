'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registrationSchema } from '@/shared/lib/schemas'
import type { Error, ZodInputs } from '@/shared/lib/types'
import { useSignUpMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'
import { useTranslation } from 'react-i18next'
import { useSignUpText } from './useSignUpText'

export const useSignUp = () => {
  const { t } = useTranslation()
  const signUpText = useSignUpText(t)
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

  const onSubmit = useCallback(
    async (data: ZodInputs) => {
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
    },
    [methods, signUp]
  )
  const handlerLogin = () => {
    router.replace(PATH.AUTH.LOGIN)
  }
  const handleGitHubLogin = useCallback(() => {
    // const GITHUB_REDIRECT_URL = 'http://localhost:3000/auth/github'
    const redirectUrl = process.env.NODE_ENV === 'development' ? PATH.AUTH.GITHUB_REDIRECT_URL_DEV : PATH.AUTH.GITHUB_REDIRECT_URL_PROD
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`)
  }, [])

  const handleGoogleLogin = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
    // const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google'
    const redirectUrl = process.env.NODE_ENV === 'development' ? PATH.AUTH.GOOGLE_REDIRECT_URL_DEV : PATH.AUTH.GOOGLE_REDIRECT_URL_PROD
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile` +
      `&response_type=code&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&client_id=${clientId}`
    window.location.assign(url)
  }, [])

  const closeModal = useCallback(() => {
    setIsModal(false)
    // router.replace(PATH.AUTH.LOGIN)
  }, [router])

  const ui = useMemo(() => ({ signUpText, isModal, email }), [signUpText, isModal, email])

  return {
    methods,
    onSubmit,
    handlerLogin,
    handleGitHubLogin,
    handleGoogleLogin,
    closeModal,
    ui,
  }
}
