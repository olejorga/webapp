import { Student } from "../types"

type TableProps = {
  students: Student[]
}

export default function Table({ students }: TableProps) {
  return (
    <ul>
      {students.map(s => (
        <li key={s.id}>
          <span>{s.id}</span>
          <span>{s.name}</span>
          <span>{s.gender}</span>
          <span>{s.age}</span>
          <span>{s.group}</span>
        </li>
      ))}
    </ul>
  )
}