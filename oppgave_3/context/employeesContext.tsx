import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Employee } from '../types/model'
import * as api from '../features/employee/employee.api'

type Context = {
  data: Employee[] | null
  error: string | null
  setName: Dispatch<SetStateAction<string | undefined>>
}

export const EmployeeContext = createContext<Context | null>(null)

export const EmployeeProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Employee[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>()

  useEffect(() => {
    api.read(name).then(
      ({ error, data }) => {
        if (error) setError(error)
        if (data) setData(data)
      }
    )
  }, [name])

  return (
    <EmployeeContext.Provider value={{ data, error, setName }}>
      {children}
    </EmployeeContext.Provider>
  )
}
