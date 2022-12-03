import Image from 'next/image'
import Error from '../components/Error'

export default function Error404Page() {
  return (
    <>
      <Error message="Siden finnes ikke." />
      <figure className="relative aspect-video">
        {/* SRC: https://gifer.com/en/7VE */}
        <Image
          src="/404.gif"
          alt="Guess you'll have to see for yourself."
          objectFit="contain"
          layout="fill"
        />
      </figure>
    </>
  )
}
