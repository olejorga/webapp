import { Employee } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
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

  return (
    <>
      <Head>
        <title>Ansatt detaljvisning</title>
      </Head>
      {error && <Error message={error} />}
      {!employee && !error && <Loader />}
      {employee && <EmployeeDetail employee={employee} expanded={true} />}
    </>
  )
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.query
  return { props: { id } }
}
