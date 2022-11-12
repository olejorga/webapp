import { ChangeEventHandler } from 'react'

type RadioProps = {
  label: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Radio({ label, checked, onChange }: RadioProps) {
  return (
    <label>
      <span>{label}</span>
      <input type="radio" checked={checked} onChange={onChange} />
    </label>
  )
}