import Link from 'next/link'
import { useWeeks } from '../hooks/useWeeks'
import Warning from './Warning'

export default function YearOverview() {
  const { weeks } = useWeeks()

  if (weeks && weeks.length == 0) {
    return <Warning message="Ingen uker? 🤔" />
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Uker</h2>
      <nav className="grid grid-cols-8 gap-2 sm:grid-cols-12">
        {weeks?.map(({ number }) => (
          <Link href={'/weeks/' + number} key={number}>
            <a className="flex aspect-square items-center justify-center bg-black text-white">
              {number}
            </a>
          </Link>
        ))}
      </nav>
    </section>
  )
}
