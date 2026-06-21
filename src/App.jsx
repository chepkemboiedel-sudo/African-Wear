import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import BrowsePage from './pages/BrowsePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import VendorsPage from './pages/VendorsPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/vendor/:id" element={<VendorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
