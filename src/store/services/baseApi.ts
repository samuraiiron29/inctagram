'use client'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@/store/services/baseQueryWithReAuth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
})
