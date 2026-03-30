import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, AlertTriangle, Loader2 } from 'lucide-react'
import { CityResult } from './CityResult'
import { useWeather } from '@/hooks/useWeather'

export function SearchSection() {
  const [query, setQuery] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)
  const { status, data, error, search } = useWeather()

  const handleSearch = async () => {
    const trimmed = query.trim()
    if (!trimmed) return
    await search(trimmed)
    setTimeout(() => resultRef.current?.focus(), 50)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const isLoading = status === 'loading'

  return (
    <section
      aria-label="City weather search"
      className="mx-auto w-full max-w-xl px-4 py-10"
    >
      {/* Search row */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <Input
          id="city-search"
          type="search"
          placeholder="Search a city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          disabled={isLoading}
          className="h-12 flex-1 border-2 border-violet-200 bg-white px-4 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500 disabled:opacity-60"
          aria-label="Enter city name"
        />
        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="h-12 gap-2 bg-gradient-to-r from-violet-600 to-blue-500 px-6 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90 focus-visible:ring-violet-500 disabled:opacity-40"
          aria-label={isLoading ? 'Searching…' : 'Search weather for entered city'}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
          {isLoading ? 'Searching…' : 'Search'}
        </Button>
      </div>

      {/* Result / error / loading hint */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-6"
      >
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-violet-500" aria-hidden="true" />
            <span className="text-sm font-medium">Fetching weather data…</span>
          </div>
        )}

        {status === 'error' && error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {status === 'success' && data && (
          <div ref={resultRef} tabIndex={-1} className="outline-none">
            <CityResult data={data} />
          </div>
        )}
      </div>
    </section>
  )
}
