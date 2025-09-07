import { Button, Cards, Input } from '@/shared/ui/base'
// import { Modal } from '@/features/Modal'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATH } from '@/shared/lib/path'
// import { useForgotPassword } from '@/features/forgot-password/hooks/useForgotPassword'
// import { registrationSchema } from '@/shared/lib/schemas'
// import z from 'zod'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { forgotPasswordSchema, type ForgotPassword } from '../model/schema'

// const forgotPasswordSchema = registrationSchema.pick({
//   email: true,
// })
// type ForgotPassword = z.infer<typeof forgotPasswordSchema>

// interface UseForgotPassword {
//   sendLink: (email: string) => Promise<unknown>
// }

interface ModalState {
  open: boolean
  title: string
  message: string
}

// interface UseModal {
//   modal: ModalState
//   showModal: (title: string, message: string) => void
//   handleCloseModal: () => void
// }

export interface ModalProps {
  open: boolean
  onClose: () => void
  modalTitle: string
  children?: React.ReactNode
  width?: string
  height?: string
}

type Props = {
  Modal: React.ComponentType<ModalProps>
  sendLink: (email: string) => Promise<unknown>
  modals: ModalState
  showModal: (title: string, message: string) => void
  handleCloseModal: () => void
}

export const ForgotPasswordForm = ({ Modal, sendLink, modals, showModal, handleCloseModal }: Props) => {
  const router = useRouter()
  const handleLogin = () => router.replace(PATH.LOGIN)
  const { t } = useTranslation()
  // const [modal, setModal] = useState({
  //   open: false,
  //   title: '',
  //   message: '',
  // })

  // const { modal, showModal, handleCloseModal } = useModal()

  const methods = useForm<ForgotPassword>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const {
    handleSubmit,
    formState: { isValid },
    setError,
  } = methods

  // const handleCloseModal = () => {
  //   setModal(prev => ({ ...prev, open: false }))
  //   if (modal.title === 'Email sent') router.push(PATH.LOGIN)
  // }

  // const showModal = (title: string, message: string) => setModal({ open: true, title, message })

  // const { sendLink } = useForgotPassword()

  const onSubmit = async (data: ForgotPassword) => {
    try {
      await sendLink(data.email)
      showModal(t('auth.emailSent'), `${t('auth.additionalElements.weHaveSent')} ${data.email}`)
    } catch (error: any) {
      if (error.status === 400) setError('email', { type: 'manual', message: t('auth.errors.emailDoesNotExist') })
      else showModal('Server error. Please try again later.', 'error')
    }
  }

  return (
    <FormProvider {...methods}>
      <Cards onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-h1" children={t('auth.forgotPassword')} />
        {modals.open && (
          <Modal open={modals.open} onClose={handleCloseModal} modalTitle={modals.title}>
            <div className="flex flex-col space-y-4">
              <p>{modals.message}</p>
              <div className="flex justify-end">
                <Button variant="primary" onClick={handleCloseModal} children={'OK'} />
              </div>
            </div>
          </Modal>
        )}
        <Input type="email" name="email" width="300px" label={t('auth.email')} />
        <p className="text-xs mt-1" children={t('auth.additionalElements.enterYourEmail')} />
        <div className="flex flex-col space-y-2 mt-5">
          <Button type="submit" variant="primary" width="100%" disabled={!isValid} children={t('auth.sendLink')} />
          <Button variant="textButton" children={t('auth.backToSignIn')} onClick={handleLogin} />
        </div>
      </Cards>
    </FormProvider>
  )
}
