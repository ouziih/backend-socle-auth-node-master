import { describe, expect, it } from 'vitest'
import { createModuleSchema } from './module.schema.js'

describe('Validation des modules', () => {
  it('accepte un module valide', () => {
    const result = createModuleSchema.safeParse({
      title: 'Introduction',
      order: 1,
    })

    expect(result.success).toBe(true)
  })

  it('refuse un module sans titre', () => {
    const result = createModuleSchema.safeParse({ order: 1 })

    expect(result.success).toBe(false)
  })

  it('refuse un ordre négatif', () => {
    const result = createModuleSchema.safeParse({
      title: 'Introduction',
      order: -1,
    })

    expect(result.success).toBe(false)
  })

  it('accepte un module sans ordre', () => {
    const result = createModuleSchema.safeParse({ title: 'Introduction' })

    expect(result.success).toBe(true)
  })
})
