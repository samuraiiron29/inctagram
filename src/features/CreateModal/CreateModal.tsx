'use client'
import ImageUploader from '@/shared/ui/Image/ImageUploader'
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
