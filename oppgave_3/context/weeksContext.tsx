import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import api from '../lib/api'
import { Week } from '../types/model'

type Context = {
  data: Week[] | null
  error: string | null
  setStart: Dispatch<SetStateAction<number | null>>
  setEnd: Dispatch<SetStateAction<number | null>>
}

export const WeeksContext = createContext<Context | null>(null)

export const WeeksProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Week[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [start, setStart] = useState<number | null>(null)
  const [end, setEnd] = useState<number | null>(null)

  useEffect(() => {
    let url = '/weeks'

    if (start && end) {
      url += `start?=${start}&end=${end}`
    } else if (start) {
      url += `start?=${start}`
    } else if (end) {
      url += `end=${end}`
    }

    api<Week[]>(url).get().then(
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
