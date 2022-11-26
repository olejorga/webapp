import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="container my-16">
      <nav className="flex items-center justify-between gap-4 rounded-xl bg-black px-8 py-4 font-medium text-white ring-2 ring-black">
        <p className="flex items-center gap-2">
          <Logo className="fill-white" />
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
