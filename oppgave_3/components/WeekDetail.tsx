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
          {week.days && week.days.length > 0 ? (
            week.days.map((day) => (
              <Row key={day.id}>
                <Column>{day.name}</Column>
                <Column>
                  <span className="flex flex-col items-start">
                    {day.employee ? (
                      <Link href={'/employees/' + day.employee?.id}>
                        <a
                          className={
                            day.override ? 'line-through' : 'underline'
                          }
                        >
                          {day.employee?.name}
                        </a>
                      </Link>
                    ) : (
                      <span className={day.override ? 'line-through' : ''}>
                        Ferie! 🥳
                      </span>
                    )}
                    {day.override && (
                      <Link href={'/employees/' + day.override?.id}>
                        <a className="underline">{day.override?.name}</a>
                      </Link>
                    )}
                  </span>
                </Column>
                <Column>
                  <Link href={`/days/${day.id}/edit`}>
                    <a className="underline">Rediger</a>
                  </Link>
                </Column>
              </Row>
            ))
          ) : (
            <Row>
              <Column>Ingen dager denne uken? 🤔</Column>
            </Row>
          )}
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
