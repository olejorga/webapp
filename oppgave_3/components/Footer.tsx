import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footerContent">
          <Link className="link" href="/">
            To the top
          </Link>
          <p>&copy; Gutta krutt</p>
        </div>
      </footer>
    </>
  )
}
