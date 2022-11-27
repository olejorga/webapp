type ErrorProps = {
  message: string
}

export default function Error({ message }: ErrorProps) {
  return (
    <article className="my-4 border-b-4 border-red-500 bg-red-300 p-4">
      <p className="font-semibold text-red-900">{message}</p>
    </article>
  )
}
