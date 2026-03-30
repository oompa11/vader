export interface CurrentWeather {
  cityName: string
  country: string
  temp: number
  feelsLike: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export interface ForecastDay {
  dateLabel: string   // e.g. "Mon", "Tue"
  high: number
  low: number
  icon: string
  description: string
}

export interface WeatherData {
  current: CurrentWeather
  forecast: ForecastDay[]
}

// Raw OWM API shapes (only the fields we use)
export interface OWMGeoEntry {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export interface OWMCurrentResponse {
  name: string
  sys: { country: string }
  main: { temp: number; feels_like: number; humidity: number }
  weather: Array<{ description: string; icon: string }>
  wind: { speed: number }
}

export interface OWMForecastEntry {
  dt: number
  dt_txt: string
  main: { temp: number; temp_min: number; temp_max: number }
  weather: Array<{ description: string; icon: string }>
}

export interface OWMForecastResponse {
  list: OWMForecastEntry[]
}
