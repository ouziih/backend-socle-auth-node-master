import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Course } from './course.model.js'
import { CourseService } from './course.service.js'
import type { ICourseRepository } from './course.repository.js'

describe('CourseService', () => {
  let courses: ICourseRepository
  let service: CourseService
  let course: Course

  beforeEach(() => {
    course = Object.assign(Object.create(Course.prototype), {
      id: 'course-1',
      teacherId: 'teacher-1',
      title: 'Ancien titre',
      description: 'Ancienne description',
      status: 'DRAFT',
    }) as Course

    courses = {
      listPublished: vi.fn(),
      findById: vi.fn().mockResolvedValue(course),
      create: vi.fn(),
      update: vi.fn().mockImplementation(async (_course, input) => {
        Object.assign(course, input)
        return course
      }),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    }

    service = new CourseService(courses)
  })

  it('autorise un professeur à modifier son propre cours', async () => {
    const result = await service.update('teacher-1', false, 'course-1', {
      title: 'Nouveau titre',
    })

    expect(result).toMatchObject({
      id: 'course-1',
      teacher_id: 'teacher-1',
      title: 'Nouveau titre',
      status: 'DRAFT',
    })
    expect(courses.update).toHaveBeenCalledWith(course, {
      title: 'Nouveau titre',
    })
  })
})
