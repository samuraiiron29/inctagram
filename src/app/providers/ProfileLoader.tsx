"use client"

import { useMeQuery } from "@/shared/api/authApi"
import { selectAccessToken } from '@/store/slices/authSlice'

export function ProfileLoader(props: {children: React.ReactNode}) {
  const accessToken = selectAccessToken

  const { data, isLoading, isError } = useMeQuery(undefined, {
    skip: !accessToken,
  })

  if (!accessToken) return <div>Инициализация сессии...</div>
  if (isLoading) return <div>Загружаем профиль...</div>

  return <div>{props.children}</div>
}
