import { PackageOpen } from 'lucide-react'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, columns = 4, emptyMessage }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-clay-100 bg-cream-50 px-6 py-20 text-center">
        <PackageOpen className="text-clay-300" size={40} />
        <p className="font-display text-xl text-indigo-600">
          {emptyMessage ?? 'No pieces match your filters'}
        </p>
        <p className="text-sm text-indigo-400">Try clearing a filter or two.</p>
      </div>
    )
  }

  const colClass =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return (
    <div className={`grid grid-cols-1 gap-5 ${colClass}`}>
      {products.map((p, i) => (
        <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
