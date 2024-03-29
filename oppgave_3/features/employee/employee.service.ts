import { EditedEmployee, NewEmployee } from '../../types/dtos'
import { Employee } from '../../types/model'
import { Result } from '../../types/result'
import * as repo from './employee.repository'

export const create = async (
  employee: NewEmployee,
  id?: string
): Promise<Result<Employee>> => {
  if (!employee.name) {
    return {
      status: 400,
      error: '"name" missing. Must be nonempty string.',
    }
  }

  if (!employee.rules) {
    return {
      status: 400,
      error: '"rules" missing. Must be nonempty string.',
    }
  }

  return await repo.create(employee, id)
}

export const read = async (name?: string): Promise<Result<Employee[]>> => {
  return await repo.read(name)
}

export const update = async (
  employee: EditedEmployee
): Promise<Result<Employee>> => {
  if (!employee.name) {
    return {
      status: 400,
      error: '"name" missing. Must be nonempty string.',
    }
  }

  return await repo.update(employee)
}

export const find = async (id: string): Promise<Result<Employee>> => {
  return await repo.find(id)
}

export const clear = async (): Promise<Result> => {
  return await repo.clear()
}
