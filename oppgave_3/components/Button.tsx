import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'className'
>

export default function Button(props: ButtonProps) {
  return <button className="bg-black px-3 py-1 text-white" {...props}></button>
}
