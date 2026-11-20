import { where } from 'sequelize';
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
  listPublished(limit:number,offset:number): Promise<{ rows: Course[]; count: number }>
  findById(id: string): Promise<Course | null>
  create(data: CreateCourseRecord): Promise<Course>
  update(course: Course, data: UpdateCourseRecord): Promise<Course>
  updateStatus(course: Course, status: CourseStatus): Promise<Course>
  delete(course: Course): Promise<void>
}

export class CourseRepository implements ICourseRepository {
  listPublished(limit:number,offset:number): Promise<{ rows: Course[]; count: number }> {
    return Course.findAndCountAll({
      where:{status: "PUBLISHED"}
    ,
      limit: limit,
      offset: offset
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

  async delete(course: Course): Promise<void> {
    await course.destroy()
  }
}
