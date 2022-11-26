import { GetServerSidePropsContext } from 'next'
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from 'react'
import Button from '../../../components/Button'
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
    const overrideId = event.target.value ? event.target.value : null

    setOverrideId(overrideId)

    update({ id, overrideId }).then(({ error, data }) => {
      if (error) setError(error)
      if (data) {
        setDay(data)
        setOverrideId(data.overrideId)
      }
    })
  }

  return (
    <section>
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
          <Column>{day?.employee?.name}</Column>
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
