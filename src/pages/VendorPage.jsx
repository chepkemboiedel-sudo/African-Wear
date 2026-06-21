import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRight,
  MapPin,
  CalendarDays,
  Star,
  Package,
  Heart,
  MessageCircle,
  BadgeCheck,
} from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import StarRating from '../components/StarRating.jsx'
import NotFound from './NotFound.jsx'
import { getVendor, getProductsByVendor, queryProducts, priceBounds } from '../data/index.js'
import { pluralize } from '../utils/format.js'

const emptyFilters = { search: '', categories: [], vendors: [], colors: [], maxPrice: priceBounds.max }

export default function VendorPage() {
  const { id } = useParams()
  const vendor = getVendor(id)
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState('featured')
  const [following, setFollowing] = useState(false)

  const vendorProducts = useMemo(() => (vendor ? getProductsByVendor(vendor.id) : []), [vendor])
  const results = useMemo(
    () => queryProducts(vendorProducts, { ...filters, sort }),
    [vendorProducts, filters, sort],
  )

  if (!vendor) return <NotFound />

  const onChange = (partial) => setFilters((f) => ({ ...f, ...partial }))
  const clearAll = () => setFilters(emptyFilters)
  const activeCount =
    filters.categories.length +
    filters.colors.length +
    (filters.maxPrice < priceBounds.max ? 1 : 0) +
    (filters.search ? 1 : 0)

  const avgPrice = Math.round(
    vendorProducts.reduce((s, p) => s + p.price, 0) / vendorProducts.length,
  )

  return (
    <div>
      {/* ── banner ── */}
      <div className="relative h-56 overflow-hidden sm:h-72" style={{ background: `linear-gradient(120deg, ${vendor.from}, ${vendor.to})` }}>
        <div className="pattern-kente absolute inset-0 opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <nav className="container-max section-pad relative flex items-center gap-1.5 pt-5 text-sm text-cream-100">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={14} />
          <Link to="/vendors" className="hover:underline">Vendors</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-cream-50">{vendor.name}</span>
        </nav>
      </div>

      {/* ── vendor header card ── */}
      <div className="container-max section-pad">
        <div className="relative -mt-20 rounded-4xl bg-cream-50 p-6 shadow-card-hover ring-1 ring-clay-100/50 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl font-display text-4xl font-bold text-cream-50 shadow-card ring-4 ring-cream-50"
                style={{ background: `linear-gradient(135deg, ${vendor.from}, ${vendor.to})` }}
              >
                {vendor.monogram}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-3xl font-bold text-indigo-700 sm:text-4xl">
                    {vendor.name}
                  </h1>
                  <BadgeCheck className="text-emerald-400" size={24} />
                </div>
                <p className="mt-1 text-lg text-clay-500">{vendor.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-indigo-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-clay-400" />
                    {vendor.city}, {vendor.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="text-clay-400" />
                    Since {vendor.founded}
                  </span>
                  <StarRating value={vendor.rating} reviews={vendor.reviews} size={15} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setFollowing((v) => !v)}
                className={following ? 'btn-secondary' : 'btn-primary'}
              >
                <Heart size={18} className={following ? 'fill-cream-50' : ''} />
                {following ? 'Following' : 'Follow shop'}
              </button>
              <button className="btn-outline">
                <MessageCircle size={18} /> Message
              </button>
            </div>
          </div>

          {/* story */}
          <p className="mt-6 max-w-3xl leading-relaxed text-indigo-500">{vendor.story}</p>

          {/* stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Package} value={vendorProducts.length} label="Products" />
            <Stat icon={Star} value={vendor.rating.toFixed(1)} label="Rating" />
            <Stat icon={MessageCircle} value={vendor.reviews.toLocaleString()} label="Reviews" />
            <Stat icon={BadgeCheck} value={`$${avgPrice}`} label="Avg. price" />
          </div>
        </div>
      </div>

      {/* ── vendor products with scoped filters ── */}
      <div className="container-max section-pad py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-indigo-700 sm:text-3xl">
            {vendor.name}'s collection
          </h2>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full bg-cream-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-card ring-1 ring-clay-100/50 focus:outline-none focus:ring-2 focus:ring-ochre-300"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-28 rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-clay-100/50">
              <FilterSidebar
                filters={filters}
                onChange={onChange}
                onClear={clearAll}
                priceBounds={priceBounds}
                showVendors={false}
                activeCount={activeCount}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <p className="mb-4 text-sm text-indigo-400">{pluralize(results.length, 'piece')}</p>
            <ProductGrid products={results} columns={3} emptyMessage="No pieces match your filters in this shop" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-cream-100 px-4 py-3">
      <Icon size={20} className="text-clay-400" />
      <div>
        <p className="font-display text-xl font-bold text-indigo-700">{value}</p>
        <p className="text-xs text-indigo-400">{label}</p>
      </div>
    </div>
  )
}
