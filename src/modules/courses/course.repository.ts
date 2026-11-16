import { Course, type CourseStatus } from './course.model.js'

export interface CreateCourseRecord {
  teacherId: string
  title: string
  description: string | null
}

export interface UpdateCourseRecord {
  title?: string
  description?: string | null
}

export interface ICourseRepository {
  listPublished(): Promise<Course[]>
  findById(id: string): Promise<Course | null>
  create(data: CreateCourseRecord): Promise<Course>
  update(course: Course, data: UpdateCourseRecord): Promise<Course>
  updateStatus(course: Course, status: CourseStatus): Promise<Course>
}

export class CourseRepository implements ICourseRepository {
  listPublished(): Promise<Course[]> {
    return Course.findAll({
      where: { status: 'PUBLISHED' },
      order: [['createdAt', 'DESC']],
    })
  }

  findById(id: string): Promise<Course | null> {
    return Course.findByPk(id)
  }

  create(data: CreateCourseRecord): Promise<Course> {
    return Course.create(data)
  }

  update(course: Course, data: UpdateCourseRecord): Promise<Course> {
    return course.update(data)
  }

  updateStatus(course: Course, status: CourseStatus): Promise<Course> {
    return course.update({ status })
  }

}
