import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseDeepSeekApi = createApi({
  reducerPath: 'deepSeekApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.aimlapi.com/v1/',
    prepareHeaders: headers => {
      headers.set('api-key', `61129232d0994aa5b6693d8e83a119a9`)
      headers.set('Content-Type', 'application/x-www-form-urlencoded')
      return headers
    },
  }),
  endpoints: build => ({
    ask: build.mutation({
      query: ({ prompt }) => ({
        url: 'chat/completions/',
        method: 'POST',
        body: JSON.stringify({ prompt }),
      }),
    }),
  }),
})

export const { useAskMutation } = baseDeepSeekApi

// ${process.env.NEXT_PUBLIC_BASE_DEEPSEEK_API}
