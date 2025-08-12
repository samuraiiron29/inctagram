'use client'

import type { Post } from '@/shared/lib/types'
import Image from 'next/image'

type Props = {
  post: Post
}

const PostItem = (props: Props) => {
  const images = props.post.images.map(i => <Image src={i.url} alt="" width={250} height={250} key={i.url} />)
  return <>{images}</>
}

export default PostItem
