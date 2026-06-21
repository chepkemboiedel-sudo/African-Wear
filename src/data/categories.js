// Product categories for the marketplace. `accent` maps to the Tailwind colour
// family used for tiles and badges; `pattern` selects one of the CSS motifs.

export const categories = [
  {
    slug: 'ankara',
    name: 'Ankara',
    blurb: 'Bold wax-print dresses, two-pieces & jackets',
    accent: 'clay',
    pattern: 'pattern-ankara',
  },
  {
    slug: 'kente',
    name: 'Kente',
    blurb: 'Handwoven royal cloth, stoles & sets',
    accent: 'ochre',
    pattern: 'pattern-kente',
  },
  {
    slug: 'dashiki',
    name: 'Dashiki',
    blurb: 'Iconic embroidered shirts & tunics',
    accent: 'emerald',
    pattern: 'pattern-mudcloth',
  },
  {
    slug: 'agbada',
    name: 'Agbada',
    blurb: 'Flowing three-piece grand boubou sets',
    accent: 'indigo',
    pattern: 'pattern-kente',
  },
  {
    slug: 'kaftan',
    name: 'Kaftan & Boubou',
    blurb: 'Elegant gowns & relaxed resort wear',
    accent: 'clay',
    pattern: 'pattern-mudcloth',
  },
  {
    slug: 'gele',
    name: 'Gele & Headwraps',
    blurb: 'Statement headwraps & pre-tied geles',
    accent: 'ochre',
    pattern: 'pattern-ankara',
  },
  {
    slug: 'bogolan',
    name: 'Mud-cloth',
    blurb: 'Bogolan jackets, sets & home pieces',
    accent: 'indigo',
    pattern: 'pattern-mudcloth',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    blurb: 'Beaded jewellery, bags & finishing touches',
    accent: 'emerald',
    pattern: 'pattern-kente',
  },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)

// Canonical colour tags used by the colour filter, mapped to swatch hexes.
export const colorTags = {
  Terracotta: '#C75B39',
  Gold: '#D89B22',
  Indigo: '#2B3A67',
  Emerald: '#1B998B',
  Crimson: '#9E2B25',
  'Royal Blue': '#2D4EA2',
  Cream: '#F5E9D6',
  'Earth Brown': '#7A4B2B',
  Charcoal: '#2A2522',
  Silver: '#AEB6C2',
  Multicolour: 'conic-gradient(#C75B39,#D89B22,#1B998B,#2B3A67,#C75B39)',
}
