import { z } from "zod";
import { locations } from "@/config/locations";
import { leadServiceOptions, preferredContactOptions } from "@/config/services";

const locationSlugs = locations.map((location) => location.slug) as [string, ...string[]];
const serviceValues = leadServiceOptions.map((option) => option.value) as [string, ...string[]];
const contactValues = preferredContactOptions.map((option) => option.value) as [string, ...string[]];

/**
 * Server-side validation for the public lead endpoint. This is the source
 * of truth — the client-side form re-uses the same rules for instant
 * feedback, but the API never trusts the browser.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long.")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters and spaces."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  approximateWeightGrams: z.coerce
    .number()
    .positive("Enter an approximate weight greater than 0.")
    .max(10000, "Enter a realistic weight in grams.")
    .optional(),
  location: z.enum(locationSlugs, { message: "Select your location." }),
  preferredService: z.enum(serviceValues, { message: "Select a service." }),
  preferredContact: z.enum(contactValues, { message: "Select a preferred contact method." }),
  preferredTime: z.string().trim().max(120, "Preferred time is too long.").optional(),
  message: z.string().trim().max(500, "Message is too long.").optional(),
  /**
   * Honeypot — real visitors never fill this field in. Deliberately just
   * validated as an ordinary optional string here: the route handler is
   * the only place that decides what a non-empty value means, so a filled
   * honeypot gets a normal-looking `{ ok: true }` response instead of a
   * validation error that would tip off the bot.
   */
  company: z.string().max(200).optional().or(z.literal("")),
  /** Client timestamp (ms) of when the form was rendered, for bot timing checks. */
  renderedAt: z.coerce.number().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
