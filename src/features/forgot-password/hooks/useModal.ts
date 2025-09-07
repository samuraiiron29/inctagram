import { useState } from 'react'
import { PATH } from '@/shared/lib/path'
import { useRouter } from 'next/navigation'

export const useModal = () => {
  const router = useRouter()

  const [modals, setModals] = useState({
    open: false,
    title: '',
    message: '',
  })

  const showModal = (title: string, message: string) => setModals({ open: true, title, message })

  const handleCloseModal = () => {
    setModals(prev => ({ ...prev, open: false }))
    if (modals.title === 'Email sent') router.push(PATH.LOGIN)
  }

  return { modals, showModal, handleCloseModal }
}
