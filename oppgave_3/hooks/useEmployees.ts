import { useContext } from 'react'
import { EmployeeContext } from '../context/employeesContext'

export const useEmployees = () => {
  const ctx = useContext(EmployeeContext)

  if (!ctx) throw new Error('Missing <EmployeeProvider />.')

  return {
    employees: ctx.employees,
    error: ctx.error,
    setName: ctx.setName,
  }
}
