import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { deleteCookie, getCookie, setCookie } from '@/shared/lib/utils/cookieUtils.client'

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders: headers => {
      const token = getCookie('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

  // первый запрос
  let result = await baseQuery(args, api, extraOptions)

  // refresh
  const nakedBase = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  })

  if (result.error && result.error.status === 401) {
    const refreshResult = await nakedBase({ url: 'auth/update-tokens', method: 'POST' }, api, extraOptions)

    if (refreshResult.data) {
      const accessToken = (refreshResult.data as { accessToken: string })?.accessToken
      if (accessToken) {
        setCookie('accessToken', accessToken.trim(), 7)
        // Повторяем запрос с новым токеном
        result = await baseQuery(args, api, extraOptions)
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }
    } else {
      deleteCookie('accessToken')
    }
  }

  return result
}
