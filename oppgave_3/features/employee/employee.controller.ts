import { Employee } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types'
import EmployeeRepository from './employee.repository'
import EmployeeService from './employee.service'

export default class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  async createEmployee(
    req: NextApiRequest,
    res: NextApiResponse<Result<Employee>>
  ) {
    const employee: Employee = req.body

    throw new Error()
  }

  async getEmployees(
    req: NextApiRequest,
    res: NextApiResponse<Result<Employee[]>>
  ) {
    throw new Error()
  }

  async updateEmployee(
    req: NextApiRequest,
    res: NextApiResponse<Result<Employee>>
  ) {
    throw new Error()
  }

  async findEmployeeById(
    req: NextApiRequest,
    res: NextApiResponse<Result<Employee>>
  ) {
    throw new Error()
  }
}
