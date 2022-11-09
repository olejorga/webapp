import type { NextPage } from 'next'
import { type } from 'os'
import { useEffect, useRef, useState } from 'react'
import StudentTable from '../components/StudentTable'
import { Student, Students } from '../types'


const Home: NextPage = () => {
  const isFirstRender = useRef(true)
  const [students, setStudents] = useState<Student[] | undefined>(undefined) 

  useEffect(() => {
    if(!isFirstRender.current) return
    isFirstRender.current = false
    console.log('en')
    const handler = async () => {
      try {
        // Påfølgende kode lånt fra https://developer.mozilla.org/en-US/docs/Web/API/fetch
        const { data } = await fetch('api/students', {
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
  }, [students])

  return (
    <main>
      <h1>Student gruppering</h1>
      <StudentTable {...students}/>
    </main>
  )
}

export default Home
