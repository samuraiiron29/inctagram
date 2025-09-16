'use client'
import { Oauth } from '@/features/auth/oauth/Oauth'
import { useSignUpMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'
import { registrationSchema } from '@/shared/lib/schemas'
import { ZodInputs, type Error } from '@/shared/lib/types'
import { Button, Cards, Input } from '@/shared/ui/base'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { Modal } from '@/features/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

function Page() {
  // Qwerty12345!@#

  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [signUp] = useSignUpMutation()
  const methods = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
  })
  const handleLogin = () => router.replace(PATH.LOGIN)
  const handleTerms = () => router.push(PATH.TERMS_OF_SERVICE)
  const handlePolicy = () => router.push(PATH.PRIVACY_POLICY)
  const closeModal = () => setIsModal(false)
  const onSubmit = async (data: ZodInputs) => {
    try {
      await signUp({ userName: data.firstName, email: data.email, password: data.password }).unwrap()
      setEmail(data.email)
      setIsModal(true)
      methods.reset()
    } catch (error) {
      const er = error as Error
      if (er?.status === 400 && er?.data?.messages?.length) {
        const message = er.data.messages[0].message || ''
        if (message.includes('email')) methods.setError('email', { type: 'server', message })
        else if (message.includes('userName')) methods.setError('firstName', { message: 'User with this username is already registered' })
        else methods.setError('root', { type: 'server', message: 'unknown error' })
      } else {

      }
    }
  }
  return (
    <div className="mt-4 w-[378px] h-[678px]">
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center my-[20px]">
            <span className="text-h1" children={t('auth.signUp')} />
            <Oauth />
            <Input type="default" name="firstName" width="300px" label={t('auth.username')} />
            <Input type="email" name="email" width="300px" label={t('auth.email')} />
            <Input type="password" name="password" width="300px" label={t('auth.password')} />
            <Input type="password" name="confirmPassword" width="300px" label={t('auth.passwordConfirm')} />

            <Controller
              {...methods.register('rememberMe')}
              name="rememberMe"
              control={methods.control}
              render={({ field }) => (
                <div className="flex justify-center text-center w-full my-4 gap-3">
                  <Checkbox checked={field.value} onChange={checked => field.onChange(checked)} />
                  <div className="inline-flex justify-center items-center text-center flex-wrap gap-x-1">
                    <p className="text-small_text" children={t('auth.additionalElements.iAgreeToThe')} />
                    <p className="text-small-link cursor-pointer" onClick={handleTerms} children={t('auth.termsOfService')} />
                    <p className="text-small_text" children={t('auth.additionalElements.and')} />
                    <p className="text-small-link cursor-pointer" onClick={handlePolicy} children={t('auth.privacyPolicy')} />
                  </div>
                </div>
              )}
            />
            <Button type="submit" variant="primary" width="100%" disabled={!methods.formState.isValid} children={t('auth.signUp')} />
            <p className="mt-2.5" children={t('auth.additionalElements.doYouHaveAnAccount')} />
            <span className="text-h3 text-accent-500 cursor-pointer" onClick={handleLogin} children={t('auth.signIn')} />
          </div>
        </Cards>
      </FormProvider>

      <Modal open={isModal} onClose={closeModal} modalTitle={t('auth.emailSent')}>
        <div className="flex flex-col">
          <p className="pb-4">{`${t('auth.additionalElements.weHaveSent')} ${email}`}</p>
          <div className="flex justify-end">
            <Button onClick={closeModal} children={'OK'} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Page
