"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.success) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-cream p-6">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-green-600" />
        <div>
          <p className="font-display font-semibold text-charcoal">Thank you!</p>
          <p className="mt-1 text-sm text-charcoal/70">
            We&apos;ve received your message and will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6">
      {/* Honeypot — hidden from real visitors, filled in only by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="block">
        <span className="text-sm font-medium text-charcoal">Name</span>
        <input name="name" required className="input mt-1" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Phone</span>
          <input name="phone" required className="input mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Email (optional)</span>
          <input type="email" name="email" className="input mt-1" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Message</span>
        <textarea name="message" required rows={4} className="input mt-1" placeholder="Tell us what you're looking for..." />
      </label>
      {state.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-black-deep disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
