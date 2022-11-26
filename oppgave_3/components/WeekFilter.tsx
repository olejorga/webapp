import { ChangeEventHandler } from 'react'
import { useWeeks } from '../hooks/useWeeks'
import Button from './Button'
import Select from './Select'

export default function WeekFilter() {
  const { weeks, start, end, setStart, setEnd } = useWeeks()

  const reset = () => {
    setStart(undefined)
    setEnd(undefined)
  }

  const handleStartSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setStart(parseInt(event.target.value))
  }

  const handleEndSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setEnd(parseInt(event.target.value))
  }

  return (
    <section className="flex items-center gap-8 py-8">
      <h3 className="text-lg font-bold">Filtrer</h3>
      <Select
        label="Fra"
        placeholder="--"
        onChange={handleStartSelect}
        value={start?.toString()}
      >
        {weeks?.map(({ number }) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </Select>
      <Select
        label="Til"
        placeholder="--"
        onChange={handleEndSelect}
        value={end?.toString()}
      >
        {weeks?.map(({ number }) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </Select>
      <Button onClick={reset}>Nullstill</Button>
    </section>
  )
}
