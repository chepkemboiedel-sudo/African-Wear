// Accent → gradient stops used to generate on-brand product/banner artwork.
// Designed so that when real photography arrives, only ProductImage changes.

export const accentGradients = {
  clay: ['#E07A52', '#B4492C'],
  ochre: ['#E7B43A', '#B97E16'],
  indigo: ['#3C4C86', '#1E2A4A'],
  emerald: ['#2FB3A2', '#0F5C54'],
  earth: ['#9A6A40', '#5E3A20'],
  charcoal: ['#4A433D', '#241F1B'],
  crimson: ['#C0463E', '#7C1F1A'],
  cream: ['#EAD7B7', '#C9A36B'],
  silver: ['#9AA3B4', '#3E465C'],
}

export const accentSolid = {
  clay: '#C75B39',
  ochre: '#D89B22',
  indigo: '#2B3A67',
  emerald: '#1B998B',
  earth: '#7A4B2B',
  charcoal: '#2A2522',
  crimson: '#9E2B25',
  cream: '#C9A36B',
  silver: '#AEB6C2',
}

export const getGradient = (accent) => accentGradients[accent] ?? accentGradients.clay

// A small, deterministic set of motif keys so each thumbnail variant differs.
export const variantMotifs = ['diamonds', 'zigzag', 'weave']
