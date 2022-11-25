import Link from 'next/link'
import { useWeeks } from '../hooks/useWeeks'
import DropDown from './DropDown'
import Error from './Error'
import Loader from './Loader'

export default function Year() {
  const { weeks, error } = useWeeks()

  return (
    <>
      {error && <Error message={error} />}
      {!error && !weeks && <Loader />}
      {weeks && (
        <>
          <h2 className="yearTitle">Uker</h2>
          <ul className="listItem">
            <li>
              <DropDown />
            </li>
          </ul>
          <ul className="year">
            {weeks.map((week) => (
              <Link key={week.id} href={`weeks/${week.number}`}>
                <a className="week">{week.number}</a>
              </Link>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
