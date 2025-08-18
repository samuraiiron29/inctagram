'use client'
import Posts from '@/entities/posts/ui/Posts'
import { useGetPostsByUserIdQuery } from '@/shared/api'
import type { PublicProfile } from '@/shared/lib/types'
import { Button } from '@/shared/ui/base/Button'
import { Scroll } from '@/shared/ui/base/Scroll'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  profile: PublicProfile
  isLoggedIn?: boolean
}

const UserProfile = ({ profile, isLoggedIn = false }: Props) => {

  const [page, setPage] = useState<number>(4)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
      if (!loaderRef.current || !hasMore) return

      const observer = new IntersectionObserver (
        entries => {
          const [entry] = entries
          if (entry.isIntersecting && !loading) {
            setPage((prev)=> prev + 4)
          }
        },
        { threshold: 1.0 }
      )
      observer.observe(loaderRef.current)

      return () => {
        if (loaderRef.current) observer.unobserve(loaderRef.current)
      }
    },[loaderRef.current, hasMore, loading])

  return (
    <Scroll className="flex flex-col p-10 h-screen">
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
      <Posts userId={profile.id} page={page}/>
      <div ref={loaderRef} /><div />
    </Scroll>
  )
}

export default UserProfile
