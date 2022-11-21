import type { NextApiRequest, NextApiResponse } from 'next'
import EmployeeController from '../../../features/employee/employee.controller'
import EmployeeRepository from '../../../features/employee/employee.repository'
import EmployeeService from '../../../features/employee/employee.service'

export default async function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const repository = new EmployeeRepository()
  const service = new EmployeeService(repository)
  const controller = new EmployeeController(service)

  const { method } = req
  switch (method?.toUpperCase()) {
    case 'GET':
      return await controller.findEmployeeById(req, res)
    case 'PUT':
      return await controller.updateEmployee(req, res)
    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
