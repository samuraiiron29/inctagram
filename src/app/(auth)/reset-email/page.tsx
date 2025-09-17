'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Modal } from '@/features/Modal/Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/lib/path'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForgotPasswordMutation } from '@/shared/api'
import { FormProvider, useForm } from 'react-hook-form'


export default function PasswordResetLinkExpiredPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromUrl = searchParams.get('email')

  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
  })
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const methods = useForm({
    defaultValues: { email: emailFromUrl || '' },
  })

  const handleCloseModal = () => setModal(prev => ({ ...prev, open: false }))

  const handleResendLink = async () => {
    if (!emailFromUrl) return
    try {
      await forgotPassword({ email: emailFromUrl }).unwrap()
      setModal({
        open: true,
        title: t('auth.emailSent'),
        message: `${t('auth.additionalElements.weHaveSent')} ${emailFromUrl}`,
      })
    } catch (error: any) {
      setModal({
        open: true,
        title: 'Error',
        message: 'Server error. Please try again later.',
      })
    }
  }

  const handleBackToSignIn = () => router.replace(PATH.LOGIN)

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-[378px]">
        <FormProvider {...methods}>
          <Cards>
            <h1 className="text-center text-h1" children={t('auth.forgotPassword')} />
            <p className="text-sm text-center my-4">{t('auth.additionalElements.enterYourEmail')}</p>
            <p className="text-sm text-center text-gray-400">{t('auth.additionalElements.sentAgain')}</p>

            <div className="flex flex-col space-y-2 mt-5">
              <Button type="button" variant="primary" width="100%" onClick={handleResendLink} disabled={isLoading}>
                {t('auth.sendAgain' as any)}
              </Button>
              <Button variant="textButton" children={t('auth.backToSignIn')} onClick={handleBackToSignIn} />
            </div>

            <Modal open={modal.open} onClose={handleCloseModal} modalTitle={modal.title}>
              <div className="flex flex-col space-y-4">
                <p>{modal.message}</p>
                <div className="flex justify-end">
                  <Button variant="primary" onClick={handleCloseModal} children={'OK'} />
                </div>
              </div>
            </Modal>
          </Cards>
        </FormProvider>
      </div>
    </div>
  )
}


