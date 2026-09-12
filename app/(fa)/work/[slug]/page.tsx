import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  return {
    title: `${cs.title} | کیس‌استادی | IR-CLU`,
    description: cs.tagline,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      title: cs.title,
      description: cs.tagline,
      type: "article",
      url: `/work/${slug}/`,
    },
  };
}

const statusLabel: Record<string, string> = {
  live: "زنده و در حال استفاده",
  delivered: "تحویل‌شده",
  "in-progress": "در حال توسعه",
  archived: "بایگانی‌شده",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const chips = [cs.client, cs.role, cs.duration, cs.year ? `${cs.year}` : null].filter(
    Boolean
  ) as string[];

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">
        <Link
          href="/resume/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
        >
          <ArrowRight size={15} aria-hidden="true" />
          بازگشت به رزومه
        </Link>

        <Eyebrow index="—" className="mt-8 mb-4">
          کیس‌استادی{cs.status && statusLabel[cs.status] ? ` · ${statusLabel[cs.status]}` : ""}
        </Eyebrow>

        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {cs.title}
        </h1>
        <p className="mt-4 max-w-xl leading-8 text-muted">{cs.tagline}</p>

        {chips.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Headline metrics */}
        {cs.headlineMetrics.length > 0 && (
          <div className="mt-10 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-x-reverse">
            {cs.headlineMetrics.map((m) => (
              <div key={m.label} className="p-6 text-center">
                <div
                  dir="ltr"
                  className="font-mono text-3xl font-bold text-foreground [font-variant-numeric:tabular-nums]"
                >
                  {m.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-foreground">{m.label}</div>
                {m.note && <div className="mt-1 text-xs text-muted">{m.note}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Problem -> Solution -> Outcome */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "مسئله", text: cs.problem },
            { label: "راه‌حل", text: cs.solution },
            { label: "نتیجه", text: cs.outcome },
          ].map((block) => (
            <div
              key={block.label}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-cyan">
                {block.label}
              </span>
              <p className="mt-3 text-sm leading-7 text-muted">{block.text}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        {cs.features.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">آنچه ساخته شد</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {cs.features.map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
                  <p className="font-semibold text-foreground">{f.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges — the most important section */}
        {cs.challenges.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">سختی واقعی کار</h2>
            <div className="mt-6 flex flex-col gap-5">
              {cs.challenges.map((c) => (
                <div key={c.title} className="rounded-xl border border-border bg-surface p-6">
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="mt-3 text-sm leading-8 text-muted">{c.body}</p>
                  {c.evidence && (
                    <pre
                      dir="ltr"
                      className="mt-4 overflow-x-auto rounded-lg border border-border bg-ink p-4 text-left font-mono text-[12.5px] leading-6 text-cyan"
                    >
                      {c.evidence}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decisions */}
        {cs.decisions.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">تصمیم‌های مهندسی</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {cs.decisions.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm leading-7 text-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical facts */}
        {cs.technicalFacts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">جزئیات فنی</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {cs.technicalFacts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface p-4"
                >
                  <div>
                    <p className="text-sm text-muted">{f.label}</p>
                    {f.detail && <p className="mt-1 text-xs text-muted/70">{f.detail}</p>}
                  </div>
                  <span
                    dir="ltr"
                    className="shrink-0 font-mono text-sm font-semibold text-foreground [font-variant-numeric:tabular-nums]"
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stack */}
        {cs.stack.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">ابزار</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <span
                  key={s.name}
                  title={s.role}
                  className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-foreground"
                >
                  <span dir="ltr">{s.name}</span>
                  <span className="mx-1.5 text-muted">·</span>
                  <span className="text-muted">{s.role}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Narrative */}
        <div className="prose-article mt-16" dangerouslySetInnerHTML={{ __html: cs.html }} />

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="leading-8 text-muted">
            می‌خواهید ببینید این سطح از کار دقیقاً برای کسب‌وکار شما چه شکلی می‌شود؟
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-ink"
            style={{ background: "var(--gradient-signal)" }}
          >
            شروع گفت‌وگو
          </Link>
        </div>
      </Container>
    </main>
  );
}
