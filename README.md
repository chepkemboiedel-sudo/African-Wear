# Sankofa — African Wear Marketplace

A fully clickable, frontend-only **multi-vendor marketplace for African wear**, built as a portfolio showcase piece. Think Shopify polish, but as a curated marketplace where many independent African designers sell. No backend, payments, or auth — everything runs on mock data and in-memory state, but every click *works*.

![Sankofa](public/favicon.svg)

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to <http://localhost:5173>).

To build for production: `npm run build` then `npm run preview`.

## Tech stack

- **React 18** + **Vite 5** (single-page app)
- **Tailwind CSS 3** with a custom warm, saturated African palette
- **React Router 6** for real URLs and working back/forward
- **React Context** for cart + wishlist state (persists in memory across navigation)
- **lucide-react** for icons
- All product/vendor data lives in `src/data/` so it's swappable for a real API

## What's inside

- **10 independent vendors** (Lagos, Kumasi, Nairobi, Abuja, Arusha, Dakar, Bamako, Agadez, Marrakech) each with their own brand story, logo, location and rating
- **63 products** across 8 categories (Ankara, Kente, Dashiki, Agbada, Kaftan/Boubou, Gele/Headwraps, Mud-cloth, Accessories) — each with sizes, colours, fabric notes and a description
- A deep **Accessories** range (27 pieces): beaded necklaces, earrings, waist beads, brooches & hair rings (Beads of Maa); Tuareg silver & Fulani brass jewellery — pendants, hoops, cuffs, rings, collars (Sahel Silver); and leather/raffia bags, belts & beaded leather sandals (Nomad & Hide)
- On-brand **generated product artwork** (SVG gradients + Kente/mud-cloth motifs) so the layout looks great now and even better when real photos drop in — just swap `ProductImage.jsx`

## Pages

| Route | Page | What it does |
|---|---|---|
| `/` | **Home** | Bold hero, shop-by-category tiles, featured-vendors row, trending grid, new-arrivals band, newsletter |
| `/browse` | **Browse** | Live filters (category, vendor, colour, price, search) + sort, all driven by URL params so results are shareable |
| `/product/:id` | **Product detail** | Image variants, size & quantity selectors, add-to-cart, "more from this vendor" + "you may also like" |
| `/vendors` | **Vendor directory** | All 8 storefronts at a glance |
| `/vendor/:id` | **Vendor storefront** | Banner, story, stats, and that vendor's collection with scoped filters |
| `/cart` | **Cart** | Full basket with quantity controls, line totals, order summary (subtotal/shipping/tax) |
| `/checkout` | **Checkout** | Styled mock form → "Thank you" confirmation with order number (no real payment) |
| `/wishlist` | **Wishlist** | Everything you've hearted |

Plus a slide-out **cart drawer** available from any page, with a live header badge and a free-shipping progress bar.

## Project structure

```
src/
├── components/   ProductCard, VendorCard, FilterSidebar, CartDrawer, Header, Footer, ProductImage, …
├── pages/        HomePage, BrowsePage, ProductDetailPage, VendorPage, VendorsPage, CartPage, CheckoutPage, WishlistPage
├── context/      CartContext, WishlistContext
├── data/         vendors.js, products.js, categories.js, index.js (query/filter helpers — the swappable "API")
└── utils/        format.js, visuals.js
```

> This is a design/portfolio showcase — no real store, no payments are processed.
