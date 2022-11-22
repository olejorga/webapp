import type { NextPage } from 'next'
import Year from '../components/year'
import WeekList from '../components/weekList'

const Home: NextPage = () => {
  return (
    <main>
      <h1>Lunsjkalender</h1>
      <Year></Year>
      <WeekList></WeekList>
    </main>
  )
}

export default Home
