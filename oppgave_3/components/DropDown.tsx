import { type } from 'os'
import { useEffect, useState } from 'react'
import { useWeeks } from '../hooks/useWeeks'
import { Week } from '../types/model'
import Error from './Error'
import Loader from './Loader'

type YearProps = {
  weeks: Week[]
}

export default function DropDown() {
  const { weeks, setStart, setEnd, error } = useWeeks()
  const [en, setEn] = useState<number>(0)
  const [to, setTo] = useState<number>(0)

  const startWeekChange = (event: any) => {
    setEn(event.target.value)
  }

  const endWeekChange = (event: any) => {
    setTo(event.target.value)
  }

  const showWeekPeriod = () => {
    if (en > to) return
    setStart(en)
    setEnd(to)
  }

  const resetWeekPeriod = () => {
    setStart(undefined)
    setEnd(undefined)
  }

  return (
    <>
      {error && <Error message={error} />}
      {!error && !weeks && <Loader />}
      {weeks && (
        <>
          <label htmlFor="startWeek">Select period from week: </label>
          <select name="startWeek" id="startWeek" onChange={startWeekChange}>
            {weeks.map((week) => (
              <option key={week.id} value={week.number}>
                {week.number}
              </option>
            ))}
          </select>

          <label htmlFor="endWeek">to week: </label>
          <select name="endWeek" id="endWeek" onChange={endWeekChange}>
            {weeks.map((week) => (
              <option key={week.id} value={week.number}>
                {week.number}
              </option>
            ))}
          </select>
          <span>
            <button onClick={showWeekPeriod}>See period</button>
          </span>
          <span>
            <button onClick={resetWeekPeriod}>Reset</button>
          </span>
        </>
      )}
    </>
  )
}
