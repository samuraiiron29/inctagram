'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { setCookie } from '@/shared/lib/utils/cookieUtils.client'
import { useGoogleAuthMutation } from '@/shared/api/authApi'

export default function Page() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()

  const code = searchParams.get('code') as string

  const [googleAuth] = useGoogleAuthMutation()
  useEffect(() => {
    googleAuth({ code, redirectUrl: 'http://localhost:3000/auth/google' })
      .unwrap()
      .then(response => {
        setCookie('accessToken', response.accessToken, 7)
        dispatch(setIsLoggedIn(true))
        router.push('/')
      })
      .catch(error => {
        console.error('Ошибка Google авторизации:', error)
      })
  }, [])

  return <div className={'flex justify-center items-center'}>Авторизация через Google...</div>
}
