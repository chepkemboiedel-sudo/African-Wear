import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the top whenever the route path changes (not on query-only changes,
// so filtering on the browse page doesn't jump the viewport).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}
