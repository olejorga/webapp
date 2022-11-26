import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className'
> & { label?: string }

export default function Input(props: InputProps) {
  const { label, ...rest } = props

  return (
    <label className="inline-flex flex-col gap-2">
      {label && <span>{label}</span>}
      <input className="px-3 py-1 ring-1 ring-black" {...rest} />
    </label>
  )
}
