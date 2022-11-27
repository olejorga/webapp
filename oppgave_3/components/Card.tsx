import { PropsWithChildren } from 'react'

export default function Card({ children }: PropsWithChildren) {
  return <section className="p-4 ring-1 ring-black">{children}</section>
}
