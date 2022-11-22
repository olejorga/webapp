import { NextApiRequest, NextApiResponse } from 'next'
import { Employee } from '../../types/model'
import { Result } from '../../types/result'
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
    const result = await this.service.updateEmployee(req.body)
    return res.status(result.status).json(result)
  }

  async findEmployeeById(
    req: NextApiRequest,
    res: NextApiResponse<Result<Employee>>
  ) {
    const { id } = req.query

    if (id) {
      const result = await this.service.findEmployeeById(id as string)
      return res.status(result.status).json(result)
    } else {
      return res.status(400).json({ status: 400, message: 'Missing id.' })
    }
  }
}
