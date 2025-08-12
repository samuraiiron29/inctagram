import type z from 'zod'
import { loginSchema } from '../schemas'

export type loginType = z.infer<typeof loginSchema>
