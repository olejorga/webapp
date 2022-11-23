import { useEffect, useState } from 'react'
import { setEnvironmentData } from 'worker_threads'

export default function useData() {
  const [employees, setEmployees] = useState([])
  const [weeks, setWeeks] = useState([])
  const [alterations, setAlterations] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/employees`)
        const { status, data, error } = await res.json()
        if (error)
          throw Error(status + ': ' + error ?? 'Could not fetch employees')
        else setEmployees(data)
      } catch (error) {
        alert((error as Error).message)
      }
    })()
    ;(async () => {
      try {
        const res = await fetch(`/api/weeks`)
        const { status, data, error } = await res.json()
        console.log(data)
        if (error)
          throw Error(status + ': ' + error ?? 'Could not fetch employees')
        else setWeeks(data)
      } catch (error) {
        alert((error as Error).message)
      }
    })()
  }, [setEmployees, setWeeks])

  return { employees, weeks, setEmployees, setWeeks, filter, setFilter }
}
