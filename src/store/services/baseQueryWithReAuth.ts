import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { RootState } from "@/store/store"
import { setAccessToken } from "@/store/slices/authSlice"
import { deleteCookie } from "@/shared/lib/utils/cookieUtils"
import { BASE_URL } from "@/shared/const"
import { refreshTokens } from "@/shared/api/refresh"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

let refreshPromise: Promise<boolean> | null = null

async function handleRefresh(api: Parameters<typeof baseQuery>[1]) {
  try {
    const data = await refreshTokens()
    if (data?.accessToken) {
      api.dispatch(setAccessToken(data.accessToken))
      return true
    }
  } catch (e) {
    console.error(e)
  }
  return false
}

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra)

  if ((result as any).error?.status === 401) {
    if (!refreshPromise) {
      refreshPromise = handleRefresh(api)
    }
    const ok = await refreshPromise.finally(() => (refreshPromise = null))

    if (ok) {
      result = await baseQuery(args, api, extra)
    } else {
      deleteCookie()
    }
  }

  return result
}
