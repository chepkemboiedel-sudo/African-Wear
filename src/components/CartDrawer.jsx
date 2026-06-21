import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import ProductImage from './ProductImage.jsx'
import { formatPrice } from '../utils/format.js'

export default function CartDrawer() {
  const { isOpen, closeCart, items, count, subtotal, setQty, removeItem } = useCart()
  const navigate = useNavigate()

  // lock scroll while open + close on Escape
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeCart])

  const freeShipThreshold = 150
  const remaining = Math.max(0, freeShipThreshold - subtotal)
  const progress = Math.min(100, (subtotal / freeShipThreshold) * 100)

  const goCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-50 bg-indigo-700/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream-100 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-clay-100/60 bg-cream-50 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-clay-400" size={20} />
            <h2 className="font-display text-xl font-bold text-indigo-700">
              Your Basket
            </h2>
            <span className="chip bg-cream-200 text-indigo-500">{count}</span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full text-indigo-500 hover:bg-cream-200"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-cream-200">
              <ShoppingBag className="text-clay-300" size={32} />
            </div>
            <div>
              <p className="font-display text-xl text-indigo-700">Your basket is empty</p>
              <p className="mt-1 text-sm text-indigo-400">
                Discover something handmade and special.
              </p>
            </div>
            <Link to="/browse" onClick={closeCart} className="btn-primary mt-2">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            {/* free-ship progress */}
            <div className="border-b border-clay-100/60 bg-cream-50 px-5 py-3">
              <p className="text-xs font-medium text-indigo-500">
                {remaining > 0 ? (
                  <>
                    You're <span className="font-bold text-clay-500">{formatPrice(remaining)}</span> away
                    from free shipping
                  </>
                ) : (
                  <span className="font-bold text-emerald-500">🎉 You've unlocked free shipping!</span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-clay-400 to-ochre-300 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((line) => (
                  <li key={line.key} className="flex gap-3">
                    <Link
                      to={`/product/${line.product.id}`}
                      onClick={closeCart}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded-xl"
                    >
                      <ProductImage
                        product={line.product}
                        showLabel={false}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${line.product.id}`}
                          onClick={closeCart}
                          className="font-display text-sm font-semibold leading-tight text-indigo-700 hover:text-clay-500 line-clamp-2"
                        >
                          {line.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(line.key)}
                          className="shrink-0 text-indigo-300 hover:text-clay-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-indigo-400">Size {line.size}</p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full bg-cream-200 p-0.5">
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-indigo-600 hover:bg-cream-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-indigo-700">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full text-indigo-600 hover:bg-cream-50"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-display text-base font-bold text-indigo-700">
                          {formatPrice(line.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* footer */}
            <div className="border-t border-clay-100/60 bg-cream-50 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-500">Subtotal</span>
                <span className="font-display text-2xl font-bold text-indigo-700">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-indigo-400">
                Shipping & taxes calculated at checkout.
              </p>
              <button onClick={goCheckout} className="btn-primary mt-3 w-full">
                Checkout <ArrowRight size={18} />
              </button>
              <button
                onClick={() => {
                  closeCart()
                  navigate('/cart')
                }}
                className="btn-ghost mt-1 w-full"
              >
                View full basket
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
