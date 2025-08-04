'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { selectAppEmail } from '@/store/slices/appSlice'
import { useAppSelector } from '@/shared/lib/hooks'
import { useLogoutMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'

type Props = {
  showModal: boolean
  setShowModal: (value: boolean) => void
}

export const LogOut = ({ showModal, setShowModal }: Props) => {
  const email = useAppSelector(selectAppEmail)
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      window.location.replace(PATH.AUTH.LOGIN)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setShowModal(false)
    }
  }

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} modalTitle={'Log Out'}>
      <p className={'text-amber-50'}>Are you sure you want to log out {email}?</p>
      <div className={''}>
        <div className={'flex gap-[15px] mt-[18px]'}>
          <Button variant={'outlined'} onClick={logoutHandler}>
            Yes
          </Button>
          <Button variant={'primary'} onClick={() => setShowModal(false)}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
