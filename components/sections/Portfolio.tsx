"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { portfolioItems } from "@/lib/portfolio";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 md:py-36">
      <Container>
        <Eyebrow index="—" className="mb-4">
          نمونه‌کارها
        </Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-lg text-3xl font-bold leading-tight text-foreground md:text-4xl">
            پروژه‌هایی که تا امروز اتوماتیک کرده‌ایم
          </h2>
          <p className="max-w-xs text-sm leading-7 text-muted">
            نمونه‌ای از پروژه‌های واقعی که برای کسب‌وکارها اجرا کرده‌ایم.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-xl border border-border bg-surface/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
