import { GetServerSidePropsContext } from 'next'
import { stringify } from 'querystring'
import React, { ReactHTML, useEffect, useState } from 'react'
import { find, update } from '../../../features/employee/employee.api'
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

export default function EditEmployee({ id }: EditEmployeeProps) {
  const [error, setError] = useState<string | null>()
  const [employee, setEmployee] = useState<Employee | null>()

  useEffect(() => {
    console.log(id)
    find(id).then(({ data: employee, error }) => {
      if (error) setError(error)
      if (employee) setEmployee(employee)
    })
  }, [id])
  console.log(employee ?? 'NULL OG NIKS')
  return <>{employee && <EditEmployeeForm employee={employee} />}</>
}

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query

  return {
    props: {
      id,
    },
  }
}

type EmployeeProps = {
  employee: Employee
}

function EditEmployeeForm({ employee }: EmployeeProps) {
  const { id, name } = employee
  const [newName, setNewName] = useState<string | undefined>()
  const [isValid, setValid] = useState(true)

  useEffect(() => {
    setNewName(name)
  }, [name])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
    setValid(true)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (newName) update({ id: id, name: newName })
    else {
      setValid(false)
    }
  }

  return (
    <>
      {!name && <p>Loading...</p>}
      {name && (
        <form className="editForm" onSubmit={handleFormSubmit}>
          <label htmlFor="name">
            Navn:
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Navn"
              onChange={handleChange}
              value={newName}
            />
          </label>
          <p id="nameError" hidden={isValid}>
            En ansatt må ha et navn
          </p>
          <button className="submitUpdate">Lagre endringer</button>
        </form>
      )}
    </>
  )
}
