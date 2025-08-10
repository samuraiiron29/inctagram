'use client'

import { type PublicProfile } from '@/shared/api'
import ImageUploader from '@/shared/ui/Image/ImageUploader'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Posts from '@/shared/ui/Posts/Posts'

type Props = {
  profile: PublicProfile
}
const UserProfile = (props: Props) => {
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

export default UserProfile
