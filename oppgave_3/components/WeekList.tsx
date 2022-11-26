import { useWeeks } from '../hooks/useWeeks'
import Error from './Error'
import Loader from './Loader'
import Warning from './Warning'
import WeekDetail from './WeekDetail'

export default function WeekList() {
  const { weeks, error } = useWeeks()

  if (error) {
    return <Error message={error} />
  } else if (!weeks && !error) {
    return <Loader />
  } else if (weeks && weeks.length == 0) {
    return <Warning message="Ingen uker? 🤔" />
  }

  return (
    <section className="flex flex-col gap-8">
      {weeks?.map((week) => (
        <WeekDetail key={week.id} week={week} />
      ))}
    </section>
  )
}
