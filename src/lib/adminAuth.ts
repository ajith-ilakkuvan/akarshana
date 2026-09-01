import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Single-admin auth: the client's login is configured via env vars
 * (ADMIN_EMAIL / ADMIN_PASSWORD), not a database table — this is a small
 * boutique's own admin panel, not a multi-tenant system, so there's no
 * user management to build. The password is hashed with scrypt (Node's
 * built-in, no extra dependency) rather than compared as plaintext.
 */

const COOKIE_NAME = "prashwa_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Generate one (e.g. `openssl rand -hex 32`) and add it to .env.local.",
    );
  }
  return new TextEncoder().encode(secret);
}

/** scrypt hash format: "salt:hash", both hex-encoded. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

/**
 * Verifies admin credentials against env vars. ADMIN_PASSWORD_HASH (the
 * scrypt "salt:hash" format from `hashPassword`) takes priority; falling
 * back to plaintext ADMIN_PASSWORD is only for quick local setup and is
 * flagged clearly in .env.example as something to replace before launch.
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  const configuredPlaintext = process.env.ADMIN_PASSWORD;

  if (!configuredEmail || email.trim().toLowerCase() !== configuredEmail.trim().toLowerCase()) {
    return false;
  }
  if (configuredHash) return verifyPassword(password, configuredHash);
  if (configuredPlaintext) return password === configuredPlaintext;
  return false;
}

export async function createAdminSession(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
