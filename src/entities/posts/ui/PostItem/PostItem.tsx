'use client'

import type { Post } from '@/shared/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import { CurrentPostModal } from '@/shared/ui/CurrentPost'

type Props = {
  post: Post
}

const PostItem = ({ post }: Props) => {
  const [on, setOn] = useState(false)

  const images = post.images.map(i => (
    <div onClick={() => setOn(true)}>
      <Image src={i.url} alt="" width={250} height={250} key={i.url} className={'cursor-pointer'} />
    </div>
  ))
  return (
    <>
      <CurrentPostModal
        modalTitle={``}
        onClose={() => setOn(false)}
        open={on}
        post={post}
        children={post.description}
        editPostHeader
        images={images}
      />
      <div>{images}</div>
    </>
  )
}

export default PostItem
