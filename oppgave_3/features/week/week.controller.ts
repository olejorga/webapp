import { NextApiRequest, NextApiResponse } from 'next'
import { Week } from '../../types/model'
import { Result } from '../../types/result'
import * as service from './week.service'

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Week[]>>
) => {
  const { start, end } = req.query

  if (start && end) {
    const result = await service.search(
      parseInt(start as string),
      parseInt(end as string)
    )
    return res.status(result.status).json(result)
  }

  if (start) {
    const result = await service.search(parseInt(start as string), 52)
    return res.status(result.status).json(result)
  }

  if (end) {
    const result = await service.search(0, parseInt(end as string))
    return res.status(result.status).json(result)
  }

  const result = await service.read()
  return res.status(result.status).json(result)
}

export const find = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Week>>
) => {
  const { number } = req.query

  if (number) {
    const result = await service.find(parseInt(number as string))
    return res.status(result.status).json(result)
  } else {
    return res.status(400).json({ status: 400, error: 'Missing number.' })
  }
}
