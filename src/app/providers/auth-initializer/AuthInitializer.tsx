'use client'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { selectAccessToken, setIsLoggedIn } from '@/store/slices/authSlice'
import { BASE_URL } from '@/shared/const'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  const accessToken = useAppSelector(selectAccessToken)

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        dispatch(setIsLoggedIn(true))

        try {
          const updateResponse = await fetch(`${BASE_URL}auth/github/update-tokens`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
          })

          if (!updateResponse.ok) {
            throw new Error('Ошибка обновления refreshToken')
          }
        } catch (error) {
          console.error('Ошибка refreshToken', error)
        }
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

  return (
    <div
      className={
        isLoggedIn ? 'grid h-[100vh] grid-cols-[3fr] grid-rows-[auto_1fr_auto] md:grid-cols-[220px_3fr] md:grid-rows-[auto_1fr]' : ''
      }
    >
      {children}
    </div>
  )
}
