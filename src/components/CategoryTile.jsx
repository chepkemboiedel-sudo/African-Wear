import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { accentSolid } from '../utils/visuals.js'

// accent → gradient pair for the tile background.
const tileGradients = {
  clay: ['#C75B39', '#963a24'],
  ochre: ['#D89B22', '#946212'],
  indigo: ['#2B3A67', '#171E38'],
  emerald: ['#1B998B', '#0F5C54'],
}

export default function CategoryTile({ category, large = false }) {
  const [from, to] = tileGradients[category.accent] ?? tileGradients.clay

  return (
    <Link
      to={`/browse?category=${category.slug}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl p-5 text-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
        large ? 'min-h-[20rem]' : 'min-h-[12rem]'
      }`}
      style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
    >
      <div className={`absolute inset-0 ${category.pattern} opacity-25 mix-blend-overlay`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative">
        <h3 className={`font-display font-bold ${large ? 'text-3xl' : 'text-2xl'}`}>
          {category.name}
        </h3>
        <p className="mt-0.5 max-w-[16rem] text-sm text-cream-100/90">{category.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cream-50">
          Shop now
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
