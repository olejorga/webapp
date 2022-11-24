import { useContext } from 'react'
import { EmployeeContext } from '../context/employeeContext'
import api from '../lib/api'
import { EditedEmployee } from '../types/dtos'
import { Employee } from '../types/model'

export const useEmployeeContext = <Data>() => {
  const ctx = useContext(EmployeeContext)
  const data = ctx?.data as Data | null | undefined

  if (!ctx) throw new Error('Missing <EmployeeProvider />.')

  const create = (employee: Employee) => {
    api<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ error }) => {
      if (error) ctx?.setError(error)
      else {
        ctx?.setError(null)
        ctx?.refresh()
      }
    })
  }

  const update = (employee: EditedEmployee) => {
    const { id } = employee

    api<Employee>('/employees/' + id, {
      method: 'PUT',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ error }) => {
      if (error) ctx?.setError(error)
      else {
        ctx?.setError(null)
        ctx?.refresh()
      }
    })
  }

  return { data, error: ctx?.error, create, update }
}
