import { Employee } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import EmployeeDetail from '../../../components/EmployeeDetail'
import Error from '../../../components/Error'
import Loader from '../../../components/Loader'
import { find } from '../../../features/employee/employee.api'

type EmployeePageProps = {
  id: string
}

export default function EmployeePage({ id }: EmployeePageProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    find(id).then(({ data, error }) => {
      if (error) setError(error)
      if (data) setEmployee(data)
    })
  }, [id])

  if (error) {
    return <Error message={error} />
  } else if (!error && !employee) {
    return <Loader />
  }

  return employee && <EmployeeDetail employee={employee} expanded={true} />
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.query
  return { props: { id } }
}
