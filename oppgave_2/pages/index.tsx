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
      } catch (error) {
        console.log('ERROR')
        console.log(error)
      }
      if (filterMethod) {
        try {
          // Påfølgende kode lånt fra https://developer.mozilla.org/en-US/docs/Web/API/fetch
          const { data } = await fetch(url + '/category', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            if (response.ok) return response.json()
            throw new Error(`HTTP ERROR! Status: ${response.status}`)
          })
          setCategory(data as Category[])
        } catch (error) {
          console.log('ERROR')
          console.log(error)
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

  console.log(category)
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
