import { Employee } from '@prisma/client'
import { Result, ResultAsync } from '../../types'
import EmployeeRepository from './employee.repository'

export default class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async createEmployee(employee: Employee): ResultAsync<Employee> {
    return this.repository.create(employee)
  }

  async getEmployees(): ResultAsync<Employee[]> {
    return this.repository.read()
  }

  async updateEmployee(employee: Employee): ResultAsync<Employee> {
    return this.repository.update(employee)
  }

  async findEmployeeById(id: string): ResultAsync<Employee> {
    return this.repository.find(id)
  }
}
