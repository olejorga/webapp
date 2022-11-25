import EmployeeList from '../../components/EmployeeList'
import { EmployeeProvider } from '../../context/employeesContext'

export default function EmployeesPage() {
  return (
    <EmployeeProvider>
      <h1 className="text-2xl font-bold">Ansattliste</h1>
      <hr className="my-8" />
      <EmployeeList />
    </EmployeeProvider>
  )
}
