import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, SlidersHorizontal, X, Search } from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { products, queryProducts, priceBounds, getCategory } from '../data/index.js'
import { pluralize } from '../utils/format.js'

const csv = (v) => (v ? v.split(',').filter(Boolean) : [])

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Most popular' },
  { value: 'rating', label: 'Top rated' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filters = useMemo(
    () => ({
      search: searchParams.get('search') ?? '',
      categories: csv(searchParams.get('category')),
      vendors: csv(searchParams.get('vendor')),
      colors: csv(searchParams.get('color')),
      maxPrice: Number(searchParams.get('maxPrice')) || priceBounds.max,
    }),
    [searchParams],
  )
  const sort = searchParams.get('sort') ?? 'featured'

  const writeFilters = (partial) => {
    const next = new URLSearchParams(searchParams)
    const setCsv = (key, arr) =>
      arr && arr.length ? next.set(key, arr.join(',')) : next.delete(key)

    if ('search' in partial)
      partial.search ? next.set('search', partial.search) : next.delete('search')
    if ('categories' in partial) setCsv('category', partial.categories)
    if ('vendors' in partial) setCsv('vendor', partial.vendors)
    if ('colors' in partial) setCsv('color', partial.colors)
    if ('maxPrice' in partial) {
      partial.maxPrice >= priceBounds.max
        ? next.delete('maxPrice')
        : next.set('maxPrice', String(partial.maxPrice))
    }
    setSearchParams(next, { replace: true })
  }

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams)
    value === 'featured' ? next.delete('sort') : next.set('sort', value)
    setSearchParams(next, { replace: true })
  }

  const clearAll = () => {
    const next = new URLSearchParams()
    if (sort !== 'featured') next.set('sort', sort)
    setSearchParams(next, { replace: true })
  }

  const results = useMemo(
    () => queryProducts(products, { ...filters, sort }),
    [filters, sort],
  )

  const activeCount =
    filters.categories.length +
    filters.vendors.length +
    filters.colors.length +
    (filters.maxPrice < priceBounds.max ? 1 : 0) +
    (filters.search ? 1 : 0)

  // page title reflects a single active category, else generic
  const soleCategory =
    filters.categories.length === 1 ? getCategory(filters.categories[0]) : null
  const heading = filters.search
    ? `Results for “${filters.search}”`
    : soleCategory
      ? soleCategory.name
      : 'All pieces'

  return (
    <div className="container-max section-pad py-8">
      {/* breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-indigo-400">
        <Link to="/" className="hover:text-clay-500">Home</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-indigo-600">{heading}</span>
      </nav>

      {/* header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold text-indigo-700">{heading}</h1>
        <p className="mt-1 text-indigo-400">
          {pluralize(results.length, 'piece')} from independent African designers
        </p>
      </div>

      {/* in-page search + active chips */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex w-full items-center gap-2 rounded-full bg-cream-50 px-4 py-3 shadow-card ring-1 ring-clay-100/50 md:max-w-md">
          <Search size={18} className="text-indigo-400" />
          <input
            value={filters.search}
            onChange={(e) => writeFilters({ search: e.target.value })}
            placeholder="Search within results…"
            className="w-full bg-transparent text-sm text-indigo-700 placeholder:text-indigo-300 focus:outline-none"
          />
          {filters.search && (
            <button onClick={() => writeFilters({ search: '' })} aria-label="Clear search">
              <X size={16} className="text-indigo-400 hover:text-clay-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-clay-100/50">
            <FilterSidebar
              filters={filters}
              onChange={writeFilters}
              onClear={clearAll}
              priceBounds={priceBounds}
              activeCount={activeCount}
            />
          </div>
        </aside>

        {/* results column */}
        <div className="min-w-0 flex-1">
          {/* toolbar */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="btn-outline px-4 py-2.5 text-sm lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
              {activeCount > 0 && (
                <span className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-clay-400 text-xs text-cream-50">
                  {activeCount}
                </span>
              )}
            </button>

            <div className="ml-auto flex items-center gap-2">
              <label className="hidden text-sm font-medium text-indigo-400 sm:block">
                Sort by
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full bg-cream-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-card ring-1 ring-clay-100/50 focus:outline-none focus:ring-2 focus:ring-ochre-300"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* active filter chips */}
          {activeCount > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {filters.categories.map((c) => (
                <Chip key={c} onClear={() => writeFilters({ categories: filters.categories.filter((x) => x !== c) })}>
                  {getCategory(c)?.name}
                </Chip>
              ))}
              {filters.colors.map((c) => (
                <Chip key={c} onClear={() => writeFilters({ colors: filters.colors.filter((x) => x !== c) })}>
                  {c}
                </Chip>
              ))}
              {filters.maxPrice < priceBounds.max && (
                <Chip onClear={() => writeFilters({ maxPrice: priceBounds.max })}>
                  Under ${filters.maxPrice}
                </Chip>
              )}
              <button onClick={clearAll} className="text-xs font-semibold text-clay-500 hover:underline">
                Clear all
              </button>
            </div>
          )}

          <ProductGrid products={results} columns={3} />
        </div>
      </div>

      {/* mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-indigo-700/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-cream-100 p-6 shadow-2xl animate-slide-in">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-indigo-700">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-200"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={writeFilters}
              onClear={clearAll}
              priceBounds={priceBounds}
              activeCount={activeCount}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Chip({ children, onClear }) {
  return (
    <span className="chip bg-clay-50 text-clay-500">
      {children}
      <button onClick={onClear} aria-label="Remove filter">
        <X size={13} />
      </button>
    </span>
  )
}
