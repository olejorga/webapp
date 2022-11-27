import { Day } from '../../../types/model'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as controller from '../../../features/day/day.controller'
import { Result } from '../../../types/result'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Day>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controller.find(req, res)

    case 'PUT':
      return await controller.update(req, res)

    default:
      return res.status(405).json({ status: 405, error: 'Method not allowed.' })
  }
}
