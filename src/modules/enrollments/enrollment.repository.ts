import { Enrollment } from './enrollment.model.js'

export interface IEnrollmentRepository {
  find(userId: string, courseId: string): Promise<Enrollment | null>
  create(userId: string, courseId: string): Promise<Enrollment>
  listByCourse(courseId: string): Promise<Enrollment[]>
  listByUser(userId: string): Promise<Enrollment[]>
}

export class EnrollmentRepository implements IEnrollmentRepository {
  find(userId: string, courseId: string): Promise<Enrollment | null> {
    return Enrollment.findOne({ where: { userId, courseId } })
  }

  create(userId: string, courseId: string): Promise<Enrollment> {
    return Enrollment.create({ userId, courseId })
  }

  listByCourse(courseId: string): Promise<Enrollment[]> {
    return Enrollment.findAll({ where: { courseId }, order: [['createdAt', 'DESC']] })
  }

  listByUser(userId: string): Promise<Enrollment[]> {
    return Enrollment.findAll({ where: { userId }, order: [['createdAt', 'DESC']] })
  }
}
