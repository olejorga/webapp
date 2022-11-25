import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { WeeksProvider } from '../context/weeksContext'
import { useWeeks } from '../hooks/useWeeks'

export default function TestPage() {
  return (
    <Layout>
      <WeeksProvider>
        <h1 className="mb-4 text-2xl font-bold">Lunsjkalender</h1>
        <Year />
        <hr className="my-8" />
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
      <nav className="flex items-center justify-end gap-4 rounded-xl bg-white px-8 py-4 font-medium ring-2 ring-black">
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
        <Link href="/">
          <a className="mr-auto flex items-center gap-2">
            <Logo inverted={true} />
            <span>&copy; Gutta krutt</span>
          </a>
        </Link>
        <Link href="/" className="">
          <a>Til toppen</a>
        </Link>
      </nav>
    </footer>
  )
}

function Logo({ inverted }: { inverted?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
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
  return <></>
}
