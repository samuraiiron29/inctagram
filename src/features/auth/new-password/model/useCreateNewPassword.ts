// import { useCreateNewPasswordMutation } from '@/shared/api'
import { useForm } from 'react-hook-form'
import { registrationSchema } from '@/shared/lib/schemas'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATH } from '@/shared/lib/path/path'
import { useModal } from '@/features/auth/forgot-passwors/model/useModal'
import { useRouter} from 'next/navigation'
import { useCreateNewPasswordMutation } from '@/shared/api'

const newPasswordSchema = registrationSchema.pick({
  password: true,
  confirmPassword: true,
})
type NewPasswordForm = z.infer<typeof newPasswordSchema>

export const useCreateNewPassword = (recoveryCode: string | null, email: string) => {
     const [createNewPassword] = useCreateNewPasswordMutation();
     const {modal, showModal, closeModal} = useModal();
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
      router.push(PATH.AUTH.LOGIN)
    } catch (error: any) {
      if (error.status === 400 && error.data?.error === 'Invalid or expired link') {
        router.push(`${PATH.AUTH.RECOVERY_RESENDING}?email=${email}`)
      } else if (error.status === 400) {
        showModal('Incorrect data. Please try again.', 'error')
      } else if (error.status === 429) {
        showModal('Too many attempts. Please wait and try again.', 'error')
      } else {
        showModal('Server error', 'error')
      }
    }
  }

return {
     methods, 
     onSubmit:handleSubmit(onSubmit),
     modal,
     showModal,
     closeModal
       }
}