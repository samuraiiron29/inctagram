'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { setCookie } from '@/shared/lib/utils/cookieUtils'
import { useAppDispatch } from '@/shared/lib/hooks'
import { PATH } from '@/shared/lib/path'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const email = searchParams.get('email')
    if (accessToken && email) {
      setCookie('accessToken', accessToken, 7)
      dispatch(setIsLoggedIn(true))
      router.push('/')
    } else {
      console.error('Нет accessToken или email в query-параметрах')
      router.push(PATH.AUTH.SIGNUP)
    }
  }, [])

  return <div className={'flex justify-center items-center'}>Закуска</div>
}
