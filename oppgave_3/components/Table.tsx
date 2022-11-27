import { PropsWithChildren } from 'react'

export function Table({ children }: PropsWithChildren) {
  return (
    <table className="w-full table-fixed">
      <tbody>{children}</tbody>
    </table>
  )
}

export function Row({ children }: PropsWithChildren) {
  return <tr className="even:bg-neutral-300">{children}</tr>
}

export function Column({ children }: PropsWithChildren) {
  return <td className="p-4">{children}</td>
}
