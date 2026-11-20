import { z } from 'zod'

export const courseEnrollmentParamsSchema = z.object({ courseId: z.string().uuid() })
export const enrollmentIdParamsSchema = z.object({ enrollmentId: z.string().uuid() })
export const lessonProgressParamsSchema = z.object({
  enrollmentId: z.string().uuid(),
  lessonId: z.string().uuid(),
})
export const enrollLearnerSchema = z.object({ userId: z.string().uuid() })
export const updateProgressSchema = z.object({ isCompleted: z.boolean() })
