import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, MapPin } from 'lucide-react'
import StarRating from '../components/StarRating.jsx'
import PatternDivider from '../components/PatternDivider.jsx'
import { vendors, getProductsByVendor } from '../data/index.js'

export default function VendorsPage() {
  return (
    <div className="container-max section-pad py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-indigo-400">
        <Link to="/" className="hover:text-clay-500">Home</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-indigo-600">Vendors</span>
      </nav>

      {/* hero */}
      <div className="relative overflow-hidden rounded-4xl bg-indigo-700 p-8 text-cream-50 sm:p-12">
        <div className="pattern-mudcloth absolute inset-0 opacity-20" />
        <div className="relative max-w-2xl">
          <p className="eyebrow text-ochre-200">The makers</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl text-balance">
            {vendors.length} independent labels, one marketplace
          </h1>
          <p className="mt-3 text-cream-200">
            From Lagos ateliers to Dakar couture houses, every Sankofa vendor runs their
            own mini-shop. Step inside and meet the designers shaping African fashion.
          </p>
        </div>
      </div>

      {/* grid of vendor storefront cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {vendors.map((vendor) => {
          const count = getProductsByVendor(vendor.id).length
          return (
            <Link
              key={vendor.id}
              to={`/vendor/${vendor.id}`}
              className="group flex flex-col overflow-hidden rounded-4xl bg-cream-50 shadow-card ring-1 ring-clay-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div
                className="relative h-36"
                style={{ background: `linear-gradient(120deg, ${vendor.from}, ${vendor.to})` }}
              >
                <div className="pattern-adinkra absolute inset-0 opacity-50" />
                <span className="absolute right-4 top-4 chip bg-cream-50/90 text-indigo-600">
                  {count} pieces
                </span>
              </div>

              <div className="flex flex-1 gap-4 p-6">
                <div
                  className="-mt-14 grid h-20 w-20 shrink-0 place-items-center self-start rounded-3xl font-display text-3xl font-bold text-cream-50 shadow-card ring-4 ring-cream-50"
                  style={{ background: `linear-gradient(135deg, ${vendor.from}, ${vendor.to})` }}
                >
                  {vendor.monogram}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-2xl font-bold text-indigo-700">
                      {vendor.name}
                    </h2>
                    <StarRating value={vendor.rating} size={13} />
                  </div>
                  <p className="text-sm font-medium text-clay-500">{vendor.specialty}</p>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-400 line-clamp-2">
                    {vendor.story}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-500">
                      <MapPin size={13} className="text-clay-400" />
                      {vendor.city}, {vendor.country}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-clay-500 group-hover:text-clay-600">
                      Visit shop
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <PatternDivider className="mt-16" />
    </div>
  )
}
