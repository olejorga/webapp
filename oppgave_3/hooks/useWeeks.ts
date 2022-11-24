import { useContext } from 'react'
import { WeeksContext } from '../context/weeksContext'

export const useWeeks = () => {
  const ctx = useContext(WeeksContext)

  if (!ctx) throw new Error('Missing <WeeksProvider />.')

  return {
    data: ctx.data,
    error: ctx.error,
    setStart: ctx.setStart,
    setError: ctx.setEnd,
  }
}
