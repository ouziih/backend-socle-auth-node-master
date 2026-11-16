import { Router } from 'express'
import {
  authenticate,
  authorize,
  requireVerifiedEmail,
} from '../../middlewares/authenticate.js'
import { validateBody, validateParams } from '../../middlewares/validate.js'
import { asyncHandler } from '../../shared/async-handler.js'
import { CourseController } from './course.controller.js'
import {
  courseIdParamsSchema,
  createCourseSchema,
  updateCourseSchema,
} from './course.schema.js'

export const courseRouter = Router()

courseRouter.get('/', asyncHandler(CourseController.index))
courseRouter.get(
  '/:id',
  validateParams(courseIdParamsSchema),
  asyncHandler(CourseController.show),
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
