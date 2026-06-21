import { createContext, useContext, useMemo, useReducer, useState, useCallback } from 'react'
import { getProduct } from '../data/index.js'

const CartContext = createContext(null)

// A line item is keyed by product + size, so the same garment in two sizes
// shows as two lines. Quantity merges when the same product+size is re-added.
const lineKey = (productId, size) => `${productId}__${size}`

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { productId, size, qty } = action
      const key = lineKey(productId, size)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        )
      }
      return [...state, { key, productId, size, qty }]
    }
    case 'REMOVE':
      return state.filter((l) => l.key !== action.key)
    case 'SET_QTY':
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: action.qty } : l))
        .filter((l) => l.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setOpen] = useState(false)

  const addItem = useCallback((productId, { size = 'One size', qty = 1 } = {}) => {
    dispatch({ type: 'ADD', productId, size, qty })
    setOpen(true)
  }, [])

  const removeItem = useCallback((key) => dispatch({ type: 'REMOVE', key }), [])
  const setQty = useCallback((key, qty) => dispatch({ type: 'SET_QTY', key, qty }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const openCart = useCallback(() => setOpen(true), [])
  const closeCart = useCallback(() => setOpen(false), [])

  // Hydrate line items with full product objects + computed totals.
  const detailedItems = useMemo(
    () =>
      items
        .map((l) => {
          const product = getProduct(l.productId)
          if (!product) return null
          return { ...l, product, lineTotal: product.price * l.qty }
        })
        .filter(Boolean),
    [items],
  )

  const count = useMemo(() => items.reduce((n, l) => n + l.qty, 0), [items])
  const subtotal = useMemo(
    () => detailedItems.reduce((sum, l) => sum + l.lineTotal, 0),
    [detailedItems],
  )

  const value = {
    items: detailedItems,
    rawItems: items,
    count,
    subtotal,
    isOpen,
    addItem,
    removeItem,
    setQty,
    clear,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
