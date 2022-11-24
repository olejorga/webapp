import { Employee } from "@prisma/client"
import { EmployeeProvider } from "../context/employeeContext"
import { useEmployeeContext } from "../hooks/useEmployeeContext"

export default function Test() {
  return (
    <EmployeeProvider id="1">
      <List />
    </EmployeeProvider>
  )
}

function List() {
  const { data: employees, error } = useEmployeeContext<Employee[]>()

  return (
    <ul>
      {/* ERROR */}
      {error && <li>{error}</li>}

      {/* LOADING */}
      {!error && !employees && <li>Loading...</li>}

      {/* READY */}
      {employees?.map(e => (
        <li key={e.id}>{e.name}</li>
      ))}
    </ul>
  )
}