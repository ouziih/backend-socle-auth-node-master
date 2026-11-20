import { describe, expect, it } from 'vitest'
import {
  courseEnrollmentParamsSchema,
  enrollLearnerSchema,
  lessonProgressParamsSchema,
  updateProgressSchema,
} from './enrollment.schema.js'

const validCourseId = '123e4567-e89b-12d3-a456-426614174000'
const validEnrollmentId = '123e4567-e89b-12d3-a456-426614174001'
const validLessonId = '123e4567-e89b-12d3-a456-426614174002'

describe('Validation des inscriptions', () => {
  it('accepte un courseId valide', () => {
    const result = courseEnrollmentParamsSchema.safeParse({ courseId: validCourseId })

    expect(result.success).toBe(true)
  })

  it('refuse un courseId invalide', () => {
    const result = courseEnrollmentParamsSchema.safeParse({ courseId: 'course-1' })

    expect(result.success).toBe(false)
  })

  it('accepte l’identifiant d’un apprenant', () => {
    const result = enrollLearnerSchema.safeParse({ userId: validCourseId })

    expect(result.success).toBe(true)
  })

  it('refuse un identifiant d’apprenant invalide', () => {
    const result = enrollLearnerSchema.safeParse({ userId: 'learner-1' })

    expect(result.success).toBe(false)
  })
})

describe('Validation de la progression', () => {
  it('accepte des paramètres de progression valides', () => {
    const result = lessonProgressParamsSchema.safeParse({
      enrollmentId: validEnrollmentId,
      lessonId: validLessonId,
    })

    expect(result.success).toBe(true)
  })

  it('accepte une progression terminée ou non terminée', () => {
    expect(updateProgressSchema.safeParse({ isCompleted: true }).success).toBe(true)
    expect(updateProgressSchema.safeParse({ isCompleted: false }).success).toBe(true)
  })

  it('refuse une progression sans statut', () => {
    const result = updateProgressSchema.safeParse({})

    expect(result.success).toBe(false)
  })
})
