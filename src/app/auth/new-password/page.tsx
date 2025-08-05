"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/base/Button/Button";
import { Input } from "@/shared/ui/base/Input/Input";
import { PATH } from "@/shared/lib/path/path";
import { FormProvider, useForm } from "react-hook-form";
import { registrationSchema } from "@/shared/lib/schemas";
import z from "zod";
import { Cards } from "@/shared/ui/base/Cards/Cards";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewPasswordMutation } from "@/shared/api";

const newPasswordSchema = registrationSchema.pick({
  password: true,
  confirmPassword: true,
});
// .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
// })

type NewPasswordForm = z.infer<typeof newPasswordSchema>;

const CreateNewPasswordPage = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const recoveryCode = searchParams.get("code"); // код приходит в ссылке из письма
    
  const [createNewPassword] = useCreateNewPasswordMutation();

  const methods = useForm<NewPasswordForm>({
      resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
     mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
const errors = methods.formState.errors;

const onSubmit = async(data: NewPasswordForm) => {
   try {
    await createNewPassword({
      newPassword: data.password,
      recoveryCode: recoveryCode || "",
    }).unwrap()
    alert("Password successfully changed")
    router.push(PATH.AUTH.LOGIN)
  } catch (error: any) {
    if (error.status === 400) {
      alert("Incorrect data. Please try again.")
    } else if (error.status === 429) {
      alert("Too many attempts. Please wait and try again.")
    } else {
      alert("Server error")
    }
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-dark-200)]">
      <div className="bg-[var(--color-dark-500)] p-8 shadow-lg w-[378px] h-[432px]">
        <h2 className="text-xl font-semibold text-center mb-4 text-[var(--color-light-100)]">
          Create New Password
        </h2>
 
        <FormProvider {...methods}>
          <Cards onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-semibold text-center mb-4 text-[var(--color-light-100)]">
              Create New Password
            </h2>

            <Input
              type="password"
              name="password"
              label="Enter new password"
              
            />
            {errors.password && (
              <p className="text-[var(--color-danger-500)] text-sm">
                {errors.password.message}
              </p>
            )}

            <Input
              type="password"
              name="confirmPassword"
              label="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-[var(--color-danger-500)] text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
           
                        <p className="text-xs text-[var(--color-light-900)]">
              Your password must be between 6 and 20 characters
            </p>

                <Button
              type="submit"
              variant="primary"
              disabled={!isValid}
              className="w-full mt-2"
            >
              Create new password
            </Button>
          </Cards>
        </FormProvider>
      </div>
    </div>
  );
}

export default CreateNewPasswordPage;