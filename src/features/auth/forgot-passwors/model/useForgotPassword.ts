import { registrationSchema } from "@/shared/lib/schemas";
import z from "zod";
import { useModal } from "./useModal";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PATH } from "@/shared/lib/path";

const forgotPasswordSchema = registrationSchema.pick({
  email: true,
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const useForgotPassword = () => {
    const {modal, showModal, closeModal} = useModal();
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const router = useRouter();
       
     const methods = useForm<ForgotPasswordForm>({
          defaultValues: { email: "" },
          resolver: zodResolver(forgotPasswordSchema),
          mode: "onChange",
          reValidateMode: "onChange",
        });

          const {
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = methods;

  const onSubmit = async(data:ForgotPasswordForm) => {
    try {
       await forgotPassword({ email: data.email,
         //recaptcha: "some-recaptcha-token"
        }).unwrap()
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
}
 
  return {
    methods, 
     onSubmit:handleSubmit(onSubmit),
     modal,
     showModal,
     closeModal,
     captchaVerified,
    setCaptchaVerified,
    isValid,
}
}