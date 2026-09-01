"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation/contactSchema";
import { sanitizeText } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rateLimit";

export interface ContactFormState {
  error?: string;
  success?: boolean;
}

/**
 * Forwards a validated enquiry to CONTACT_WEBHOOK_URL (Slack, CRM inbox,
 * Zapier/Make, etc.) if configured. If unset, the message is validated and
 * accepted but not forwarded anywhere — wire this up before launch (see
 * .env.example).
 */
async function forwardMessage(payload: Record<string, string>): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Best-effort forwarding — the enquiry is still accepted even if the
    // webhook is temporarily unreachable.
  });
}

export async function sendContactMessage(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const rateLimit = checkRateLimit(`contact:${ip}`);
  if (!rateLimit.allowed) {
    return { error: "Too many messages sent. Please try again in a minute." };
  }

  const parsed = contactSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  // Honeypot: a real visitor never fills the hidden "website" field.
  if (parsed.data.website) return { success: true };

  await forwardMessage({
    name: sanitizeText(parsed.data.name),
    phone: sanitizeText(parsed.data.phone),
    email: parsed.data.email ? sanitizeText(parsed.data.email) : "",
    message: sanitizeText(parsed.data.message),
    receivedAt: new Date().toISOString(),
  });

  return { success: true };
}
