import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => new Set())

  const toggle = useCallback((productId) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }, [])

  const has = useCallback((productId) => ids.has(productId), [ids])

  const value = useMemo(
    () => ({ ids, count: ids.size, toggle, has }),
    [ids, toggle, has],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
