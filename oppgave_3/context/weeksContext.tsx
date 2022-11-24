import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import { Week } from '../types/model'
import * as api from '../features/week/week.api'

type Context = {
  data: Week[] | null
  error: string | null
  setStart: Dispatch<SetStateAction<number | undefined>>
  setEnd: Dispatch<SetStateAction<number | undefined>>
}

export const WeeksContext = createContext<Context | null>(null)

export const WeeksProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Week[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [start, setStart] = useState<number>()
  const [end, setEnd] = useState<number>()

  useEffect(() => {
    api.read(start, end).then(
      ({ error, data }) => {
        if (error) setError(error)
        if (data) setData(data)
      }
    )
  }, [start, end])

  return (
    <WeeksContext.Provider value={{ data, error, setStart, setEnd }}>
      {children}
    </WeeksContext.Provider>
  )
}
