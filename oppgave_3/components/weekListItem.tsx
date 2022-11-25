import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Week } from '../types/model'

type WeekProps = {
  week: Week
}

export default function WeekListItem({ week }: WeekProps) {
  const router = useRouter()
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
      <h2 className="weekDetailTitle">Uke {week.number}</h2>
      <ul hidden={hidden}>
        {week.days?.map((d) => (
          <li key={d.id} className="listItem">
            <span>{d.name}</span>
            {d.employee != null ? (
              <Link href={`employees/${d.employee?.id}`}>
                <span className="employeeDetailLink">{d.employee?.name}</span>
              </Link>
            ) : (
              <span>Ferie</span>
            )}
          </li>
        ))}
      </ul>
      <p className="weekDetailToggle" onClick={handleClick}>
        {buttonText}
      </p>
    </div>
  )
}
