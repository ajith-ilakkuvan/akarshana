import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Every internal link/canonical in this codebase uses a trailing slash
  // (e.g. /gold-rate/) — this makes Next.js generate and expect that
  // consistently instead of redirecting.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
