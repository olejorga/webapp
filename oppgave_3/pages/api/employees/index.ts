import { Employee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import EmployeeController from '../../../features/employee/employee.controller'
import EmployeeRepository from '../../../features/employee/employee.repository'
import EmployeeService from '../../../features/employee/employee.service'
import { Result } from '../../../types'

export default async function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Employee | Employee[]>>
) {
  const { method } = req

  const repository = new EmployeeRepository()
  const service = new EmployeeService(repository)
  const controller = new EmployeeController(service)

  switch (method?.toUpperCase()) {
    case 'GET':
      return controller.getEmployees(req, res)

    case 'POST':
      return controller.createEmployee(req, res)

    default:
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed!' })
  }
}
