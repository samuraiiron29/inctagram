import { baseApi } from '@/store/services/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<any, void>({
      query: () => 'auth/me',
    }),
  }),
})

export const { useMeQuery } = authApi
