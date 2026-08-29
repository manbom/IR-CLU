"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { teamMembers } from "@/lib/team";

export function Team() {
  return (
    <section id="team" className="relative py-28 md:py-36">
      <Container>
        <Eyebrow index="—" className="mb-4">
          تیم
        </Eyebrow>
        <h2 className="max-w-lg text-3xl font-bold leading-tight text-foreground md:text-4xl">
          آدم‌هایی که پشت IR-CLU هستند
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-ink"
                style={{ background: "var(--gradient-signal)" }}
              >
                {member.initials}
              </div>
              <h3 className="mt-6 text-lg font-bold text-foreground">{member.name}</h3>
              <p className="mt-1 text-sm text-cyan">{member.role}</p>
              <p className="mt-4 leading-7 text-muted">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
