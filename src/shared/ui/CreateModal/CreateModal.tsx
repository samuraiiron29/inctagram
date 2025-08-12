'use client'
import ImageUploader from '../Image/ImageUploader'

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
