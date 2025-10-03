'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { setAccessToken } from '@/store/slices/authSlice'
import { refreshTokens } from '@/shared/api/refresh'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(state => state.auth.accessToken)
  debugger

  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()
  const isSSRUserProfilePage = /^\/users\/profile(?:\/.*)+$/.test(pathname)

  useEffect(() => {
    if (!accessToken) {
      refreshTokens()
        .then(data => {
          if (data?.accessToken) {
            dispatch(setAccessToken(data.accessToken))
          }
        })
        .catch(() => {
          // refresh нету, значит пользователь будет неавторизованным
        })
    }
  }, [accessToken, dispatch])

  return <>{children}</>
}
//