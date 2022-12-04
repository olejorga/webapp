import Head from 'next/head'
import Link from 'next/link'
import EmployeeList from '../../components/EmployeeList'
import EmployeeSearch from '../../components/EmployeeSearch'
import { EmployeeProvider } from '../../context/employeesContext'

export default function EmployeesPage() {
  return (
    <EmployeeProvider>
      <Head>
        <title>Ansatte</title>
      </Head>
      <h1 className="mb-4 text-2xl font-bold">Ansattliste</h1>
      <Link href="/employees/new">
        <a className="relative -top-11 float-right underline">
          Legg til ansatt
        </a>
      </Link>
      <EmployeeSearch />
      <hr className="mb-8 mt-2" />
      <EmployeeList />
    </EmployeeProvider>
  )
}
