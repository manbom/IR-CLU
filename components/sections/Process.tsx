"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { processStages } from "@/lib/process-stages";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 40%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section id="process" className="relative py-28 md:py-36">
      <Container>
        <Eyebrow index="—" className="mb-4">
          فرآیند کار
        </Eyebrow>
        <h2 className="max-w-lg text-3xl font-bold leading-tight text-foreground md:text-4xl">
          پنج مرحله، یک مسیر روشن تا اتوماسیون کامل
        </h2>

        <div ref={sectionRef} className="relative mt-20 ps-10 md:ps-14">
          <div
            className="absolute inset-y-0 start-0 w-px bg-border"
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-0 start-0 w-px origin-top"
            style={{
              scaleY: lineProgress,
              height: "100%",
              background: "var(--gradient-signal)",
            }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-16 md:gap-20">
            {processStages.map((stage, i) => (
              <motion.li
                key={stage.index}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="absolute -start-10 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-ink font-mono text-[11px] text-cyan md:-start-14"
                  aria-hidden="true"
                  initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(52,217,232,0)" }}
                  whileInView={{
                    scale: [1, 1.4, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(52,217,232,0)",
                      "0 0 0 7px rgba(52,217,232,0.25)",
                      "0 0 0 0 rgba(52,217,232,0)",
                    ],
                  }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, delay: 0.2 + (i % 2) * 0.05, ease: "easeOut" }}
                >
                  {stage.index}
                </motion.span>
                <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-lg leading-8 text-muted">{stage.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
