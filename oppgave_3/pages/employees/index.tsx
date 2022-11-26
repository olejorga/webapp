import EmployeeList from '../../components/EmployeeList'
import { EmployeeProvider } from '../../context/employeesContext'

export default function EmployeesPage() {
  return (
    <EmployeeProvider>
      <h1 className="mb-8 text-2xl font-bold">Ansattliste</h1>
      <EmployeeList />
    </EmployeeProvider>
  )
}
