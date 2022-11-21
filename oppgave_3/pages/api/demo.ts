import { NextApiRequest, NextApiResponse } from 'next'
import { controllers } from '../../dependencies'
import { Result } from '../../types/result'

export default async function demoHandler(
  req: NextApiRequest,
  res: NextApiResponse<Result<null>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controllers.demo.seedExampleData(req, res)
    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
