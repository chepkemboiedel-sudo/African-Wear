import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Plus } from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import { getVendor } from '../data/index.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function ProductCard({ product }) {
  const vendor = getVendor(product.vendorId)
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const wished = has(product.id)

  const defaultSize = product.sizes[0]

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id, { size: defaultSize, qty: 1 })
  }

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card ring-1 ring-clay-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <ProductImage
          product={product}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="chip bg-emerald-400 text-cream-50 shadow-sm">New</span>
          )}
          {product.isTrending && (
            <span className="chip bg-ochre-300 text-indigo-700 shadow-sm">Trending</span>
          )}
        </div>

        {/* wishlist */}
        <button
          type="button"
          onClick={handleWish}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream-50/90 text-clay-400 shadow-sm backdrop-blur transition hover:scale-110 hover:bg-cream-50"
        >
          <Heart size={17} className={wished ? 'fill-clay-400' : ''} />
        </button>

        {/* quick add — slides up on hover (still tap-friendly on mobile) */}
        <button
          type="button"
          onClick={handleAdd}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-indigo-500/95 py-2.5 text-sm font-semibold text-cream-50 opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:bg-clay-400 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag size={16} /> Quick add
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate(`/vendor/${vendor.id}`)
          }}
          className="self-start text-xs font-semibold uppercase tracking-wider text-clay-400 hover:text-clay-500 hover:underline"
        >
          {vendor?.name}
        </button>

        <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-indigo-700 line-clamp-2">
          {product.name}
        </h3>

        {/* colour swatches */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c}
              title={c}
              className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
              style={{
                background: c === 'Multicolour'
                  ? 'conic-gradient(#C75B39,#D89B22,#1B998B,#2B3A67,#C75B39)'
                  : colorHex(c),
              }}
            />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-bold text-indigo-700">
            {formatPrice(product.price)}
          </span>
          <span
            onClick={handleAdd}
            role="button"
            tabIndex={-1}
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full bg-cream-200 text-indigo-600 transition hover:bg-clay-400 hover:text-cream-50 sm:hidden"
          >
            <Plus size={18} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// Local colour map kept here so the card has no external swatch dependency.
function colorHex(name) {
  const map = {
    Terracotta: '#C75B39',
    Gold: '#D89B22',
    Indigo: '#2B3A67',
    Emerald: '#1B998B',
    Crimson: '#9E2B25',
    'Royal Blue': '#2D4EA2',
    Cream: '#F5E9D6',
    'Earth Brown': '#7A4B2B',
    Charcoal: '#2A2522',
    Silver: '#AEB6C2',
  }
  return map[name] ?? '#999'
}
