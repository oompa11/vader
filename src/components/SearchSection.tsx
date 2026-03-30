import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { CityResult } from './CityResult'

export function SearchSection() {
  const [query, setQuery] = useState('')
  const [searchedCity, setSearchedCity] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    setSearchedCity(trimmed)
    // Move focus to result for screen-reader announcement
    setTimeout(() => resultRef.current?.focus(), 50)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

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
          className="h-12 flex-1 border-2 border-violet-200 bg-white px-4 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500"
          aria-label="Enter city name"
        />
        <Button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="h-12 gap-2 bg-gradient-to-r from-violet-600 to-blue-500 px-6 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90 focus-visible:ring-violet-500 disabled:opacity-40"
          aria-label="Search weather for entered city"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </Button>
      </div>

      {/* Result */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-6"
      >
        {searchedCity && (
          <div ref={resultRef} tabIndex={-1} className="outline-none">
            <CityResult city={searchedCity} />
          </div>
        )}
      </div>
    </section>
  )
}
