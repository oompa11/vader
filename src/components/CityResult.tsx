import { Card, CardContent } from '@/components/ui/card'
import { Droplets, Wind, Thermometer, MapPin } from 'lucide-react'
import { owmIconUrl } from '@/lib/weather'
import type { WeatherData } from '@/types/weather'

interface CityResultProps {
  data: WeatherData
}

export function CityResult({ data }: CityResultProps) {
  const { current, forecast } = data

  return (
    <div className="flex flex-col gap-4">
      {/* ── Current conditions ── */}
      <Card
        className="overflow-hidden border-0 shadow-xl transition-colors duration-200"
        role="region"
        aria-label={`Current weather for ${current.cityName}`}
      >
        <div
          className="h-2 w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400"
          aria-hidden="true"
        />
        <CardContent className="px-6 py-5">
          {/* City + country */}
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 shrink-0 text-violet-500" aria-hidden="true" />
            <h2
              className="text-4xl text-foreground"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
            >
              {current.cityName}
            </h2>
            <span className="ml-1 rounded bg-violet-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
              {current.country}
            </span>
          </div>

          {/* Temperature + icon + description */}
          <div className="flex items-center gap-3">
            <img
              src={owmIconUrl(current.icon)}
              alt={current.description}
              width={64}
              height={64}
              className="-ml-2 -my-2"
            />
            <div>
              <p
                className="text-6xl font-black leading-none text-foreground"
                aria-label={`${current.temp} degrees Celsius`}
              >
                {current.temp}°<span className="text-4xl">C</span>
              </p>
              <p className="mt-1 capitalize text-sm font-semibold text-muted-foreground">
                {current.description} · Feels like {current.feelsLike}°C
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <StatBadge
              icon={<Droplets className="h-4 w-4 text-blue-500" aria-hidden="true" />}
              label="Humidity"
              value={`${current.humidity}%`}
            />
            <StatBadge
              icon={<Wind className="h-4 w-4 text-cyan-500" aria-hidden="true" />}
              label="Wind"
              value={`${current.windSpeed} m/s`}
            />
            <StatBadge
              icon={<Thermometer className="h-4 w-4 text-violet-500" aria-hidden="true" />}
              label="Feels like"
              value={`${current.feelsLike}°C`}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 5-day forecast ── */}
      {forecast.length > 0 && (
        <Card
          className="overflow-hidden border-0 shadow-xl transition-colors duration-200"
          role="region"
          aria-label="5-day forecast"
        >
          <div
            className="h-2 w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400"
            aria-hidden="true"
          />
          <CardContent className="px-6 py-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {forecast.map((day) => (
                <ForecastTile key={day.dateLabel} day={day} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${label}: ${value}`}>
      {icon}
      <span className="text-sm font-medium text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function ForecastTile({ day }: { day: WeatherData['forecast'][number] }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-gradient-to-b from-violet-50 to-cyan-50 px-3 py-3 text-center transition-colors duration-200 dark:from-violet-950/60 dark:to-cyan-950/60">
      <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">
        {day.dateLabel.split(',')[0]}
      </p>
      <p className="text-xs text-muted-foreground">
        {day.dateLabel.split(',').slice(1).join(',').trim()}
      </p>
      <img
        src={owmIconUrl(day.icon)}
        alt={day.description}
        width={48}
        height={48}
        className="-my-1"
      />
      <p className="text-sm font-black text-foreground" aria-label={`High ${day.high} degrees`}>
        {day.high}°
      </p>
      <p className="text-xs font-medium text-muted-foreground" aria-label={`Low ${day.low} degrees`}>
        {day.low}°
      </p>
    </div>
  )
}
