import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EmployeeDetail from '../../components/employeeDetail'
import { Employee } from '../../types/model'

export default function EmployeeDetailPage() {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee>()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`../api/${router.asPath}`)
        const { status, data, error } = await res.json()
        console.log(data)
        if (error) throw Error(status + ': ' + error ?? 'Could not fetch data')
        else setEmployee(data)
      } catch (error) {
        alert((error as Error).message)
      }
    })()
  }, [router.asPath])

  if (employee == undefined) return
  return <EmployeeDetail employee={employee} />
}
