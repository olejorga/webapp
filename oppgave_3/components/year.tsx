import Link from 'next/link'
import { type } from 'os'
import { useState } from 'react'
import { Day, Week } from '../types/model'
import DropDown from './DropDown'

// const weekTest = Array.from({ length: 52 }, (_, i) => i + 1)

type YearProps = {
  weeks: Week[]
}

export default function Year({ weeks }: YearProps) {
  console.log(weeks)
  const [active, setActive] = useState(true)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState<number>(Number)
  const [buttonIndex, setbuttonIndex] = useState<number>(Number)
  const [chosenWeek, setchosenWeek] = useState()

  function handleClick(week: Week) {}

  console.log('START: ' + start)
  console.log('END: ' + end)
  return (
    <>
      <h2 className="yearTitle">Uker</h2>
      <DropDown weeks={weeks} />
      <ul className="year">
        {weeks.map((week) => (
          <Link key={week.id} href={`weeks/${week.number}`}>
            <button
              className="week"
              style={{
                backgroundColor:
                  active && week.number > start ? 'black' : 'grey',
              }}
            >
              {week.number}
            </button>
          </Link>
        ))}
      </ul>
    </>
  )
}

// const days: Day[] = [
//   { id: '1', name: 'mandag', employeeId: 'Trude', weekId: '1' },
//   { id: '2', name: 'tirsdag', employeeId: 'Sebastian', weekId: '1' },
//   { id: '3', name: 'onsdag', employeeId: 'Lars', weekId: '1' },
//   { id: '4', name: 'torsdag', employeeId: 'Simen', weekId: '1' },
//   { id: '5', name: 'fredag', employeeId: 'Kaare', weekId: '1' },
// ]

// const weeks: Week[] = [
//   {
//     id: '1',
//     number: 1,
//     days: days,
//   },
//   {
//     id: '2',
//     number: 2,
//     days: days,
//   },
//   {
//     id: '3',
//     number: 3,
//     days: days,
//   },
//   {
//     id: '4',
//     number: 4,
//     days: days,
//   },
// ]
