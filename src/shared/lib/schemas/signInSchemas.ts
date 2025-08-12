import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Неверные почта или пароль' }),
  password: z
    .string()
    .min(1, { message: 'Введите пароль' })
    .max(20, { message: 'Пароль должен быть до 20-ти знаков' }),
})