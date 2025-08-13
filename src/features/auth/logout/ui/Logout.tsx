'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useLogout } from '../model/useLogout'

type Props = {
  showModal: boolean
  setShowModal: (value: boolean) => void
}
export const Logout = ({ showModal, setShowModal }: Props) => {
  const { email, onConfirm, onCancel } = useLogout(setShowModal)
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} modalTitle={'Logout'}>
      <p className={'text-amber-50'}>Are you sure you want to log out {email}?</p>
      <div className={''}>
        <div className={'flex gap-[15px] mt-[18px]'}>
          <Button variant={'outlined'} onClick={onConfirm} children={'Yes'} />
          <Button variant={'primary'} onClick={onCancel} children={'No'} />
        </div>
      </div>
    </Modal>
  )
}
