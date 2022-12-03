import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import * as controller from '../../features/demo/demo.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controller.seed(req, res)

    default:
      return res.status(405).json({ status: 405, error: 'Method not allowed.' })
  }
}
