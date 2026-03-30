import { Sun, Moon } from 'lucide-react'

interface HeaderProps {
  isDark: boolean
  onToggle: () => void
}

export function Header({ isDark, onToggle }: HeaderProps) {
  return (
    <header
      role="banner"
      className="w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 px-4 py-5 shadow-lg"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <span className="text-3xl" aria-hidden="true" role="img">
          ⛈️
        </span>
        <h1
          className="text-5xl text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em' }}
        >
          NIMBUS
        </h1>

        <span className="ml-auto hidden text-white/70 text-sm font-medium sm:block">
          Weather Search
        </span>

        {/* Dark / light mode toggle */}
        <button
          onClick={onToggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={isDark}
          className="ml-2 sm:ml-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-600"
        >
          {isDark ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  )
}
