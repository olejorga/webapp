import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import api from '../lib/api'
import { Week } from '../types/model'

type WeekContextType = {
  data: Week[] | Week | null
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  refresh: () => void
}

type WeekProviderProps = {
  id?: string
  start?: number
  end?: number
  children: ReactNode
}

export const WeekContext = createContext<WeekContextType | null>(null)

export const WeekProvider = ({ id, start, end, children }: WeekProviderProps) => {
  const [data, setData] = useState<Week[] | Week | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [changes, setChanges] = useState<number>(0)

  const refresh = () => {
    setData(null)
    setChanges(changes + 1)
  }

  useEffect(() => {
    if (id) {
      api<Week>('/weeks/' + id).then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    } else if (start && end) {
      api<Week[]>(`/weeks?start=${start}&end=${end}`).then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    } else if (start) {
      api<Week[]>('/weeks?start=' + start).then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    } else if (end) {
      api<Week[]>('/weeks?end=' + end).then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    } else {
      api<Week[]>('/weeks').then(
        ({ error, data }) => {
          if (error) setError(error)
          if (data) setData(data)
        }
      )
    }
    
  }, [id, start, end, changes])

  return (
    <WeekContext.Provider value={{ data, error, setError, refresh }}>
      {children}
    </WeekContext.Provider>
  )
}
