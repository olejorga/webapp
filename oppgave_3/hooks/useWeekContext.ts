import { useContext } from 'react'
import { WeekContext } from '../context/weekContext'

export const useWeekContext = <Data>() => {
  const ctx = useContext(WeekContext)
  const data = ctx?.data as Data | null | undefined

  if (!ctx) throw new Error('Missing <WeekProvider />.')

  return { data, error: ctx?.error }
}
