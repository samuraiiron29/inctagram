import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/v1/',
    credentials: 'include',
  }),
  endpoints: () => ({}),
})
