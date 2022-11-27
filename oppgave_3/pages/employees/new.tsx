import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Error from '../../components/Error'
import Input from '../../components/Input'
import Loader from '../../components/Loader'
import { create } from '../../features/employee/employee.api'
import { Employee } from '../../types/model'

export default function NewEmployeePage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [buttonText, setButtonText] = useState('Opprett')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setButtonText('Jobber...')

    const form = event.currentTarget
    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement
      rules: HTMLInputElement
    }

    create({ name: elements.name.value, rules: elements.rules.value }).then(
      ({ error, data }) => {
        if (error) {
          setError(error)
          setButtonText('Opprett')
        }
        if (data) {
          router.push('/employees/' + data.id)
        }
      }
    )
  }

  return (
    <section>
      {error && <Error message={error} />}
      <h1 className="mb-8 text-2xl font-bold">Ny ansatt</h1>
      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Navn"
          placeholder="F.eks. Marius"
          required={true}
        />
        <Input
          name="rules"
          label="Regler"
          placeholder="days:123"
          required={true}
        />
        <Button>{buttonText}</Button>
      </form>
    </section>
  )
}
