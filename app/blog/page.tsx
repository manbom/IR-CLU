import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllPosts } from "@/lib/blog";
import { formatJalali } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "مقالات اتوماسیون | IR-CLU",
  description:
    "یادداشت‌هایی درباره اتوماسیون کسب‌وکار، ربات تلگرام، و ورک‌فلوهای n8n — با مثال‌های واقعی از پروژه‌های IR-CLU.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-32 pb-16 md:pt-40">
      <Container>
        <Eyebrow index="—" className="mb-4">
          مقالات
        </Eyebrow>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
          یادداشت‌هایی درباره اتوماسیون، ربات‌ها و کاری که واقعاً جواب می‌دهد
        </h1>
        <p className="mt-6 max-w-xl leading-8 text-muted">
          هر مقاله از یک سؤال واقعی شروع می‌شود که در پروژه‌های IR-CLU با آن روبه‌رو شده‌ایم.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50"
            >
              <div className="relative aspect-[1200/630] overflow-hidden border-b border-border">
                <Image
                  src={`/blog/${post.slug}/opengraph-image`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-3 font-mono text-xs text-muted">
                  <time dir="ltr">{formatJalali(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime} دقیقه مطالعه</span>
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
