import { useContext } from 'react'
import { EmployeeContext } from '../context/employeesContext'

export const useEmployees = () => {
  const ctx = useContext(EmployeeContext)

  if (!ctx) throw new Error('Missing <EmployeeProvider />.')

  return {
    data: ctx.data,
    error: ctx.error,
    setName: ctx.setName,
  }
}
