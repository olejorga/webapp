import { NextApiRequest, NextApiResponse } from 'next'
import { Week } from '../../../types/model'
import { Result } from '../../../types/result'
import * as controller from '../../../features/week/week.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Week[] | any>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controller.read(req, res)

    default:
      return res.status(405).json({ status: 405, error: 'Method not allowed.' })
  }
}
