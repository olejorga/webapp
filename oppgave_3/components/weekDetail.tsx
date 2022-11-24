import { Week } from '../types/model'

type WeekProps = {
  week: Week
}

export default function WeekDetail({ week }: WeekProps) {
  return (
    <div className="weekDetailBox">
      <h2 className="weekDetailTitle">Uke {week.number}</h2>
      <ul>
        {week.days?.map((d) => (
          <li key={d.id} className="daysList">
            <span>{d.name}</span>
            <span>{d.employee?.name ?? 'Ferie'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
