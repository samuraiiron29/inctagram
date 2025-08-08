import { baseApi } from '@/store/services/baseApi'
import type { GetPublicPostsResponse } from '../lib/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicPosts: build.query<GetPublicPostsResponse, number>({
      query: pageSize => ({
        url: 'public-posts/all',
        params: {
          pageSize,
        },
      }),
    }),
    getPostsByUserId: build.query<GetPublicPostsResponse, GetProfilePublicPostsParams>({
      query: ({ userId, endCursorPostId, pageSize, sortBy, sortDirection }) => ({
        url: `posts/user/${userId}/${endCursorPostId}`,
        params: { pageSize, sortBy, sortDirection },
      }),
    }),
  }),
})

export const { useGetPublicPostsQuery, useGetPostsByUserIdQuery } = postsApi

export type GetProfilePublicPostsParams = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

type UserMetadata = {
  following: number
  followers: number
  publications: number
}

export type PublicProfile = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
  userMetadata: UserMetadata
}


