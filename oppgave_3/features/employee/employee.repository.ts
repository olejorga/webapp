import prisma from '../../lib/db'
import { Employee, ResultAsync } from '../../types'
import { NotFoundError } from '@prisma/client/runtime'

export default class EmployeeRepository {
  async create(employee: Employee): ResultAsync<Employee> {
    try {
      const e = await prisma.employee.create({ data: employee as any })
      console.log({ status: 201, data: e })
      return { status: 201, data: e }
    } catch {
      return { status: 500, message: 'Could not create employee' }
    }
  }

  async read(): ResultAsync<Employee[]> {
    try {
      const employees = await prisma.employee.findMany()
      console.log(employees)
      return { status: 200, data: employees }
    } catch (ex) {
      if (ex instanceof NotFoundError) {
        console.log(ex)
        return { status: 404, message: ex.message }
      } else {
        return { status: 500, message: 'Server error' }
      }
    }
  }

  async update(employee: Employee): ResultAsync<Employee> {
    try {
      const updatedEmployee = await prisma.employee.update({
        where: {
          id: employee.id,
        },
        data: employee as any,
      })
      return { status: 200, data: updatedEmployee }
    } catch {
      return { status: 500, message: 'Server error' }
    }
  }

  async find(id: string): ResultAsync<Employee> {
    try {
      const employee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      })
      if (employee == null)
        return { status: 404, message: 'Employee not found' }
      return { status: 200, data: employee }
    } catch {
      return { status: 500, message: 'Server error' }
    }
  }
}
