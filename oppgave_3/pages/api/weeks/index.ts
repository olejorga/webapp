import { Week } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { controllers } from '../../../dependencies'
import { Result } from '../../../types/result'

export default async function weekHandler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Week[]>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return
    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
