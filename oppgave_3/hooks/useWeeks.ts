import { useContext } from 'react'
import { WeeksContext } from '../context/weeksContext'

export const useWeeks = () => {
  const ctx = useContext(WeeksContext)

  if (!ctx) throw new Error('Missing <WeeksProvider />.')

  return {
    weeks: ctx.weeks,
    error: ctx.error,
    start: ctx.start,
    end: ctx.end,
    setStart: ctx.setStart,
    setEnd: ctx.setEnd,
  }
}
