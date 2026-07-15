"use client";

import { motion } from "framer-motion";
import { Send, MessageCircle, LayoutGrid, Workflow, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/lib/services";

const icons: Record<string, LucideIcon> = {
  send: Send,
  "message-circle": MessageCircle,
  "layout-grid": LayoutGrid,
  workflow: Workflow,
};

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <Container>
        <Eyebrow index="—" className="mb-4">
          خدمات
        </Eyebrow>
        <h2 className="max-w-lg text-3xl font-bold leading-tight text-foreground md:text-4xl">
          هر چیزی که برای اتوماسیون کسب‌وکارتان لازم دارید
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <motion.div
                key={service.title}
                className="group relative bg-surface p-8 transition-transform duration-300 hover:z-10 hover:-translate-y-1 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-cyan transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:border-cyan group-hover:shadow-[0_0_28px_-6px_var(--cyan)]">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-8 text-muted">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
