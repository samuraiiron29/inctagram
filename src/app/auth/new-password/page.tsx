'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/base/Button/Button'
import { Input } from '@/shared/ui/base/Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Modal } from '@/shared/ui/Modal/Modal'
import { PATH } from '@/shared/lib/path'
import { registrationSchema } from '@/shared/lib/schemas'
import z from 'zod'
import { useModal } from '@/features/auth/forgot-passwors/model/useModal'
import { useCreateNewPasswordMutation } from '@/shared/api'
import { zodResolver } from '@hookform/resolvers/zod'

const newPasswordSchema = registrationSchema.pick({
  password: true,
  confirmPassword: true,
})
type NewPasswordForm = z.infer<typeof newPasswordSchema>

export default function CreateNewPasswordPage() {
   const searchParams = useSearchParams()
    const recoveryCode = searchParams.get('code')
    const email = searchParams.get('email') || ''
    const router = useRouter()    
    const [createNewPassword, {isLoading}] = useCreateNewPasswordMutation();
    const {modal, showModal, closeModal} = useModal();

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
      // router.push(PATH.AUTH.LOGIN)
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
const handleCloseModal = () => {
        closeModal();
        if (modal.title === 'Password successfully changed') {
            router.push(PATH.AUTH.LOGIN);
        }
    };

  return (
    <div className="flex items-center justify-center mt-3">
      <Modal open={modal.open} onClose={handleCloseModal} modalTitle={modal.title}>
      </Modal>
        <FormProvider {...methods}>
          <Cards onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-center text-h1">Create New Password</h1>
            <Input
              type="password"
              name="password"
              label="Enter new password"
 />
         <Input
              type="password"
              name="confirmPassword"
              label="Confirm password"
            />
            <p className="text-xs ">
              Your password must be between 6 and 20 characters
            </p>
 <div className="mt-5 mb-5">
                <Button
              type="submit"
              variant="primary"
              disabled={!isValid || isLoading}
              width={"100%"}
            >
              Create new password
            </Button>
            </div>
          </Cards>
        </FormProvider>
      </div>
  )
}

