import Link from 'next/link'
import { type } from 'os'
import { useState } from 'react'
import { useWeeks } from '../hooks/useWeeks'
import { Day, Employee, Week } from '../types/model'
import DropDown from './DropDown'
import Error from './Error'
import Loader from './Loader'
import SearchFieldEmployee from './SearchFieldEmployee'

export default function Year() {
  let { weeks, error } = useWeeks()

  return (
    <>
      {error && <Error message={error} />}
      {!error && !weeks && <Loader />}
      {weeks && (
        <>
          <h2 className="yearTitle">Uker</h2>
          <ul className="listItem">
            <li>
              <DropDown weeks={weeks} />
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
