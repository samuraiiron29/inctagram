import { z } from 'zod'
const passwordReges = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]{6,20}$/

export const registrationSchema = z.object({
  email: z.email({ message: 'Incorrect email address' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть больше 6-ти знаков' })
    .max(20, { error: 'Пароль должен быть до 20-ти знаков' })
    .regex(passwordReges, {
      error: `Пароль должен содержать хотя бы одну цифру, строчную, заглавную букву. Разрешены спецсимволы: ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~)
          `,
    }),
  rememberMe: z.boolean(),
})

export type ZodInputs = z.infer<typeof registrationSchema>
