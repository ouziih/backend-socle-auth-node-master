import { ConflictError, ForbiddenError, NotFoundError } from '../../shared/errors.js'
import { CourseRepository, type ICourseRepository } from '../courses/course.repository.js'
import { LessonRepository, type ILessonRepository } from '../courses/lesson/lesson.repository.js'
import { ModuleRepository, type IModuleRepository } from '../courses/module/module.repository.js'
import { UserRepository, type IUserRepository } from '../users/user.repository.js'
import {
  EnrollmentRepository,
  type IEnrollmentRepository,
} from './enrollment.repository.js'
import {
  LessonProgressRepository,
  type ILessonProgressRepository,
} from './lesson-progress.repository.js'

export class EnrollmentService {
  constructor(
    private readonly enrollments: IEnrollmentRepository = new EnrollmentRepository(),
    private readonly progress: ILessonProgressRepository = new LessonProgressRepository(),
    private readonly users: IUserRepository = new UserRepository(),
    private readonly courses: ICourseRepository = new CourseRepository(),
    private readonly lessons: ILessonRepository = new LessonRepository(),
    private readonly modules: IModuleRepository = new ModuleRepository(),
  ) {}

  async selfEnroll(userId: string, courseId: string) {
    const user = await this.users.findById(userId)
    if (!user || user.role !== 'learner') {
      throw new ForbiddenError('Seuls les apprenants peuvent s’auto-inscrire.')
    }
    return this.enroll(userId, courseId)
  }

  async enrollLearner(actorId: string, courseId: string, learnerId: string) {
    const course = await this.requireCourseTeacher(actorId, courseId)
    const learner = await this.users.findById(learnerId)
    if (!learner || learner.role !== 'learner') {
      throw new ForbiddenError('L’utilisateur doit être un apprenant.')
    }
    if (course.status !== 'PUBLISHED') {
      throw new NotFoundError('Cours introuvable.')
    }
    return this.enroll(learnerId, courseId)
  }

  async listCourse(actorId: string, courseId: string) {
    await this.requireCourseTeacher(actorId, courseId)
    return (await this.enrollments.listByCourse(courseId)).map((item) =>
      item.toEnrollmentJSON(),
    )
  }

  async listMine(userId: string) {
    return (await this.enrollments.listByUser(userId)).map((item) =>
      item.toEnrollmentJSON(),
    )
  }

  async updateProgress(
    userId: string,
    enrollmentId: string,
    lessonId: string,
    isCompleted: boolean,
  ) {
    const enrollment = await this.enrollments.listByUser(userId)
    const currentEnrollment = enrollment.find((item) => item.id === enrollmentId)
    if (!currentEnrollment) {
      throw new ForbiddenError('Cette inscription ne vous appartient pas.')
    }
    const lesson = await this.lessons.findById(lessonId)
    if (!lesson) throw new NotFoundError('Leçon introuvable.')
    const module = await this.modules.findById(lesson.moduleId)
    if (!module) throw new NotFoundError('Module introuvable.')
    const course = await this.courses.findById(module.courseId)
    if (!course) throw new NotFoundError('Cours introuvable.')
    if (currentEnrollment.courseId !== course.id) {
      throw new ForbiddenError('Cette leçon n’appartient pas à votre cours.')
    }
    const current = await this.progress.find(userId, lessonId)
    const result = current
      ? await this.progress.update(current, isCompleted)
      : await this.progress.create(userId, lessonId, isCompleted)
    return result.toProgressJSON()
  }

  private async enroll(userId: string, courseId: string) {
    const course = await this.courses.findById(courseId)
    if (!course || course.status !== 'PUBLISHED') {
      throw new NotFoundError('Cours introuvable.')
    }
    if (await this.enrollments.find(userId, courseId)) {
      throw new ConflictError('Cet apprenant est déjà inscrit à ce cours.')
    }
    return (await this.enrollments.create(userId, courseId)).toEnrollmentJSON()
  }

  private async requireCourseTeacher(actorId: string, courseId: string) {
    const actor = await this.users.findById(actorId)
    const course = await this.courses.findById(courseId)
    if (!course) throw new NotFoundError('Cours introuvable.')
    if (!actor || (actor.role !== 'admin' && course.teacherId !== actorId)) {
      throw new ForbiddenError()
    }
    return course
  }
}
