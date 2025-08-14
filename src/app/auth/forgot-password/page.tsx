"use client";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/shared/ui/base/Button/Button";
import { Input } from "@/shared/ui/base/Input/Input";
import { Cards } from "@/shared/ui/base/Cards/Cards";
import { Recaptcha } from "@/shared/ui/base/Recaptcha/Recaptcha";
import { PATH } from "@/shared/lib/path/path";
import { useEffect, useState } from "react";
import { registrationSchema } from "@/shared/lib/schemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/shared/api";
import { Modal } from "@/shared/ui/Modal/Modal";

const forgotPasswordSchema = registrationSchema.pick({
  email: true,
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const router = useRouter();
 
  const methods = useForm<ForgotPasswordForm>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

useEffect(() => {
  setModalTitle("Test modal");
  setModalMessage("This is a test");
  setModalOpen(true);
}, []);
    const {
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = methods;

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
       await forgotPassword({ email: data.email }).unwrap()
      showModal(
        "Email sent",
        `We have sent a link to confirm your email to ${data.email}`);
      router.push(PATH.AUTH.LOGIN);
  } catch (error: any) {
    if(error.status === 400) {
      setError("email", { type: "manual", message: "User with this email doesn't exist" });
    } else {
      showModal("Server error. Please try again later.", "error");
    }
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-dark-200)]">
       <div className="w-[378px] ">  
        <h2 className="text-xl font-semibold text-center mb-4 text-[var(--color-light-100)]">
          Forgot Password
        </h2>
       <div className="w-[378px]">
        <FormProvider {...methods}>
          <Cards onSubmit={handleSubmit(onSubmit)}>
           {modalOpen && (
         <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        modalTitle={modalTitle}
       >
          <div className="flex flex-col space-y-4">
          <p>{modalMessage}</p>
           <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            onClick={() => setModalOpen(false)}
          >
            Ok
          </Button>
        </div>
        </div>
      </Modal>
      
    )}
            <Input type="email" name="email" label="Email" />
            <p className="text-xs text-[var(--color-light-900)] mt-2">
              Enter your email address and we will send you further instructions
            </p>
            <div className="flex flex-col space-y-[24px] mt-5">
              <Button
                type="submit"
                variant="primary"
                width="100%"
                disabled={!captchaVerified || !isValid}
              >
                Send Link
              </Button>
              <Button
                type="button"
                variant="outlined"
                width="100%"
                onClick={() => router.push(PATH.AUTH.LOGIN)}
              >
                Back to Sign In
              </Button>
            </div>
            <div className="mt-5">
              <div className="mt-3 flex justify-center">
              <Recaptcha
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                onChange={(token) => setCaptchaVerified(!!token)}
              />
              </div>
            </div>
         
          </Cards>
        </FormProvider>
      </div>
    </div>
    </div>
  );
};
      

export default ForgotPasswordPage;
