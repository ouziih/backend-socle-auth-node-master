import { ForbiddenError, NotFoundError } from '../../../shared/errors.js'
import { CourseRepository, type ICourseRepository } from '../course.repository.js'
import { ModuleRepository, type IModuleRepository } from '../module/module.repository.js'
import { LessonRepository, type ILessonRepository } from './lesson.repository.js'

type LessonInput = {
  title: string
  content: string
  order?: number
}

export class LessonService {
  constructor(
    private readonly lessons: ILessonRepository = new LessonRepository(),
    private readonly courses: ICourseRepository = new CourseRepository(),
    private readonly modules: IModuleRepository = new ModuleRepository(),
  ) {}

  async create(userId: string, isAdmin: boolean, moduleId: string, input: LessonInput) {
    const module = await this.modules.findById(moduleId)
    if (!module) throw new NotFoundError('Module introuvable.')

    const course = await this.courses.findById(module.courseId)
    if (!course) throw new NotFoundError('Cours introuvable.')
    if (!isAdmin && course.teacherId !== userId) {
      throw new ForbiddenError('Vous ne pouvez modifier que vos propres cours.')
    }

    const lesson = await this.lessons.create({
      moduleId,
      title: input.title,
      content: input.content,
      order: input.order ?? 0,
    })
    return lesson.toLessonJSON()
  }
}
