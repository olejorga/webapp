import { Day, Week } from '../types/model'
import WeekDetail from './weekDetail'

type WeekListProps = {
  weeks: Week[]
}

export default function WeekList({ weeks }: WeekListProps) {
  return (
    <>
      <ul className="weekList">
        {weeks.map((week) => (
          <WeekDetail key={week.id} week={week}></WeekDetail>
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
