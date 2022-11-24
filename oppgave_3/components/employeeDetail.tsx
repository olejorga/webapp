import { Employee } from '../types/model'

type EmployeeProps = {
  employee: Employee
}

export default function EmployeeDetail({ employee }: EmployeeProps) {
  return (
    <>
      <div className="weekDetailBox">
        <h2 className="weekDetailTitle">{employee.name}</h2>
        <ul>
          {employee.days?.map((day) => (
            <li key={day.id} className="listItem">
              <span>{day.name}</span>
              <span>Uke: {day.week?.number}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
