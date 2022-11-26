import { useWeeks } from '../hooks/useWeeks'
import WeekDetail from './WeekDetail'

export default function WeekList() {
  const { weeks } = useWeeks()

  return (
    <section className="flex flex-col gap-8">
      {weeks && weeks.length > 0 ? (
        weeks.map((week) => <WeekDetail key={week.id} week={week} />)
      ) : (
        <p>Ingen uker? 🤔</p>
      )}
    </section>
  )
}
