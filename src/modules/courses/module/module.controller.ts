import type { Request, Response } from 'express'
import { sendSuccess } from '../../../shared/api-response.js'
import { ModuleService } from '../module/module.service.js'
import { isAdmin } from '../../../utils/utils.js';

const service = new ModuleService()

export const ModuleController = {
  async create(request: Request, response: Response) {
    const { id } = request.validated?.params as { id: string }
    const input = request.validated?.body as {
      title: string
      order?: number
    }
    return sendSuccess(
      response,
      await service.create(
        request.auth!.userId,
        isAdmin(request),
        id,
        input,
      ),
      201,
    )
  },
}
