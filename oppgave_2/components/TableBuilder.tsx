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

  var category = ""
  var currentFilter = [""]
  console.log(filterMethod)
  switch (filterMethod){ // TODO: Superduper hacky kode. Fiks!
    case "age":
        currentFilter.pop();
        students?.forEach(({ age }) => {
          if (!currentFilter.includes(age.toString())) {
              currentFilter.push(age.toString())
            }
        })
        category = "alder"
        break;
    case "group":
        currentFilter.pop();
        students?.forEach(({ group }) => {
            if (!currentFilter.includes(group.toString())) {
                currentFilter.push(group.toString())
              }
          })
        category = "klasse"
        break;
    case "gender":
        currentFilter.pop();
        students?.forEach(({ gender }) => {
            if (!currentFilter.includes(gender.toString())) {
                currentFilter.push(gender.toString())
              }
          })
          category = "kjønn"
          break;
    default:
}

  if (students == undefined) return null
  return (
    <>
      {currentFilter.map((value, index) => (
        <div key={index}>
          <h1 hidden={currentFilter[index] == ""}>Gruppering etter {category}: {value}</h1>
          <ul className="studentTable">
            <StudentTable students={students} filterMethod={value} />
          </ul>
        </div>
      ))}
    </>
  )
}

export default TableBuilder
