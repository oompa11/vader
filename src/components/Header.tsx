export function Header() {
  return (
    <header
      role="banner"
      className="w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-5 shadow-lg"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <span
          className="text-3xl"
          aria-hidden="true"
          role="img"
        >
          ⛈️
        </span>
        <h1
          className="text-5xl font-display tracking-widest text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em' }}
        >
          NIMBUS
        </h1>
        <span className="ml-auto hidden text-white/70 text-sm font-medium sm:block">
          Weather Search
        </span>
      </div>
    </header>
  )
}
