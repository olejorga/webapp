import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import { Day } from '../../types/model'
import * as service from './day.service'
import sleep from '../../lib/sleep'

export const update = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Day>>
) => {
  const result = await service.update(req.body)
  return res.status(result.status).json(result)
}

export const find = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Day>>
) => {
  await sleep(1000)

  const { id } = req.query

  if (id) {
    const result = await service.find(req.query.id as string)
    return res.status(result.status).json(result)
  } else {
    return res.status(400).json({ status: 400, error: 'Missing id.' })
  }
}
