import type z from 'zod'
import { registrationSchema } from '../schemas'

export type ZodInputs = z.infer<typeof registrationSchema>

