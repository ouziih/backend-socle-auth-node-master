import { AuthAuditEvent } from '../modules/auth/auth-audit-event.model.js'
import { OneTimeToken } from '../modules/auth/one-time-token.model.js'
import { RefreshToken } from '../modules/auth/refresh-token.model.js'
import { User } from '../modules/users/user.model.js'
import { Course } from '../modules/courses/course.model.js'
import { CourseModule } from '../modules/courses/module/module.model.js'
import { Lesson } from '../modules/courses/lesson/lesson.model.js'
import { Enrollment } from '../modules/enrollments/enrollment.model.js'
import { LessonProgress } from '../modules/enrollments/lesson-progress.model.js'
import { sequelize } from './sequelize.js'

let initialized = false

export function initializeModels(): void {
  if (initialized) return

  User.initModel(sequelize)
  RefreshToken.initModel(sequelize)
  OneTimeToken.initModel(sequelize)
  AuthAuditEvent.initModel(sequelize)
  Course.initModel(sequelize)
  CourseModule.initModel(sequelize)
  Lesson.initModel(sequelize)
  Enrollment.initModel(sequelize)
  LessonProgress.initModel(sequelize)

  User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE',
  })
  RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  RefreshToken.belongsTo(RefreshToken, {
    foreignKey: 'replacedById',
    as: 'replacement',
  })

  User.hasMany(OneTimeToken, {
    foreignKey: 'userId',
    as: 'oneTimeTokens',
    onDelete: 'CASCADE',
  })
  OneTimeToken.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  User.hasMany(AuthAuditEvent, {
    foreignKey: 'userId',
    as: 'authAuditEvents',
    onDelete: 'SET NULL',
  })
  AuthAuditEvent.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  User.hasMany(Course, { foreignKey: 'teacherId', as: 'courses', onDelete: 'RESTRICT' })
  Course.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' })
  Course.hasMany(CourseModule, {
    foreignKey: 'courseId',
    as: 'modules',
    onDelete: 'CASCADE',
  })
  CourseModule.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })
  CourseModule.hasMany(Lesson, { foreignKey: 'moduleId', as: 'lessons', onDelete: 'CASCADE' })
  Lesson.belongsTo(CourseModule, { foreignKey: 'moduleId', as: 'module' })
  User.hasMany(Enrollment, { foreignKey: 'userId', as: 'enrollments', onDelete: 'CASCADE' })
  Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'enrollments', onDelete: 'CASCADE' })
  Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })
  User.hasMany(LessonProgress, { foreignKey: 'userId', as: 'lessonProgress', onDelete: 'CASCADE' })
  LessonProgress.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  Lesson.hasMany(LessonProgress, { foreignKey: 'lessonId', as: 'progress', onDelete: 'CASCADE' })
  LessonProgress.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' })

  initialized = true
}

export const Models = {
  User,
  RefreshToken,
  OneTimeToken,
  AuthAuditEvent,
  Course,
  CourseModule,
  Lesson,
  Enrollment,
  LessonProgress,
}
