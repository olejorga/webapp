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
  const [startWeek, setStartWeek] = useState<number>(0)
  const [endWeek, setEndWeek] = useState<number>(0)
  const [hidden, setHidden] = useState(false)

  const startWeekChange = (event: any) => {
    setStartWeek(event.target.value)
  }

  const endWeekChange = (event: any) => {
    setEndWeek(event.target.value)
  }

  const showWeekPeriod = () => {
    if (!(startWeek > endWeek)) {
      setStart(startWeek)
      setEnd(endWeek)
    } else return
  }

  const resetWeekPeriod = () => {
    setStartWeek(0)
    setEndWeek(0)
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
          <select
            value={startWeek}
            name="startWeek"
            id="startWeek"
            onChange={startWeekChange}
          >
            {weeks.map((week) => (
              <option key={week.id} value={week.number}>
                {week.number}
              </option>
            ))}
          </select>

          <label htmlFor="endWeek">to week: </label>
          <select
            value={endWeek}
            name="endWeek"
            id="endWeek"
            onChange={endWeekChange}
          >
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
