import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import StudentTable from '../components/SudentTable'
import { Student } from '../types'



const Home: NextPage = () => {
  const isFirstRender = useRef(true)
  const [students, setStudents] = useState<Student[]>([]) 

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
        setStudents([...data])
        console.log(...data) // Bør fjernes før levering
      } catch (error) {
        console.log('ERROR')
        console.log(error)
      }
    }
    handler()
  }, [students])

  if(!students) return
  return (
    <main>
      <h1>Student gruppering</h1>
      <article className="studentTable">
            {students.map(({id, name, gender, age, group}) => (
                <div key={id}>
                <span id="id">{id}</span>
                <span id="name">{name}</span>
                <span id="gender">{gender}</span>
                <span id="age">{age}</span>
                <span id="group">{group}</span>
            </div>
            ))}
        </article>
    </main>
  )
}

export default Home
