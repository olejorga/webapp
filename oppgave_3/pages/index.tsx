import WeekFilter from '../components/WeekFilter'
import YearOverview from '../components/YearOverview'
import { WeeksProvider } from '../context/weeksContext'
import WeekList from './weeks'

export default function HomePage() {
  return (
    <WeeksProvider>
      <h1 className="mb-4 text-2xl font-bold">Lunsjkalender</h1>
      <YearOverview />
      <WeekFilter />
      <hr className="mb-8 mt-2" />
      <WeekList />
    </WeeksProvider>
  )
}
