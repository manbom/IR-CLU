import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { portfolioItems } from "@/lib/portfolio";
import { getAllProducts } from "@/lib/products";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) return {};

  return {
    title: `${item.title} | IR-CLU`,
    description: item.description,
    alternates: { canonical: `/portfolio/${slug}/` },
    openGraph: {
      title: item.title,
      description: item.description,
      images: [{ url: item.image }],
      url: `/portfolio/${slug}/`,
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) notFound();

  const relatedProduct = getAllProducts().find((p) => p.slug === slug);

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
        >
          <ArrowRight size={15} aria-hidden="true" />
          بازگشت به نمونه‌کارها
        </Link>

        <Eyebrow index="—" className="mt-8 mb-4">
          نمونه‌کار
        </Eyebrow>

        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {item.title}
        </h1>
        <p className="mt-6 leading-8 text-muted">{item.description}</p>

        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-border">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">این ابزار چه کاری انجام می‌دهد</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {item.capabilities.map((point) => (
            <li key={point} className="flex items-start gap-3 leading-7 text-muted">
              <Check size={16} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-bold text-foreground">چطور کار می‌کند</h2>
        <p className="mt-4 leading-8 text-muted">{item.howItWorks}</p>

        <h2 className="mt-12 text-xl font-bold text-foreground">مناسب چه کسب‌وکارهایی است</h2>
        <p className="mt-4 leading-8 text-muted">{item.idealFor}</p>

        {relatedProduct ? (
          <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="leading-8 text-muted">
              همین ابزار به‌صورت اشتراک ماهانه در فروشگاه ما آماده‌ی خرید است.
            </p>
            <Link
              href="/store/"
              className="mt-4 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-ink"
              style={{ background: "var(--gradient-signal)" }}
            >
              <ShoppingBag size={16} aria-hidden="true" />
              مشاهده در فروشگاه
            </Link>
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="leading-8 text-muted">می‌خواهید چیزی شبیه این برای کسب‌وکار خودتان بسازیم؟</p>
            <Link
              href="/#contact"
              className="mt-4 inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-ink"
              style={{ background: "var(--gradient-signal)" }}
            >
              شروع گفت‌وگو
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
