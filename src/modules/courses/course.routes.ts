import { Router } from 'express'
import {
  authenticate,
  authorize,
  requireVerifiedEmail,
} from '../../middlewares/authenticate.js'
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js'
import { asyncHandler } from '../../shared/async-handler.js'
import { CourseController } from './course.controller.js'
import { ModuleController } from './module/module.controller.js'
import { createModuleSchema } from './module/module.schema.js'
import { LessonController } from './lesson/lesson.controller.js'
import { createLessonSchema, moduleIdParamsSchema } from './lesson/lesson.schema.js'
import { EnrollmentController } from '../enrollments/enrollment.controller.js'
import {
  courseEnrollmentParamsSchema,
  enrollLearnerSchema,
} from '../enrollments/enrollment.schema.js'
import {
  courseIdParamsSchema,
  createCourseSchema,
  paginationCourseSchema,
  updateCourseSchema,
} from './course.schema.js'

export const courseRouter = Router()

courseRouter.get(
  '/',
  validateQuery(paginationCourseSchema), 
  asyncHandler(CourseController.index))

courseRouter.get(
  '/:id',
  validateParams(courseIdParamsSchema),
  asyncHandler(CourseController.show),
)

courseRouter.post(
  '/:courseId/enroll',
  authenticate,
  requireVerifiedEmail,
  validateParams(courseEnrollmentParamsSchema),
  asyncHandler(EnrollmentController.selfEnroll),
)

courseRouter.use(authenticate, requireVerifiedEmail, authorize('admin', 'teacher'))
courseRouter.post(
  '/',
  validateBody(createCourseSchema),
  asyncHandler(CourseController.create),
)
courseRouter.patch(
  '/:id',
  validateParams(courseIdParamsSchema),
  validateBody(updateCourseSchema),
  asyncHandler(CourseController.update),
)
courseRouter.delete(
  '/:id',
  validateParams(courseIdParamsSchema),
  asyncHandler(CourseController.remove),
)
courseRouter.post(
  '/:id/publish',
  validateParams(courseIdParamsSchema),
  asyncHandler(CourseController.publish),
)

courseRouter.post(
  '/:id/unpublish',
  validateParams(courseIdParamsSchema),
  asyncHandler(CourseController.unpublish),
)
courseRouter.post(
  '/:id/modules',
  validateParams(courseIdParamsSchema),
  validateBody(createModuleSchema),
  asyncHandler(ModuleController.create),
)
courseRouter.post(
  '/modules/:moduleId/lessons',
  validateParams(moduleIdParamsSchema),
  validateBody(createLessonSchema),
  asyncHandler(LessonController.create),
)
courseRouter.get(
  '/:courseId/enrollments',
  validateParams(courseEnrollmentParamsSchema),
  asyncHandler(EnrollmentController.listCourse),
)
courseRouter.post(
  '/:courseId/enrollments',
  validateParams(courseEnrollmentParamsSchema),
  validateBody(enrollLearnerSchema),
  asyncHandler(EnrollmentController.enrollLearner),
)
