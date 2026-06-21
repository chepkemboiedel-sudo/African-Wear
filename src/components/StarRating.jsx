import { Star } from 'lucide-react'

export default function StarRating({ value = 0, reviews, size = 14, className = '' }) {
  const rounded = Math.round(value * 2) / 2
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= rounded
          const half = !filled && i + 0.5 === rounded
          return (
            <Star
              key={i}
              size={size}
              className={
                filled || half ? 'fill-ochre-300 text-ochre-300' : 'text-cream-300'
              }
              strokeWidth={1.5}
            />
          )
        })}
      </div>
      <span className="text-xs font-semibold text-indigo-500">
        {value.toFixed(1)}
        {reviews != null && (
          <span className="font-normal text-indigo-300"> ({reviews})</span>
        )}
      </span>
    </div>
  )
}
