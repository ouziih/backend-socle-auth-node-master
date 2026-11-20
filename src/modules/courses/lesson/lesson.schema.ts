import { z } from 'zod'

export const moduleIdParamsSchema = z.object({ moduleId: z.string().uuid() })

export const createLessonSchema = z.object({
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(1),
  order: z.number().int().min(0).optional(),
})
