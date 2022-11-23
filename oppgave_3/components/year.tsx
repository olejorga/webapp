import { type } from 'os'
import { useState } from 'react'
import { Day, Week } from '../types/model'

// const weekTest = Array.from({ length: 52 }, (_, i) => i + 1)

type YearProps = {
  weeks: Week[]
}

export default function Year({ weeks }: YearProps) {
  console.log(weeks)
  const [active, setActive] = useState(true)
  const [buttonIndex, setbuttonIndex] = useState(Number)
  const [chosenWeek, setchosenWeek] = useState()

  function handleClick(week: Week) {
    setActive(!active)
    setbuttonIndex(week.number)
  }
  return (
    <>
      <h2 className="yearTitle">Uker</h2>
      <ul className="year">
        {weeks.map((week) => (
          <button
            key={week.id}
            onClick={() => handleClick(week)}
            className="week"
            style={{ backgroundColor: active ? 'black' : 'grey' }}
          >
            {week.number}
          </button>
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
