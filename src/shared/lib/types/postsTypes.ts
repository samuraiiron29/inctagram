export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: PostImage[]
  createdAt: string
  updatedAt: string
  avatarOwner: string
  ownerId: number
  owner: {
    firstName: string
    lastName: string
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string[]
}

export type GetPublicPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: Post[]
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

export type CreatePostArgs = {
  description: string
  uploadIds: string[]
}

export type UploadPostImagesArgs = {
  files: File[]
}

export type UploadPostImagesResponse = {
  images: PostImage[]
}
export type GetProfilePublicPostsParams = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}




