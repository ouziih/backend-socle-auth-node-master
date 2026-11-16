import { z } from 'zod'

export const courseIdParamsSchema = z.object({ id: z.string().uuid() })

export const createCourseSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().max(10000).nullable().optional(),
})

export const updateCourseSchema = z
  .object({
    title: z.string().trim().min(1).max(255).optional(),
    description: z.string().trim().max(10000).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Au moins un champ est requis.',
  })
