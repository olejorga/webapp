type ErrorProps = {
  message: string
}

export default function Error({ message }: ErrorProps) {
  return (
    <article className="error">
      <p>Hello World!</p>
    </article>
  )
}
