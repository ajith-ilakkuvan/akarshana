import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { type: "article", publishedTime: post.publishedAt },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const crumbs = [{ label: "Blog", href: "/blog/" }, { label: post.title, href: `/blog/${post.slug}/` }];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title={post.title} description={post.description} />

      <article className="py-14 sm:py-20">
        <Container className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">{post.category}</p>
          <time dateTime={post.publishedAt} className="mt-1 block text-xs text-charcoal/50">
            {formatPostDate(post.publishedAt)}
          </time>

          <div className="mt-8 space-y-8">
            {post.sections.map((section, index) => (
              <Reveal key={index} variant="fade-up">
                {section.heading && (
                  <h2 className="font-display text-xl font-semibold text-charcoal">{section.heading}</h2>
                )}
                <div className="mt-2 space-y-3 text-charcoal/80">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {post.relatedLinks.length > 0 && (
            <Reveal variant="fade-up" className="mt-10 rounded-2xl bg-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Related</p>
              <ul className="mt-3 space-y-2">
                {post.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:underline">
                      {link.label}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

        </Container>
      </article>
    </>
  );
}
