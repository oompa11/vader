import { useState } from 'react'
import { fetchWeather, CityNotFoundError } from '@/lib/weather'
import type { WeatherData } from '@/types/weather'

type Status = 'idle' | 'loading' | 'success' | 'error'

export interface WeatherState {
  status: Status
  data: WeatherData | null
  error: string | null
  search: (city: string) => Promise<void>
}

export function useWeather(): WeatherState {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const search = async (city: string) => {
    setStatus('loading')
    setError(null)

    try {
      const result = await fetchWeather(city)
      setData(result)
      setStatus('success')
    } catch (err) {
      setData(null)
      if (err instanceof CityNotFoundError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      setStatus('error')
    }
  }

  return { status, data, error, search }
}
