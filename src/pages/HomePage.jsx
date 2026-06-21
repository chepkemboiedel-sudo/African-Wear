import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, ShieldCheck, Users, Star } from 'lucide-react'
import CategoryTile from '../components/CategoryTile.jsx'
import VendorCard from '../components/VendorCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductImage from '../components/ProductImage.jsx'
import PatternDivider from '../components/PatternDivider.jsx'
import {
  categories,
  getFeaturedVendors,
  getTrending,
  getNewArrivals,
  products,
  vendors,
} from '../data/index.js'

export default function HomePage() {
  const featuredVendors = getFeaturedVendors(10)
  const trending = getTrending(8)
  const newArrivals = getNewArrivals(4)
  const heroProducts = [products[0], products[12], products[6]]

  return (
    <div>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-cream-100">
        <div className="pattern-wax-soft absolute inset-0" />
        <div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle,#D89B22,transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle,#1B998B,transparent 70%)' }}
        />

        <div className="container-max section-pad relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          {/* copy */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <Sparkles size={14} /> The home of African fashion
            </span>
            <h1 className="mt-4 font-display text-5xl font-black leading-[1.02] text-indigo-700 sm:text-6xl xl:text-7xl text-balance">
              Wear the
              <span className="relative mx-3 inline-block">
                <span className="relative z-10 text-clay-400">colour</span>
                <span className="absolute -bottom-1 left-0 z-0 h-4 w-full -rotate-1 bg-ochre-200" />
              </span>
              of a continent.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-indigo-500">
              Sankofa unites independent designers from Lagos to Dakar to Nairobi —
              handwoven Kente, bold Ankara, grand Agbada and more, all in one
              celebratory marketplace.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/browse" className="btn-primary text-base">
                Shop the marketplace <ArrowRight size={18} />
              </Link>
              <Link to="/vendors" className="btn-outline text-base">
                Meet the makers
              </Link>
            </div>

            {/* mini stats */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Stat value={`${vendors.length}`} label="Designers" />
              <Stat value={`${products.length}+`} label="Unique pieces" />
              <Stat value="12" label="Countries served" />
              <Stat value="4.9★" label="Avg. rating" />
            </div>
          </div>

          {/* hero collage */}
          <div className="relative animate-scale-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <HeroImg product={heroProducts[0]} className="h-56 rotate-[-2deg]" />
                <HeroImg product={heroProducts[1]} className="h-64 rotate-[1.5deg]" />
              </div>
              <div className="space-y-4 pt-10">
                <HeroImg product={heroProducts[2]} className="h-72 rotate-[2deg]" />
                <div className="card-surface flex items-center gap-3 rounded-3xl p-4 rotate-[-1deg]">
                  <div className="flex -space-x-3">
                    {featuredVendors.slice(0, 3).map((v) => (
                      <span
                        key={v.id}
                        className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold text-cream-50 ring-2 ring-cream-50"
                        style={{ background: `linear-gradient(135deg,${v.from},${v.to})` }}
                      >
                        {v.monogram}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="flex items-center gap-1 font-display text-sm font-bold text-indigo-700">
                      <Star size={13} className="fill-ochre-300 text-ochre-300" /> Trusted makers
                    </p>
                    <p className="text-xs text-indigo-400">Loved by 9,000+ buyers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="relative border-t border-clay-100/60 bg-cream-50/70">
          <div className="container-max section-pad grid grid-cols-2 gap-4 py-5 md:grid-cols-4">
            <Trust icon={Truck} title="Free shipping" sub="On orders over $150" />
            <Trust icon={ShieldCheck} title="Authentic & ethical" sub="Direct from makers" />
            <Trust icon={Users} title={`${vendors.length} independent vendors`} sub="One marketplace" />
            <Trust icon={Sparkles} title="Handcrafted" sub="Many one-of-a-kind" />
          </div>
        </div>
      </section>

      {/* ───────── CATEGORIES ───────── */}
      <section className="container-max section-pad py-16">
        <SectionHead
          eyebrow="Find your style"
          title="Shop by category"
          action={{ to: '/browse', label: 'View all' }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((c, i) => (
            <CategoryTile key={c.slug} category={c} large={i === 0} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(4).map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <PatternDivider className="container-max section-pad" />

      {/* ───────── FEATURED VENDORS ───────── */}
      <section className="py-16">
        <div className="container-max section-pad">
          <SectionHead
            eyebrow="The marketplace"
            title="Featured vendors"
            subtitle="Each an independent label with its own story, studio and signature."
            action={{ to: '/vendors', label: 'All vendors' }}
          />
        </div>
        <div className="no-scrollbar flex gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-10 xl:px-16">
          {featuredVendors.map((v) => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </div>
      </section>

      {/* ───────── TRENDING ───────── */}
      <section className="container-max section-pad py-16">
        <SectionHead
          eyebrow="Hot right now"
          title="Trending pieces"
          subtitle="What the community is loving this week."
          action={{ to: '/browse?sort=popularity', label: 'Shop trending' }}
        />
        <ProductGrid products={trending} />
      </section>

      {/* ───────── NEW ARRIVALS feature band ───────── */}
      <section className="relative overflow-hidden bg-indigo-700 py-16">
        <div className="pattern-mudcloth absolute inset-0 opacity-20" />
        <div className="container-max section-pad relative">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-ochre-200">
                <Sparkles size={14} /> Just landed
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-cream-50 sm:text-4xl">
                New arrivals
              </h2>
            </div>
            <Link
              to="/browse?sort=newest"
              className="hidden items-center gap-1.5 font-semibold text-cream-100 hover:text-cream-50 sm:flex"
            >
              See all new <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* ───────── BECOME A VENDOR CTA ───────── */}
      <section className="container-max section-pad py-16">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-clay-400 to-ochre-400 p-8 text-cream-50 sm:p-14">
          <div className="pattern-wax absolute inset-0 opacity-30" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-balance">
              Are you a designer? Open your shop on Sankofa.
            </h2>
            <p className="mt-3 max-w-xl text-cream-100">
              Join a curated community of African fashion labels reaching buyers worldwide.
              Your storefront, your story, your terms.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/vendors" className="btn bg-cream-50 px-6 py-3 text-clay-500 hover:bg-cream-100">
                Become a vendor <ArrowRight size={18} />
              </Link>
              <Link to="/browse" className="btn border-2 border-cream-50/70 px-6 py-3 text-cream-50 hover:bg-cream-50/10">
                Explore first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── small local building blocks ── */
function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-indigo-700">{value}</p>
      <p className="text-sm text-indigo-400">{label}</p>
    </div>
  )
}

function HeroImg({ product, className = '' }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`block overflow-hidden rounded-3xl shadow-card-hover ring-1 ring-black/5 transition hover:scale-[1.02] ${className}`}
    >
      <ProductImage product={product} className="h-full w-full object-cover" />
    </Link>
  )
}

function Trust({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-clay-50 text-clay-400">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-indigo-700">{title}</p>
        <p className="text-xs text-indigo-400">{sub}</p>
      </div>
    </div>
  )
}

function SectionHead({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-indigo-700 sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-xl text-indigo-400">{subtitle}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group flex items-center gap-1.5 font-semibold text-clay-500 hover:text-clay-600"
        >
          {action.label}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
