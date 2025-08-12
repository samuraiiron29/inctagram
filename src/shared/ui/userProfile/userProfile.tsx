'use client'


import ImageUploader from '@/shared/ui/Image/ImageUploader'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Posts from '@/shared/ui/Posts/Posts'
import { Button } from '../base/Button/Button'
import type { PublicProfile } from '@/shared/lib/types'

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
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        {' '}
        ckick
      </Button>
      <Posts userId={props.profile.id} />
      <ImageUploader open={open} onClose={handleClose} />
    </>
  )
}

export default UserProfile
