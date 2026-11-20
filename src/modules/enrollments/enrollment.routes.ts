import { Router } from 'express'
import {
  authenticate,
  requireVerifiedEmail,
} from '../../middlewares/authenticate.js'
import { validateBody, validateParams } from '../../middlewares/validate.js'
import { asyncHandler } from '../../shared/async-handler.js'
import { EnrollmentController } from './enrollment.controller.js'
import {
  lessonProgressParamsSchema,
  updateProgressSchema,
} from './enrollment.schema.js'

export const enrollmentRouter = Router()
enrollmentRouter.use(authenticate, requireVerifiedEmail)
enrollmentRouter.get('/me', asyncHandler(EnrollmentController.listMine))
enrollmentRouter.put(
  '/:enrollmentId/lessons/:lessonId/progress',
  validateParams(lessonProgressParamsSchema),
  validateBody(updateProgressSchema),
  asyncHandler(EnrollmentController.updateProgress),
)
