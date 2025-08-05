import type z from 'zod'
import { registerTest, registrationSchema } from '../schemas'

export type ZodInputs = z.infer<typeof registrationSchema>
export type test = z.infer<typeof registerTest>
