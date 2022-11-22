import { NextApiRequest, NextApiResponse } from 'next'
import { Alteration } from '../../types/model'
import { Result } from '../../types/result'
import * as service from './alteration.repository'

export const create = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Alteration>>
) => {
  const result = await service.create(req.body)
  return res.status(result.status).json(result)
}

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Alteration[]>>
) => {
  const result = await service.read()
  return res.status(result.status).json(result)
}
