import { baseApi } from '@/store/services/baseApi'
import { CreatePostArgs, GetPublicPostsResponse, Post, UploadPostImagesArgs, UploadPostImagesResponse } from '../lib/types'
import { BaseQueryArg } from '@reduxjs/toolkit/query'

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
    uploadImagesForPost: build.mutation<UploadPostImagesResponse, UploadPostImagesArgs>({
      query: ({ files }) => {
        const form = new FormData()

        files.forEach(f => form.append('file', f))

        return {
          url: 'posts/image',
          method: 'POST',
          body: form,
        }
      },
    }),
    createPost: build.mutation<Post, CreatePostArgs>({
      query: ({ description, uploadIds }) => ({
        url: 'posts',
        method: 'POST',
        body: {
          description,
          childrenMetadata: uploadIds.map(uploadId => {
            return { uploadId }
          }),
        },
      }),
    }),
  }),
})

export const { useGetPublicPostsQuery, useGetPostsByUserIdQuery, useUploadImagesForPostMutation, useCreatePostMutation } = postsApi

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
