import { CourseModule } from './module.model.js'

export interface CreateModuleRecord {
  courseId: string
  title: string
  order: number
}

export interface IModuleRepository {
  findById(id: string): Promise<CourseModule | null>
  create(data: CreateModuleRecord): Promise<CourseModule>
}

export class ModuleRepository implements IModuleRepository {
  findById(id: string): Promise<CourseModule | null> {
    return CourseModule.findByPk(id)
  }

  create(data: CreateModuleRecord): Promise<CourseModule> {
    return CourseModule.create(data)
  }
}
