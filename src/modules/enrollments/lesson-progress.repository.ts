import { LessonProgress } from './lesson-progress.model.js'

export interface ILessonProgressRepository {
  find(userId: string, lessonId: string): Promise<LessonProgress | null>
  create(userId: string, lessonId: string, isCompleted: boolean): Promise<LessonProgress>
  update(progress: LessonProgress, isCompleted: boolean): Promise<LessonProgress>
}

export class LessonProgressRepository implements ILessonProgressRepository {
  find(userId: string, lessonId: string): Promise<LessonProgress | null> {
    return LessonProgress.findOne({ where: { userId, lessonId } })
  }

  create(userId: string, lessonId: string, isCompleted: boolean): Promise<LessonProgress> {
    return LessonProgress.create({
      userId,
      lessonId,
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
    })
  }

  update(progress: LessonProgress, isCompleted: boolean): Promise<LessonProgress> {
    return progress.update({
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
    })
  }
}
