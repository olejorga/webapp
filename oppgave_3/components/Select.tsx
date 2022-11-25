import { ChangeEventHandler, ReactNode } from 'react'

type SelectProps = {
  label: string
  placeholder: string
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  children: ReactNode
}

export default function Select({
  label,
  placeholder,
  value,
  onChange,
  children,
}: SelectProps) {
  return (
    <label className="flex items-center gap-2">
      <span>{label}</span>
      <select
        className="bg-neutral-300 px-3 py-1 ring-1 ring-black"
        onChange={onChange}
        defaultValue="default"
        value={value ? value : 'default'}
      >
        <option disabled={true} value="default">
          {placeholder}
        </option>
        {children}
      </select>
    </label>
  )
}
