import type { Request, Response } from 'express'
import { sendSuccess } from '../../shared/api-response.js'
import { CourseService, PaginationCourse } from './course.service.js'
import { isAdmin } from '../../utils/utils.js';


const service = new CourseService()


export const CourseController = {
  async index(request: Request, response: Response) {
    const paginationData = request.validated?.query as PaginationCourse;
    const {courses, pagination} = await service.list(paginationData);
    return sendSuccess(response, {
        courses: courses,
        pagination:
          {
            totalPage: pagination.totalPages,
            page: paginationData.page,
            limit: pagination.limit,
            total: pagination.total,
            hasNextPage: pagination.hasNextPage,
            hasPreviewPage: pagination.hasPreviousPage
          }
      })
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

  async unpublish(request: Request, response: Response) {
    const { id } = request.validated?.params as { id: string }
    return sendSuccess(
      response,
      await service.unpublish(request.auth!.userId, isAdmin(request), id),
    )
  },
}
