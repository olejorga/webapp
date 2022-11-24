import { Employee } from "@prisma/client"
import { EmployeeProvider } from "../context/employeeContext"
import { useEmployeeContext } from "../hooks/useEmployeeContext"

export default function Test() {
  return (
    <>
      <EmployeeProvider id="8">
        <Single />
      </EmployeeProvider>
      <EmployeeProvider>
        <List />
      </EmployeeProvider>
    </>
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

function Single() {
  const { data: employee, error } = useEmployeeContext<Employee>()

  return (
    <>
      {/* ERROR */}
      {error && <p>{error}</p>}

      {/* LOADING */}
      {!error && !employee && <p>Loading...</p>}

      {/* READY */}
      {employee && <p style={{fontSize: 20}}>{employee.name}</p>}
    </>
  )
}