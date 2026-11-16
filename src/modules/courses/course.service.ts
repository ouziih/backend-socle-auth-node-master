import { ForbiddenError, NotFoundError } from '../../shared/errors.js'
import {
  CourseRepository,
  type ICourseRepository,
} from './course.repository.js'

type CourseInput = {
  title: string
  description?: string | null
}

type CourseUpdate = {
  title?: string
  description?: string | null
}

export class CourseService {
  constructor(
    private readonly courses: ICourseRepository = new CourseRepository(),
  ) {}

  async list() {
    const courses = await this.courses.listPublished()
    return courses.map((course) => course.toCourseJSON())
  }

  async show(id: string) {
    const course = await this.courses.findById(id)
    if (!course || course.status !== 'PUBLISHED') {
      throw new NotFoundError('Cours introuvable.')
    }
    return course.toCourseJSON()
  }

  async create(teacherId: string, input: CourseInput) {
    const course = await this.courses.create({
      teacherId,
      title: input.title,
      description: input.description ?? null,
    })
    return course.toCourseJSON()
  }

  async update(userId: string, isAdmin: boolean, id: string, input: CourseUpdate) {
    const course = await this.peuxEditer(userId, isAdmin, id)
    return (await this.courses.update(course, input)).toCourseJSON()
  }

  async remove(userId: string, isAdmin: boolean, id: string) {
    const course = await this.peuxEditer(userId, isAdmin, id)
    if (course.status !== 'DRAFT') {
      throw new ForbiddenError('Seul un brouillon peut être archivé.')
    }
    await this.courses.updateStatus(course, 'ARCHIVED')
    return { message: 'Cours archivé.' }
  }

  async publish(userId: string, isAdmin: boolean, id: string) {
    const course = await this.peuxEditer(userId, isAdmin, id)
    return (await this.courses.updateStatus(course, 'PUBLISHED')).toCourseJSON()
  }

  private async peuxEditer(userId: string, isAdmin: boolean, id: string) {
    const course = await this.courses.findById(id)
    if (!course) throw new NotFoundError('Cours introuvable.')
    if (!isAdmin && course.teacherId !== userId) {
      throw new ForbiddenError('Vous ne pouvez modifier que vos propres cours.')
    }
    return course
  }
}
