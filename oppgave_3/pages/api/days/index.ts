import { NextApiRequest, NextApiResponse } from 'next'
import { Day } from '../../../types/model'
import { Result } from '../../../types/result'

export default async function daysHandler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Day[]>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return res.status(200)
    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
