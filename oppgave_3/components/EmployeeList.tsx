import { useEmployees } from '../hooks/useEmployees'
import EmployeeDetail from './employeeDetail'
import Error from './Error'
import Loader from './Loader'

export default function EmployeeList() {
  const { employees, error } = useEmployees()

  return (
    <>
      {error && <Error message={error} />}
      {!error && !employees && <Loader />}
      {employees && (
        <ul>
          {employees.map((employee) => (
            <EmployeeDetail
              toggleHidden={true}
              key={employee.id}
              employee={employee}
            ></EmployeeDetail>
          ))}
        </ul>
      )}
    </>
  )
}
