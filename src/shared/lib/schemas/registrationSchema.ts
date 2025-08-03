import { z } from 'zod'
const passwordReges = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]{6,20}$/

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(6, 'Минимум 6 символов')
      .max(30, 'Максимум 30 символов')
      .regex(/^[a-zA-Z0-9_-]+$/, 'Разрешены только латинские буквы, цифры, _ и -'),
    email: z.email({ message: 'Incorrect email address' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен быть больше 6-ти знаков' })
      .max(20, { message: 'Пароль должен быть до 20-ти знаков' })
      .regex(passwordReges, {
        message: `Пароль должен содержать хотя бы одну цифру, строчную, заглавную букву. Разрешены спецсимволы: ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~)`,
      }),
    confirmPassword: z.string(),
    rememberMe: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
