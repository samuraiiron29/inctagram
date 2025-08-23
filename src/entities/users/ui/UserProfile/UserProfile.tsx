'use client'
import Posts from '@/entities/posts/ui/Posts'
import type { PublicProfile } from '@/shared/lib/types'
import { Button } from '@/shared/ui/base/Button'
import { Scroll } from '@/shared/ui/base/Scroll'
import Image from 'next/image'
import { useState } from 'react'
import { useIntersectionObserver } from "@siberiacancode/reactuse";

type Props = {
  profile: PublicProfile
  isLoggedIn?: boolean
}

const PORTION_OF_ITEMS = 4

const UserProfile = ({ profile, isLoggedIn = false }: Props) => {

  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true)

  const setHasMoreHandler = (el: boolean) => {
    setHasMore(el)
  }

  const {ref} = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
    onChange: (entry) =>{
      if (entry.isIntersecting && hasMore) {
        setOffset(prev => prev + PORTION_OF_ITEMS)
      }
    }
  })

  return (
    <Scroll className="flex flex-col p-10 pb-20 h-screen">
      <div className="flex flex-row relative mb-[50px]">
        <Image
          src={'/avatar.svg'}
          width={204}
          height={204}
          alt="Avatar"
          className="rounded-full mr-10 border-white border min-w-[204px]"
        />
        <div>
          <div className="mb-[20px]">
            <h1>{profile.userName}</h1>
          </div>
          <div className="flex flex-row gap-2 mb-[23px]">
            <div className="mr-30">
              <b>{profile.userMetadata.following}</b>
              <div>Following</div>
            </div>
            <div className="mr-30">
              <b>{profile.userMetadata.followers}</b>
              <div>Followers</div>
            </div>
            <div>
              <b>{profile.userMetadata.publications}</b>
              <div>Publications</div>
            </div>
          </div>
          <div>
            {profile.aboutMe} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quis quo, temporibus doloremque sint incidunt iusto error, deleniti consectetur
            rerum eligendi unde voluptatibus hic nobis. In iure facilis rerum laudantium
            odio.
          </div>
        </div>
        {!!isLoggedIn && (
          <div className="absolute top-[0] right-[0]">
            <Button variant="secondary">Profile Settings</Button>
          </div>
        )}
      </div>
      <Posts userId={profile.id} offset={offset} setHasMoreHandler={setHasMoreHandler}/>
      <div ref={ref} />
      {!hasMore && <div className=' text-center text-(length:--text-regular_text14)'> Посты закончились </div>}
    </Scroll>
  )
}

export default UserProfile
