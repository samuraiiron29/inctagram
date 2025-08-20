'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/base/Button/Button'
import { Input } from '@/shared/ui/base/Input/Input'
import { FormProvider } from 'react-hook-form'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useCreateNewPassword } from '@/features/auth/new-password/model/useCreateNewPassword'
import { PATH } from '@/shared/lib/path'

export default function CreateNewPasswordPage() {
   const searchParams = useSearchParams()
    const recoveryCode = searchParams.get('code')
    const email = searchParams.get('email') || ''
    const router = useRouter()    
 const { methods, onSubmit, modal, showModal, closeModal } = useCreateNewPassword(
        recoveryCode,
        email
    );

const {
        formState: { isValid },
    } = methods

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
          <Cards onSubmit={onSubmit}>
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
              disabled={!isValid}
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

