"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const specs = [
  { label: "موقعیت", value: "جوین، ایران" },
  { label: "تمرکز", value: "اتوماسیون و یکپارچه‌سازی سیستم‌ها" },
  { label: "ابزارها", value: "n8n · Python · TypeScript · Node.js" },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <Container className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow index="—" className="mb-4">
            درباره ما
          </Eyebrow>
          <h2 className="max-w-md text-3xl font-bold leading-tight text-foreground md:text-4xl">
            وقتی اتوماسیون وارد کسب‌وکارتان شود، کیفیت بالا می‌رود و هزینه پایین می‌آید
          </h2>
          <p className="mt-6 max-w-lg leading-8 text-muted">
            IR-CLU را برای حل یک مسئله مشخص راه انداختم: کارهایی که در کسب‌وکارها
            هنوز با نیروی انسانی، به‌صورت تکراری و با احتمال خطا انجام می‌شوند. با
            زبان‌ها و ابزارهای مختلف برنامه‌نویسی، این فرآیندها را به ربات، وب‌اپلیکیشن
            یا ورک‌فلوی اتوماسیون تبدیل می‌کنم.
          </p>
          <p className="mt-4 max-w-lg leading-8 text-muted">
            نتیجه‌اش ملموس است: پاسخ‌گویی سریع‌تر و بدون خطا به مشتری، کیفیت خدمات
            بالاتر، و هزینه‌ای که به‌جای نیروی تکراری، صرف رشد واقعی کسب‌وکارتان می‌شود.
          </p>
          <p className="mt-4 max-w-lg leading-8 text-muted">
            با توجه به نوع پروژه و محدودیت‌های زیرساختی داخل ایران، راه‌حلی طراحی
            می‌کنم که بدون دردسر اجرا شود و در درازمدت پایدار بماند.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="self-start rounded-2xl border border-border bg-surface p-8"
        >
          <div className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            IR-CLU / PROFILE
          </div>
          <dl className="mt-6 flex flex-col gap-5">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1 border-t border-border pt-5 first:border-t-0 first:pt-0">
                <dt className="font-mono text-xs text-muted">{spec.label}</dt>
                <dd className="text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </Container>
    </section>
  );
}
