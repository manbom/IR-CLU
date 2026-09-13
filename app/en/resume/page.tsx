import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getTeamMembers } from "@/lib/team";
import { dictionaries } from "@/lib/dictionaries";

const t = dictionaries.en.resume;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/en/resume/" },
};

export default function EnglishResumePage() {
  const [me] = getTeamMembers("en");
  const caseStudies = getAllCaseStudies("en");

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">
        <Eyebrow index="—" className="mb-4">
          {t.eyebrow}
        </Eyebrow>
        <div className="flex items-center gap-5">
          {me.photo && (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border">
              <Image src={me.photo} alt={me.name} fill sizes="80px" className="object-cover" />
            </div>
          )}
          <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {me.name}
          </h1>
        </div>
        <p className="mt-3 text-lg text-cyan">{me.role}</p>
        <p className="mt-6 max-w-xl leading-8 text-muted">{me.bio}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://t.me/bardiaaSam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-cyan hover:text-cyan"
          >
            <Send size={14} aria-hidden="true" />
            {t.contactCta}
          </a>
          <Link
            href="/en/#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-cyan hover:text-cyan"
          >
            {t.viewAllPortfolio}
          </Link>
        </div>

        {/* Skills */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-foreground">{t.skillsHeading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.skillGroups.map((group) => (
              <div key={group.label} className="rounded-xl border border-border bg-surface p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-cyan">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep case studies */}
        {caseStudies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">{t.caseStudiesHeading}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{t.caseStudiesSubtitle}</p>
            <div className="mt-6 flex flex-col gap-4">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/en/work/${cs.slug}/`}
                  className="group block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-cyan/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground transition-colors group-hover:text-cyan">
                        {cs.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted">{cs.tagline}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t.fullCaseStudyLabel}
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                  {cs.headlineMetrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4">
                      {cs.headlineMetrics.map((m) => (
                        <div key={m.label} className="text-sm">
                          <span
                            dir="ltr"
                            className="font-mono font-semibold text-foreground [font-variant-numeric:tabular-nums]"
                          >
                            {m.value}
                          </span>{" "}
                          <span className="text-muted">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="leading-8 text-muted">{t.closingPrompt}</p>
          <Link
            href="/en/#contact"
            className="mt-4 inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-ink"
            style={{ background: "var(--gradient-signal)" }}
          >
            {t.startConversation}
          </Link>
        </div>
      </Container>
    </main>
  );
}
