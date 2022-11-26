type WarningProps = {
  message: string
}

export default function Warning({ message }: WarningProps) {
  return (
    <article className="my-4 border-b-4 border-yellow-500 bg-yellow-300 p-4">
      <p className="font-semibold text-yellow-900">{message}</p>
    </article>
  )
}
