import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { deleteCookie, getCookie, setCookie } from '@/shared/lib/utils/cookieUtils'
import { BASEURL } from '@/shared/const'

export const baseQueryWithReAuth: BaseQueryFn = async (args, api, extraOptions) => {
  // function isRequest(args: string | FetchArgs, endpoint: string): boolean {
  //   if (typeof args === 'string') return args.endsWith(endpoint)
  //   if (typeof args === 'object') return args.url?.endsWith(endpoint) ?? false
  //   return false
  // }
  // const isMeRequest = isRequest(args, 'auth/me')
  // const isUpdateToken = isRequest(args, 'auth/update-tokens')
  // const dynamicBaseUrl = 'https://pictory.space/api/v1/'

  const baseQuery = fetchBaseQuery({
    // baseUrl: dynamicBaseUrl,
    baseUrl: BASEURL,
    credentials: 'include',
    prepareHeaders: headers => {
      const token = getCookie('accessToken')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  })
  //
  // первый запрос
  let result = await baseQuery(args, api, extraOptions)

  // refresh
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extraOptions)
    if (refreshResult.data) {
      const accessToken = (refreshResult.data as { accessToken: string })?.accessToken
      if (accessToken) {
        setCookie('accessToken', accessToken.trim(), 7)
        // Повторяем запрос с новым токеном
        result = await baseQuery(args, api, extraOptions)
        if (typeof window !== 'undefined') window.location.reload()
      }
    } else deleteCookie('accessToken')
  }

  return result
}
