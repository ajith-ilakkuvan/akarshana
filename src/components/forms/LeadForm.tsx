"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { leadSchema } from "@/lib/validation/leadSchema";
import { locations } from "@/config/locations";
import { leadServiceOptions, preferredContactOptions, type LeadServiceValue } from "@/config/services";
import { ctaLabels } from "@/config/navigation";
import { whatsappHref } from "@/config/contact";
import { trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  defaultService?: LeadServiceValue;
  defaultLocation?: string;
  title?: string;
  description?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  defaultService = "gold-valuation",
  defaultLocation,
  title = "Request a Gold Valuation",
  description = "Share a few details and our team will get in touch to confirm your valuation.",
}: LeadFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [renderedAt] = useState(() => Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      approximateWeightGrams: formData.get("approximateWeightGrams")
        ? Number(formData.get("approximateWeightGrams"))
        : undefined,
      location: String(formData.get("location") ?? ""),
      preferredService: String(formData.get("preferredService") ?? ""),
      preferredContact: String(formData.get("preferredContact") ?? ""),
      preferredTime: formData.get("preferredTime") ? String(formData.get("preferredTime")) : undefined,
      message: formData.get("message") ? String(formData.get("message")) : undefined,
      company: String(formData.get("company") ?? ""),
      renderedAt,
    };

    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setSubmitState("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const payload: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !payload.ok) {
        setSubmitState("error");
        setErrorMessage(payload.error ?? "Something went wrong. Please try WhatsApp or call us instead.");
        return;
      }

      setSubmitState("success");
      trackEvent("gold_valuation_submit", { service: raw.preferredService, location: raw.location });
    } catch {
      setSubmitState("error");
      setErrorMessage("We couldn't reach our server. Please try WhatsApp or call us instead.");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-2xl border border-charcoal/10 bg-cream p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-brand-red" />
        <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">Request received</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Thank you — our team will contact you shortly to confirm your gold valuation.
        </p>
        <Button
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
          className="mt-5"
          icon={<MessageCircle className="size-4" aria-hidden="true" />}
        >
          {ctaLabels.whatsappUs}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-charcoal">{title}</h3>
      <p className="mt-2 text-sm text-charcoal/70">{description}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
        {/* Honeypot field — visually hidden via CSS (not `type=hidden`), so basic bots that only skip hidden inputs still fill it in. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Field label="Name" htmlFor="name" error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={fieldErrors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            required
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={inputClasses}
          />
        </Field>

        <Field label="Approximate Gold Weight (grams)" htmlFor="approximateWeightGrams" error={fieldErrors.approximateWeightGrams} optional>
          <input
            id="approximateWeightGrams"
            name="approximateWeightGrams"
            type="number"
            inputMode="decimal"
            min={0.1}
            step={0.1}
            className={inputClasses}
          />
        </Field>

        <Field label="Location" htmlFor="location" error={fieldErrors.location}>
          <select id="location" name="location" required defaultValue={defaultLocation ?? ""} className={inputClasses}>
            <option value="" disabled>
              Select your location
            </option>
            {locations.map((location) => (
              <option key={location.slug} value={location.slug}>
                {location.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Service" htmlFor="preferredService" error={fieldErrors.preferredService}>
          <select id="preferredService" name="preferredService" required defaultValue={defaultService} className={inputClasses}>
            {leadServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <fieldset>
          <legend className="text-sm font-medium text-charcoal">Preferred Contact Method</legend>
          <div className="mt-2 flex gap-4">
            {preferredContactOptions.map((option, index) => (
              <label key={option.value} className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="radio"
                  name="preferredContact"
                  value={option.value}
                  defaultChecked={index === 0}
                  className="size-4 accent-brand-red"
                />
                {option.label}
              </label>
            ))}
          </div>
          {fieldErrors.preferredContact && <ErrorText>{fieldErrors.preferredContact}</ErrorText>}
        </fieldset>

        <Field label="Preferred Time" htmlFor="preferredTime" error={fieldErrors.preferredTime} optional>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            placeholder="e.g. Weekday evenings"
            className={inputClasses}
          />
        </Field>

        <Field label="Message" htmlFor="message" error={fieldErrors.message} optional>
          <textarea id="message" name="message" rows={3} className={inputClasses} />
        </Field>

        {submitState === "error" && errorMessage && (
          <div role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={submitState === "submitting"}>
            {submitState === "submitting" ? "Submitting…" : ctaLabels.requestValuation}
          </Button>
          <Button
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
            icon={<MessageCircle className="size-4" aria-hidden="true" />}
          >
            {ctaLabels.whatsappUs}
          </Button>
        </div>
      </form>
    </div>
  );
}

const inputClasses =
  "mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-3.5 py-3 text-charcoal placeholder:text-charcoal/40 focus-visible:outline-2 focus-visible:outline-brand-red";

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-charcoal">
        {label} {optional && <span className="font-normal text-charcoal/50">(optional)</span>}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600">
      {children}
    </p>
  );
}
