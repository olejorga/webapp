import useFilter from '../hooks/useFilter'
import { Category, Student } from '../types'
import StudentTable from './StudentTable'

type TableBuilderProps = {
  students: Student[] | undefined
  filterMethod: string
  category: Category[] | undefined
}

const TableBuilder = ({
  students,
  filterMethod,
  category,
}: TableBuilderProps) => {
  const { getTitle } = useFilter()

  if (students == undefined) return null

  let title = getTitle(filterMethod)

  if (category == undefined) {
    return (
      <ul className="studentTable">
        <StudentTable students={students} filterMethod={''} />
      </ul>
    )
  }
  return (
    <>
      {category.map(({ count, value }, index) => (
        <div key={index}>
          <h3>
            Gruppering etter {title}: {value}
          </h3>
          <ul className="studentTable">
            <StudentTable students={students} filterMethod={value} />
          </ul>
          <h3 className="count">Antall: {count._all}</h3>
        </div>
      ))}
    </>
  )
}

export default TableBuilder
