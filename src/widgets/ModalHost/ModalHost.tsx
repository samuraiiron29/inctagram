'use client'
import ImageUploader from '@/shared/ui/Image/ImageUploader'
import { useAppSelector } from '@/shared/lib/hooks'
import { selectOpenCreate } from '@/store/slices/appSlice'

const ModalHost = () => {
  const opens = useAppSelector(selectOpenCreate)

  return <ImageUploader open={opens} />
}

export default ModalHost
