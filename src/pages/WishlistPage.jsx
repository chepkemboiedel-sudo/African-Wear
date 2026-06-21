import { Link } from 'react-router-dom'
import { ChevronRight, Heart, ArrowRight } from 'lucide-react'
import ProductGrid from '../components/ProductGrid.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { products } from '../data/index.js'
import { pluralize } from '../utils/format.js'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const wished = products.filter((p) => ids.has(p.id))

  return (
    <div className="container-max section-pad py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-indigo-400">
        <Link to="/" className="hover:text-clay-500">Home</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-indigo-600">Wishlist</span>
      </nav>

      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-clay-50 text-clay-400">
          <Heart size={24} className="fill-clay-400" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold text-indigo-700">Your wishlist</h1>
          {wished.length > 0 && (
            <p className="text-indigo-400">{pluralize(wished.length, 'saved piece')}</p>
          )}
        </div>
      </div>

      {wished.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-4xl border-2 border-dashed border-clay-100 bg-cream-50 px-6 py-24 text-center">
          <Heart className="text-clay-200" size={48} />
          <p className="font-display text-2xl text-indigo-700">No saved pieces yet</p>
          <p className="max-w-sm text-indigo-400">
            Tap the heart on any piece to keep it here for later.
          </p>
          <Link to="/browse" className="btn-primary mt-3">
            Discover pieces <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <ProductGrid products={wished} />
      )}
    </div>
  )
}
