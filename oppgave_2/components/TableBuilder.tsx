import useFilter from '../hooks/useFilter'
import { Student } from '../types'
import StudentTable from './StudentTable'

const classes = [
  { id: 1, subject: 'informasjonssystemer' },
  { id: 2, subject: 'Informatikk' },
  { id: 3, subject: 'Digitale medier og design' },
]

type TableBuilderProps = {
  students: Student[] | undefined
  filterMethod: string
}

const TableBuilder = ({ students, filterMethod }: TableBuilderProps) => {
  console.log(students)
  const { sortStudents, generateFilter} = useFilter()


  if (students == undefined) return null
  const sortedList = sortStudents(students)
  let currentFilter = generateFilter(filterMethod, sortedList)


  return (
    <>
      {currentFilter.map((value, index) => (
        <div key={index}>
          <h1 hidden={index == 0}>Gruppering etter {currentFilter[0]}: {value}</h1>
          <ul className="studentTable">
            <StudentTable students={students} filterMethod={value} />
          </ul>
        </div>
      ))}
    </>
  )
}

export default TableBuilder
