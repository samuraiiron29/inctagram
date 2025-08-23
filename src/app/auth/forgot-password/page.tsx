"use client";
import { FormProvider} from "react-hook-form";
import { Button } from "@/shared/ui/base/Button/Button";
import { Input } from "@/shared/ui/base/Input/Input";
import { Cards } from "@/shared/ui/base/Cards/Cards";
import { Recaptcha } from "@/shared/ui/base/Recaptcha/Recaptcha";
import { Modal } from "@/shared/ui/Modal/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/lib/path";
import { useForgotPassword } from "@/features/auth/forgot-passwors/model/useForgotPassword";
// for build
const ForgotPasswordPage = () => {
    const {
    methods,
    onSubmit,
    modal,
    closeModal,
    captchaVerified,
    setCaptchaVerified,
    isValid,
  } = useForgotPassword();

  const router = useRouter();

  const handleCloseModal = () => {
    closeModal()
    if (modal.title === 'Email sent') router.push(PATH.AUTH.LOGIN)
  }
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-[378px]">
        <FormProvider {...methods}>
          <Cards onSubmit={onSubmit}>
            <h1 className="text-center text-h1">Forgot Password</h1>
            {modal.open && (
              <Modal open={modal.open} onClose={handleCloseModal} modalTitle={modal.title}>
                <div className="flex flex-col space-y-4">
                  <p>{modal.message}</p>
                  <div className="flex justify-end">
                    <Button type="button" variant="primary" onClick={closeModal} children={'Ok'} />
                  </div>
                </div>
              </Modal>
            )}
            <Input type="email" name="email" label="Email" />
            <p className="text-xs">Enter your email address and we will send you further instructions</p>
            <div className="flex flex-col space-y-[24px] mt-5">
              <Button type="submit" variant="primary" width="100%" disabled={!captchaVerified || !isValid} children={'Send Link'} />
              <Link href={'/auth/login'} className="text-h3 text-center block text-accent-500 ">
                Back to Sign In
              </Link>
            </div>
            <div className="mt-5">
              <div className="mt-3 flex justify-center">
                <Recaptcha sitekey={sitekey || ''} onChange={token => setCaptchaVerified(!!token)} />
              </div>
            </div>
          </Cards>
        </FormProvider>
      </div>
    </div>
  )
};

export default ForgotPasswordPage;
