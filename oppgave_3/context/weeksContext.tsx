import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Week } from '../types/model'
import * as api from '../features/week/week.api'

type Context = {
  weeks: Week[] | null
  error: string | null
  setStart: Dispatch<SetStateAction<number | undefined>>
  setEnd: Dispatch<SetStateAction<number | undefined>>
}

export const WeeksContext = createContext<Context | null>(null)

export const WeeksProvider = ({ children }: PropsWithChildren) => {
  const [weeks, setWeeks] = useState<Week[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [start, setStart] = useState<number>()
  const [end, setEnd] = useState<number>()

  useEffect(() => {
    api.read(start, end).then(({ error, data }) => {
      if (error) setError(error)
      if (data) setWeeks(data)
    })
  }, [start, end])

  return (
    <WeeksContext.Provider value={{ weeks, error, setStart, setEnd }}>
      {children}
    </WeeksContext.Provider>
  )
}
