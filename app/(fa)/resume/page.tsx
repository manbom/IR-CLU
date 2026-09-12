import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getTeamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "رزومه — بردیا سام | IR-CLU",
  description:
    "رزومه‌ی فنی بردیا سام: طراحی و ساخت ربات‌های پیام‌رسان، ایجنت‌های هوش مصنوعی و ورک‌فلوهای اتوماسیون — با کیس‌استادی کامل هر پروژه.",
  alternates: { canonical: "/resume/" },
};

const skillGroups = [
  {
    label: "اتوماسیون و ارکستریشن",
    items: ["n8n", "ورک‌فلوهای رویدادمحور", "Webhook", "APScheduler"],
  },
  {
    label: "هوش مصنوعی",
    items: ["OpenAI GPT", "Whisper", "طراحی پرامپت", "بازیابی دانش (RAG)"],
  },
  {
    label: "بک‌اند و دیتابیس",
    items: ["PostgreSQL / Supabase", "SQLite", "Node.js", "Docker"],
  },
  {
    label: "ربات‌های پیام‌رسان",
    items: ["Telegram Bot API", "Bale Bot API", "طراحی State Machine مکالمه"],
  },
  {
    label: "فرانت‌اند و وب",
    items: ["Next.js / React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "دسکتاپ و پردازش رسانه",
    items: ["Python", "PySide6 / Qt", "FFmpeg", "PyInstaller"],
  },
];

export default function ResumePage() {
  const [me] = getTeamMembers("fa");
  const caseStudies = getAllCaseStudies();

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-3xl">
        <Eyebrow index="—" className="mb-4">
          رزومه
        </Eyebrow>
        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {me.name}
        </h1>
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
            تماس در تلگرام
          </a>
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-cyan hover:text-cyan"
          >
            مشاهده‌ی همه‌ی نمونه‌کارها
          </Link>
        </div>

        {/* Skills */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-foreground">مهارت‌ها</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
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
            <h2 className="text-xl font-bold text-foreground">کیس‌استادی‌های منتخب</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              نگاهی عمیق‌تر به چند پروژه — مسئله، راه‌حل، و سختی واقعی کاری که پشت هرکدام
              بوده.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/work/${cs.slug}/`}
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
                      کیس‌استادی کامل
                      <ArrowLeft size={12} aria-hidden="true" />
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
          <p className="leading-8 text-muted">دنبال کسی برای ساخت پروژه‌ی بعدی‌تان هستید؟</p>
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
