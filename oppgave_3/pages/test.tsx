import Link from 'next/link'
import {
  ChangeEventHandler,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react'
import { WeeksProvider } from '../context/weeksContext'
import { useWeeks } from '../hooks/useWeeks'
import { Week } from '../types/model'

export default function TestPage() {
  return (
    <Layout>
      <WeeksProvider>
        <h1 className="mb-4 text-2xl font-bold">Lunsjkalender</h1>
        <Year />
        <Filter />
        <hr className="mb-8 mt-2" />
        <Weeks />
      </WeeksProvider>
    </Layout>
  )
}

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  )
}

function Header() {
  return (
    <header className="container my-8">
      <nav className="flex items-center justify-end gap-4 rounded-xl bg-white px-8 py-4 font-semibold ring-2 ring-black">
        <Link href="/">
          <a className="mr-auto">
            <Logo />
          </a>
        </Link>
        <Link href="/" className="">
          <a>UKER</a>
        </Link>
        <Link href="/employees" className="">
          <a>ANSATTE</a>
        </Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="container my-16">
      <nav className="flex items-center justify-between gap-4 rounded-xl bg-black px-8 py-4 font-medium text-white ring-2 ring-black">
        <p className="flex items-center gap-2">
          <Logo inverted={true} />
          <span>&copy; Gutta krutt</span>
        </p>
        <Link href="#" className="">
          <a className="flex items-center gap-2">
            <span>Tilbake</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </a>
        </Link>
      </nav>
    </footer>
  )
}

function Logo({ inverted }: { inverted?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={inverted ? '#fff' : '#000'}
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <path d="M3.37,14.28c0.79-0.29,1.17-0.78,1.99-0.78c1.19,0,1.42,1,3.33,1c1.95,0,2.09-1,3.33-1c1.19,0,1.42,1,3.33,1 c1.95,0,2.09-1,3.33-1c0.81,0,1.17,0.46,1.93,0.76c0.67,0.26,1.39-0.25,1.39-0.96c0-0.43-0.28-0.81-0.69-0.96 c-0.97-0.35-1.22-0.83-2.65-0.83c-1.95,0-2.09,1-3.33,1c-1.19,0-1.42-1-3.33-1c-1.95,0-2.09,1-3.33,1c-1.19,0-1.42-1-3.33-1 c-1.55,0-1.96,0.63-2.68,0.89c-0.39,0.14-0.65,0.52-0.65,0.94C2.01,14.03,2.71,14.52,3.37,14.28z" />
          <path d="M2,19c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-1c0-1.1-0.9-2-2-2H4c-1.1,0-2,0.9-2,2V19z" />
          <path d="M22,9c0.02-4-4.28-6-10-6C6.29,3,2,5,2,9v0c0,0.55,0.45,1,1,1h18C21.55,10,22,9.55,22,9L22,9L22,9z" />
        </g>
      </g>
    </svg>
  )
}

function Year() {
  const { weeks } = useWeeks()

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Uker</h2>
      <nav className="grid grid-cols-12 gap-2">
        {weeks?.map((week) => (
          <Link href={'/weeks/' + week.id} key={week.id}>
            <a className="flex aspect-square items-center justify-center bg-black text-white">
              {week.number}
            </a>
          </Link>
        ))}
      </nav>
    </section>
  )
}

function Weeks() {
  const { weeks } = useWeeks()

  return (
    <section className="flex flex-col gap-8">
      {weeks?.map((week) => (
        <Week key={week.id} week={week} />
      ))}
    </section>
  )
}

function Week({ week }: { week: Week }) {
  const [open, setOpen] = useState(false)

  return (
    <Card>
      <h2 className="mb-4 text-2xl font-bold">{`Uke ${week.number}`}</h2>
      {open && (
        <Table>
          {week.days?.map((day) => (
            <Row key={day.id}>
              <Column>{day.name}</Column>
              <Column>
                <Link href={'/employees/' + day.employee?.id}>
                  <a className="underline">{day.employee?.name}</a>
                </Link>
              </Column>
            </Row>
          ))}
        </Table>
      )}
      <button className="mt-4 underline" onClick={() => setOpen(!open)}>
        {open ? 'Lukk dager' : 'Se dager'}
      </button>
    </Card>
  )
}

function Card({ children }: PropsWithChildren) {
  return <section className="p-4 ring-1 ring-black">{children}</section>
}

function Table({ children }: PropsWithChildren) {
  return <table className="w-full table-fixed">{children}</table>
}

function Row({ children }: PropsWithChildren) {
  return <tr className="even:bg-neutral-300">{children}</tr>
}

function Column({ children }: PropsWithChildren) {
  return <td className="p-4">{children}</td>
}

function Filter() {
  const { weeks, start, end, setStart, setEnd } = useWeeks()

  const reset = () => {
    setStart(undefined)
    setEnd(undefined)
  }

  const onStartSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setStart(parseInt(event.target.value))
  }

  const onEndSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setEnd(parseInt(event.target.value))
  }

  return (
    <section className="flex items-center gap-8 py-8">
      <h3 className="text-lg font-bold">Filtrer</h3>
      <Select
        label="Fra"
        placeholder="--"
        onChange={onStartSelect}
        value={start?.toString()}
      >
        {weeks?.map(({ number }) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </Select>
      <Select
        label="Til"
        placeholder="--"
        onChange={onEndSelect}
        value={end?.toString()}
      >
        {weeks?.map(({ number }) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </Select>
      <button className="bg-black px-3 py-1 text-white" onClick={reset}>
        Nullstill
      </button>
    </section>
  )
}

type SelectProps = {
  label: string
  placeholder: string
  value?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  children: ReactNode
}

function Select({
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
