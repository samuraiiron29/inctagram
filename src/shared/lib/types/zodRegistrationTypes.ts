import type z from 'zod'
import type { registrationSchema } from '../schemas'

export type ZodInputs = z.infer<typeof registrationSchema>
