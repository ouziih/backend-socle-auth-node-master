import type { Request } from 'express'

export function isAdmin(request: Request) {
  return request.auth?.role === 'admin'
}

export function getPaginationMeta(
  page: number,
  limit: number,
  total: number,
) {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit)

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}
