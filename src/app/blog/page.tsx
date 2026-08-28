import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { getAllPosts, formatPostDate } from "@/lib/blog";

const crumbs = [{ label: "Blog", href: "/blog/" }];

export const metadata: Metadata = {
  title: "Gold Buying Guides & Insights",
  description:
    "Guides on gold valuation, purity, today's gold rate and selling gold safely across Pollachi, Udumalpet, Coimbatore and Tiruppur.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Gold Buying Guides & Insights"
        description="Practical guides on gold valuation, purity, market rates and selling gold safely."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <RevealGroup variant="fade-up" staggerMs={80} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-semibold text-charcoal">{post.title}</h2>
                  <p className="mt-2 text-sm text-charcoal/70">{post.description}</p>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs text-charcoal/50">
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  <ArrowRight aria-hidden="true" className="size-4 text-brand-red transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
