import Link from 'next/link'
import { useState } from 'react'
import { Employee } from '../types/model'
import Card from './Card'
import { Column, Row, Table } from './Table'

type EmployeeProps = {
  employee: Employee
  expanded?: boolean
}

export default function EmployeeDetail({ employee, expanded }: EmployeeProps) {
  const [open, setOpen] = useState(expanded)

  return (
    <Card>
      <nav className="flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">{employee.name}</h2>
        <Link href={`/employees/${employee.id}/edit`}>
          <a className="underline">Rediger</a>
        </Link>
      </nav>
      {open && (
        <Table>
          {employee.days?.map((day) => (
            <Row key={day.id}>
              <Column>{day.name}</Column>
              <Column>
                <Link href={'/week/' + day.week?.number}>
                  <a className="underline">{`Uke ${day.week?.number}`}</a>
                </Link>
              </Column>
            </Row>
          ))}
        </Table>
      )}
      {!expanded && (
        <button className="mt-4 underline" onClick={() => setOpen(!open)}>
          {open ? 'Lukk dager' : 'Se dager'}
        </button>
      )}
    </Card>
  )
}
