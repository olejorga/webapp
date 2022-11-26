import { ChangeEventHandler, useEffect, useState } from 'react'
import { useWeeks } from '../hooks/useWeeks'
import { Week } from '../types/model'
import Button from './Button'
import Select from './Select'
import Warning from './Warning'

export default function WeekFilter() {
  const { weeks, start, end, setStart, setEnd } = useWeeks()
  const [allWeeks, setAllWeeks] = useState<Week[]>()

  useEffect(() => {
    if (!allWeeks && weeks) {
      setAllWeeks(weeks)
    }
  }, [allWeeks, weeks])

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

  if (weeks && weeks.length == 0) {
    return <Warning message="Ingen uker? 🤔" />
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
        {allWeeks?.map(({ number }) => (
          <option
            key={number}
            value={number}
            disabled={end ? end < number : false}
          >
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
        {allWeeks?.map(({ number }) => (
          <option
            key={number}
            value={number}
            disabled={start ? start > number : false}
          >
            {number}
          </option>
        ))}
      </Select>
      <Button onClick={reset}>Nullstill</Button>
    </section>
  )
}
