'use client'

import { type PublicProfile } from '@/shared/api'
import { Posts } from '../Posts/Posts'
import ImageUploader from '@/shared/ui/Image/ImageUploader'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  profile: PublicProfile
}
export const UserProfile = (props: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const openModal = pathname.includes('/create')
  const [open, setOpen] = useState(openModal)

  const handleClose = () => {
    setOpen(false)
    router.push(pathname.replace('/create', ''))
  }

  return (
    <>
      Name
      <Posts userId={props.profile.id} />
      <ImageUploader open={open} onClose={handleClose} />
    </>
  )
}
