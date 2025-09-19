'use client'
import { useMeQuery } from '@/shared/api'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getCookie } from '@/shared/lib/utils'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  const token = getCookie('accessToken')
  const { data, isLoading, isSuccess } = useMeQuery(undefined, {
    skip: isAuthPage || !token, // ⚡ skip на страницах авторизации
  })

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isLoading) return
    setIsInitialized(true)
  }, [isLoading, isSuccess, data])

  if (!isInitialized && !isAuthPage) return <LinearProgress />

  return <>{children}</>
}
