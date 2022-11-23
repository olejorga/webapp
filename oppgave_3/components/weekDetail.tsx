import { useEffect, useState } from 'react'
import { Day, Employee, Week } from '../types/model'

type WeekProps = {
  week: Week
}

export default function WeekDetail({ week }: WeekProps) {
  const [buttonText, setButtonText] = useState('Se dager')
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (hidden) setButtonText('Se dager')
    else setButtonText('Lukk dager')
  }, [hidden])

  const handleClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className="weekDetailBox">
      <h2 className="weekDetailTitle">Uke {week.number.toString()}</h2>
      <ul hidden={hidden}>
        {week.days?.map((d) => (
          <li key={d.id} className="daysList">
            <span>{d.name}</span>
            <span>{d.employee?.name ?? 'Ferie'}</span>
          </li>
        ))}
      </ul>
      <p className="weekDetailToggle" onClick={handleClick}>
        {buttonText}
      </p>
    </div>
  )
}
