import { baseApi } from '@/store/services/baseApi'
import { setAppEmail, setIsLoggedIn, setUserId } from '@/store/slices/appSlice'
import { deleteCookie } from '@/shared/lib/utils/cookieUtils'

type GoogleAuthResponse = {
  accessToken: string
  email: string
}

type GoogleAuthRequest = {
  code: string
  redirectUrl: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<{ userId: number; userName: string; email: string; isBlocked: boolean }, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          if (response.data.email) {
            dispatch(setAppEmail(response.data.email))
            dispatch(setIsLoggedIn(true))
            dispatch(setUserId(response.data.userId))
          }
        } catch (error) {
          throw error
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        deleteCookie('accessToken')
        deleteCookie('isGitHub')
        dispatch(setIsLoggedIn(false))
        dispatch(setAppEmail(null))
        dispatch(authApi.util.resetApiState())
      },
    }),
    googleAuth: build.mutation<GoogleAuthResponse, GoogleAuthRequest>({
      query: ({ code, redirectUrl }) => ({
        url: '/auth/google/login',
        method: 'POST',
        body: { code, redirectUrl },
      }),
    }),
  }),
})

export const { useMeQuery, useLogoutMutation, useGoogleAuthMutation } = authApi
