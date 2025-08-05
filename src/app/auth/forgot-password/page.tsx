"use client";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/shared/ui/base/Button/Button";
import { Input } from "@/shared/ui/base/Input/Input";
import { Cards } from "@/shared/ui/base/Cards/Cards";
import { Recaptcha } from "@/shared/ui/base/Recaptcha/Recaptcha";
import { PATH } from "@/shared/lib/path/path";
import { useState } from "react";
import { registrationSchema } from "@/shared/lib/schemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/shared/api";
import { ErrorMessage, Error } from "@/shared/lib/types";

const forgotPasswordSchema = registrationSchema.pick({
  email: true,
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [state, setState] = useState<"form" | "error" | "success">("form");
  const [serverErrors, setServerErrors] = useState<ErrorMessage[]>([]);
  const [forgotPassword] = useForgotPasswordMutation();

  const router = useRouter();
  const methods = useForm<ForgotPasswordForm>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
       await forgotPassword({ email: data.email }).unwrap()
      setServerErrors([]);
       setState("success")
  } catch (error: any) {
     const err = error as Error;
      if (err?.data?.messages) {
        setServerErrors(err.data.messages); // сохраняем массив сообщений
      }
      if (err?.status === 400) {
        setState("error");
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  const handleResend = async () => {
     const email = methods.getValues("email");
    try {
      await forgotPassword({ email }).unwrap();
      alert(`We have sent a link to confirm your email to ${email}`);
    } catch(err:any) {
      alert(err?.data?.error || "Failed to resend link");
    }
  };

 const closeMessage = () => {
    setServerErrors([]);
    setState("form");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-dark-200)]">
      <div className="w-[378px] h-[432px]">
        <h2 className="text-xl font-semibold text-center mb-4 text-[var(--color-light-100)]">
          Forgot Password
        </h2>

        {state === "form" && (
          <FormProvider {...methods}>
            <Cards onSubmit={methods.handleSubmit(onSubmit)}>
              <Input type="email" name="email" label="Email" />

              {serverErrors.length > 0 && (
                <div className="mt-2">
                  {serverErrors.map((err, i) => (
                    <p
                      key={i}
                      className="text-[var(--color-danger-500)] text-sm"
                    >
                      {err.field ? `${err.field}: ` : ""}
                      {err.message}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-xs text-[var(--color-light-900)] mt-2">
                Enter your email address and we will send you further instructions
              </p>

              <Button
                type="submit"
                variant="primary"
                disabled={!captchaVerified || !methods.watch("email")}
                className="w-full mt-4"
              >
                Send Link
              </Button>

              <Button
                type="button"
                variant="outlined"
                onClick={() => router.push(PATH.AUTH.LOGIN)}
                className="w-full mt-2"
              >
                Back to Sign In
              </Button>

              <div className="mt-3">
                <Recaptcha
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                  onChange={(token) => setCaptchaVerified(!!token)}
                />
              </div>
            </Cards>
          </FormProvider>
        )}

        {state === "error" && (
          <Cards>
            <p className="text-[var(--color-danger-500)] text-sm mb-2">
              User with this email doesn't exist
            </p>
            <Button
              type="button"
              variant="outlined"
              onClick={closeMessage}
              className="w-full"
            >
              Try Again
            </Button>
          </Cards>
        )}

        {state === "success" && (
          <Cards>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-[var(--color-light-900)]">
                We have sent a link to confirm your email to{" "}
                <span className="font-semibold">{methods.getValues("email")}</span>
              </p>
              <Button
                type="button"
                onClick={closeMessage}
                className="text-[var(--color-light-100)] hover:text-[var(--color-light-900)] text-lg"
              >
                ✕
              </Button>
            </div>

            <Input
              type="email"
              name="email"
              disabled
              label="Email"
              placeholder={methods.getValues("email")}
            />
            <p className="text-xs text-[var(--color-light-900)] mt-2">
              If you don’t receive an email, send the link again.
            </p>
            <Button
              type="button"
              variant="primary"
              onClick={handleResend}
              className="w-full mt-2"
            >
              Send Link Again
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={closeMessage}
              className="w-full mt-2"
            >
              OK
            </Button>
          </Cards>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
