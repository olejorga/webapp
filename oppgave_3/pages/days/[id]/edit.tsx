import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import Error from '../../../components/Error'
import Loader from '../../../components/Loader'
import Select from '../../../components/Select'
import { Column, Row, Table } from '../../../components/Table'
import { find, update } from '../../../features/day/day.api'
import { read } from '../../../features/employee/employee.api'
import { Day, Employee } from '../../../types/model'

type EditDayPageProps = {
  id: string
}

export default function EditDayPage({ id }: EditDayPageProps) {
  const [day, setDay] = useState<Day | null>(null)
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [overrideId, setOverrideId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | undefined>()

  useEffect(() => {
    find(id).then(({ error, data }) => {
      if (error) setError(error)
      if (data) {
        setDay(data)
        setOverrideId(data.overrideId)
      }
    })

    read().then(({ error, data }) => {
      if (error) setError(error)
      if (data) setEmployees(data)
    })
  }, [id])

  const handleOverrideSelect: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setStatus('Lagrer...')

    const overrideId = event.target.value ? event.target.value : null

    setOverrideId(overrideId)

    update({ id, overrideId }).then(({ error, data }) => {
      if (error) {
        setError(error)
        setStatus(undefined)
      }
      if (data) {
        setError(null)
        setDay(data)
        setOverrideId(data.overrideId)
        setStatus('Lagret')
        setTimeout(() => setStatus(undefined), 1000)
      }
    })
  }

  if (error && (!day || !employees)) {
    return <Error message={error} />
  } else if (!error && (!day || !employees)) {
    return <Loader />
  }

  return (
    <section>
      {error && <Error message={error} />}
      <h1 className="mb-8 text-2xl font-bold">Rediger dag</h1>
      <Table>
        <Row>
          <Column>
            <span className="font-semibold">Dag</span>
          </Column>
          <Column>
            <span className="font-semibold">Ansvarlig</span>
          </Column>
          <Column>
            <span className="font-semibold">Overskrivelse</span>
          </Column>
        </Row>
        <Row>
          <Column>{`${day?.name} (Uke ${day?.week?.number})`}</Column>
          <Column>
            {day?.employee ? (
              <Link href={'/employees/' + day.employee?.id}>
                <a className={day.override ? 'line-through' : 'underline'}>
                  {day.employee?.name}
                </a>
              </Link>
            ) : (
              <span className={day?.override ? 'line-through' : ''}>
                Ferie! 🥳
              </span>
            )}
          </Column>
          <Column>
            <div className="flex items-center gap-2">
              <Select
                placeholder="Ingen"
                onChange={handleOverrideSelect}
                value={overrideId as string}
              >
                <option value="">Ingen</option>
                {employees?.map(({ id, name }) => (
                  <option
                    key={id}
                    value={id}
                    disabled={id == day?.employee?.id}
                  >
                    {name}
                  </option>
                ))}
              </Select>
              <span>{status}</span>
            </div>
          </Column>
        </Row>
      </Table>
    </section>
  )
}

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query
  return { props: { id } }
}
