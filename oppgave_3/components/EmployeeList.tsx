import { useEmployees } from '../hooks/useEmployees'
import EmployeeDetail from './EmployeeDetail'

export default function EmployeeList() {
  const { employees } = useEmployees()

  return (
    <section className="flex flex-col gap-8">
      {employees && employees.length > 0 ? (
        employees.map((employee) => (
          <EmployeeDetail key={employee.id} employee={employee} />
        ))
      ) : (
        <p>Ingen ansatte? 🤔</p>
      )}
    </section>
  )
}
