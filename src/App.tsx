import { Header } from './components/Header'
import { SearchSection } from './components/SearchSection'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-50 via-white to-cyan-50">
      <Header />
      <main className="flex flex-1 flex-col items-center pt-4">
        <SearchSection />
      </main>
      <footer className="py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Nimbus
      </footer>
    </div>
  )
}

export default App
