'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import { Modal } from '@/features/Modal/Modal'
import { useLogoutMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'
import { useSelector } from 'react-redux'
import { selectEmail } from '@/store/services/session.selectors'
import { deleteCookie } from '@/shared/lib/utils'

type Props = {
  showModal: boolean
  setShowModal: (value: boolean) => void
}
export const Logout = ({ showModal, setShowModal }: Props) => {
  const email = useSelector(selectEmail)
  const [logout] = useLogoutMutation()

  // const onConfirm = () => {
  //   try {
  //     logout().unwrap()
  //   } catch (e) {
  //     // console.error('Logout failed:', e)
  //   } finally {
  //     setShowModal(false)
  //     window.location.replace(PATH.LOGIN)
  //   }
  // }
  const onConfirm = () => {
    setShowModal(false)
    logout()
      .unwrap()
      .catch(() => {}) // не важно, всё равно чистим локально
      .finally(() => {
        // deleteCookie('isGitHub')
        // deleteCookie('accessToken')
        // deleteCookie('refreshToken')
        deleteCookie()
        window.location.replace(PATH.LOGIN)
      })
  }
  const onCancel = () => setShowModal(false)
  return (
    <Modal open={showModal} onClose={onCancel} modalTitle={'Logout'}>
      <p className={'text-amber-50'}>Are you sure you want to logout {email}?</p>
      <div className={''}>
        <div className={'flex gap-[15px] mt-[18px]'}>
          <Button variant={'outlined'} onClick={onConfirm} children={'Yes'} />
          <Button variant={'primary'} onClick={onCancel} children={'No'} />
        </div>
      </div>
    </Modal>
  )
}
// const onConfirm = useCallback(async () => {
//   try {
//     await logout().unwrap()
//     window.location.replace(PATH.LOGIN)
//   } catch (e) {
//     console.error('Logout failed:', e)
//   } finally {
//     onOpenChange(false)
//   }
// }, [logout, onOpenChange])
// const onCancel = useCallback(() => onOpenChange(false), [onOpenChange])
