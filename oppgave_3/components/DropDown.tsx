import { useEffect, useState } from 'react'
import { Week } from '../types/model'

type YearProps = {
  weeks: Week[]
}

export default function DropDown({ weeks }: YearProps) {
  const [startWeek, setStartWeek] = useState<number>(1)
  const [endWeek, setEndWeek] = useState<number>(0)
  const [weekPeriod, setWeekPeriod] = useState<Week[]>([])

  const startWeekChange = (event: any) => {
    setStartWeek(event.target.value)
    console.log('STARTWEEK ' + startWeek)
  }

  const endWeekChange = (event: any) => {
    setEndWeek(event.target.value)
    console.log('ENDWEEK ' + endWeek)
  }

  const showWeekPeriod = () => {
    setWeekPeriod(weeks.slice(startWeek, endWeek))
    console.log('STARTWEEK ' + startWeek)
    console.log('ENDWEEK ' + endWeek)
    console.log('WEEKPERIOD ' + weekPeriod)
  }

  return (
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

      <button onClick={showWeekPeriod}>See period</button>
    </>
  )
}
