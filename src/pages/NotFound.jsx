import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-max section-pad flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="pattern-strip mb-8 h-2 w-40 rounded-full" />
      <p className="font-display text-7xl font-black text-clay-400">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-indigo-700">
        This piece has wandered off
      </h1>
      <p className="mt-2 max-w-md text-indigo-400">
        We couldn't find the page you were looking for. Let's get you back to the colour.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <Home size={18} /> Back home
        </Link>
        <Link to="/browse" className="btn-outline">
          <Search size={18} /> Browse pieces
        </Link>
      </div>
    </div>
  )
}
