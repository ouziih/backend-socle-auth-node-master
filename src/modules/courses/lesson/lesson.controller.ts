import type { Request, Response } from 'express'
import { sendSuccess } from '../../../shared/api-response.js'
import { isAdmin } from '../../../utils/utils.js'
import { LessonService } from './lesson.service.js'

const service = new LessonService()

export const LessonController = {
  async create(request: Request, response: Response) {
    const { moduleId } = request.validated?.params as { moduleId: string }
    const input = request.validated?.body as {
      title: string
      content: string
      order?: number
    }
    return sendSuccess(
      response,
      await service.create(request.auth!.userId, isAdmin(request), moduleId, input),
      201,
    )
  },
}
