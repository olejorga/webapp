import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Error from '../components/Error'

export default function Error404Page() {
  return (
    <>
      <Head>
        <title>Siden finnes ikke</title>
      </Head>
      <Error message="Denne siden fant vi ikke." />
      <figure className="relative my-4 aspect-video">
        {/* SRC: https://gifer.com/en/7VE */}
        <Image
          src="/404.gif"
          alt="Guess you'll have to see for yourself."
          objectFit="contain"
          layout="fill"
        />
      </figure>
      <nav className="flex justify-center">
        <Link href="/">
          <a className="text-lg underline">Gå tilbake</a>
        </Link>
      </nav>
    </>
  )
}
