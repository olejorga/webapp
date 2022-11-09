import type { NextPage } from 'next'
import { useEffect } from 'react'
import FilterButton from '../components/FilterButton'
import TableBuilder from '../components/TableBuilder'
import useFilter from '../hooks/useFilter'
import { Student } from '../types'

const Home: NextPage = () => {
  const {
    isFirstRender,
    students,
    setStudents,
    filterMethod,
    setFilterMethod,
  } = useFilter()

  useEffect(() => {
    console.log('USE EFFECT')
    if (!isFirstRender.current) return
    isFirstRender.current = false
    console.log('en')
    const url = filterMethod ? 'api/' + filterMethod : 'api/students'
    console.log(url)
    const handler = async () => {
      try {
        // Påfølgende kode lånt fra https://developer.mozilla.org/en-US/docs/Web/API/fetch
        const { data } = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if (response.ok) return response.json()
          throw new Error(`HTTP ERROR! Status: ${response.status}`)
        })
        setStudents(data as Student[])
        // console.log(data) // Bør fjernes før levering
      } catch (error) {
        console.log('ERROR')
        console.log(error)
      }
    }
    handler()
  }, [students, setStudents, filterMethod, isFirstRender, setFilterMethod])

  return (
    <main>
      <h1>Student gruppering</h1>
      <FilterButton
        setFilterMethod={setFilterMethod}
        filterMethod={filterMethod}
        isFirstRender={isFirstRender}
      />
      <TableBuilder students={students} filterMethod={filterMethod} />
    </main>
  )
}

export default Home
