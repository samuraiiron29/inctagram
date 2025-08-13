import type z from 'zod'
import { registrationSchema, type registerTest } from '../schemas'

export type ZodInputs = z.infer<typeof registrationSchema>
export type test = z.infer<typeof registerTest>
