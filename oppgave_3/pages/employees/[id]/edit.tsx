import { GetServerSidePropsContext } from 'next'
import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Error from '../../../components/Error'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import { find, update } from '../../../features/employee/employee.api'
import { Employee } from '../../../types/model'

type EditEmployeePageProps = {
  id: string
}

export default function EditEmployeePage({ id }: EditEmployeePageProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [buttonText, setButtonText] = useState('Lagre')

  useEffect(() => {
    find(id).then(({ error, data }) => {
      if (error) setError(error)
      if (data) setEmployee(data)
    })
  }, [id])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setButtonText('Lagrer...')

    const form = event.currentTarget
    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement
    }

    update({ id, name: elements.name.value }).then(({ error, data }) => {
      if (error) {
        setError(error)
        setButtonText('Lagret')
      }
      if (data) {
        setError(null)
        setEmployee(data)
        elements.name.value = ''
        setButtonText('Lagret')
        setTimeout(() => setButtonText('Lagre'), 1000)
      }
    })
  }

  if (error && !employee) {
    return <Error message={error} />
  } else if (!error && !employee) {
    return <Loader />
  }

  return (
    <section>
      {error && <Error message={error} />}
      <h1 className="mb-8 text-2xl font-bold">Rediger ansatt</h1>
      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Navn"
          placeholder={employee?.name}
          required={true}
        />
        <Button>{buttonText}</Button>
      </form>
    </section>
  )
}

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query
  return { props: { id } }
}
