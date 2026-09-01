"use client";

import { useActionState } from "react";
import Image from "next/image";
import { updateHeroContent, type ContentFormState } from "@/lib/actions/adminSettings";
import type { HeroContent } from "@/lib/settings";

export function HeroContentForm({ hero }: { hero: HeroContent }) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(updateHeroContent, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6">
      <input type="hidden" name="existingImage" value={hero.image} />
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Eyebrow</span>
        <input name="eyebrow" defaultValue={hero.eyebrow} className="input mt-1" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Headline</span>
        <input name="headline" defaultValue={hero.headline} className="input mt-1" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Subheading</span>
        <textarea name="subheading" defaultValue={hero.subheading} rows={3} className="input mt-1" />
      </label>
      {hero.image && (
        <div className="relative aspect-video w-48 overflow-hidden rounded-lg bg-cream">
          <Image src={hero.image} alt="" fill sizes="192px" className="object-cover" />
        </div>
      )}
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Hero Photo</span>
        <input type="file" name="image" accept="image/*" className="mt-1 block text-sm" />
      </label>
      {state.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="text-sm text-green-700">Saved.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-black-deep disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save Hero"}
      </button>
    </form>
  );
}
