import { GetServerSidePropsContext } from 'next'
import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import Input from '../../../components/Input'
import { find, update } from '../../../features/employee/employee.api'
import { Employee } from '../../../types/model'

type EditEmployeePageProps = {
  id: string
}

export default function EditEmployeePage({ id }: EditEmployeePageProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    find(id).then(({ error, data }) => {
      if (error) setError(error)
      if (data) setEmployee(data)
    })
  }, [id])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement
    }

    update({ id, name: elements.name.value }).then(({ error, data }) => {
      if (error) setError(error)
      if (data) setEmployee(data)

      elements.name.value = ''
    })
  }

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold">Rediger ansatt</h1>
      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Navn"
          placeholder={employee?.name}
          required={true}
        />
        <Button>Lagre</Button>
      </form>
    </section>
  )
}

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query
  return { props: { id } }
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
