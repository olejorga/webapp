import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
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

        console.log(...data) // Bør fjernes før levering
      } catch (error) {
        console.log('ERROR')
        console.log(error)
      }
    }
    handler()
  }, [])

  return (
    <main>
      <h1>Student gruppering</h1>
    </main>
  )
}

export default Home
