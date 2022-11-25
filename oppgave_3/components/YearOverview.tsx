import Link from 'next/link'
import { useWeeks } from '../hooks/useWeeks'

export default function YearOverview() {
  const { weeks } = useWeeks()

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Uker</h2>
      <nav className="grid grid-cols-12 gap-2">
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
