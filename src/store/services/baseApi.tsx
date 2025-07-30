import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useGetAccessRefreshTokensMutation } from '@/features/auth/github/api'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  // baseQuery: fetchBaseQuery({
  //   // baseUrl: 'https://inctagram.work/api/v1/',
  //   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  //   credentials: 'include',
  //   prepareHeaders: headers => {
  //     headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
  //   },
  // }),
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
      },
    })(args, api, extraOptions)

    if (result.error) {
      switch (result.error.status) {
        case 401:
          debugger
      }
    }

    return result
  },
  endpoints: () => ({}),
})
