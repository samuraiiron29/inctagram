import { baseApi } from '@/store/services/baseApi'
import { setAppEmail, setIsLoggedIn, setUserId } from '@/store/slices/appSlice'

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
  }),
})

export const { useMeQuery } = authApi
