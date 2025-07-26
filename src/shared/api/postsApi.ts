import { baseApi } from '@/store/services/baseApi'
import { GetPublicPostsResponse } from '@/shared/lib/types/postsTypes'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicPosts: build.query<GetPublicPostsResponse, number>({
      query: (pageSize) => ({
        url: 'public-posts/all',
        params: {
          pageSize,
        },
      }),
    }),
  })
})

export const {useGetPublicPostsQuery} = postsApi