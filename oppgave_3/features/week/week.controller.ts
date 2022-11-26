import { NextApiRequest, NextApiResponse } from 'next'
import sleep from '../../lib/sleep'
import { Week } from '../../types/model'
import { Result } from '../../types/result'
import * as service from './week.service'

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Week[]>>
) => {
  await sleep(2000)

  let { start, end } = req.query

  const result = await service.read(
    start ? parseInt(start as string) : undefined,
    end ? parseInt(end as string) : undefined
  )

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
