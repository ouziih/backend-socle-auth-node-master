import { Lesson } from './lesson.model.js'

export interface CreateLessonRecord {
  moduleId: string
  title: string
  content: string
  order: number
}

export interface ILessonRepository {
  findById(id: string): Promise<Lesson | null>
  create(data: CreateLessonRecord): Promise<Lesson>
}

export class LessonRepository implements ILessonRepository {
  findById(id: string): Promise<Lesson | null> {
    return Lesson.findByPk(id)
  }

  create(data: CreateLessonRecord): Promise<Lesson> {
    return Lesson.create(data)
  }
}
