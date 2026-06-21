import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { categories, vendors } from '../data/index.js'

const navLinks = [
  { to: '/browse', label: 'Shop All' },
  { to: '/browse?category=ankara', label: 'Ankara' },
  { to: '/browse?category=kente', label: 'Kente' },
  { to: '/browse?category=agbada', label: 'Agbada' },
  { to: '/vendors', label: 'Vendors' },
]

export default function Header() {
  const { count, openCart } = useCart()
  const { count: wishCount } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname, location.search])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = search.trim()
    navigate(q ? `/browse?search=${encodeURIComponent(q)}` : '/browse')
  }

  return (
    <header className="sticky top-0 z-40">
      {/* announcement strip */}
      <div className="pattern-strip h-1.5 w-full" />
      <div className="bg-indigo-700 py-2 text-center text-xs font-medium tracking-wide text-cream-100">
        ✦ Free continental shipping over $150 · {vendors.length} independent designers · Made across Africa ✦
      </div>

      <div
        className={`border-b border-clay-100/60 bg-cream-50/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-card' : ''
        }`}
      >
        <div className="container-max section-pad">
          <div className="flex h-16 items-center gap-4 lg:h-20">
            {/* mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden -ml-1 grid h-10 w-10 place-items-center rounded-full text-indigo-600 hover:bg-cream-200"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* logo */}
            <Link to="/" className="flex shrink-0 items-center gap-2.5">
              <span
                className="grid h-10 w-10 place-items-center rounded-xl font-display text-xl font-bold text-cream-50 shadow-card"
                style={{ background: 'linear-gradient(135deg,#C8821C,#1E7A43)' }}
              >
                S
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-indigo-700">
                Sankofa
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="ml-2 hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-clay-50 text-clay-500'
                        : 'text-indigo-600 hover:bg-cream-200'
                    }`
                  }
                  end={link.to === '/browse'}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* search (desktop) */}
            <form
              onSubmit={submitSearch}
              className="ml-auto hidden flex-1 max-w-sm items-center md:flex"
            >
              <div className="flex w-full items-center gap-2 rounded-full bg-cream-200 px-4 py-2.5 ring-1 ring-transparent transition focus-within:bg-cream-50 focus-within:ring-ochre-300">
                <Search size={18} className="text-indigo-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search dresses, kente, vendors…"
                  className="w-full bg-transparent text-sm text-indigo-700 placeholder:text-indigo-300 focus:outline-none"
                />
              </div>
            </form>

            {/* actions */}
            <div className="ml-auto flex items-center gap-1 md:ml-2">
              <Link
                to="/wishlist"
                className="relative grid h-10 w-10 place-items-center rounded-full text-indigo-600 hover:bg-cream-200"
                aria-label="Wishlist"
              >
                <Heart size={21} />
                {wishCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-clay-400 px-1 text-[11px] font-bold text-cream-50">
                    {wishCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="relative grid h-10 w-10 place-items-center rounded-full text-indigo-600 hover:bg-cream-200"
                aria-label={`Cart, ${count} items`}
              >
                <ShoppingBag size={21} />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-clay-400 px-1 text-[11px] font-bold text-cream-50 animate-scale-in">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* search (mobile) */}
          <form onSubmit={submitSearch} className="pb-3 md:hidden">
            <div className="flex w-full items-center gap-2 rounded-full bg-cream-200 px-4 py-2.5">
              <Search size={18} className="text-indigo-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pieces & vendors…"
                className="w-full bg-transparent text-sm text-indigo-700 placeholder:text-indigo-300 focus:outline-none"
              />
            </div>
          </form>
        </div>
      </div>

      {/* mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden animate-fade-in border-b border-clay-100/60 bg-cream-50 shadow-card">
          <nav className="container-max section-pad flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="rounded-xl px-4 py-3 text-base font-semibold text-indigo-600 hover:bg-cream-200"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-clay-100/60 pt-3">
              <p className="px-4 pb-1 text-xs font-bold uppercase tracking-wider text-clay-400">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/browse?category=${c.slug}`}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-indigo-600 hover:bg-cream-200"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
