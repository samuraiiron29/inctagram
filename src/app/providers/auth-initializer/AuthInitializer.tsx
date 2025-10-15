'use client'
import { useMeQuery } from '@/shared/api'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/store/services/session.selectors'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess } = useMeQuery()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()
  const isSSRUserProfilePage = /^\/users\/profile(?:\/.*)+$/.test(pathname)
  useEffect(() => {
    if (isLoading) return
    if (isSuccess) {
      setIsInitialized(true)
      // dispatch(setIsLoggedIn(true))
    } else setIsInitialized(true)
  }, [isLoading, isSuccess, data])
  if (!isInitialized && !isSSRUserProfilePage) return <LinearProgress />
  /// или &&

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
