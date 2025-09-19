import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { deleteCookie, getCookie, setCookie } from '@/shared/lib/utils/cookieUtils'
import { BASE_URL } from '@/shared/const'



const baseQuery = fetchBaseQuery({
baseUrl: BASE_URL,
credentials: 'include',
prepareHeaders: headers => {
const token = getCookie('accessToken')

if (token) headers.set('Authorization', `Bearer ${token}`)
return headers
},
})
const isEndpoint = (args: string | FetchArgs, suffix: string) => {
const url = typeof args === 'string' ? args : args.url
return String(url).endsWith(suffix)
}
let refreshPromise: Promise<boolean> | null = null


const refreshToken = async (api: Parameters<typeof baseQuery>[1], extra: Parameters<typeof baseQuery>[2]): Promise<boolean> => {
const r = await baseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extra)
if ('data' in r && r.data) {
const accessToken = (r.data as { accessToken?: string })?.accessToken?.trim()
if (accessToken) {
setCookie('accessToken', accessToken, 7)
return true
}
}
return false
}
// const logoutCleanup = (api: Parameters<typeof baseQuery>[1]) => deleteCookie()

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extra
) => {
  const isMe = isEndpoint(args, 'auth/me')
  const isRefresh = isEndpoint(args, 'auth/update-tokens')

  let result = await baseQuery(args, api, extra)
  const error = result.error as FetchBaseQueryError | undefined

  // === 1. Если запрос упал по 401 и это НЕ refresh и НЕ me → пробуем рефреш
  if (error?.status === 401 && !isRefresh && !isMe) {
    debugger
    if (!refreshPromise) refreshPromise = refreshToken(api, extra)
    const ok = await refreshPromise.finally(() => (refreshPromise = null))

    if (ok) {
      // повторяем запрос
      debugger
      result = await baseQuery(args, api, extra)
    } else {
      // токены не обновились → logout
      deleteCookie()
      return { data: null, meta: result.meta }
    }
  }

  // === 2. Спец.логика для /auth/me
  if (isMe) {
    if (error?.status === 401) {
      // пользователь — гость
      return { data: null, meta: result.meta }
    }

    if (!result.data && !result.error) {
      // бэкенд вернул пусто без ошибки → считаем это 401
      (result as any).error = { status: 401, data: null }
    }

    if (result.error) {
      const status = (result.error as FetchBaseQueryError).status
      if (status === 401 || status === 'FETCH_ERROR') {
        return { data: null, meta: result.meta }
      }
    }
  }

  return result
}

// to delete
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
// import { deleteCookie, getCookie, setCookie } from '@/shared/lib/utils/cookieUtils'
// import { BASE\_URL } from '@/shared/const'
// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE\_URL,
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
// const refreshToken = async (api: Parameters<typeof baseQuery>\[1], extra: Parameters<typeof baseQuery>\[2]): Promise<boolean> => {
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
// const logoutCleanup = (api: Parameters<typeof baseQuery>\[1]) => deleteCookie('accessToken')
// // api.dispatch(setIsLoggedIn(false))
// // api.dispatch(setAppEmail('' as any))
// // api.dispatch(setUserId(undefined as any))

// export const baseQueryWithReAuth: BaseQueryFn\<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
//   // спец-правило: /auth/me можно считать «гость» на 401 — без refresh
//   const isMe = isEndpoint(args, 'auth/me')
//   const isRefresh = isEndpoint(args, 'auth/update-tokens')
//   // 1) исходный запрос
//   let result = await baseQuery(args, api, extra)
//   // 2) если 401
//   if (!result.data && result.error && isMe) {
//     const status = (result.error as FetchBaseQueryError)?.status
//     if (status === 401 /\* основное правило */ || status === 'FETCH\_ERROR' /* опционально \*/) {
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
// // const dynamicBaseUrl = '[https://pictory.space/api/v1/](https://pictory.space/api/v1/)'
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
// //         if (typeof window !== 'undefined') window\.location.reload()
// //       }
// //     } else deleteCookie('accessToken')
// //   }
// //   return result
// // }







// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
// import { deleteCookie, getCookie, setCookie } from '@/shared/lib/utils/cookieUtils'
// import { BASE_URL } from '@/shared/const'
// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: 'include',
//   prepareHeaders: headers => {
//     const token = getCookie('accessToken')
//     console.log(token ? 'token' : 'not token')
//     if (token) headers.set('Authorization', `Bearer ${token}`)
//     return headers
//   },
// })

// const isEndpoint = (args: string | FetchArgs, suffix: string) => {
//   const url = typeof args === 'string' ? args : args.url
//   return String(url).endsWith(suffix)
// }
// let refreshPromise: Promise<boolean> | null = null
// console.log(refreshPromise, 'refreshPromise')
// let justLoggedIn = false


// const refreshToken = async (api: Parameters<typeof baseQuery>[1], extra: Parameters<typeof baseQuery>[2]): Promise<boolean> => {

//     const r = await baseQuery({ url: 'auth/update-tokens', method: 'POST' }, api, extra)
// console.log('r', r)
//     if ('data' in r && r.data) {
//       const accessToken = (r.data as { accessToken?: string })?.accessToken?.trim()
//       // const refreshToken = (r.data as { refreshToken?: string })?.refreshToken?.trim()

//       if (accessToken) {
//         setCookie('accessToken', accessToken, 7)
//         justLoggedIn = true
//         //  if (refreshToken) setCookie('refreshToken', refreshToken, 30)
//         return true
//       }
//     }
//     return false

// }
// // const logoutCleanup = (api: Parameters<typeof baseQuery>[1]) => deleteCookie()

// export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
//   const isMe = isEndpoint(args, 'auth/me')
//   const isRefresh = isEndpoint(args, 'auth/update-tokens')
//   console.log('isMe, isRefresh', isMe, isRefresh)


//   // 1) исходный запрос
//   let result = await baseQuery(args, api, extra)
//   console.log('result', result, result.error?.status)

//   // 2) Если /auth/me вернул data === null (без ошибки) — трактуем как "unauthorized"
//   if (isMe && result.data == null && !result.error) {
//     console.log('if1')
//     // console.warn('[baseQueryWithReAuth] /auth/me returned null without error — treating as 401')
//     ;(result as any).error = { status: 401, data: null }
//   }

//   // 4) Общий flow: если получили 401 и это не запрос обновления токенов — пробуем refresh
//   if ((result.error as any)?.status === 401 && !isRefresh) {
//         console.log('if2')
// if (justLoggedIn) {
//   // Пропускаем очистку куки после логина
//   justLoggedIn = false
//   return result
// }
//       if (!refreshPromise) {
//         refreshPromise = refreshToken(api, extra)
//             console.log('if3')
//       }
//       const ok = await refreshPromise.finally(() => {
//             console.log('ok')
//         refreshPromise = null
//       })
//       if (ok) {
//             console.log('if4')
//         // повторяем исходный запрос с обновлённым access token
//         result = await baseQuery(args, api, extra)
//         console.log('[baseQueryWithReAuth] after refresh result', result)
//         // если повтор всё ещё вернул 401 — чистим куки
//         if ((result.error as any)?.status === 401) {
//            console.log('if5')
//           deleteCookie()
//           //  return { data: null, meta: (result as any).meta }
//         }
//       } else {
//          console.log('else')
//         // refresh не удался
//         deleteCookie()
//         // можно вернуть явный guest-результат для некоторых endpoint'ов
//         return { data: null, meta: (result as any).meta }
//       }

//   }
//   return result
// }
//   // Если /auth/me вернул 401 или FETCH_ERROR — считаем гостем
//   // console.log(result.error?.data?.error)
//   if (result.error?.status === 401) {
//   }
//   if (isMe && result.data == null && !result.error) {
//     // заставляем следующий код думать, что это 401
//     // result.error = { status: 401, data: null }
//   }
//   if (!result.data && result.error && isMe) {
//     const status = (result.error as FetchBaseQueryError)?.status
//     if (status === 401 || status === 'FETCH_ERROR') return { data: null, meta: (result as any).meta }
//   }
//   if (result.error?.status === 401 && !isRefresh) {
//     if (!refreshPromise) refreshPromise = refreshToken(api, extra)
//     const ok = await refreshPromise.finally(() => (refreshPromise = null))

//     if (ok) result = await baseQuery(args, api, extra)
//     else logoutCleanup(api)
//   }
//   return result
// }


// to delete
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