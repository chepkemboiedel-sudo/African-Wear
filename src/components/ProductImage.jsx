import { useMemo } from 'react'
import { getGradient } from '../utils/visuals.js'
import { getVendor } from '../data/index.js'

// Generates an on-brand SVG "photo" for a product. Each `variant` shifts the
// motif + gradient angle so a product's thumbnails look like different angles.
// Swap this single component for an <img> when real photography is available.

const motifs = ['diamonds', 'zigzag', 'weave']

function Motif({ kind, id }) {
  switch (kind) {
    case 'zigzag':
      return (
        <pattern id={id} width="40" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M0 18 L10 6 L20 18 L30 6 L40 18"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeOpacity="0.5"
          />
          <circle cx="20" cy="3" r="2" fill="#fff" fillOpacity="0.45" />
        </pattern>
      )
    case 'weave':
      return (
        <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="none" />
          <path d="M0 9 H36 M0 27 H36" stroke="#fff" strokeWidth="3" strokeOpacity="0.35" />
          <path d="M9 0 V36 M27 0 V36" stroke="#000" strokeWidth="3" strokeOpacity="0.12" />
          <rect x="14" y="14" width="8" height="8" fill="#fff" fillOpacity="0.4" />
        </pattern>
      )
    default: // diamonds
      return (
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <path
            d="M22 4 L40 22 L22 40 L4 22 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          <circle cx="22" cy="22" r="4" fill="#fff" fillOpacity="0.4" />
        </pattern>
      )
  }
}

export default function ProductImage({ product, variant = 0, className = '', showLabel = true }) {
  const vendor = getVendor(product.vendorId)
  const [c1, c2] = getGradient(product.accent)
  const motif = motifs[variant % motifs.length]
  const uid = useMemo(
    () => `${product.id}-${variant}-${Math.random().toString(36).slice(2, 7)}`,
    [product.id, variant],
  )
  const angle = variant === 1 ? 135 : variant === 2 ? 90 : 45
  const rad = (angle * Math.PI) / 180

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label={`${product.name} by ${vendor?.name ?? 'vendor'}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id={`grad-${uid}`}
          x1="0"
          y1="0"
          x2={Math.cos(rad)}
          y2={Math.sin(rad)}
        >
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <Motif kind={motif} id={`motif-${uid}`} />
      </defs>

      <rect width="400" height="500" fill={`url(#grad-${uid})`} />
      <rect width="400" height="500" fill={`url(#motif-${uid})`} />

      {/* soft vignette so text stays readable */}
      <rect width="400" height="500" fill="#000" fillOpacity="0.06" />
      <rect x="0" y="380" width="400" height="120" fill="#000" fillOpacity="0.22" />

      {/* kente accent strip */}
      <g>
        {Array.from({ length: 20 }).map((_, i) => (
          <rect
            key={i}
            x={i * 20}
            y="356"
            width="20"
            height="8"
            fill={['#D89B22', '#C75B39', '#1B998B', '#2B3A67'][i % 4]}
            fillOpacity="0.9"
          />
        ))}
      </g>

      {showLabel && (
        <>
          <text
            x="24"
            y="424"
            fill="#fff"
            fillOpacity="0.85"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="700"
            letterSpacing="2"
          >
            {(product.category || '').toUpperCase()}
          </text>
          <text
            x="24"
            y="458"
            fill="#fff"
            fontFamily="Fraunces, serif"
            fontSize="26"
            fontWeight="600"
          >
            {product.name.length > 22 ? product.name.slice(0, 21) + '…' : product.name}
          </text>
          <text
            x="24"
            y="482"
            fill="#fff"
            fillOpacity="0.8"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
          >
            {vendor?.name}
          </text>
        </>
      )}

      {/* vendor monogram chip, top-left */}
      <g>
        <rect x="20" y="20" width="44" height="44" rx="12" fill="#fff" fillOpacity="0.92" />
        <text
          x="42"
          y="49"
          textAnchor="middle"
          fill={c2}
          fontFamily="Fraunces, serif"
          fontSize="18"
          fontWeight="700"
        >
          {vendor?.monogram}
        </text>
      </g>
    </svg>
  )
}
