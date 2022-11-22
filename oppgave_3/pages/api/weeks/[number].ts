import { Week } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import * as controller from '../../../features/week/week.controller'
import { Result } from '../../../types/result'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Week>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controller.find(req, res)

    default:
      return res.status(405).json({ status: 405, error: 'Method not allowed.' })
  }
}
