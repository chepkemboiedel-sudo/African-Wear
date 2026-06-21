import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  Package,
  Mail,
  ShoppingBag,
} from 'lucide-react'
import ProductImage from '../components/ProductImage.jsx'
import PatternDivider from '../components/PatternDivider.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'

const SHIPPING_FLAT = 12
const FREE_SHIP_OVER = 150
const TAX_RATE = 0.08

export default function CheckoutPage() {
  const { items, count, subtotal, clear } = useCart()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null) // snapshot once placed

  const shipping = subtotal === 0 || subtotal >= FREE_SHIP_OVER ? 0 : SHIPPING_FLAT
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Nigeria',
    zip: '',
    card: '',
    exp: '',
    cvc: '',
  })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const placeOrder = (e) => {
    e.preventDefault()
    // snapshot the basket so the confirmation survives clearing the cart
    setOrder({
      id: 'SNK-' + Math.floor(100000 + Math.random() * 900000),
      items,
      count,
      subtotal,
      shipping,
      tax,
      total,
      email: form.email,
      name: `${form.firstName} ${form.lastName}`.trim(),
      city: form.city,
      country: form.country,
    })
    clear()
    window.scrollTo({ top: 0 })
  }

  // ── Confirmation view ──
  if (order) return <Confirmation order={order} />

  // ── Empty basket guard ──
  if (items.length === 0) {
    return (
      <div className="container-max section-pad flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-cream-200">
          <ShoppingBag className="text-clay-300" size={40} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-indigo-700">
          Nothing to check out yet
        </h1>
        <p className="mt-2 text-indigo-400">Add a piece or two to your basket first.</p>
        <Link to="/browse" className="btn-primary mt-7">Browse pieces</Link>
      </div>
    )
  }

  return (
    <div className="container-max section-pad py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-indigo-400">
        <Link to="/" className="hover:text-clay-500">Home</Link>
        <ChevronRight size={14} />
        <Link to="/cart" className="hover:text-clay-500">Basket</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-indigo-600">Checkout</span>
      </nav>

      <h1 className="mb-8 font-display text-4xl font-bold text-indigo-700">Checkout</h1>

      <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        {/* details */}
        <div className="flex flex-col gap-6">
          <Section icon={Mail} title="Contact">
            <Field label="Email address" className="sm:col-span-2">
              <input type="email" required value={form.email} onChange={set('email')} placeholder="you@email.com" className="input" />
            </Field>
          </Section>

          <Section icon={Truck} title="Shipping address">
            <Field label="First name">
              <input required value={form.firstName} onChange={set('firstName')} placeholder="Amara" className="input" />
            </Field>
            <Field label="Last name">
              <input required value={form.lastName} onChange={set('lastName')} placeholder="Okafor" className="input" />
            </Field>
            <Field label="Street address" className="sm:col-span-2">
              <input required value={form.address} onChange={set('address')} placeholder="12 Marina Street" className="input" />
            </Field>
            <Field label="City">
              <input required value={form.city} onChange={set('city')} placeholder="Lagos" className="input" />
            </Field>
            <Field label="Country">
              <select value={form.country} onChange={set('country')} className="input">
                {['Nigeria', 'Ghana', 'Kenya', 'Senegal', 'South Africa', 'United States', 'United Kingdom', 'Canada'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Postal code">
              <input required value={form.zip} onChange={set('zip')} placeholder="100001" className="input" />
            </Field>
          </Section>

          <Section icon={CreditCard} title="Payment">
            <div className="sm:col-span-2 mb-1 flex items-center gap-2 rounded-xl bg-ochre-50 px-3 py-2 text-xs font-medium text-ochre-600">
              <Lock size={14} /> Demo only — do not enter real card details. No payment is processed.
            </div>
            <Field label="Card number" className="sm:col-span-2">
              <input value={form.card} onChange={set('card')} placeholder="4242 4242 4242 4242" className="input" inputMode="numeric" />
            </Field>
            <Field label="Expiry">
              <input value={form.exp} onChange={set('exp')} placeholder="MM / YY" className="input" />
            </Field>
            <Field label="CVC">
              <input value={form.cvc} onChange={set('cvc')} placeholder="123" className="input" inputMode="numeric" />
            </Field>
          </Section>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-clay-100/50">
            <h2 className="font-display text-xl font-bold text-indigo-700">Your order</h2>

            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((line) => (
                <li key={line.key} className="flex items-center gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                    <ProductImage product={line.product} showLabel={false} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-500 px-1 text-[11px] font-bold text-cream-50">
                      {line.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-indigo-700">{line.product.name}</p>
                    <p className="text-xs text-indigo-400">Size {line.size}</p>
                  </div>
                  <span className="text-sm font-bold text-indigo-700">{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2.5 border-t border-clay-100 pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
              <Row label="Tax (8%)" value={formatPrice(tax)} />
              <div className="border-t border-clay-100 pt-2.5">
                <Row label="Total" value={formatPrice(total)} large />
              </div>
            </dl>

            <button type="submit" className="btn-primary mt-5 w-full text-base">
              <Lock size={17} /> Place order · {formatPrice(total)}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-indigo-400">
              <Lock size={12} /> Secure mock checkout — no real charge
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Confirmation({ order }) {
  return (
    <div className="container-max section-pad py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 animate-scale-in">
          <CheckCircle2 className="text-emerald-400" size={44} />
        </div>
        <p className="eyebrow mt-6 justify-center">Order confirmed</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-indigo-700 sm:text-5xl text-balance">
          Thank you{order.name ? `, ${order.name.split(' ')[0]}` : ''}! 🎉
        </h1>
        <p className="mt-3 text-indigo-500">
          Your order is confirmed and the makers have been notified. A receipt is on its way
          {order.email ? ` to ${order.email}` : ''}.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-cream-50 px-6 py-3 shadow-card ring-1 ring-clay-100/50">
          <Package className="text-clay-400" size={20} />
          <div className="text-left">
            <p className="text-xs uppercase tracking-wider text-indigo-400">Order number</p>
            <p className="font-display text-lg font-bold text-indigo-700">{order.id}</p>
          </div>
        </div>
      </div>

      <PatternDivider className="mx-auto mt-10 max-w-2xl" />

      {/* receipt */}
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-clay-100/50 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-indigo-700">Order summary</h2>
          <span className="chip bg-emerald-50 text-emerald-500">Paid (demo)</span>
        </div>

        <ul className="mt-5 divide-y divide-clay-100">
          {order.items.map((line) => (
            <li key={line.key} className="flex items-center gap-4 py-3">
              <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                <ProductImage product={line.product} showLabel={false} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-indigo-700">{line.product.name}</p>
                <p className="text-sm text-indigo-400">Size {line.size} · Qty {line.qty}</p>
              </div>
              <span className="font-bold text-indigo-700">{formatPrice(line.lineTotal)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-clay-100 pt-4 text-sm">
          <Row label="Subtotal" value={formatPrice(order.subtotal)} />
          <Row label="Shipping" value={order.shipping === 0 ? 'Free' : formatPrice(order.shipping)} />
          <Row label="Tax" value={formatPrice(order.tax)} />
          <div className="border-t border-clay-100 pt-2">
            <Row label="Total paid" value={formatPrice(order.total)} large />
          </div>
        </dl>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-cream-100 px-4 py-3 text-sm text-indigo-500">
          <Truck size={18} className="text-clay-400" />
          Estimated delivery 5–9 business days to {order.city || 'your address'}
          {order.country ? `, ${order.country}` : ''}.
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
        <Link to="/browse" className="btn-primary">Continue shopping</Link>
        <Link to="/" className="btn-outline">Back home</Link>
      </div>
    </div>
  )
}

/* ── shared bits ── */
function Section({ icon: Icon, title, children }) {
  return (
    <div className="rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-clay-100/50">
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-indigo-700">
        <Icon size={18} className="text-clay-400" /> {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}

function Field({ label, className = '', children }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-indigo-600">{label}</span>
      {children}
    </label>
  )
}

function Row({ label, value, large }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={large ? 'font-display text-lg font-bold text-indigo-700' : 'text-indigo-500'}>
        {label}
      </dt>
      <dd className={large ? 'font-display text-2xl font-bold text-indigo-700' : 'font-semibold text-indigo-700'}>
        {value}
      </dd>
    </div>
  )
}
