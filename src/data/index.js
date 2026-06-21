// Single entry point for the data layer. Components import query helpers from
// here, so swapping the mock arrays for a real API later only touches this file.

import { products, getProduct } from './products.js'
import { vendors, getVendor } from './vendors.js'
import { categories, getCategory, colorTags } from './categories.js'

export { products, vendors, categories, colorTags, getProduct, getVendor, getCategory }

// ── Derived collections ──────────────────────────────────────────────
export const getProductsByVendor = (vendorId) =>
  products.filter((p) => p.vendorId === vendorId)

export const getProductsByCategory = (slug) =>
  products.filter((p) => p.category === slug)

export const getTrending = (limit = 8) =>
  products.filter((p) => p.isTrending).slice(0, limit)

export const getNewArrivals = (limit = 8) =>
  products.filter((p) => p.isNew).slice(0, limit)

export const getFeaturedVendors = (limit = 8) => vendors.slice(0, limit)

// "More from this vendor" — same vendor, excluding the current product.
export const getMoreFromVendor = (product, limit = 4) =>
  products
    .filter((p) => p.vendorId === product.vendorId && p.id !== product.id)
    .slice(0, limit)

// "You may also like" — same category from other vendors, padded if sparse.
export const getRelated = (product, limit = 4) => {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  )
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  )
  return [...sameCategory, ...others].slice(0, limit)
}

// Count how many products sit in each category (for the browse sidebar).
export const categoryCounts = categories.reduce((acc, c) => {
  acc[c.slug] = getProductsByCategory(c.slug).length
  return acc
}, {})

export const priceBounds = products.reduce(
  (acc, p) => ({
    min: Math.min(acc.min, p.price),
    max: Math.max(acc.max, p.price),
  }),
  { min: Infinity, max: -Infinity },
)

// ── The core filter + sort engine used by Browse and Vendor pages ─────
export function queryProducts(
  list,
  { search = '', categories: cats = [], vendors: vens = [], colors = [], maxPrice = Infinity, sort = 'featured' } = {},
) {
  // Split the query into words so "beaded sandals" matches a "Beaded Leather
  // Sandals" — every token must appear somewhere in the product's text.
  const tokens = search.trim().toLowerCase().split(/\s+/).filter(Boolean)

  let result = list.filter((p) => {
    if (cats.length && !cats.includes(p.category)) return false
    if (vens.length && !vens.includes(p.vendorId)) return false
    if (colors.length && !colors.some((c) => p.colors.includes(c))) return false
    if (p.price > maxPrice) return false
    if (tokens.length) {
      const vendor = getVendor(p.vendorId)
      const haystack = `${p.name} ${p.description} ${p.fabric} ${p.category} ${
        vendor?.name ?? ''
      } ${p.colors.join(' ')}`.toLowerCase()
      if (!tokens.every((t) => haystack.includes(t))) return false
    }
    return true
  })

  switch (sort) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result = [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew))
      break
    case 'popularity':
      result = [...result].sort((a, b) => b.reviews - a.reviews)
      break
    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating)
      break
    default: // featured: trending first, then by rating
      result = [...result].sort(
        (a, b) => Number(b.isTrending) - Number(a.isTrending) || b.rating - a.rating,
      )
  }

  return result
}
