import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Day, Employee } from '../types/model'
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
        <>
          {employee.overrides && employee.overrides.length > 0 && (
            <>
              <h3 className="mb-2 text-lg font-bold">Ekstra</h3>
              <Card>
                <Table>
                  {employee.overrides.map((day) => (
                    <Row key={day.id}>
                      <Column>{day.name}</Column>
                      <Column>
                        <Link href={'/weeks/' + day.week?.number}>
                          <a className="underline">{`Uke ${day.week?.number}`}</a>
                        </Link>
                      </Column>
                    </Row>
                  ))}
                </Table>
              </Card>
              <hr className="mt-8 mb-6" />
            </>
          )}
          <h3 className="text-lg font-bold">Planlagt</h3>
          <Table>
            {employee.days && employee.days.length > 0 ? (
              employee.days.map((day) => (
                <Row key={day.id}>
                  <Column>
                    <span className={day.overrideId ? 'line-through' : ''}>
                      {day.name}
                    </span>
                  </Column>
                  <Column>
                    <Link href={'/weeks/' + day.week?.number}>
                      <a
                        className={
                          day.overrideId ? 'line-through' : 'underline'
                        }
                      >{`Uke ${day.week?.number}`}</a>
                    </Link>
                  </Column>
                </Row>
              ))
            ) : (
              <Row>
                <Column>Ingen lunsjer! 🥳</Column>
              </Row>
            )}
          </Table>
        </>
      )}
      {!expanded && (
        <button className="mt-4 underline" onClick={() => setOpen(!open)}>
          {open ? 'Lukk dager' : 'Se dager'}
        </button>
      )}
    </Card>
  )
}
