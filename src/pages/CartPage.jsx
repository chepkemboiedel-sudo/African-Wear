import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Tag,
  Lock,
} from 'lucide-react'
import ProductImage from '../components/ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getVendor } from '../data/index.js'
import { formatPrice } from '../utils/format.js'

const SHIPPING_FLAT = 12
const FREE_SHIP_OVER = 150
const TAX_RATE = 0.08

export default function CartPage() {
  const { items, count, subtotal, setQty, removeItem, clear } = useCart()
  const navigate = useNavigate()

  const shipping = subtotal === 0 || subtotal >= FREE_SHIP_OVER ? 0 : SHIPPING_FLAT
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="container-max section-pad flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-cream-200">
          <ShoppingBag className="text-clay-300" size={40} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-indigo-700">
          Your basket is empty
        </h1>
        <p className="mt-2 max-w-md text-indigo-400">
          Looks like you haven't added anything yet. Explore pieces from across the continent.
        </p>
        <Link to="/browse" className="btn-primary mt-7">
          Start shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container-max section-pad py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-indigo-400">
        <Link to="/" className="hover:text-clay-500">Home</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-indigo-600">Basket</span>
      </nav>

      <div className="mb-8 flex items-end justify-between">
        <h1 className="font-display text-4xl font-bold text-indigo-700">Your basket</h1>
        <button
          onClick={clear}
          className="text-sm font-semibold text-indigo-400 hover:text-clay-500"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        {/* line items */}
        <div className="flex flex-col gap-4">
          {items.map((line) => {
            const vendor = getVendor(line.product.vendorId)
            return (
              <div
                key={line.key}
                className="flex gap-4 rounded-3xl bg-cream-50 p-4 shadow-card ring-1 ring-clay-100/50 sm:p-5"
              >
                <Link
                  to={`/product/${line.product.id}`}
                  className="h-32 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-28"
                >
                  <ProductImage product={line.product} showLabel={false} className="h-full w-full object-cover" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/vendor/${vendor.id}`}
                        className="text-xs font-semibold uppercase tracking-wider text-clay-400 hover:underline"
                      >
                        {vendor.name}
                      </Link>
                      <Link
                        to={`/product/${line.product.id}`}
                        className="mt-0.5 block font-display text-lg font-semibold text-indigo-700 hover:text-clay-500"
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-indigo-400">Size: {line.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(line.key)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-indigo-300 transition hover:bg-clay-50 hover:text-clay-500"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="flex items-center gap-1 rounded-full bg-cream-200 p-1">
                      <button
                        onClick={() => setQty(line.key, line.qty - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full text-indigo-600 hover:bg-cream-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-indigo-700">
                        {line.qty}
                      </span>
                      <button
                        onClick={() => setQty(line.key, line.qty + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full text-indigo-600 hover:bg-cream-50"
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-bold text-indigo-700">
                        {formatPrice(line.lineTotal)}
                      </p>
                      {line.qty > 1 && (
                        <p className="text-xs text-indigo-400">
                          {formatPrice(line.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <Link
            to="/browse"
            className="mt-2 inline-flex items-center gap-2 font-semibold text-clay-500 hover:text-clay-600"
          >
            <ArrowLeft size={18} /> Continue shopping
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-clay-100/50">
            <h2 className="font-display text-xl font-bold text-indigo-700">Order summary</h2>

            {/* promo */}
            <div className="mt-4 flex items-center gap-2 rounded-full bg-cream-200 px-4 py-2.5">
              <Tag size={16} className="text-clay-400" />
              <input
                placeholder="Promo code"
                className="w-full bg-transparent text-sm text-indigo-700 placeholder:text-indigo-300 focus:outline-none"
              />
              <button className="text-sm font-semibold text-clay-500 hover:underline">Apply</button>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <Row label={`Subtotal (${count} items)`} value={formatPrice(subtotal)} />
              <Row
                label="Shipping"
                value={shipping === 0 ? 'Free' : formatPrice(shipping)}
                accent={shipping === 0}
              />
              <Row label="Estimated tax (8%)" value={formatPrice(tax)} />
              {shipping > 0 && (
                <p className="rounded-xl bg-ochre-50 px-3 py-2 text-xs text-ochre-600">
                  Add {formatPrice(FREE_SHIP_OVER - subtotal)} more for free shipping.
                </p>
              )}
              <div className="border-t border-clay-100 pt-3">
                <Row label="Total" value={formatPrice(total)} large />
              </div>
            </dl>

            <button onClick={() => navigate('/checkout')} className="btn-primary mt-5 w-full text-base">
              <Lock size={17} /> Checkout securely
            </button>
            <p className="mt-3 text-center text-xs text-indigo-400">
              Taxes & shipping are illustrative — this is a showcase, no payment is taken.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, large, accent }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={large ? 'font-display text-lg font-bold text-indigo-700' : 'text-indigo-500'}>
        {label}
      </dt>
      <dd
        className={
          large
            ? 'font-display text-2xl font-bold text-indigo-700'
            : `font-semibold ${accent ? 'text-emerald-500' : 'text-indigo-700'}`
        }
      >
        {value}
      </dd>
    </div>
  )
}
