'use client'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks'
import { setIsLoggedIn } from '@/store/slices/authSlice'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    fetch(window.location.href, { credentials: 'include' })
      .then(res => {
        const refreshTokenValid = res.headers.get('x-refresh-token-valid') === 'true'
        if (refreshTokenValid) dispatch(setIsLoggedIn(true))
      })
      .finally(() => setIsInitialized(true))
  }, [dispatch])

  if (!isInitialized) return null

  return <>{children}</>
}
