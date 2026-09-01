# Prashwa Jewels — Website

Production website for Prashwa Jewels: a premium jewellery boutique in
Coimbatore, Tamil Nadu (a sister concern of RV Thangamalikai), selling
handcrafted gold, diamond and bridal jewellery both online and in-store.

Built with Next.js (App Router) + TypeScript + Tailwind CSS + Prisma.

## ⚠️ Before launch — read this

A few things in this build are deliberate placeholders because the real
values/assets weren't available while building it. Do not launch without
addressing these:

- **Logo**: `public/logo.svg` and `src/app/icon.svg` are a hand-drawn
  approximation of the real Prashwa Jewels wordmark/monogram (built from
  reference photos of the storefront signage), not the client's actual
  vector logo file. Replace both with the real brand assets.
- **Product photography**: every seeded product uses a flat SVG
  placeholder (`public/products/placeholder-*.svg`), clearly labelled
  "Product photo coming soon". Replace via `/admin/products/` once real
  photography is available — no fabricated product photos are used
  anywhere.
- **Hero photo**: the homepage hero shows a placeholder gradient until a
  real storefront/collection photo is uploaded via `/admin/content/`.
- **Contact details**: phone, WhatsApp, email and address in
  `src/config/contact.ts` are placeholders. Update before launch.
- **Testimonials**: `src/components/home/Testimonials.tsx` shows clearly
  labelled placeholder slots. No reviews were fabricated — add real,
  client-supplied testimonials before launch.
- **Admin credentials**: `.env.example`'s `ADMIN_EMAIL`/`ADMIN_PASSWORD`
  are dev-only placeholders. Set a real `ADMIN_PASSWORD_HASH` (see
  `src/lib/adminAuth.ts`) before launch — never ship with a plaintext
  password in production.
- **Payments**: without `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` set,
  checkout still captures orders but skips online payment — the team
  follows up manually (see "Payments" below). Wire up a live Razorpay
  merchant account before launch.
- **Database**: ships against a local SQLite file for zero-setup local
  dev. Point `DATABASE_URL` at a hosted Postgres instance for production
  (see "Database" below).
- **Image storage**: admin-uploaded photos are written to
  `public/uploads/` on local disk (see `src/lib/imageStorage.ts`) — this
  does not persist on serverless hosts like Vercel. Swap in Vercel
  Blob/S3/Cloudinary before launching there.
- **Legal pages**: `/privacy-policy/` and `/terms/` contain template text
  flagged for legal review — see the notice banner on each page.

## Project structure

```
src/
  app/                      Routes (Next.js App Router — one folder per URL)
    shop/                   /shop/ — full catalog with category/metal/sort filters
    collections/            /collections/ index + /collections/[slug]/ category pages
    product/[slug]/         Product detail page
    cart/                   Client-side cart page
    checkout/               Checkout (address + Razorpay) + /checkout/success/
    admin/                  Admin dashboard (see "Admin panel" below)
    about/, contact/, faq/  Content pages
    privacy-policy/, terms/ Legal pages
    sitemap.ts, robots.ts   Auto-generated sitemap.xml / robots.txt (includes products/categories)
    layout.tsx, globals.css Root layout, fonts, brand color tokens
  config/                   Central, editable configuration (contact, nav, FAQs, site identity)
  components/
    ui/                     Generic building blocks (Button, Reveal, ...)
    layout/                 Header, Footer, mobile sticky CTA bar, SiteChrome
    home/                   Homepage sections (Hero, CategoryShowcase, FeaturedProducts, ...)
    shop/                   ProductCard, ProductGrid, filters, AddToCartButton
    admin/                  Admin dashboard shell + forms
    forms/                  ContactForm
    cta/                    Small tracked-link/button wrappers
    seo/                    JSON-LD renderer
  context/
    CartContext.tsx         Client-side cart (localStorage-backed external store)
  lib/
    db.ts                   Prisma client singleton
    products.ts             Server-only product/category queries
    cart.ts                 Cart totals math shared by client + server
    adminAuth.ts             Admin session (JWT cookie) + credential check
    settings.ts               Admin-editable homepage/about content (DB-backed)
    imageStorage.ts             Admin photo upload (local disk — swap for prod)
    razorpay.ts                   Razorpay order creation + signature verification
    actions/                        Server Actions: checkout, contact, admin CRUD
    validation/                       Zod schemas (checkout, contact, product/category)
  hooks/                    useIsHydrated, useReducedMotion, useScrolled
prisma/
  schema.prisma             Database schema (Category, Product, Order, SiteContent, ...)
  seed.ts                   Realistic placeholder catalog (see "Before launch" above)
```

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
echo 'DATABASE_URL="file:./dev.db"' > .env   # Prisma CLI only reads .env, not .env.local
npx prisma db push           # create the local SQLite database from the schema
npm run db:seed              # seed placeholder categories/products
npm run dev
```

Open http://localhost:3000. Admin panel: http://localhost:3000/admin/login/
(credentials from `.env.local`'s `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

Other scripts: `npm run build`, `npm run start`, `npm run lint`,
`npm run db:push` (sync schema changes), `npm run db:seed`.

## Environment variables

See `.env.example` for the full list with descriptions.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain, used for canonical URLs, sitemap and structured data. |
| `DATABASE_URL` | SQLite file path locally; a Postgres connection string in production. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` / `ADMIN_PASSWORD` | Admin panel login. Use the hash in production, never the plaintext fallback. |
| `ADMIN_SESSION_SECRET` | Signs the admin session JWT. Generate with `openssl rand -hex 32`. |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Payment gateway. Test-mode keys work for development; blank runs checkout in "payment not live yet" mode. |
| `CONTACT_WEBHOOK_URL` | Optional POST target for validated contact-form enquiries. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional analytics ID — see `src/lib/analytics.ts`. |

Secrets (`ADMIN_SESSION_SECRET`, `RAZORPAY_KEY_SECRET`, `DATABASE_URL`) are
only ever read in server-only modules (`src/lib/db.ts`, `adminAuth.ts`,
`razorpay.ts`, all marked `import "server-only"` or Server Actions) — never
in a Client Component.

## Database

Prisma models (`prisma/schema.prisma`): `Category`, `Product` +
`ProductImage`, `Order` + `OrderItem`, and `SiteContent` (admin-editable
homepage/about copy — see "Admin panel" below).

Ships against **SQLite** for local dev — zero setup, just `npx prisma db
push`. For production, point `DATABASE_URL` at a hosted **Postgres**
instance (Vercel Postgres, Neon, Supabase, ...) and change
`provider = "sqlite"` to `"postgresql"` in `prisma/schema.prisma`; every
model here is already Postgres-compatible as written. After changing the
provider, run `npx prisma db push` (or set up proper migrations with
`npx prisma migrate dev`) against the new database.

## Admin panel

`/admin/login/` — a single-admin dashboard (no multi-user roles), built so
the client can run the catalog without touching code:

- **Products** (`/admin/products/`) — create, edit, delete; upload/remove
  photos; set price, stock, metal/purity/gemstone, featured flag.
- **Categories** (`/admin/categories/`) — create, edit, delete (blocked
  while products remain in a category, to avoid orphaning them).
- **Orders** (`/admin/orders/`) — view every order and its items, update
  status (Pending → Paid → Shipped → Delivered, or Failed/Cancelled).
- **Site Content** (`/admin/content/`) — edit the homepage hero
  (eyebrow/headline/subheading/photo) and the About page story, without a
  deploy. Contact details and navigation links are still edited by a
  developer in `src/config/contact.ts` / `src/config/navigation.ts` — see
  the note on that page.

Auth is a signed session cookie (see `src/lib/adminAuth.ts`), not a
database-backed user table — credentials come from `ADMIN_EMAIL` /
`ADMIN_PASSWORD_HASH` env vars. `src/app/admin/(protected)/layout.tsx`
guards every admin route except `/admin/login/`; every Server Action under
`src/lib/actions/admin*.ts` re-checks the session independently as
defense in depth (an action can be invoked directly, not just through the
page that renders its form).

## Storefront & cart

- **Catalog**: `/shop/` (filter by category/metal, sort), `/collections/`
  (browse by category), `/product/[slug]/` (detail + related products).
  All read live from the database (`src/lib/products.ts`), so an admin
  edit shows up immediately — no rebuild/redeploy needed.
- **Cart**: client-side only, backed by `localStorage`
  (`src/context/CartContext.tsx`), implemented as a `useSyncExternalStore`
  external store rather than `useState` + a hydration `useEffect` — see
  the comment in that file for why.
- **Checkout**: `/checkout/` collects a shipping address, then calls the
  `createCheckoutOrder` Server Action (`src/lib/actions/checkout.ts`),
  which **re-validates prices/stock against the database** — the client's
  cart prices are never trusted — before creating a `PENDING` `Order` row
  and (if Razorpay is configured) a matching Razorpay order.

## Payments (Razorpay)

`src/lib/razorpay.ts` talks to Razorpay's REST API directly (Basic Auth
with `key_id:key_secret`) rather than pulling in the `razorpay` SDK for
one HTTP call and one HMAC check.

- **Configured** (`RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` set): checkout
  opens Razorpay's hosted widget; on success, `verifyCheckoutPayment`
  checks the payment signature (HMAC-SHA256) server-side before marking
  the order `PAID` and decrementing stock. Never trust a client-reported
  "payment succeeded" without this check.
- **Not configured**: the order is still created (`PENDING`) so the team
  can follow up manually — the UI shows "payment isn't live yet" rather
  than a broken checkout. This is the default until a merchant account is
  set up.

Test-mode keys (from the Razorpay dashboard) work end-to-end for
development — no live merchant account needed to test the full flow.

## Editing content, contact info, nav, colors

- **Products/categories/orders/hero/about**: via `/admin/` — see "Admin
  panel" above. No code change or deploy needed.
- **Contact details / business hours / social links**: `src/config/contact.ts`.
- **Nav links, CTA button labels**: `src/config/navigation.ts`.
- **FAQs**: `src/config/faq.ts`.
- **Brand identity** (name, tagline, description): `src/config/site.ts`.
- **Brand colors**: CSS custom properties in `src/app/globals.css`
  (`--color-brand-black`, `--color-brand-gold`, `--color-charcoal`, ...) —
  matched to the real storefront's ivory/stone + near-black signage + gold
  trim palette.
- **Logo**: `public/logo.svg` (and `src/app/icon.svg` for the favicon).

## SEO

- Per-page `generateMetadata`/`metadata` (title, description, canonical).
- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt`, including every active product and category from the
  database — new products/categories appear automatically, no manual
  sitemap edits.
- Structured data (`src/lib/structuredData.ts`): `JewelryStore` sitewide
  (`src/app/layout.tsx`), `BreadcrumbList` on every inner page, `Product`
  on each product page, `FAQPage` on `/faq/`.

## Security

- `next.config.ts` (`headers()`) sets a Content-Security-Policy plus
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and
  `Permissions-Policy` on every response — a **static** CSP, set once at
  config level. `script-src`/`frame-src`/`connect-src` explicitly allow
  Razorpay's checkout domains; see the comment above `cspHeader` in
  `next.config.ts`.
- Admin routes are guarded both at the layout level (redirect to login)
  and inside every admin Server Action (`requireAdmin()`/session check),
  so an action can't be invoked directly by someone without a valid
  session.
- `/checkout/`: server-side Zod validation is authoritative for both the
  shipping address and the cart contents — prices and stock are
  re-checked against the database, never trusted from the client. Razorpay
  payment signatures are verified server-side (HMAC-SHA256) before an
  order is marked paid.
- Contact form (`src/lib/actions/contact.ts`): server-side Zod validation,
  a honeypot field, in-process rate limiting (`src/lib/rateLimit.ts`, 5
  requests/min per IP), and text sanitization (`src/lib/sanitize.ts`)
  before any forwarding.
- No secrets are ever in `.env.example` — it's placeholders only.

## Animations

`src/components/ui/Reveal.tsx` is the one reusable scroll-in animation
component (`Reveal` for a single element, `RevealGroup` for staggered
grids/lists) — every section on every page composes this rather than
re-implementing `IntersectionObserver` logic. It:

- Uses only `opacity`/`transform`, so it never causes layout shift.
- Disables itself automatically when the visitor has
  `prefers-reduced-motion: reduce` set (`src/hooks/useReducedMotion.ts`).
- Animates once per element (unobserves after first intersection).

## Deployment

The app is a standard Next.js site — deploy to Vercel (recommended, given
the App Router + Route Handler + Server Actions usage) or any Node.js host
that supports Next.js. Before deploying:

1. Provision a Postgres database and update `DATABASE_URL` +
   `prisma/schema.prisma`'s `provider` (see "Database" above).
2. Set every environment variable from `.env.example` in the hosting
   provider's dashboard, including a real `ADMIN_PASSWORD_HASH` and a
   fresh `ADMIN_SESSION_SECRET`.
3. Swap `src/lib/imageStorage.ts`'s local-disk upload for a persistent
   store (Vercel Blob, S3, Cloudinary) — serverless hosts don't keep
   filesystem writes between deploys/instances.
4. Set live `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` once the merchant
   account is approved.

```bash
npm run build
npm run start
```
