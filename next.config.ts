import type { NextConfig } from "next";

/**
 * Static CSP + security headers, applied via next.config's `headers()`
 * rather than nonce-based middleware.
 *
 * This site is almost entirely statically generated (SSG) for SEO and
 * performance. Next.js's nonce-based CSP pattern requires every page to
 * opt into per-request dynamic rendering — the nonce is threaded through
 * server-side rendering at request time, but a static page's HTML is
 * fixed at build time with no request to read a nonce from. Using it here
 * silently broke every page's JavaScript in production (confirmed with a
 * real browser: every Next.js script chunk was rejected by its own CSP).
 * See node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md
 * ("Static vs Dynamic Rendering with CSP") for Next's own explanation.
 *
 * `script-src` therefore allows `'unsafe-inline'` rather than a nonce —
 * still same-origin only (no external script host is trusted), object
 * embeds are blocked, framing is blocked, and nothing on this site renders
 * untrusted HTML (the one `dangerouslySetInnerHTML` use is JSON-LD built
 * from our own typed data, not user input). Next.js also has an
 * experimental Subresource-Integrity (SRI) mode that avoids
 * 'unsafe-inline' while keeping static generation — worth adopting once
 * it's stable; see the same docs file, "Subresource Integrity (Experimental)".
 */
const isDev = process.env.NODE_ENV === "development";

const cspHeader = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob:`,
  `font-src 'self' data:`,
  `connect-src 'self' https://api.gold-api.com https://api.frankfurter.dev`,
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
