import { useWeeks } from '../hooks/useWeeks'
import Error from './Error'
import Loader from './Loader'
import WeekListItem from './weekListItem'

export default function WeekList() {
  const { weeks, error } = useWeeks()

  return (
    <>
      {error && <Error message={error} />}
      {!error && !weeks && <Loader />}
      {weeks && (
        <>
          <ul className="weekList">
            {weeks?.map((week) => (
              <WeekListItem key={week.id} week={week}></WeekListItem>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
