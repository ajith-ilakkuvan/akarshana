import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Where admin-uploaded product photos are written. This local-disk
 * implementation works out of the box for local dev and any host with a
 * persistent filesystem, but a serverless host (Vercel, most others) wipes
 * the filesystem between deploys/instances — swap this for Vercel Blob,
 * S3, or Cloudinary before launching there. Every caller goes through
 * `saveUploadedImage`, so that's the only function that needs to change.
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_BYTES = 8 * 1024 * 1024;

export async function saveUploadedImage(file: File): Promise<{ url: string }> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported image type — use JPEG, PNG, WebP or AVIF.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large (max 8MB).");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const extension = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return { url: `/uploads/${filename}` };
}
