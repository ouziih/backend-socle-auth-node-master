import { describe, expect, it } from 'vitest'
import { createLessonSchema, moduleIdParamsSchema } from './lesson.schema.js'

describe('Validation des leçons', () => {
  it('accepte une leçon valide', () => {
    const result = createLessonSchema.safeParse({
      title: 'Installation',
      content: 'Installer Node.js.',
      order: 1,
    })

    expect(result.success).toBe(true)
  })

  it('refuse une leçon sans titre', () => {
    const result = createLessonSchema.safeParse({
      content: 'Installer Node.js.',
    })

    expect(result.success).toBe(false)
  })

  it('refuse une leçon sans contenu', () => {
    const result = createLessonSchema.safeParse({ title: 'Installation' })

    expect(result.success).toBe(false)
  })

  it('refuse un ordre négatif', () => {
    const result = createLessonSchema.safeParse({
      title: 'Installation',
      content: 'Installer Node.js.',
      order: -1,
    })

    expect(result.success).toBe(false)
  })

  it('refuse un moduleId qui n’est pas un UUID', () => {
    const result = moduleIdParamsSchema.safeParse({ moduleId: 'module-1' })

    expect(result.success).toBe(false)
  })
})
