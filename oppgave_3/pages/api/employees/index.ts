import type { NextApiRequest, NextApiResponse } from 'next'
import { controllers } from '../../../dependencies'
import { Employee } from '../../../types/model'
import { Result } from '../../../types/result'

export default async function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee | Employee[]>>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return controllers.employee.getEmployees(req, res)

    case 'POST':
      return controllers.employee.createEmployee(req, res)

    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
