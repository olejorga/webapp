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
  const { getTitle } = useFilter()

  if (students == undefined) return null
  if (category == undefined) return null

   let title = getTitle(filterMethod)

  category.map(({count }) => console.log(count._all))
  return (
    <>
      {category.map(({count, value}, index) => (
        <div key={index}>
          <h1>
            Gruppering etter {title}: {value}
          </h1>
          <ul className="studentTable">
            <StudentTable students={students} filterMethod={value} />
          </ul>
          <h3>{count._all}</h3>
        </div>
      ))}
    </>
  )
}

export default TableBuilder
