import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Employee } from '../types/model'
import * as api from '../features/employee/employee.api'

type Context = {
  employees: Employee[] | null
  error: string | null
  setName: Dispatch<SetStateAction<string | undefined>>
}

export const EmployeeContext = createContext<Context | null>(null)

export const EmployeeProvider = ({ children }: PropsWithChildren) => {
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>()

  useEffect(() => {
    setEmployees(null)

    api.read(name).then(({ error, data }) => {
      if (error) setError(error)
      if (data) setEmployees(data)
    })
  }, [name])

  return (
    <EmployeeContext.Provider value={{ employees, error, setName }}>
      {children}
    </EmployeeContext.Provider>
  )
}
