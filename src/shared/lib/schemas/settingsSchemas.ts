import z from "zod";

export const settingsSchemas = z.object({
  // "userName": "string",
  // "firstName": "John",
  // "lastName": "Doe",
  // "city": "string",
  // "country": "string",
  // "region": "string",
  // "dateOfBirth": "2025-10-02T16:07:33.041Z",
  // "aboutMe": "Brief bio here"
  userName: z.string().min(6, { message: 'Имя пользователя должно быть больше шести символов' }),
  firstName: z.string().min(1, { message: 'Имя обязательно' }),
  lastName: z.string().min(1, { message: 'Фамилия обязательна' }),
  city: z.string(),
  country: z.string(),
  region: z.string(),
  dateOfBirth: z.number(),
  aboutMe: z.string().max(400, { message: 'Максимум 400 символов' }),
})