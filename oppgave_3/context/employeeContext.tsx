import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import api from '../lib/api'
import { Employee } from '../types/model'

type EmployeeContextType = {
  data: Employee[] | Employee | null
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  refresh: () => void
}

type EmployeeProviderProps = {
  id?: string
  name?: string
  children: ReactNode
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null)

export const EmployeeProvider = ({ id, name, children }: EmployeeProviderProps) => {
  const [data, setData] = useState<Employee[] | Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [changes, setChanges] = useState<number>(0)

  const refresh = () => {
    setData(null)
    setChanges(changes + 1)
  }

  useEffect(() => {
    if (id) {
      api<Employee>('/employees/' + id).then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    } else if (name) {
      api<Employee[]>('/employees?name=' + name).then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    } else {
      api<Employee[]>('/employees').then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    }
    
  }, [id, name, changes])

  return (
    <EmployeeContext.Provider value={{ data, error, setError, refresh }}>
      {children}
    </EmployeeContext.Provider>
  )
}
