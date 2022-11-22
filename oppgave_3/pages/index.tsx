import type { NextPage } from 'next'
import Year from '../components/year'

const Home: NextPage = () => {
  return (
    <main>
      <h1>Lunsjkalender</h1>
      <Year></Year>
    </main>
  )
}

export default Home
