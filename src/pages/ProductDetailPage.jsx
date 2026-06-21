import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Store,
  Check,
} from 'lucide-react'
import ProductImage from '../components/ProductImage.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import StarRating from '../components/StarRating.jsx'
import PatternDivider from '../components/PatternDivider.jsx'
import NotFound from './NotFound.jsx'
import {
  getProduct,
  getVendor,
  getCategory,
  getMoreFromVendor,
  getRelated,
} from '../data/index.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { formatPrice } from '../utils/format.js'

const colorHex = {
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

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = getProduct(id)

  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState(product?.sizes[0] ?? 'One size')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const { addItem } = useCart()
  const { has, toggle } = useWishlist()

  if (!product) return <NotFound />

  const vendor = getVendor(product.vendorId)
  const category = getCategory(product.category)
  const wished = has(product.id)
  const moreFromVendor = getMoreFromVendor(product, 4)
  const related = getRelated(product, 4)

  const handleAdd = () => {
    addItem(product.id, { size, qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container-max section-pad py-8">
      {/* breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-indigo-400">
        <Link to="/" className="hover:text-clay-500">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/browse?category=${product.category}`} className="hover:text-clay-500">
          {category?.name}
        </Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-indigo-600 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row lg:sticky lg:top-28 lg:self-start">
          {/* thumbnails */}
          <div className="flex gap-3 sm:flex-col">
            {[0, 1, 2].map((v) => (
              <button
                key={v}
                onClick={() => setActiveImg(v)}
                className={`h-20 w-16 overflow-hidden rounded-xl ring-2 transition sm:h-24 sm:w-20 ${
                  activeImg === v ? 'ring-clay-400' : 'ring-transparent hover:ring-clay-200'
                }`}
                aria-label={`View image ${v + 1}`}
              >
                <ProductImage product={product} variant={v} showLabel={false} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* main image */}
          <div className="relative flex-1 overflow-hidden rounded-4xl shadow-card-hover ring-1 ring-black/5">
            <ProductImage
              key={activeImg}
              product={product}
              variant={activeImg}
              className="aspect-[4/5] w-full animate-fade-in object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {product.isNew && <span className="chip bg-emerald-400 text-cream-50">New arrival</span>}
              {product.isTrending && <span className="chip bg-ochre-300 text-indigo-700">Trending</span>}
            </div>
          </div>
        </div>

        {/* info */}
        <div>
          {/* vendor pill */}
          <Link
            to={`/vendor/${vendor.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-cream-50 py-1.5 pl-1.5 pr-4 shadow-card ring-1 ring-clay-100/50 transition hover:ring-clay-300"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full font-display text-xs font-bold text-cream-50"
              style={{ background: `linear-gradient(135deg,${vendor.from},${vendor.to})` }}
            >
              {vendor.monogram}
            </span>
            <span className="text-sm font-semibold text-indigo-700">{vendor.name}</span>
            <Store size={14} className="text-clay-400" />
          </Link>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-indigo-700">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-4">
            <StarRating value={product.rating} reviews={product.reviews} size={16} />
            <span className="h-4 w-px bg-clay-100" />
            <span className="text-sm font-medium text-emerald-500">In stock</span>
          </div>

          <p className="mt-5 font-display text-4xl font-bold text-indigo-700">
            {formatPrice(product.price)}
          </p>

          <p className="mt-5 leading-relaxed text-indigo-500">{product.description}</p>

          {/* colours */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-indigo-600">
              Colour: <span className="font-normal text-indigo-400">{product.colors.join(', ')}</span>
            </p>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="h-8 w-8 rounded-full ring-2 ring-cream-50 ring-offset-2 ring-offset-cream-100"
                  style={{
                    background:
                      c === 'Multicolour'
                        ? 'conic-gradient(#C75B39,#D89B22,#1B998B,#2B3A67,#C75B39)'
                        : colorHex[c],
                  }}
                />
              ))}
            </div>
          </div>

          {/* size */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-indigo-600">Size</p>
              <button className="text-xs font-semibold text-clay-500 hover:underline">
                Size guide
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition ${
                    size === s
                      ? 'border-clay-400 bg-clay-400 text-cream-50'
                      : 'border-clay-100 bg-cream-50 text-indigo-600 hover:border-clay-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* qty + add */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-between rounded-full bg-cream-50 p-1.5 shadow-card ring-1 ring-clay-100/50 sm:justify-start">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center rounded-full text-indigo-600 hover:bg-cream-200"
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <span className="w-12 text-center font-display text-lg font-bold text-indigo-700">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="grid h-10 w-10 place-items-center rounded-full text-indigo-600 hover:bg-cream-200"
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>

            <button onClick={handleAdd} className="btn-primary flex-1 text-base">
              {added ? (
                <>
                  <Check size={20} /> Added to basket
                </>
              ) : (
                <>
                  <ShoppingBag size={20} /> Add to basket · {formatPrice(product.price * qty)}
                </>
              )}
            </button>

            <button
              onClick={() => toggle(product.id)}
              aria-pressed={wished}
              className={`btn grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 transition ${
                wished
                  ? 'border-clay-400 bg-clay-50 text-clay-500'
                  : 'border-clay-100 bg-cream-50 text-indigo-500 hover:border-clay-300'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={20} className={wished ? 'fill-clay-400' : ''} />
            </button>
          </div>

          {/* fabric note */}
          <div className="mt-7 rounded-3xl bg-cream-50 p-5 shadow-card ring-1 ring-clay-100/50">
            <p className="text-xs font-bold uppercase tracking-wider text-clay-400">
              Fabric & material
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-indigo-600">{product.fabric}</p>
          </div>

          {/* perks */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Perk icon={Truck} title="Free shipping" sub="Over $150" />
            <Perk icon={RefreshCw} title="14-day returns" sub="Easy & free" />
            <Perk icon={ShieldCheck} title="Authentic" sub="From the maker" />
          </div>
        </div>
      </div>

      {/* more from vendor */}
      {moreFromVendor.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-indigo-700 sm:text-3xl">
              More from {vendor.name}
            </h2>
            <Link
              to={`/vendor/${vendor.id}`}
              className="font-semibold text-clay-500 hover:text-clay-600"
            >
              Visit store →
            </Link>
          </div>
          <ProductGrid products={moreFromVendor} />
        </section>
      )}

      <PatternDivider className="mt-16" />

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-indigo-700 sm:text-3xl">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}

function Perk({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-cream-50 px-4 py-3 ring-1 ring-clay-100/50">
      <Icon size={20} className="shrink-0 text-clay-400" />
      <div>
        <p className="text-sm font-bold text-indigo-700">{title}</p>
        <p className="text-xs text-indigo-400">{sub}</p>
      </div>
    </div>
  )
}
