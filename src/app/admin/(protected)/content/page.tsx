import { getHeroContent, getAboutContent } from "@/lib/settings";
import { HeroContentForm } from "@/components/admin/HeroContentForm";
import { AboutContentForm } from "@/components/admin/AboutContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const [hero, about] = await Promise.all([getHeroContent(), getAboutContent()]);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold text-charcoal">Site Content</h1>

      <section>
        <h2 className="font-display text-lg font-semibold text-charcoal">Homepage Hero</h2>
        <div className="mt-3">
          <HeroContentForm hero={hero} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-charcoal">About Page</h2>
        <div className="mt-3">
          <AboutContentForm about={about} />
        </div>
      </section>

      <p className="max-w-2xl text-sm text-charcoal/60">
        Contact details (phone, WhatsApp, email, address, business hours) and navigation links are edited by a
        developer in <code className="rounded bg-charcoal/10 px-1.5 py-0.5">src/config/contact.ts</code> and{" "}
        <code className="rounded bg-charcoal/10 px-1.5 py-0.5">src/config/navigation.ts</code>.
      </p>
    </div>
  );
}
