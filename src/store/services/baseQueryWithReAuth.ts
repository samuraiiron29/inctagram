import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { getCookie, setCookie, deleteCookie } from '@/shared/lib/utils/cookieUtils'
import { BASE_URL } from '@/shared/const'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getCookie('accessToken')?.trim()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const isEndpoint = (args: string | FetchArgs, suffix: string) => {
  const url = typeof args === 'string' ? args : args.url
  return String(url).endsWith(suffix)
}

let refreshPromise: Promise<boolean> | null = null

const refreshToken = async (
  api: Parameters<typeof baseQuery>[1],
  extra: Parameters<typeof baseQuery>[2]
): Promise<boolean> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  })

  const r = await rawBaseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extra)

  if ('data' in r && r.data) {
    const accessToken = (r.data as { accessToken?: string })?.accessToken?.trim()
    if (accessToken) {
      setCookie('accessToken', accessToken, 7)
      return true
    }
  }
  return false
}

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  const isMe = isEndpoint(args, 'auth/me')
  const isRefresh = isEndpoint(args, 'auth/update-tokens')

  let result = await baseQuery(args, api, extra)
  let error = result.error as FetchBaseQueryError | undefined

  if (error?.status === 401 || !getCookie('accessToken')) {
    if (!refreshPromise) refreshPromise = refreshToken(api, extra)
    const ok = await refreshPromise.finally(() => (refreshPromise = null))

    if (ok) {
      result = await baseQuery(args, api, extra)
    } else {
      deleteCookie()
      return { data: null, meta: result.meta }
    }
  }


  if (isMe && error?.status === 401) {
    debugger
    return { data: null, meta: result.meta }
  }

  return result
}

// la-la-la