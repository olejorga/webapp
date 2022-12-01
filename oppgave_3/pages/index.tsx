import Link from 'next/link'
import WeekFilter from '../components/WeekFilter'
import WeekList from '../components/WeekList'
import YearOverview from '../components/YearOverview'
import { WeeksProvider } from '../context/weeksContext'

export default function HomePage() {
  return (
    <WeeksProvider>
      <h1 className="mb-4 text-2xl font-bold">Lunsjkalender</h1>
      <Link href="/api/weeks?format=excel">
        <a
          className="relative -top-11 float-right underline"
          title="Last ned som excel ark."
        >
          Last ned
        </a>
      </Link>
      <YearOverview />
      <WeekFilter />
      <hr className="mb-8 mt-2" />
      <WeekList />
    </WeeksProvider>
  )
}
