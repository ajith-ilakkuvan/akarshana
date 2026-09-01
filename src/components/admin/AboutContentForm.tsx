"use client";

import { useActionState } from "react";
import { updateAboutContent, type ContentFormState } from "@/lib/actions/adminSettings";
import type { AboutContent } from "@/lib/settings";

export function AboutContentForm({ about }: { about: AboutContent }) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(updateAboutContent, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6">
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Our Story</span>
        <textarea name="story" defaultValue={about.story} rows={6} className="input mt-1" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Legacy Note</span>
        <textarea name="legacyNote" defaultValue={about.legacyNote} rows={2} className="input mt-1" />
      </label>
      {state.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="text-sm text-green-700">Saved.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-black-deep disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save About"}
      </button>
    </form>
  );
}
