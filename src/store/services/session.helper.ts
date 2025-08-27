import { deleteCookie } from '@/shared/lib/utils/cookieUtils'
// import { setAppEmail, setIsLoggedIn, setUserId } from '@/store/slices/appSlice'

// export function applySessionFromMe(me: { userId: number; userName: string; email: string; isBlocked: boolean } | null, dispatch: any) {
//   if (me?.email) {
//     // dispatch(setIsLoggedIn(true))
//     // dispatch(setAppEmail(me.email as any))
//     // dispatch(setUserId(me.userId as any))
//   } else {
//     // dispatch(setIsLoggedIn(false))
//     // dispatch(setAppEmail(null as any))
//     // dispatch(setUserId(undefined as any))
//   }
// }

// export function cleanupAuth(dispatch: any) {
//   deleteCookie('accessToken')
//   deleteCookie('refreshToken') // если используется
//   deleteCookie('isGitHub') // если используется
//   // dispatch(setIsLoggedIn(false))
//   // dispatch(setAppEmail(null as any))
//   // dispatch(setUserId(undefined as any))
// }
export function cleanupAuth() {
  deleteCookie('accessToken')
  deleteCookie('refreshToken') // если используется
  deleteCookie('isGitHub') // если используется
  // dispatch(setIsLoggedIn(false))
  // dispatch(setAppEmail(null as any))
  // dispatch(setUserId(undefined as any))
}
