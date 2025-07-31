import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {

  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // первый запрос
  let result = await baseQuery(args, api, extraOptions);

  // refresh
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: 'auth/update-tokens', method: 'POST' },
      api,
      extraOptions
    );

    const accessToken = (refreshResult.data as { accessToken: string })?.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      // Повторяем запрос с новым токеном
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('accessToken');
      if (typeof window !== 'undefined') {
        window.location.href = 'auth/sign-in';
      }
    }
  }

  return result;
};
