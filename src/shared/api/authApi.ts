import { baseApi } from '@/store/services/baseApi'
import { deleteCookie } from '@/shared/lib/utils/cookieUtils'
import type { Me, SignInResponse } from '../lib/types'
import { OAUTH_URL } from '../const'
import { PATH } from '../lib/path'
import { setAccessToken } from '@/store/slices/authSlice'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<Me | null, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          // console.log(data)
          // applySessionFromMe(data ?? null, dispatch)
        } catch {
          // Network/500 — не трогаем текущий UI-стейт.
        }
      },
      providesTags: ['Me'],
    }),
    signUp: build.mutation<void, SignInResponse>({
      query: args => ({
        url: 'auth/registration',
        method: 'POST',
        body: { ...args, baseUrl: `${OAUTH_URL}${PATH.REGISTRATION_CONFIRMATION}` },
      }),
    }),
    confirm: build.mutation<void, { confirmationCode: string }>({
      query: args => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { ...args },
      }),
    }),
    signIn: build.mutation<{ accessToken: string }, { email: string; password: string }>({
      query: args => ({ url: 'auth/login', method: 'POST', body: args }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setAccessToken(data.accessToken))
        dispatch(authApi.util.invalidateTags(['Me']))
      },
      invalidatesTags: ['Me'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: 'auth/logout', method: 'POST', credentials: 'include' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        // deleteCookie('isGitHub')
        // deleteCookie('accessToken')
        // deleteCookie('refreshToken')
        deleteCookie()
        dispatch(authApi.util.resetApiState())
      },
      invalidatesTags: ['Me'],
    }),
    deleteUserProfile: build.mutation<void, { id: number }>({
      query: ({ id }) => ({ url: `users/profile/${id}`, method: 'DELETE' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        // deleteCookie('isGitHub')
        // deleteCookie('accessToken')
        // deleteCookie('refreshToken')
        // cleanupAuth(dispatch)
        deleteCookie()
        dispatch(authApi.util.resetApiState())
      },
      invalidatesTags: ['Me'],
    }),
    forgotPassword: build.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: 'auth/password-recovery',
        method: 'POST',
        body: { email, baseUrl: `${OAUTH_URL}${PATH.NEW_PASSWORD}` },
      }),
    }),
    createNewPassword: build.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: ({ newPassword, recoveryCode }) => ({
        url: 'auth/new-password',
        method: 'POST',
        body: { newPassword, recoveryCode },
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useMeQuery,
  useLogoutMutation,
  useConfirmMutation,
  useSignUpMutation,
  useDeleteUserProfileMutation,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
  useSignInMutation,

  // useDeleteProfileMutation,
} = authApi
