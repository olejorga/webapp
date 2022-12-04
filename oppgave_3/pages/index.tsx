import Head from 'next/head'
import Link from 'next/link'
import WeekFilter from '../components/WeekFilter'
import WeekList from '../components/WeekList'
import YearOverview from '../components/YearOverview'
import { WeeksProvider } from '../context/weeksContext'

export default function HomePage() {
  return (
    <WeeksProvider>
      <Head>
        <title>Hjem</title>
      </Head>
      <nav className="flex items-center justify-between pb-8">
        <Link href="/api/demo">
          <a className="underline" title="Importer demo-data.">
            Demo
          </a>
        </Link>
        <Link href="/api/generate">
          <a className="underline" title="Generer en ny lunch-liste.">
            Generer
          </a>
        </Link>
        <Link href="/api/weeks?format=excel">
          <a className="underline" title="Last ned som excel ark.">
            Last ned
          </a>
        </Link>
      </nav>
      <h1 className="mb-4 text-2xl font-bold">Lunsjkalender</h1>
      <YearOverview />
      <WeekFilter />
      <hr className="mb-8 mt-2" />
      <WeekList />
    </WeeksProvider>
  )
}
