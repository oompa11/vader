import { Header } from './components/Header'
import { SearchSection } from './components/SearchSection'
import { useTheme } from './hooks/useTheme'

function App() {
  const { isDark, toggle } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-50 via-white to-cyan-50 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header isDark={isDark} onToggle={toggle} />
      <main className="flex flex-1 flex-col items-center pt-4">
        <SearchSection />
      </main>
      <footer className="py-4 text-center text-xs text-gray-400 dark:text-slate-500">
        © {new Date().getFullYear()} Nimbus
      </footer>
    </div>
  )
}

export default App
