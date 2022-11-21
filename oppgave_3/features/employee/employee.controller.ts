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
    res.json(await this.service.createEmployee(employee))
  }

  async getEmployees(
    req: NextApiRequest,
    res: NextApiResponse<Result<Employee[]>>
  ) {
    const result = await this.service.getEmployees()
    return res.status(result.status).json(result)
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
    const { id } = req.query
    const result = await this.service.findEmployeeById(id)
    return res.status(result.status).json(result)
  }
}
