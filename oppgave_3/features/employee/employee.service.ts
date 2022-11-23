import { EditedEmployee, NewEmployee } from '../../types/dtos'
import { Employee } from '../../types/model'
import { Result } from '../../types/result'
import * as repo from './employee.repository'

export const create = async (
  employee: NewEmployee,
  id?: string
): Promise<Result<Employee>> => {
  return await repo.create(employee, id)
}

export const read = async (): Promise<Result<Employee[]>> => {
  return await repo.read()
}

export const update = async (
  employee: EditedEmployee
): Promise<Result<Employee>> => {
  return await repo.update(employee)
}

export const find = async (id: string): Promise<Result<Employee>> => {
  return await repo.find(id)
}

export const search = async (name: string): Promise<Result<Employee[]>> => {
  return await repo.search(name)
}
