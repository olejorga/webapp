import { Students, Student } from '../types'

type StudentTableProps = {
  students: Student[]
  filterMethod: string | undefined
}

const StudentTable = ({
  students,
  filterMethod
}: StudentTableProps) => {
  return (
    <ul>
      {students
        .filter(({age, gender, group}) => {
          if (!filterMethod) return true
          return age.toString() == filterMethod || gender == filterMethod || group == filterMethod
        })
        .map(({ id, name, gender, age, group }: Student) => (
          <li key={id}>
            <span id="id">{id}</span>
            <span id="name">{name}</span>
            <span id="gender">{gender}</span>
            <span id="age">{age}</span>
            <span id="group">{group}</span>
          </li>
        ))}
    </ul>
  )
}

export default StudentTable

// .filter((student) => {student.group == subject})
