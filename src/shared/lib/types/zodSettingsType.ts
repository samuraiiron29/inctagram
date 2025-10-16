import type z from 'zod'
import { settingsSchemas } from '../schemas'

export type ZodSettings = z.infer<typeof settingsSchemas>
