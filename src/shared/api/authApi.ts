import { baseApi } from '@/store/services/baseApi'
import { setAppEmail, setIsLoggedIn, setUserId } from '@/store/slices/appSlice'
import { deleteCookie, setCookie } from '@/shared/lib/utils/cookieUtils'
import type { SingInResponse } from '../lib/types'
import build from 'next/dist/build'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const confirmPage = 'http://localhost:3000/auth/registration-confirmation'
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
        dispatch(setIsLoggedIn(false))
        dispatch(setAppEmail(null))
        dispatch(authApi.util.resetApiState())
      },
    }),
    signUp: build.mutation<void, SingInResponse>({
      query: args => ({
        url: 'auth/registration',
        method: 'POST',
        body: { ...args, confirmPage },
      }),
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
        } catch (error) {
          throw error
        }
      },
    }),
  }),
})

export const { useMeQuery, useLogoutMutation, useConfirmMutation, useSignUpMutation, useDeleteUserProfileMutation } = authApi
