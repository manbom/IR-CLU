"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AutomationGraphScene } from "@/components/three/AutomationGraphScene";
import { MagneticLink } from "@/components/ui/MagneticLink";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-24 md:pb-0">
      <Container className="grid min-h-0 items-center gap-10 md:min-h-[calc(100dvh-6rem)] md:grid-cols-2 md:gap-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            استودیوی اتوماسیون IR-CLU
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.15] text-foreground sm:text-5xl md:text-6xl"
          >
            اتوماسیونی که{" "}
            <span className="text-gradient-signal">واقعاً کار می‌کند</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-8 text-muted">
            ربات تلگرام، ربات بله، وب‌سایت، اپلیکیشن و ورک‌فلوهای اتوماسیون n8n —
            از ایده تا اجرا، برای کسب‌وکاری که می‌خواهد کارهای تکراری را برای همیشه حذف کند.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticLink
              href="#contact"
              className="inline-flex h-14 items-center justify-center rounded-full px-7 text-base font-semibold text-ink"
              style={{ background: "var(--gradient-signal)" }}
            >
              شروع پروژه
            </MagneticLink>
            <MagneticLink
              href="#process"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-border px-7 text-base text-foreground transition-colors hover:border-cyan hover:text-cyan"
            >
              دیدن فرآیند کار
              <ArrowLeft size={16} aria-hidden="true" />
            </MagneticLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-72 sm:h-96 md:h-full md:min-h-[28rem]"
        >
          <AutomationGraphScene className="h-full w-full" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent md:bg-gradient-to-l"
            aria-hidden="true"
          />
        </motion.div>
      </Container>
    </section>
  );
}
