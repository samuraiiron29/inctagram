import z from 'zod'
import { registrationSchema } from '@/shared/lib/schemas'

export const forgotPasswordSchema = registrationSchema.pick({
  email: true,
})
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>
