// TODO: Her er det bugs

export type Strike = { icon: string; guess: string }

export default function Strikes({ strikes }: { strikes: Strike[] }) {
  return (
    <ul className="strikes">
      {/* Byttet ut forEach() med map(). */}
      {strikes.map((strike: Strike, index: number) => (
        <li key={index}>{strike.icon}</li>
      ))}
    </ul>
  )
}
