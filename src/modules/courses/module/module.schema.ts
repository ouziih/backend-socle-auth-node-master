import { z } from 'zod'

export const createModuleSchema = z.object({
  title: z.string().trim().min(1).max(255),
  order: z.number().int().min(0).optional(),
})
