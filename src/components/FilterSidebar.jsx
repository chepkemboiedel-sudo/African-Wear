import { SlidersHorizontal, X } from 'lucide-react'
import { categories, vendors, colorTags, categoryCounts } from '../data/index.js'
import { formatPrice } from '../utils/format.js'

export default function FilterSidebar({
  filters,
  onChange,
  onClear,
  priceBounds,
  showCategories = true,
  showVendors = true,
  activeCount = 0,
}) {
  const toggleArray = (field, value) => {
    const set = new Set(filters[field])
    set.has(value) ? set.delete(value) : set.add(value)
    onChange({ [field]: [...set] })
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-indigo-700">
          <SlidersHorizontal size={18} className="text-clay-400" /> Filters
        </h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-semibold text-clay-500 hover:underline"
          >
            <X size={13} /> Clear ({activeCount})
          </button>
        )}
      </div>

      {/* Categories */}
      {showCategories && (
        <FilterGroup title="Category">
          <div className="flex flex-col gap-1.5">
            {categories.map((c) => (
              <label
                key={c.slug}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition hover:bg-cream-200"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c.slug)}
                  onChange={() => toggleArray('categories', c.slug)}
                  className="h-4 w-4 rounded border-clay-200 text-clay-400 focus:ring-ochre-300"
                />
                <span className="flex-1 text-indigo-600">{c.name}</span>
                <span className="text-xs text-indigo-300">{categoryCounts[c.slug]}</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Vendors */}
      {showVendors && (
        <FilterGroup title="Vendor">
          <div className="flex max-h-56 flex-col gap-1.5 overflow-y-auto pr-1">
            {vendors.map((v) => (
              <label
                key={v.id}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition hover:bg-cream-200"
              >
                <input
                  type="checkbox"
                  checked={filters.vendors.includes(v.id)}
                  onChange={() => toggleArray('vendors', v.id)}
                  className="h-4 w-4 rounded border-clay-200 text-clay-400 focus:ring-ochre-300"
                />
                <span className="flex-1 text-indigo-600">{v.name}</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Colours */}
      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2.5">
          {Object.entries(colorTags).map(([name, value]) => {
            const active = filters.colors.includes(name)
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => toggleArray('colors', name)}
                aria-pressed={active}
                className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-cream-50 transition ${
                  active ? 'ring-clay-400 scale-110' : 'ring-transparent hover:scale-105'
                }`}
                style={{
                  background: name === 'Multicolour' ? value : undefined,
                  backgroundColor: name === 'Multicolour' ? undefined : value,
                }}
              />
            )
          })}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Max price">
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-clay-400"
        />
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-indigo-400">{formatPrice(priceBounds.min)}</span>
          <span className="rounded-full bg-clay-50 px-3 py-1 font-semibold text-clay-500">
            up to {formatPrice(filters.maxPrice)}
          </span>
        </div>
      </FilterGroup>
    </div>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-clay-400">
        {title}
      </h3>
      {children}
    </div>
  )
}
