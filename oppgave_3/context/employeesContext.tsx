import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from 'react'
import api from '../lib/api'
import { Employee } from '../types/model'

type Context = {
  data: Employee[] | null
  error: string | null
  setName: Dispatch<SetStateAction<string | null>>
}

export const EmployeeContext = createContext<Context | null>(null)

export const EmployeeProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Employee[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    let url = '/employees'

    if (name) {
      url += `?name=${name}`
    }

    api<Employee[]>(url).get().then(
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
