import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube, Send, Check } from 'lucide-react'
import { categories, vendors } from '../data/index.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 3500)
  }

  return (
    <footer className="mt-20">
      {/* newsletter band */}
      <div className="relative overflow-hidden bg-indigo-700">
        <div className="pattern-mudcloth absolute inset-0 opacity-20" />
        <div className="container-max section-pad relative py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-ochre-200">Join the family</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-cream-50 sm:text-4xl text-balance">
                Get first look at new drops & vendor stories
              </h2>
              <p className="mt-2 max-w-md text-cream-200">
                One thoughtful email a week celebrating African design — new arrivals,
                the makers behind them, and members-only offers.
              </p>
            </div>
            <form onSubmit={subscribe} className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-full bg-cream-50 px-5 py-3.5 text-indigo-700 placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-ochre-300"
                />
                <button type="submit" className="btn-primary shrink-0 whitespace-nowrap">
                  {done ? (
                    <>
                      <Check size={18} /> Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe <Send size={16} />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 px-2 text-xs text-cream-300">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* links */}
      <div className="bg-indigo-700 text-cream-200">
        <div className="container-max section-pad border-t border-cream-50/10 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl font-display text-xl font-bold text-cream-50"
                  style={{ background: 'linear-gradient(135deg,#C8821C,#1E7A43)' }}
                >
                  S
                </span>
                <span className="font-display text-2xl font-bold text-cream-50">Sankofa</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-300">
                A curated marketplace celebrating the finest in African fashion — uniting
                independent designers and ateliers from across the continent and diaspora.
              </p>
              <div className="mt-5 flex gap-2">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/10 text-cream-100 transition hover:bg-clay-400 hover:text-cream-50"
                    aria-label="Social link"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol title="Shop">
              <FooterLink to="/browse">All pieces</FooterLink>
              {categories.slice(0, 5).map((c) => (
                <FooterLink key={c.slug} to={`/browse?category=${c.slug}`}>
                  {c.name}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Vendors">
              <FooterLink to="/vendors">All vendors</FooterLink>
              {vendors.slice(0, 5).map((v) => (
                <FooterLink key={v.id} to={`/vendor/${v.id}`}>
                  {v.name}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Help">
              <FooterLink to="/browse">Size guide</FooterLink>
              <FooterLink to="/browse">Shipping & returns</FooterLink>
              <FooterLink to="/browse">Track order</FooterLink>
              <FooterLink to="/browse">Become a vendor</FooterLink>
              <FooterLink to="/browse">Contact us</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="border-t border-cream-50/10">
          <div className="container-max section-pad flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream-300 sm:flex-row">
            <p>© {new Date().getFullYear()} Sankofa Marketplace. A portfolio showcase — not a real store.</p>
            <p className="flex items-center gap-1.5">
              Made with <span className="text-clay-300">♥</span> celebrating African design
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="font-display text-base font-bold text-cream-50">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-cream-300 transition hover:text-cream-50 hover:underline">
        {children}
      </Link>
    </li>
  )
}
