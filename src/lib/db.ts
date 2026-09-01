import "server-only";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. Next.js dev mode hot-reloads server modules on
 * every save, which would otherwise open a fresh SQLite connection (and
 * exhaust connections against a pooled Postgres in production) each time —
 * caching the instance on `globalThis` survives the reload.
 */
declare global {
  var prismaClient: PrismaClient | undefined;
}

export const db = globalThis.prismaClient ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClient = db;
}
