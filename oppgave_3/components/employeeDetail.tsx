import { useEffect, useState } from 'react'
import { Employee } from '../types/model'

type EmployeeProps = {
  employee: Employee
  toggleHidden: boolean
}

export default function EmployeeDetail({
  employee,
  toggleHidden,
}: EmployeeProps) {
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
    <>
      <div className="weekDetailBox employeeDetail">
        <h2 className="weekDetailTitle">{employee.name}</h2>
        {toggleHidden ? (
          <div>
            <ul hidden={hidden}>
              {employee.days?.map((day) => (
                <li key={day.id} className="listItem">
                  <span>{day.name}</span>
                  <span>Uke: {day.week?.number}</span>
                </li>
              ))}
            </ul>
            <p className="weekDetailToggle" onClick={handleClick}>
              {buttonText}
            </p>
          </div>
        ) : (
          <ul>
            {employee.days?.map((day) => (
              <li key={day.id} className="listItem">
                <span>{day.name}</span>
                <span>Uke: {day.week?.number}</span>
              </li>
            ))}
          </ul>
        )}
        {/* <ul hidden={hidden}>
          {employee.days?.map((day) => (
            <li key={day.id} className="listItem">
              <span>{day.name}</span>
              <span>Uke: {day.week?.number}</span>
            </li>
          ))}
        </ul> */}
        {/* <p className="weekDetailToggle" onClick={handleClick}>
          {buttonText}
        </p> */}
      </div>
    </>
  )
}
