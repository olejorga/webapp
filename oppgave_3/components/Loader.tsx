import Logo from './Logo'

export default function Loader() {
  return (
    <div className="my-4 flex flex-col items-center gap-2">
      <Logo className="animate-bounce" />
      <span className="font-semibold">Laster inn...</span>
    </div>
  )
}
