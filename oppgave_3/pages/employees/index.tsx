import EmployeeList from '../../components/EmployeeList'
import EmployeeSearch from '../../components/EmployeeSearch'
import { EmployeeProvider } from '../../context/employeesContext'

export default function EmployeesPage() {
  return (
    <EmployeeProvider>
      <h1 className="mb-4 text-2xl font-bold">Ansattliste</h1>
      <EmployeeSearch />
      <hr className="mb-8 mt-2" />
      <EmployeeList />
    </EmployeeProvider>
  )
}
