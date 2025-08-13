import type z from 'zod'
import { loginSchema } from '../schemas'

export type ZodLogin = z.infer<typeof loginSchema>
