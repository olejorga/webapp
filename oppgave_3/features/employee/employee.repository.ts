import { Employee } from '@prisma/client'
import { Result, ResultAsync } from '../../types'

export default class EmployeeRepository {
  async create(employee: Employee): ResultAsync<Employee> {
    throw new Error()
  }

  async read(): ResultAsync<Employee[]> {
    throw new Error()
  }

  async update(employee: Employee): ResultAsync<Employee> {
    throw new Error()
  }

  async find(id: string): ResultAsync<Employee> {
    throw new Error()
  }
}
