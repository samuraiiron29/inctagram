'use client'
import ImageUploader from '@/features/Image/ImageUploader'
type Props = {
  open: boolean
}
export const CreateModal = (props: Props) => {
  return (
    <>
      <ImageUploader open />
    </>
  )
}
