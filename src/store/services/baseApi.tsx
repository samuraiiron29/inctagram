import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/store/services/baseQueryWithReauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
