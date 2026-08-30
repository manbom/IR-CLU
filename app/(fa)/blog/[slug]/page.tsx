import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatJalali } from "@/lib/format-date";
import { BlogCover } from "@/components/blog/blog-cover";
import { dictionaries } from "@/lib/dictionaries";

const t = dictionaries.fa.blog;

export function generateStaticParams() {
  return getAllPosts("fa").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts("fa").find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | IR-CLU`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${slug}/`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = getAllPosts("fa").some((p) => p.slug === slug);
  if (!exists) notFound();

  const post = getPostBySlug(slug, "fa");
  const relatedPosts = getRelatedPosts(post, "fa");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "fa",
    author: { "@type": "Organization", name: "IR-CLU" },
    publisher: { "@type": "Organization", name: "IR-CLU" },
  };

  const faqJsonLd = post.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
        >
          <ArrowRight size={15} aria-hidden="true" />
          {t.backToArticles}
        </Link>

        <Eyebrow index="—" className="mt-8 mb-4">
          {formatJalali(post.date)} · {post.readingTime} {t.readingTime}
        </Eyebrow>

        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {post.title}
        </h1>

        <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-2xl border border-border">
          <BlogCover slug={slug} />
        </div>

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose-article mt-12"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.faq.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">{t.faqHeading}</h2>
            <div className="mt-6 flex flex-col gap-3">
              {post.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-border bg-surface p-5"
                >
                  <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-8 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">{t.relatedHeading}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}/`}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-cyan"
                >
                  <p className="font-semibold leading-7 text-foreground">{related.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="leading-8 text-muted">{t.closingPrompt}</p>
          <Link
            href="/#contact"
            className="mt-4 inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-ink"
            style={{ background: "var(--gradient-signal)" }}
          >
            {t.startConversation}
          </Link>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </main>
  );
}
