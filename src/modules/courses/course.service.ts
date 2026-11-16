import { ForbiddenError, NotFoundError } from '../../shared/errors.js'
import { CourseRepository, type ICourseRepository } from './course.repository.js'
import type { Course } from './course.model.js'

type CourseInput = {
  title: string
  description?: string | null
}

type CourseUpdate = {
  title?: string
  description?: string | null
}

function toCourseJSON(course: Course) {
  return {
    id: course.id,
    teacher_id: course.teacherId,
    title: course.title,
    description: course.description,
    status: course.status,
    created_at: course.createdAt,
    updated_at: course.updatedAt,
  }
}

export class CourseService {
  constructor(
    private readonly courses: ICourseRepository = new CourseRepository(),
  ) {}

  async list() {
    const courses = await this.courses.listPublished()
    return courses.map(toCourseJSON)
  }

  async show(id: string) {
    const course = await this.courses.findById(id)
    if (!course || course.status !== 'PUBLISHED') {
      throw new NotFoundError('Cours introuvable.')
    }
    return toCourseJSON(course)
  }

  async create(teacherId: string, input: CourseInput) {
    const course = await this.courses.create({
      teacherId,
      title: input.title,
      description: input.description ?? null,
    })
    return toCourseJSON(course)
  }

  async update(userId: string, isAdmin: boolean, id: string, input: CourseUpdate) {
    const course = await this.requireEditable(userId, isAdmin, id)
    return toCourseJSON(await this.courses.update(course, input))
  }

  async remove(userId: string, isAdmin: boolean, id: string) {
    const course = await this.requireEditable(userId, isAdmin, id)
    if (course.status !== 'DRAFT') {
      throw new ForbiddenError('Seul un brouillon peut être archivé.')
    }
    await this.courses.updateStatus(course, 'ARCHIVED')
    return { message: 'Cours archivé.' }
  }

  async publish(userId: string, isAdmin: boolean, id: string) {
    const course = await this.requireEditable(userId, isAdmin, id)
    return toCourseJSON(await this.courses.updateStatus(course, 'PUBLISHED'))
  }

  private async requireEditable(userId: string, isAdmin: boolean, id: string) {
    const course = await this.courses.findById(id)
    if (!course) throw new NotFoundError('Cours introuvable.')
    if (!isAdmin && course.teacherId !== userId) {
      throw new ForbiddenError('Vous ne pouvez modifier que vos propres cours.')
    }
    return course
  }
}
