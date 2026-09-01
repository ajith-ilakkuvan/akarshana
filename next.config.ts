import type { NextConfig } from "next";

/**
 * Static CSP + security headers, applied via next.config's `headers()`
 * rather than nonce-based middleware.
 *
 * Product/category pages read live data from the database per-request
 * (dynamic rendering), but the CSP itself is still set once at config
 * level rather than generated per-request in middleware — this project
 * doesn't use Next's nonce-based CSP pattern (see
 * node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md),
 * so there's no per-request nonce to thread through anyway.
 *
 * `script-src` allows `'unsafe-inline'` rather than a nonce, plus
 * Razorpay's checkout script host — the payment gateway's own JS opens a
 * hosted iframe for card/UPI entry (allowed via `frame-src`) rather than
 * ever touching card details directly on this site. Object embeds are
 * blocked, framing of this site by others is blocked, and nothing else on
 * this site renders untrusted HTML (the one `dangerouslySetInnerHTML` use
 * is JSON-LD built from our own typed data, not user input).
 */
const isDev = process.env.NODE_ENV === "development";

const cspHeader = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' https://checkout.razorpay.com${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://*.razorpay.com`,
  `font-src 'self' data:`,
  `connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com`,
  `frame-src https://api.razorpay.com https://checkout.razorpay.com`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Every internal link/canonical in this codebase uses a trailing slash
  // (e.g. /gold-rate/) — this makes Next.js generate and expect that
  // consistently instead of redirecting.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
