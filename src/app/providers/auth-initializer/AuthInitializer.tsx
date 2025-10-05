'use client'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { selectAccessToken, setIsLoggedIn } from '@/store/slices/authSlice'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        dispatch(setIsLoggedIn(true))
      } else {
        try {
          const res = await fetch(window.location.href, { credentials: 'include' })
          const refreshTokenValid = res.headers.get('x-refresh-token-valid') === 'true'
          if (refreshTokenValid) {
            dispatch(setIsLoggedIn(true))
          } else {
            dispatch(setIsLoggedIn(false))
          }
        } catch (error) {
          console.error('Ошибка сессии на сервере', error)
        }
      }
      setIsInitialized(true)
    }

    checkAuth()
  }, [accessToken, dispatch])

  if (!isInitialized) return null

  return <>{children}</>
}
