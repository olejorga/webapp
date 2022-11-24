import api from '../../lib/api'
import { EditedEmployee, NewEmployee } from '../../types/dtos'
import { Employee } from '../../types/model'

export const create = (employee: NewEmployee) => {
  return api<Employee>('/employees').post(employee)
}

export const read = () => {
  return api<Employee>('/employees').get()
}

export const update = (employee: EditedEmployee) => {
  return api<Employee>('/employees/' + employee.id).put(employee)
}

export const find = (id: string) => {
  return api<Employee>('/employees/' + id).get()
}

export const search = (name: string) => {
  return api<Employee>('/employees/name?=' + name).get()
}
