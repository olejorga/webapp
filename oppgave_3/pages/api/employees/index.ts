import type { NextApiRequest, NextApiResponse } from 'next'
import { Employee } from '../../../types/model'
import { Result } from '../../../types/result'
import * as controller from '../../../features/employee/employee.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee[] | Employee>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controller.read(req, res)

    case 'POST':
      return await controller.create(req, res)

    default:
      return res.status(405).json({ status: 405, error: 'Method not allowed.' })
  }
}
