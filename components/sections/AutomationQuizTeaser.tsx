"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function AutomationQuizTeaser() {
  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-surface px-8 py-14 text-center md:flex-row md:items-center md:justify-between md:px-14 md:text-right"
        >
          <div>
            <Eyebrow index="—" className="mx-auto mb-4 w-fit md:mx-0">
              نمی‌دانید از کجا شروع کنید؟
            </Eyebrow>
            <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
              با ۵ سوال بفهمید دقیقاً به{" "}
              <span className="text-gradient-signal">چه اتوماسیونی</span> نیاز دارید
            </h3>
          </div>
          <MagneticLink
            href="/automation-check/"
            className="group inline-flex h-14 shrink-0 items-center gap-2 rounded-full px-7 text-base font-semibold text-ink"
            style={{ background: "var(--gradient-signal)" }}
          >
            شروع تست
            <ArrowLeft
              size={18}
              aria-hidden="true"
              className="translate-x-0.5 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </MagneticLink>
        </motion.div>
      </Container>
    </section>
  );
}
