import type { NextPage } from 'next'
import { useEffect } from 'react'
import FilterButton from '../components/FilterButton'
import TableBuilder from '../components/TableBuilder'
import useFilter from '../hooks/useFilter'
import { Category, Student } from '../types'

const Home: NextPage = () => {
  const {
    isFirstRender,
    students,
    setStudents,
    filterMethod,
    setFilterMethod,
    setCategory,
    category,
  } = useFilter()

  useEffect(() => {
    if (!isFirstRender.current) return

    isFirstRender.current = false

    const url = filterMethod ? 'api/students/' + filterMethod : 'api/students'

    const handler = async () => {
      try {
        const res = await fetch(url)
        const { success, data } = await res.json()

        if (success) setStudents(data as Student[])
        else throw Error(`${res.status}: Could not fetch students.`)

      } catch (error) {
        console.log(error)
        alert((error as Error).message)
      }

      if (filterMethod) {
        try {
        const res = await fetch(url + "/category")
        const { success, data } = await res.json()

        if (success) setCategory(data as Category[])
        else throw Error(`${res.status}: Could not fetch categories.`)

      } catch (error) {
        console.log(error)
        alert((error as Error).message)
      }
      } else {
        setCategory(undefined)
      }
    }
    handler()
  }, [
    students,
    setStudents,
    filterMethod,
    isFirstRender,
    setFilterMethod,
    setCategory,
  ])

  return (
    <main>
      <h1>Student gruppering</h1>
      <FilterButton
        setFilterMethod={setFilterMethod}
        filterMethod={filterMethod}
        isFirstRender={isFirstRender}
      />
      <TableBuilder
        students={students}
        filterMethod={filterMethod}
        category={category}
      />
    </main>
  )
}

export default Home
