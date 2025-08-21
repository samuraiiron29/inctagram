'use client'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import PostItem from '@/entities/posts/ui/PostItem/PostItem'
import { useEffect } from 'react'

type Props = {
  userId: number
  offset: number
  setHasMoreHandler: (el: boolean) => void
}

const PORTION_OF_ITEMS = 4

const Posts = ({offset, userId, setHasMoreHandler}: Props) => {
  const { data } = useGetPostsByUserIdQuery({
    userId: userId,
    endCursorPostId: undefined,
    pageSize: PORTION_OF_ITEMS + offset, // !!!
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  useEffect(()=>{
    if (data) {
      setHasMoreHandler(offset <= data.totalCount)
    } 
  },[offset])

  const posts = data?.items.map(post => <PostItem post={post} key={post.id} />)
  return (
    <div className='grid grid-cols-4 gap-4'>
      {posts}
    </div>
  )
}

export default Posts
