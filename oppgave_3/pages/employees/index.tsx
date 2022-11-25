import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EmployeeDetail from '../../components/employeeDetail'
import EmployeeList from '../../components/EmployeeList'
import { EmployeeProvider } from '../../context/employeesContext'
import { Employee } from '../../types/model'

export default function AllEmployeesPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`../api/${router.asPath}`)
        const { status, data, error } = await res.json()
        console.log(data)
        if (error) throw Error(status + ': ' + error ?? 'Could not fetch data')
        else setEmployees(data)
      } catch (error) {
        alert((error as Error).message)
      }
    })()
  }, [router.asPath])

  if (employees == undefined) return
  return (
    <EmployeeProvider>
      <EmployeeList />
    </EmployeeProvider>
  )
}
