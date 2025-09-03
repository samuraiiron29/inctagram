'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/base/Button/Button'
import { Input } from '@/shared/ui/base/Input/Input'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Modal } from '@/features/Modal/Modal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/lib/path'
import { useState } from 'react'
import { registrationSchema } from '@/shared/lib/schemas'
import z from 'zod'
import { useForgotPasswordMutation } from '@/shared/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

const forgotPasswordSchema = registrationSchema.pick({
  email: true,
})
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPage = () => {
  const { t } = useTranslation()
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
  })
  const [forgotPassword] = useForgotPasswordMutation()
  const router = useRouter()
  const methods = useForm<ForgotPasswordForm>({
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

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword({ email: data.email }).unwrap()
      showModal('Email sent', `We have sent a link to confirm your email to ${data.email}`)
      router.push(PATH.LOGIN)
    } catch (error: any) {
      if (error.status === 400) setError('email', { type: 'manual', message: "User with this email doesn't exist" })
      else showModal('Server error. Please try again later.', 'error')
    }
  }
  const closeModal = () => setModal(prev => ({ ...prev, open: false }))
  const showModal = (title: string, message: string) => setModal({ open: true, title, message })
  const handleCloseModal = () => {
    closeModal()
    if (modal.title === 'Email sent') router.push(PATH.LOGIN)
  }

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-[378px]">
        <FormProvider {...methods}>
          <Cards onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-h1">Forgot Password</h1>
            {modal.open && (
              <Modal open={modal.open} onClose={handleCloseModal} modalTitle={modal.title}>
                <div className="flex flex-col space-y-4">
                  <p>{modal.message}</p>
                  <div className="flex justify-end">
                    <Button variant="primary" onClick={handleCloseModal} children={'Ok'} />
                  </div>
                </div>
              </Modal>
            )}
            <Input type="email" name="email" label="Email" />
            <p className="text-xs mt-1">Enter your email address and we will send you further instructions</p>
            <div className="flex flex-col space-y-8 mt-5">
              <Button type="submit" variant="primary" width="100%" disabled={!isValid} children={'Send Link'} />
              <Button variant="textButton" children={'Back to Sign In'} />
              <Link href={'/sign-in'} className="text-h3 text-center block text-accent-500" children={'Back to Sign In'} />
            </div>
          </Cards>
        </FormProvider>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
