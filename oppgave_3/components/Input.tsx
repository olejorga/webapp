import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className'
> & { label: string }

export default function Input(props: InputProps) {
  const { label, ...rest } = props

  return (
    <label>
      <span>{label}</span>
      <input className="input" {...rest} />
    </label>
  )
}
