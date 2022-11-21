import type { NextApiRequest, NextApiResponse } from 'next'
import { controllers } from '../../../dependencies'

export default async function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      return await controllers.employee.findEmployeeById(req, res)
    case 'PUT':
      return await controllers.employee.updateEmployee(req, res)
    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
