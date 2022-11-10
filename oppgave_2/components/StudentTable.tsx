import { Students, Student } from '../types'

type StudentTableProps = {
  students: Student[]
  filterMethod: string | undefined
}

const StudentTable = ({ students, filterMethod }: StudentTableProps) => {
  let filteredStudents: Student[] = students.filter(
    ({ age, gender, group }) => {
      if (!filterMethod) return true
      return (
        age.toString() == filterMethod ||
        gender == filterMethod ||
        group == filterMethod
      )
    }
  )

  return (
    <ul className="ul-students">
      {filteredStudents.map(({ id, name, gender, age, group }: Student) => (
        <li key={id}>
          <span id="id">{id}</span>
          <span id="name">{name}</span>
          <span id="gender">{gender}</span>
          <span id="age">{age}</span>
          <span id="group">{group}</span>
        </li>
      ))}
      <p
        className="paragraph-studentCount"
        hidden={filteredStudents.length == 0}
      >
        Antall: {filteredStudents.length}
      </p>
    </ul>
  )
}

export default StudentTable

// .filter((student) => {student.group == subject})
