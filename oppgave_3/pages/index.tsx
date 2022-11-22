import type { NextPage } from 'next'
import WeekList from '../components/weekList'

const Home: NextPage = () => {
  return (
    <main>
      <h1>Lunsjkalender</h1>
      <WeekList></WeekList>
    </main>
  )
}

export default Home
