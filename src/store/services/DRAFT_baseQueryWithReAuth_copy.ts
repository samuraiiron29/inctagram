// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
// import { deleteCookie, getCookie, setCookie } from '@/shared/lib/utils/cookieUtils'
// import { BASE_URL } from '@/shared/const'
// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: 'include',
//   prepareHeaders: headers => {
//     const token = getCookie('accessToken')
//     if (token) headers.set('Authorization', `Bearer ${token}`)

//     return headers
//   },
// })
// // let refreshPromise: Promise<{ accessToken?: string } | null> | null = null
// const isEndpoint = (args: string | FetchArgs, suffix: string) => {
//   const url = typeof args === 'string' ? args : args.url
//   return String(url).endsWith(suffix)
// }

// let refreshPromise: Promise<boolean> | null = null
// const refreshToken = async (api: Parameters<typeof baseQuery>[1], extra: Parameters<typeof baseQuery>[2]): Promise<boolean> => {
//   const r = await baseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extra)
//   if ('data' in r && r.data) {
//     const accessToken = (r.data as { accessToken?: string })?.accessToken?.trim()
//     if (accessToken) {
//       setCookie('accessToken', accessToken, 7)
//       return true
//     }
//   }
//   return false
// }
// const logoutCleanup = (api: Parameters<typeof baseQuery>[1]) => deleteCookie('accessToken')
// // api.dispatch(setIsLoggedIn(false))
// // api.dispatch(setAppEmail('' as any))
// // api.dispatch(setUserId(undefined as any))

// export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
//   // спец-правило: /auth/me можно считать «гость» на 401 — без refresh
//   const isMe = isEndpoint(args, 'auth/me')
//   const isRefresh = isEndpoint(args, 'auth/update-tokens')
//   // 1) исходный запрос
//   let result = await baseQuery(args, api, extra)
//   // 2) если 401
//   if (!result.data && result.error && isMe) {
//     const status = (result.error as FetchBaseQueryError)?.status
//     if (status === 401 /* основное правило */ || status === 'FETCH_ERROR' /* опционально */) {
//       // Возвращаем "успех" с пустыми данными — RTKQ не будет писать console.error
//       return { data: null, meta: (result as any).meta }
//     }
//   }
//   if (result.error?.status === 401 && !isRefresh) {
//     // для /auth/me — не рефрешим: трактуем как «гость»
//     // if (isMe) {
//     //   return { data: null }
//     // }
//     // 3) пробуем обновить токены
//     // let refreshPromise: Promise<boolean> | null = null
//     if (!refreshPromise) refreshPromise = refreshToken(api, extra)
//     const ok = await refreshPromise.finally(() => (refreshPromise = null))
//     // 4) повторяем исходный запрос уже с новым access
//     if (ok) {
//       result = await baseQuery(args, api, extra)
//     }
//     // 5) refresh не удался — чистим и оставляем 401 «как есть»
//     else {
//       logoutCleanup(api)
//     }
//   }
//   return result
// }
// // export const baseQueryWithReAuth: BaseQueryFn = async (args, api, extraOptions) => {
// // function isRequest(args: string | FetchArgs, endpoint: string): boolean {
// //   if (typeof args === 'string') return args.endsWith(endpoint)
// //   if (typeof args === 'object') return args.url?.endsWith(endpoint) ?? false
// //   return false
// // }
// // const isMeRequest = isRequest(args, 'auth/me')
// // const isUpdateToken = isRequest(args, 'auth/update-tokens')
// // const dynamicBaseUrl = 'https://pictory.space/api/v1/'
// // первый запрос
// // let result = await baseQuery(args, api, extraOptions)
// // refresh
// //   if (result.error && result.error.status === 401) {
// //     const refreshResult = await baseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extraOptions)
// //     if (refreshResult.data) {
// //       const accessToken = (refreshResult.data as { accessToken: string })?.accessToken
// //       if (accessToken) {
// //         setCookie('accessToken', accessToken.trim(), 7)
// //         // Повторяем запрос с новым токеном
// //         result = await baseQuery(args, api, extraOptions)
// //         if (typeof window !== 'undefined') window.location.reload()
// //       }
// //     } else deleteCookie('accessToken')
// //   }
// //   return result
// // }
export {}
