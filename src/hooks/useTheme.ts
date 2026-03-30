import { useState, useEffect } from 'react'

const STORAGE_KEY = 'nimbus-theme'

function getInitialDark(): boolean {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialDark)

  // Keep <html> class in sync with state
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Follow system preference changes when the user has no manual override
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        setIsDark(e.matches)
      }
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [])

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      return next
    })
  }

  return { isDark, toggle }
}
