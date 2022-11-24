import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EmployeeProvider } from '../../../context/employeeContext'
import { useEmployeeContext } from '../../../hooks/useEmployeeContext'
import { Employee } from '../../../types/model'

type EditProps = {
  employee: Employee
}

type FormProps = {
  name: string
  rules: string
}

type EditEmployeeProps = {
  id: string
}

export default function EditEmployee({ id }: EditEmployeeProps ) {
  // const isValid = ({ name, rules }: FormProps): boolean => {
  //   return name.length > 0 && rules.length > 0
  // }

  // const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const id = event.target?.id
  // }
  // const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  // }

  return (
    <EmployeeProvider id={id}>
      <EditEmployeeForm />
    </EmployeeProvider>
  )
}

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query

  return {
    props: {
      id
    }
  }
}

function EditEmployeeForm() {
  const { data: employee, error, update } = useEmployeeContext<Employee>()
  const [name, setName] = useState<string | undefined>()

  useEffect(() => {
    if (employee?.name) setName(employee.name) 
  }, [employee?.name])

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (employee) {
      update({ id: employee.id, name: name as string })
    }
  }

  return (
    <>
      { !employee && <p>Loading...</p>}
      { employee &&
        <form className="editForm" onSubmit={handleFormSubmit}>
        <label htmlFor="name">
          Navn:
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Navn"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <button className="submitUpdate">Lagre endringer</button>
      </form>
      }
    </>   
  )
}
