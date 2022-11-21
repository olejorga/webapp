import { Employee } from '@prisma/client'
import { Result, ResultAsync } from '../../types'
import EmployeeRepository from './employee.repository'

export default class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async createEmployee(employee: Employee): ResultAsync<Employee> {
    throw new Error()
  }

  async getEmployees(): ResultAsync<Employee[]> {
    throw new Error()
  }

  async updateEmployee(employee: Employee): ResultAsync<Employee> {
    throw new Error()
  }

  async findEmployeeById(id: string): ResultAsync<Employee> {
    throw new Error()
  }
}
