# Akarshana Gold Company — Website

Production website for Akarshana Gold Company: a gold buying / gold valuation
business (**not** a jewellery retailer) currently serving Pollachi,
Udumalpet, Coimbatore and Tiruppur, Tamil Nadu.

Built with Next.js (App Router) + TypeScript + Tailwind CSS.

## ⚠️ Before launch — read this

A few things in this build are deliberate placeholders because the real
values weren't available while building it. Do not launch without
addressing these:

- **Logo**: `public/logo.svg` and `src/app/icon.svg` are a simple text/mark
  placeholder, not the client's actual supplied logo — no logo file was
  attached. Replace both with the real brand assets.
- **Contact details**: phone, WhatsApp, email and address in
  `src/config/contact.ts` are placeholders. Update before launch.
- **Legal pages**: `/privacy-policy/` and `/terms/` contain template text
  flagged for legal review — see the notice banner on each page.
- **Testimonials**: `src/components/home/Testimonials.tsx` shows clearly
  labelled placeholder slots. No reviews were fabricated — add real,
  client-supplied testimonials before launch.
- **Lead delivery**: without `LEAD_WEBHOOK_URL` set, submitted leads are
  validated and accepted but not sent anywhere. Wire this up (see
  "Environment variables" below) before launch.

## Project structure

```
src/
  app/                    Routes (Next.js App Router — one folder per URL)
    api/lead/              POST endpoint for the lead form
    services/               /services/ page
    how-it-works/            /how-it-works/ page
    about/                    /about/ page
    locations/                 /locations/ page
    contact/                    /contact/ page
    faq/                          /faq/ page
    gold-buyers-pollachi/          one thin route file per served city
    gold-buyers-udumalpet/           (see "Adding a location" below)
    gold-buyers-coimbatore/
    gold-buyers-tiruppur/
    blog/                    /blog/ index + /blog/[slug]/ posts
    sitemap.ts, robots.ts      auto-generated sitemap.xml / robots.txt
    layout.tsx, globals.css    root layout, fonts, brand color tokens
  config/                  Central, editable configuration (see below)
  content/                 Long-form copy: blog posts, per-city SEO content
  components/
    ui/                    Generic building blocks (Button, Reveal, ...)
    layout/                Header, Footer, mobile sticky CTA bar
    home/                  Homepage sections
    forms/                 LeadForm
    cta/                   Small tracked-link/button wrappers, ValuationPromptCard
    locations/             Shared template for the four city pages
    seo/                   JSON-LD renderer
  lib/
    validation/               Zod schema for the lead form
    rateLimit.ts, sanitize.ts  Lead API safety
    structuredData.ts           Organization / LocalBusiness / FAQ JSON-LD
    analytics.ts                 Event-tracking stub
    blog.ts                        Blog post lookup helpers
  hooks/                   useReducedMotion, useScrolled
```

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

See `.env.example` for the full list with descriptions. None of them are
required to run the site locally — every value has a safe default — but
review each before launch:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain, used for canonical URLs, sitemap and structured data. |
| `LEAD_WEBHOOK_URL` | Optional POST target (Slack, CRM inbox, Zapier, etc.) for validated leads. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional analytics ID — see `src/lib/analytics.ts`. |

The one secret, `LEAD_WEBHOOK_URL`, is only ever read in
`src/app/api/lead/route.ts`. Never move that read into a Client Component.

> The site previously had a live gold-rate display and an on-page value
> calculator (`GoldRateCard`, `GoldCalculator`, `/gold-rate/`, and the
> `src/lib/goldRate/` service layer behind them, fetching from a free spot-
> price API). These were removed — the business gives a real, in-person/
> doorstep valuation rather than a self-serve estimate, so every enquiry
> now goes through `LeadForm` instead. `ValuationPromptCard`
> (`src/components/cta/`) is the compact "get a valuation" prompt that
> replaced `GoldRateCard` in the hero.

## Adding a location

1. Add an entry to `src/config/locations.ts`.
2. Create `src/content/locations/<slug>.ts` with **genuinely unique**
   copy — intro paragraphs, sell-gold/pledged-gold/doorstep blurbs,
   "why choose us" bullets, and city-specific FAQs (see any existing file
   in that folder for the shape). Register it in
   `src/content/locations/index.ts`.
3. Add one thin route file, e.g. `src/app/gold-buyers-<slug>/page.tsx`:
   ```tsx
   import { buildLocationMetadata, LocationPageBySlug } from "@/components/locations/LocationPageBySlug";
   export const metadata = buildLocationMetadata("<slug>");
   export default function Page() {
     return <LocationPageBySlug slug="<slug>" />;
   }
   ```
   (Next.js doesn't support mixing static text with a dynamic segment in
   one folder name — e.g. `gold-buyers-[city]` — so each served city gets
   its own literal folder; the actual page layout is one shared component,
   `LocationPageTemplate`.)

The new location automatically appears in the sitemap and the
locations/homepage listings, since both read from `config/locations.ts`.

## Editing services, CTAs, contact info, colors

- **Services** (the 5 poster-derived offerings): `src/config/services.ts`.
- **CTA button labels**: `src/config/navigation.ts` (`ctaLabels`) — used
  consistently across the whole site, so change it once.
- **Contact details / business hours / social links**: `src/config/contact.ts`.
- **Nav links**: `src/config/navigation.ts` (`mainNav`, `footerLinks`).
- **Brand colors**: CSS custom properties in `src/app/globals.css`
  (`--color-brand-red`, `--color-brand-gold`, `--color-charcoal`, ...).
- **Logo**: `public/logo.svg` (and `src/app/icon.svg` for the favicon).
- **FAQs**: `src/config/faq.ts`.
- **"How it works" steps**: `src/config/howItWorks.ts`.
- **Blog posts**: `src/content/blog/posts.ts`.

## SEO

- Per-page `generateMetadata`/`metadata` (title, description, canonical) —
  see any file under `src/app/*/page.tsx`.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt` from `config/locations.ts` and `lib/blog.ts` — new
  locations/posts appear automatically.
- Structured data: `Organization` sitewide (`src/app/layout.tsx`),
  `BreadcrumbList` on every inner page, `LocalBusiness`-type +
  `FAQPage` on each city page, `FAQPage` on `/faq/`. See
  `src/lib/structuredData.ts`.
- The four `/gold-buyers-<city>/` pages intentionally use unique,
  hand-written copy per city (not a find-and-replace template) — see
  "Adding a location" above.

## Security

- `next.config.ts` (`headers()`) sets a Content-Security-Policy plus
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and
  `Permissions-Policy` on every response. This is a **static** CSP, set
  once at config level rather than generated per-request in middleware —
  deliberately: this site is almost entirely statically generated (SSG)
  for SEO/performance, and Next's nonce-based CSP pattern only works for
  pages that opt into per-request dynamic rendering (confirmed the hard
  way: it silently broke every page's JavaScript in a static build). See
  the comment above `cspHeader` in `next.config.ts`, and
  `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`
  ("Static vs Dynamic Rendering with CSP") for Next's own explanation.
  `script-src` therefore uses `'unsafe-inline'` rather than a nonce; if
  stricter script-src is needed later, Next's experimental
  Subresource-Integrity (SRI) CSP mode keeps static generation without it
  — see the same docs file.
- `/api/lead` (`src/app/api/lead/route.ts`): server-side Zod validation
  (`src/lib/validation/leadSchema.ts`) is authoritative — the client form
  re-uses the same schema only for instant feedback. Includes a honeypot
  field and a submit-timing check for basic bot filtering, in-process rate
  limiting (`src/lib/rateLimit.ts`, 5 requests/min per IP), and text
  sanitization (`src/lib/sanitize.ts`) before any forwarding.
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
the App Router + Route Handler usage) or any Node.js host that supports
Next.js. Set the environment variables above in your hosting provider's
dashboard; nothing needs to change in code between environments.

```bash
npm run build
npm run start
```
