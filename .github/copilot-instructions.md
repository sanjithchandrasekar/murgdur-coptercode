# Luxuria Royal E-Commerce Codebase Guidelines

## Architecture Overview

**Monorepo Structure**: Full-stack e-commerce platform split into two independently deployable parts:
- **Client** (`/client`): React 19 + Vite + Tailwind CSS - luxury fashion e-commerce UI
- **Server** (`/server`): Express.js + MongoDB - RESTful backend (boilerplate stage)

**Development Mode**: Run both concurrently via root `npm run dev` (starts server on :5000, client on :5173)

## Core Patterns & Conventions

### State Management
- **CartContext**: Single source of truth for cart + wishlist state
- Pattern: `useCart()` hook for accessing global state; auto-syncs to localStorage
- Location: [`client/src/context/CartContext.jsx`](client/src/context/CartContext.jsx)
- Key methods: `addToCart()`, `removeFromCart()`, `addToWishlist()` with notification system

### Product Data
- Products stored in [`client/src/data/products.js`](client/src/data/products.js) (1600+ lines, static)
- Each product includes: id, name, price, originalPrice, category, colors, sizes, rating, reviews
- Categories: Men, Women, Accessories; subcategories stored in `/public/images/` directory structure
- **Note**: Backend MongoDB schema not yet implemented; currently client-only data

### Routing
- React Router v7 configured in App.jsx with Layout wrapper
- Main routes: `/shop`, `/product/:id`, `/cart`, `/checkout`, `/heritage`, `/royal-collection`, `/vault`
- 40+ info pages use generic `InfoPage.jsx` component (passed via route config)
- All routes nested under `<Layout>` which includes Navbar + Footer

### Styling
- **Tailwind CSS** with custom royal color palette defined in [`client/tailwind.config.js`](client/tailwind.config.js)
- Custom colors: `royal-black`, `royal-platinum`, `royal-gold` (ivory/white), `royal-silver`
- Font stack: Playfair Display (serif), Montserrat (sans-serif)
- Animations: `fade-in`, `slide-up` keyframes (1s duration)

### UI Components
- Reusable components in [`client/src/components/common/`](client/src/components/common/):
  - `Button.jsx`, `HeroSlider.jsx`, `CategoryGrid.jsx`, `ShopByOccasion.jsx`, `Testimonials.jsx`
- Layout components: `Navbar.jsx`, `Footer.jsx`, `Layout.jsx`
- Motion animations via **Framer Motion** (v12+) in CartContext notifications and sliders
- Icons from **Lucide React** (Check, X, etc.)

## Development Workflows

### Installation & Setup
```bash
npm run install-all          # Install both client & server dependencies
npm run dev                  # Run both client (Vite) & server (Nodemon) concurrently
npm run dev:client          # Client only (http://localhost:5173)
npm run dev:server          # Server only (http://localhost:5000)
npm run build               # Build client for production (outputs to dist/)
npm run lint                # ESLint check (client only)
```

### Database
- MongoDB connection string: `MONGODB_URI` env var (defaults to `mongodb://127.0.0.1:27017/luxuria`)
- Config file: [`server/config/db.js`](server/config/db.js)
- Server gracefully degrades if DB unavailable (no `process.exit()` for demo mode)
- Models/Routes/Controllers folders exist but are empty; backend API not yet integrated

### File Organization
```
client/src/
  pages/           # Page components (40+ including info pages)
  components/
    common/        # Reusable UI components
    layout/        # Navbar, Footer, Layout wrapper
  context/         # CartContext state management
  utils/           # ScrollToTop utility
  data/            # Static product list
  assets/          # Images, media

server/
  config/          # DB connection
  models/          # (empty - add schemas here)
  routes/          # (empty - add endpoints here)
  controllers/     # (empty - add business logic here)
  middleware/      # (empty - add auth, validation here)
```

## Key Integration Points

### Client-Server Communication
- Currently **no active API calls** - client data is static
- When implementing: Create Express routes in `/server/routes/`, controllers in `/server/controllers/`
- Client should use **fetch** or install `axios` for HTTP requests
- CORS enabled in server.js; update CORS config if API routes added

### LocalStorage Patterns
- Cart items: `localStorage.getItem('cartItems')` / `localStorage.setItem('cartItems', ...)`
- Wishlist items: `localStorage.getItem('wishlistItems')`
- CartContext manages sync automatically on state changes

### Product Image Structure
- Product images: `/client/public/images/<category>/` (e.g., `men shoe/`, `women dress/`)
- Video files: `/client/public/videos/` (not yet utilized)
- Import static paths in products.js; reference via product.image or product.images array

## Project-Specific Practices

### Notification System
- CartContext provides toast-like notifications with product image, name, price
- Used in `addToCart()` for duplicate item warnings and `removeFromCart()` confirmations
- Notifications auto-dismiss; timer refs prevent rapid-click stacking

### Luxury Design Philosophy
- Color scheme emphasizes black/platinum/gold (not traditional blues/reds)
- Product cards showcase high-end fashion (sherwanis, lehengas, bags, watches)
- Every route serves "luxury lifestyle" content, not just commerce

### Static Routing for Info Pages
- Instead of creating new files, route to `<InfoPage />` with different paths
- Enables scalability: add routes in App.jsx without new component files
- Examples: `/about`, `/careers`, `/press`, `/privacy`, `/terms`

## Testing & Debugging

- **No test suite configured** - tests would go in root-level test scripts or client/server subdirectories
- **ESLint**: `npm run lint` (client only); configured in eslintConfig
- **Debug**: Vite dev server provides HMR (hot module replacement); server uses Nodemon for auto-reload
- Browser DevTools can inspect CartContext via React DevTools extension

## Deployment Notes

- Build output: `/client/dist/` (Vite default)
- Server entry: `/server/server.js`
- Vercel config: `vercel.json` present in root (pre-configured)
- Environment: `.env` required in server folder for `MONGODB_URI` and `PORT`

---
**Last Updated**: Analysis generated for AI agents to accelerate development workflow.
