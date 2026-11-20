import { ForbiddenError, NotFoundError } from '../../../shared/errors.js';
import { CourseRepository, ICourseRepository } from '../course.repository.js';
import { ModuleRepository, type IModuleRepository } from './module.repository.js'

type ModuleInput = {
  title: string
  order?: number
}

export class ModuleService {
  constructor(
    private readonly modules: IModuleRepository = new ModuleRepository(),
    private readonly courses: ICourseRepository = new CourseRepository(),
  ) {}

  async create(userId: string, isAdmin: boolean, courseId: string, input: ModuleInput) {
    const course = await this.courses.findById(courseId)
    if (!course) throw new NotFoundError('Cours introuvable.')
    if (!isAdmin && course.teacherId !== userId) {
      throw new ForbiddenError('Vous ne pouvez modifier que vos propres cours.')
    }

    const module = await this.modules.create({
      courseId,
      title: input.title,
      order: input.order ?? 0,
    })
    return module.toModuleJSON()
  }
}
