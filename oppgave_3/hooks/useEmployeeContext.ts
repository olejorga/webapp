import { useContext } from 'react'
import { EmployeeContext } from '../context/employeeContext'
import api from '../lib/api'
import { EditedEmployee } from '../types/dtos'
import { Employee } from '../types/model'

export const useEmployeeContext = <Data>() => {
  const ctx = useContext(EmployeeContext)

  const create = (employee: Employee) => {
    api<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    }).then(({ error }) => {
      if (error) ctx?.setError(error)
      else ctx?.refresh()
    })
  }

  const update = (employee: EditedEmployee) => {
    const { id } = employee

    api<Employee>('/employees' + id, {
      method: 'PUT',
      body: JSON.stringify(employee),
    }).then(({ error }) => {
      if (error) ctx?.setError(error)
      else ctx?.refresh()
    })
  }

  const data = ctx?.data as Data | null | undefined

  return { data, error: ctx?.error, create }
}
