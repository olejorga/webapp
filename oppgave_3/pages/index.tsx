import type { NextPage } from 'next'
import Year from '../components/year'
import WeekList from '../components/weekList'
import useData from '../hooks/useData'

const Home: NextPage = () => {
  const { employees, weeks, setEmployees, setWeeks, filter, setFilter } =
    useData()

  return (
    <>
      <h1>Lunsjkalender</h1>
      <Year weeks={weeks} employee={employees}></Year>
      <hr className="solid" />
      <WeekList weeks={weeks}></WeekList>
    </>
  )
}

export default Home
