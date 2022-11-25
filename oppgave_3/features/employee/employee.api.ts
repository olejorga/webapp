import api from '../../lib/api'
import { EditedEmployee, NewEmployee } from '../../types/dtos'
import { Employee } from '../../types/model'

export const create = (employee: NewEmployee) => {
  return api<Employee>('/employees').post(employee)
}

export const read = (name?: string) => {
  let url = '/employees'

  if (name) {
    url += `?name=${name}`
  }

  return api<Employee[]>(url).get()
}

export const update = (employee: EditedEmployee) => {
  return api<Employee>('/employees/' + employee.id).put(employee)
}

export const find = (id: string) => {
  return api<Employee>('/employees/' + id).get()
}
