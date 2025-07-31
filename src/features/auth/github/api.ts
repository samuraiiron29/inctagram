import { baseApi } from '@/store/services/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAccessRefreshTokens: builder.mutation<any, any>({
        query: () => ({
          method: 'post',
          url: 'auth/github/update-tokens',
        }),
      }),
    }
  },
})

export const { useGetAccessRefreshTokensMutation } = authApi
