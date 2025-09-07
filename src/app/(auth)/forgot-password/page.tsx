'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/base/Button/Button'
import { Input } from '@/shared/ui/base/Input/Input'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Modal } from '@/features/Modal/Modal'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/lib/path'
import { useState } from 'react'
import { registrationSchema } from '@/shared/lib/schemas'
import z from 'zod'
import { useForgotPasswordMutation } from '@/shared/api'
import { useForgotPassword } from '@/features/forgot-password/hooks/useForgotPassword'
import { useModal } from '@/features/forgot-password/hooks/useModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { ForgotPasswordForm } from '@/entities/forgot-password/ui/ForgotPasswordForm'

// const forgotPasswordSchema = registrationSchema.pick({
//   email: true,
// })
// type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPage = () => {
  // const { t } = useTranslation()
  // const [modal, setModal] = useState({
  //   open: false,
  //   title: '',
  //   message: '',
  // })
  // const [forgotPassword] = useForgotPasswordMutation()
  // const router = useRouter()
  // const methods = useForm<ForgotPasswordForm>({
  //   defaultValues: { email: '' },
  //   resolver: zodResolver(forgotPasswordSchema),
  //   mode: 'onChange',
  //   reValidateMode: 'onChange',
  // })
  // const {
  //   handleSubmit,
  //   formState: { isValid },
  //   setError,
  // } = methods
  // const showModal = (title: string, message: string) => setModal({ open: true, title, message })
  // const handleCloseModal = () => {
  //   setModal(prev => ({ ...prev, open: false }))
  //   if (modal.title === 'Email sent') router.push(PATH.LOGIN)
  // }
  // const handleLogin = () => router.replace(PATH.LOGIN)
  // const onSubmit = async (data: ForgotPasswordForm) => {
  //   try {
  //     await forgotPassword({ email: data.email }).unwrap()
  //     showModal(t('auth.emailSent'), `${t('auth.additionalElements.weHaveSent')} ${data.email}`)
  //   } catch (error: any) {
  //     if (error.status === 400) setError('email', { type: 'manual', message: t('auth.errors.emailDoesNotExist') })
  //     else showModal('Server error. Please try again later.', 'error')
  //   }
  // }
  const { sendLink } = useForgotPassword()
  const { modals, showModal, handleCloseModal } = useModal()
  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-[378px]">
        <ForgotPasswordForm Modal={Modal} sendLink={sendLink} modals={modals} showModal={showModal} handleCloseModal={handleCloseModal} />
        {/*<FormProvider {...methods}>*/}
        {/*  <Cards onSubmit={handleSubmit(onSubmit)}>*/}
        {/*    <h1 className="text-center text-h1" children={t('auth.forgotPassword')} />*/}
        {/*    {modal.open && (*/}
        {/*      <Modal open={modal.open} onClose={handleCloseModal} modalTitle={modal.title}>*/}
        {/*        <div className="flex flex-col space-y-4">*/}
        {/*          <p>{modal.message}</p>*/}
        {/*          <div className="flex justify-end">*/}
        {/*            <Button variant="primary" onClick={handleCloseModal} children={'OK'} />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </Modal>*/}
        {/*    )}*/}
        {/*    <Input type="email" name="email" width="300px" label={t('auth.email')} />*/}
        {/*    <p className="text-xs mt-1" children={t('auth.additionalElements.enterYourEmail')} />*/}
        {/*    <div className="flex flex-col space-y-2 mt-5">*/}
        {/*      <Button type="submit" variant="primary" width="100%" disabled={!isValid} children={t('auth.sendLink')} />*/}
        {/*      <Button variant="textButton" children={t('auth.backToSignIn')} onClick={handleLogin} />*/}
        {/*    </div>*/}
        {/*  </Cards>*/}
        {/*</FormProvider>*/}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
