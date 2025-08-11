import { baseApi } from '@/store/services/baseApi'
import { setAppEmail, setIsLoggedIn, setUserId } from '@/store/slices/appSlice'
import type { SignInResponse } from '../lib/types'
import { deleteCookie, setCookie } from '@/shared/lib/utils/cookie.client'

type GoogleAuthResponse = {
  accessToken: string
  email: string
}

type GoogleAuthRequest = {
  code: string
  redirectUrl: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<{ userId: number; userName: string; email: string; isBlocked: boolean }, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          if (response.data?.email) {
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
    signUp: build.mutation<void, SignInResponse>({
      query: args => ({
        url: 'auth/registration',
        method: 'POST',
        body: { ...args, baseUrl: 'http://localhost:3000/auth/registration-confirmation' },
      }),
    }),
    signIn: build.mutation<{ accessToken: string }, { email: string; password: string }>({
      query: args => ({
        url: 'auth/login',
        method: 'POST',
        body: { ...args },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          setCookie('accessToken', response.data.accessToken.trim(), 7)
          await dispatch(authApi.endpoints.me.initiate())
        } catch (error) {
          throw error
        }
      },
    }),

    confirm: build.mutation<void, { confirmationCode: string }>({
      query: args => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { ...args },
      }),
    }),
    deleteUserProfile: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `users/profile/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          deleteCookie('accessToken')
          deleteCookie('refreshToken')
        } catch (error) {
          throw error
        }
      },
    }),
  }),
})

export const {
  useMeQuery,
  useConfirmMutation,
  useSignUpMutation,
  useDeleteUserProfileMutation,
  useLogoutMutation,
  useGoogleAuthMutation,
  useSignInMutation,
} = authApi
