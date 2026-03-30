import type {
  OWMGeoEntry,
  OWMCurrentResponse,
  OWMForecastResponse,
  WeatherData,
  ForecastDay,
} from '@/types/weather'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined
const BASE = 'https://api.openweathermap.org'

export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`No results found for "${city}". Check the spelling and try again.`)
    this.name = 'CityNotFoundError'
  }
}

export class WeatherFetchError extends Error {
  constructor(message = 'Unable to fetch weather data. Please try again.') {
    super(message)
    this.name = 'WeatherFetchError'
  }
}

async function safeJson<T>(res: Response): Promise<T> {
  if (!res.ok) throw new WeatherFetchError()
  return res.json() as Promise<T>
}

/** Step 1 — city name → { lat, lon, name, country } */
async function geocode(city: string): Promise<OWMGeoEntry> {
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  const res = await fetch(url)
  const data = await safeJson<OWMGeoEntry[]>(res)
  if (!data.length) throw new CityNotFoundError(city)
  return data[0]
}

/** Parse the 3-hourly forecast list into 5 daily summaries (skipping today) */
function parseForecast(list: OWMForecastResponse['list']): ForecastDay[] {
  const todayDate = new Date().toISOString().slice(0, 10)

  // Group entries by date
  const byDate = new Map<string, OWMForecastResponse['list']>()
  for (const entry of list) {
    const date = entry.dt_txt.slice(0, 10)
    if (!byDate.has(date)) byDate.set(date, [])
    byDate.get(date)!.push(entry)
  }

  const futureDates = [...byDate.keys()].filter((d) => d !== todayDate).slice(0, 5)

  return futureDates.map((date) => {
    const entries = byDate.get(date)!

    // Prefer the noon entry for the icon/description; fall back to first
    const noonEntry = entries.find((e) => e.dt_txt.includes('12:00:00')) ?? entries[0]

    const high = Math.round(Math.max(...entries.map((e) => e.main.temp_max)))
    const low = Math.round(Math.min(...entries.map((e) => e.main.temp_min)))

    const d = new Date(`${date}T12:00:00`)
    const dateLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

    return {
      dateLabel,
      high,
      low,
      icon: noonEntry.weather[0].icon,
      description: noonEntry.weather[0].description,
    }
  })
}

/** Full two-step weather fetch: geocode → current + forecast in parallel */
export async function fetchWeather(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new WeatherFetchError(
      'Weather API key is not configured. Add VITE_WEATHER_API_KEY to your .env file.'
    )
  }
  const { lat, lon, name, country } = await geocode(city)

  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    ),
    fetch(
      `${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    ),
  ])

  const [currentRaw, forecastRaw] = await Promise.all([
    safeJson<OWMCurrentResponse>(currentRes),
    safeJson<OWMForecastResponse>(forecastRes),
  ])

  return {
    current: {
      cityName: currentRaw.name || name,
      country: currentRaw.sys.country || country,
      temp: Math.round(currentRaw.main.temp),
      feelsLike: Math.round(currentRaw.main.feels_like),
      description: currentRaw.weather[0].description,
      icon: currentRaw.weather[0].icon,
      humidity: currentRaw.main.humidity,
      windSpeed: Math.round(currentRaw.wind.speed * 10) / 10,
    },
    forecast: parseForecast(forecastRaw.list),
  }
}

export function owmIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
