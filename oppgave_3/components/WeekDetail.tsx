import Link from 'next/link'
import { useState } from 'react'
import { Week } from '../types/model'
import Card from './Card'
import { Column, Row, Table } from './Table'

type WeekProps = {
  week: Week
  expanded?: boolean
}

export default function WeekDetail({ week, expanded }: WeekProps) {
  const [open, setOpen] = useState(expanded)

  return (
    <Card>
      <h2 className="mb-4 text-2xl font-bold">{`Uke ${week.number}`}</h2>
      {open && (
        <Table>
          {week.days?.map((day) => (
            <Row key={day.id}>
              <Column>{day.name}</Column>
              <Column>
                <Link href={'/employees/' + day.employee?.id}>
                  <a className="underline">{day.employee?.name}</a>
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
