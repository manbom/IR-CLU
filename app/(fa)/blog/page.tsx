import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllPosts } from "@/lib/blog";
import { formatJalali } from "@/lib/format-date";
import { BlogCover } from "@/components/blog/blog-cover";
import { dictionaries } from "@/lib/dictionaries";

const t = dictionaries.fa.blog;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts("fa");

  return (
    <main className="pt-32 pb-16 md:pt-40">
      <Container>
        <Eyebrow index="—" className="mb-4">
          {t.eyebrow}
        </Eyebrow>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
          {t.heading}
        </h1>
        <p className="mt-6 max-w-xl leading-8 text-muted">{t.subtitle}</p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50"
            >
              <div className="relative aspect-[1200/630] overflow-hidden border-b border-border">
                <BlogCover
                  slug={post.slug}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-3 font-mono text-xs text-muted">
                  <time dir="ltr">{formatJalali(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime} {t.readingTime}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground transition-colors group-hover:text-cyan">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 leading-8 text-muted">{post.description}</p>
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
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
