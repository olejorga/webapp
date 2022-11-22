import { NextApiRequest, NextApiResponse } from 'next'
import { Alteration } from '../../../types/model'
import { Result } from '../../../types/result'
import * as controller from '../../../features/alteration/alteration.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Alteration[] | Alteration>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return controller.read(req, res)

    case 'POST':
      return controller.create(req, res)

    default:
      return res.status(405).json({ status: 405, error: 'Method not allowed.' })
  }
}
