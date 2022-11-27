import { FormEvent, useEffect } from 'react'
import { useEmployees } from '../hooks/useEmployees'
import Button from './Button'
import Input from './Input'

export default function EmployeeSearch() {
  const { setName } = useEmployees()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement
    }

    setName(elements.name.value)
  }

  return (
    <form className="flex items-center gap-8 py-8" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">Filtrer</h3>
      <Input name="name" placeholder="Trude..." />
      <Button>Søk</Button>
    </form>
  )
}
