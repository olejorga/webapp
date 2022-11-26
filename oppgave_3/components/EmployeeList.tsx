import { useEmployees } from '../hooks/useEmployees'
import EmployeeDetail from './EmployeeDetail'
import Warning from './Warning'

export default function EmployeeList() {
  const { employees } = useEmployees()

  if (employees && employees.length == 0) {
    return <Warning message="Ingen ansatte? 🤔" />
  }

  return (
    <section className="flex flex-col gap-8">
      {employees?.map((employee) => (
        <EmployeeDetail key={employee.id} employee={employee} />
      ))}
    </section>
  )
}
