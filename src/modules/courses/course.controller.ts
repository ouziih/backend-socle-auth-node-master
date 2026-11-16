import type { Request, Response } from 'express'
import { sendSuccess } from '../../shared/api-response.js'
import { CourseService } from './course.service.js'

const service = new CourseService()

function isAdmin(request: Request) {
  return request.auth?.role === 'admin'
}

export const CourseController = {
  async index(_request: Request, response: Response) {
    return sendSuccess(response, await service.list())
  },

  async create(request: Request, response: Response) {
    const input = request.validated?.body as {
      title: string
      description?: string | null
    }
    return sendSuccess(response, await service.create(request.auth!.userId, input), 201)
  },

  async show(request: Request, response: Response) {
    const { id } = request.validated?.params as { id: string }
    return sendSuccess(response, await service.show(id))
  },

  async update(request: Request, response: Response) {
    const { id } = request.validated?.params as { id: string }
    const input = request.validated?.body as {
      title?: string
      description?: string | null
    }
    return sendSuccess(
      response,
      await service.update(request.auth!.userId, isAdmin(request), id, input),
    )
  },

  async remove(request: Request, response: Response) {
    const { id } = request.validated?.params as { id: string }
    return sendSuccess(
      response,
      await service.remove(request.auth!.userId, isAdmin(request), id),
    )
  },

  async publish(request: Request, response: Response) {
    const { id } = request.validated?.params as { id: string }
    return sendSuccess(
      response,
      await service.publish(request.auth!.userId, isAdmin(request), id),
    )
  },
}
