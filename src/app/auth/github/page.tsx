'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/shared/lib/hooks/appHooks'
import { setIsLoggedIn } from '@/store/slices/appSlice'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const email = searchParams.get('email')

    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken)
      dispatch(setIsLoggedIn(true))
      router.push('/')
    } else {
      console.error('Нет accessToken или email в query-параметрах')
    }
  }, [])

  return <div className={'flex justify-center items-center'}>Авторизация через GitHub...</div>
}
