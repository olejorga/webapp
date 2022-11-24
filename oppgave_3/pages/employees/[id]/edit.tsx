import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../../context/employeeContext'
import { Employee } from '../../../types/model'

type EditProps = {
  employee: Employee
}
type FormProps = {
  name: string
  rules: string
}

const Edit = () => {
  const [employee, setEmployee] = useState<Employee>()
  const router = useRouter()

  useEffect(() => {
    if (router.asPath.includes('[')) return
    ;(async () => {
      try {
        const res = await fetch(
          `../../api/${router.asPath.replace('/edit', '')}`
        )
        const { status, data, error } = await res.json()
        if (error) throw Error(status + ': ' + error ?? 'Could not fetch data')
        else setEmployee(data)
      } catch (error) {
        alert((error as Error).message)
      }
    })()
  }, [router])

  const isValid = ({ name, rules }: FormProps): boolean => {
    return name.length > 0 && rules.length > 0
  }

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target?.id
  }
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  console.log(employee)
  if (employee == undefined) return
  return (
    <form className="editForm" onSubmit={handleFormSubmit}>
      <label htmlFor="name">
        Navn:
        <input
          id="name"
          type="text"
          placeholder="Navn"
          onChange={handleData}
          value={employee.name}
        />
      </label>
      <label htmlFor="rules">
        Regler:
        <input
          id="rules"
          type="text"
          placeholder="Regler"
          onChange={handleData}
          value={employee.rules}
        />
      </label>
      <button className="submitUpdate">Lagre endringer</button>
    </form>
  )
}

export default Edit
