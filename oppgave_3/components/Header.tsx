import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="container my-8">
      <nav className="flex items-center justify-end gap-4 rounded-xl bg-white px-8 py-4 font-semibold ring-2 ring-black">
        <Link href="/">
          <a className="mr-auto">
            <Logo />
          </a>
        </Link>
        <Link href="/" className="">
          <a>Kalender</a>
        </Link>
        <Link href="/employees" className="">
          <a>Ansatte</a>
        </Link>
      </nav>
    </header>
  )
}
