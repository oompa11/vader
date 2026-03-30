import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

interface CityResultProps {
  city: string
}

export function CityResult({ city }: CityResultProps) {
  return (
    <Card
      className="overflow-hidden border-0 shadow-xl"
      role="region"
      aria-label={`Weather result for ${city}`}
    >
      {/* Gradient accent bar */}
      <div
        className="h-2 w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400"
        aria-hidden="true"
      />
      <CardContent className="px-6 py-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Showing results for
        </p>
        <div className="flex items-center gap-2">
          <MapPin
            className="h-5 w-5 text-violet-600 shrink-0"
            aria-hidden="true"
          />
          <span
            className="text-3xl font-black uppercase tracking-wide text-foreground"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem' }}
          >
            {city}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Weather data will appear here in the next step.
        </p>
      </CardContent>
    </Card>
  )
}
