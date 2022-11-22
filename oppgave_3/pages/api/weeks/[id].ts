import { NextApiRequest, NextApiResponse } from 'next'
import { controllers } from '../../../dependencies'

export default async function weekHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controllers.week.findWeekById(req, res)
    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
