"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AutomationGraphScene } from "@/components/three/AutomationGraphScene";
import { MagneticLink } from "@/components/ui/MagneticLink";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <AutomationGraphScene className="h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 45%, rgba(6,7,11,0.4) 0%, rgba(6,7,11,0.65) 55%, var(--ink) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container className="relative z-10 py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            استودیوی اتوماسیون IR-CLU
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-7xl md:text-8xl"
          >
            اتوماسیونی که
            <br />
            <span className="text-gradient-signal">واقعاً کار می‌کند</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-8 text-muted sm:text-xl"
          >
            ربات تلگرام، ربات بله، وب‌سایت، اپلیکیشن و ورک‌فلوهای اتوماسیون n8n —
            از ایده تا اجرا، برای کسب‌وکاری که می‌خواهد کارهای تکراری را برای همیشه حذف کند.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticLink
              href="#contact"
              className="inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "var(--gradient-signal)" }}
            >
              شروع پروژه
            </MagneticLink>
            <MagneticLink
              href="#process"
              className="glass inline-flex h-14 items-center gap-2 rounded-full px-8 text-base text-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              دیدن فرآیند کار
              <ArrowLeft size={16} aria-hidden="true" />
            </MagneticLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
