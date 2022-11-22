import { NextApiRequest, NextApiResponse } from 'next'
import { controllers } from '../../../dependencies'
import { Alteration } from '../../../types/model'
import { Result } from '../../../types/result'

export default async function alterationHandler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Alteration | Alteration[]>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return controllers.alteration.getAlterations(req, res)

    case 'POST':
      return controllers.alteration.createAlteration(req, res)

    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
