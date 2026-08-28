import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { leadSchema } from "@/lib/validation/leadSchema";
import { sanitizeText } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const MIN_FILL_TIME_MS = 1500;

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request);

  const { allowed, retryAfterSeconds } = checkRateLimit(identifier);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : {} },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  let input;
  try {
    input = leadSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const firstIssue = error.issues[0];
      return NextResponse.json(
        { ok: false, error: firstIssue?.message ?? "Please check the form and try again." },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real visitor never fills the hidden "company" field.
  if (input.company) {
    return NextResponse.json({ ok: true }); // silently accept, do nothing
  }

  // Timing check: a bot that submits within ~1.5s of the form rendering
  // almost certainly never "read" the form.
  if (input.renderedAt && Date.now() - input.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true }); // silently accept, do nothing
  }

  const lead = {
    name: sanitizeText(input.name),
    phone: input.phone,
    approximateWeightGrams: input.approximateWeightGrams ?? null,
    location: input.location,
    preferredService: input.preferredService,
    preferredContact: input.preferredContact,
    preferredTime: input.preferredTime ? sanitizeText(input.preferredTime) : null,
    message: input.message ? sanitizeText(input.message) : null,
    receivedAt: new Date().toISOString(),
  };

  try {
    await forwardLead(lead);
  } catch {
    // Never leak internal/integration errors to the client.
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your request. Please call or WhatsApp us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Forwards a validated lead to wherever the business wants it delivered.
 *
 * There is no database in the current MVP (none is needed yet — see
 * README "Database / backend readiness"). If `LEAD_WEBHOOK_URL` is set,
 * the lead is POSTed there (a CRM inbox, Slack webhook, etc.); this can
 * later be replaced with a database write or CRM SDK call without
 * changing the public API contract.
 */
async function forwardLead(lead: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook responded with status ${response.status}`);
  }
}
