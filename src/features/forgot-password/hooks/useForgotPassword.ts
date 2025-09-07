import { useForgotPasswordMutation } from '@/shared/api'

export const useForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const sendLink = async (email: string) => {
    return await forgotPassword({ email }).unwrap()
  }

  return { sendLink }
}
