import { useForm } from 'react-hook-form'
import { registrationSchema } from '@/shared/lib/schemas'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATH } from '@/shared/lib/path/path'
import { useRouter } from 'next/navigation'
import { useCreateNewPasswordMutation } from '@/shared/api'
import { useState } from 'react'

const newPasswordSchema = registrationSchema.pick({
  password: true,
  confirmPassword: true,
})
type NewPasswordForm = z.infer<typeof newPasswordSchema>

export const useCreateNewPassword = (recoveryCode: string | null, email: string) => {
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
  })
  const showModal = (title: string, message: string) => {
    setModal({ open: true, title, message })
  }

  const closeModal = () => {
    setModal(prev => ({ ...prev, open: false }))
  }
  const [createNewPassword] = useCreateNewPasswordMutation()

  const router = useRouter()
  const methods = useForm<NewPasswordForm>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods
  const errors = methods.formState.errors

  const onSubmit = async (data: NewPasswordForm) => {
    try {
      await createNewPassword({
        newPassword: data.password,
        recoveryCode: recoveryCode || '',
      }).unwrap()
      showModal('Password successfully changed', 'success')
      
    } catch (error: any) {
       console.log('Ошибка сброса пароля:', error)

       const status = error?.status
       const message = error?.data?.error || error?.data?.message || ''
             if ((status === 400 || status === 410) && /expired/i.test(message)) {
         router.push(`${PATH.REGISTRATION_EMAIL_RESENDING}?email=${email}`)
          } else if (status === 400) {
    showModal('Incorrect data. Please try again.', 'error')
  } else if (status === 429) {
    showModal('Too many attempts. Please wait and try again.', 'error')
  } else {
    showModal('Server error', 'error')
  }
}
  }

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    modal,
    showModal,
    closeModal,
  }
}