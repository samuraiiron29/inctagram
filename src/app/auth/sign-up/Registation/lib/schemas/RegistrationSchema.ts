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
  username: z
    .string()
    .min(6, 'Минимум 6 символов')
    .max(30, 'Максимум 30 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Разрешены только латинские буквы, цифры, _ и -'),
})

export type ZodInputs = z.infer<typeof registrationSchema>
