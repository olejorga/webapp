import Link from 'next/link'

export default function Header() {
  return (
    <div className="head">
      <ul className="headerul">
        <li>
          <Link href="/" style={{ textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li>
          <Link className="link" href="/employees">
            Employees
          </Link>
        </li>
        <li>
          <Link className="link" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" href="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  )
}
