import { NextResponse, type NextRequest } from "next/server";

/**
 * Security headers applied to every response, including a nonce-based
 * Content-Security-Policy (the recommended approach for Next.js App
 * Router — see https://nextjs.org/docs/app/guides/content-security-policy).
 *
 * Next.js automatically tags its own inline hydration scripts with the
 * nonce found in this response's CSP header, so no extra plumbing is
 * needed elsewhere in the app for that to work.
 *
 * Named `proxy.ts` per Next.js 16's rename of the middleware convention.
 */
export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
