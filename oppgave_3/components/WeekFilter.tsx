import { ChangeEventHandler } from 'react'
import { useWeeks } from '../hooks/useWeeks'
import Select from './Select'

export default function WeekFilter() {
  const { weeks, start, end, setStart, setEnd } = useWeeks()

  const reset = () => {
    setStart(undefined)
    setEnd(undefined)
  }

  const onStartSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setStart(parseInt(event.target.value))
  }

  const onEndSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setEnd(parseInt(event.target.value))
  }

  return (
    <section className="flex items-center gap-8 py-8">
      <h3 className="text-lg font-bold">Filtrer</h3>
      <Select
        label="Fra"
        placeholder="--"
        onChange={onStartSelect}
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
        onChange={onEndSelect}
        value={end?.toString()}
      >
        {weeks?.map(({ number }) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </Select>
      <button className="bg-black px-3 py-1 text-white" onClick={reset}>
        Nullstill
      </button>
    </section>
  )
}
