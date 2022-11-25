import Year from '../components/year'
import WeekList from '../components/weekList'
import { WeeksProvider } from '../context/weeksContext'

export default function HomePage() {
  return (
    <WeeksProvider>
      <h1>Lunsjkalender</h1>
      <Year></Year>
      <hr className="solid" />
      <WeekList></WeekList>
    </WeeksProvider>
  )
}
