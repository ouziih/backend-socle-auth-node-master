import type { Request, Response } from 'express'
import { sendSuccess } from '../../shared/api-response.js'
import { EnrollmentService } from './enrollment.service.js'

const service = new EnrollmentService()

export const EnrollmentController = {
  async selfEnroll(request: Request, response: Response) {
    const { courseId } = request.validated?.params as { courseId: string }
    return sendSuccess(
      response,
      await service.selfEnroll(request.auth!.userId, courseId),
      201,
    )
  },

  async listCourse(request: Request, response: Response) {
    const { courseId } = request.validated?.params as { courseId: string }
    return sendSuccess(response, await service.listCourse(request.auth!.userId, courseId))
  },

  async enrollLearner(request: Request, response: Response) {
    const { courseId } = request.validated?.params as { courseId: string }
    const { userId } = request.validated?.body as { userId: string }
    return sendSuccess(
      response,
      await service.enrollLearner(request.auth!.userId, courseId, userId),
      201,
    )
  },

  async listMine(request: Request, response: Response) {
    return sendSuccess(response, await service.listMine(request.auth!.userId))
  },

  async updateProgress(request: Request, response: Response) {
    const { enrollmentId, lessonId } = request.validated?.params as {
      enrollmentId: string
      lessonId: string
    }
    const { isCompleted } = request.validated?.body as { isCompleted: boolean }
    return sendSuccess(
      response,
      await service.updateProgress(
        request.auth!.userId,
        enrollmentId,
        lessonId,
        isCompleted,
      ),
    )
  },
}
