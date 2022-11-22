import { NextApiRequest, NextApiResponse } from 'next'
import { Employee } from '../../types/model'
import { Result } from '../../types/result'
import * as service from './employee.service'

export const create = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee>>
) => {
  const result = await service.create(req.body)
  return res.status(result.status).json(result)
}

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee[]>>
) => {
  const { name } = req.query

  if (name) {
    const result = await service.search(name as string)
    return res.status(result.status).json(result)
  }

  const result = await service.read()
  return res.status(result.status).json(result)
}

export const update = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee>>
) => {
  const result = await service.update(req.body)
  return res.status(result.status).json(result)
}

export const find = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee>>
) => {
  const { id } = req.query

  if (id) {
    const result = await service.find(req.query.id as string)
    return res.status(result.status).json(result)
  } else {
    return res.status(400).json({ status: 400, error: 'Missing id.' })
  }
}
