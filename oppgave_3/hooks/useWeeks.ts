import { useContext } from 'react'
import { WeeksContext } from '../context/weeksContext'

export const useWeeks = () => {
  const ctx = useContext(WeeksContext)

  if (!ctx) throw new Error('Missing <WeeksProvider />.')

  return {
    weeks: ctx.weeks,
    error: ctx.error,
    setStart: ctx.setStart,
    setEnd: ctx.setEnd,
  }
}
