import { Link } from 'react-router-dom'
import { MapPin, ArrowUpRight } from 'lucide-react'
import StarRating from './StarRating.jsx'
import { getProductsByVendor } from '../data/index.js'

export default function VendorCard({ vendor }) {
  const productCount = getProductsByVendor(vendor.id).length

  return (
    <Link
      to={`/vendor/${vendor.id}`}
      className="group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card ring-1 ring-clay-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* banner */}
      <div
        className="relative h-28"
        style={{ background: `linear-gradient(120deg, ${vendor.from}, ${vendor.to})` }}
      >
        <div className="pattern-adinkra absolute inset-0 opacity-60" />
        <ArrowUpRight
          className="absolute right-3 top-3 text-cream-50/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={20}
        />
      </div>

      {/* logo monogram overlapping banner */}
      <div className="px-5 pb-5">
        <div
          className="-mt-9 mb-3 grid h-16 w-16 place-items-center rounded-2xl font-display text-2xl font-bold text-cream-50 shadow-card ring-4 ring-cream-50"
          style={{ background: `linear-gradient(135deg, ${vendor.from}, ${vendor.to})` }}
        >
          {vendor.monogram}
        </div>

        <h3 className="font-display text-xl font-bold text-indigo-700">{vendor.name}</h3>
        <p className="mt-0.5 text-sm text-indigo-400 line-clamp-1">{vendor.tagline}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-medium text-indigo-500">
            <MapPin size={13} className="text-clay-400" />
            {vendor.city}, {vendor.country}
          </span>
          <StarRating value={vendor.rating} size={12} />
        </div>

        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-clay-400">
          {productCount} pieces · {vendor.specialty}
        </p>
      </div>
    </Link>
  )
}
