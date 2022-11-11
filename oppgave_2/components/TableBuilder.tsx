import useFilter from '../hooks/useFilter'
import { Category, Student } from '../types'
import StudentTable from './StudentTable'

const classes = [
  { id: 1, subject: 'informasjonssystemer' },
  { id: 2, subject: 'Informatikk' },
  { id: 3, subject: 'Digitale medier og design' },
]

type TableBuilderProps = {
  students: Student[] | undefined
  filterMethod: string,
  category: Category[] | undefined
}

const TableBuilder = ({ students, filterMethod, category }: TableBuilderProps) => {
  const { generateFilter } = useFilter()

  if (students == undefined) return null
  if (category == undefined) return null

  // let currentFilter = generateFilter(filterMethod, students)

  console.log(category)
  return (
    <>
      {category.map(({count, name}, index) => (
        <div key={index}>
          <h1>
            Gruppering etter {category[index].name}: 1
          </h1>
          <ul className="studentTable">
            <StudentTable students={students} filterMethod={filterMethod} />
          </ul>
        </div>
      ))}
    </>
  )
}

export default TableBuilder
