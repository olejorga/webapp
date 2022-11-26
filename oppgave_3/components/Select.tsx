import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

type SelectProps = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'className'
> & { label: string }

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
