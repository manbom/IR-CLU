"use client";

import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticLink } from "@/components/ui/MagneticLink";

const TELEGRAM_HANDLE = "bardiaaSam";
const EMAIL = "juniorradma@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-border bg-surface px-8 py-16 text-center md:px-16 md:py-24"
        >
          <Eyebrow index="—" className="mx-auto mb-6 w-fit">
            شروع همکاری
          </Eyebrow>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
            بگویید چه کاری را می‌خواهید{" "}
            <span className="text-gradient-signal">حذف کنیم</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-8 text-muted">
            برای مشاوره رایگان درباره ربات، وب‌سایت یا اتوماسیون کسب‌وکارتان،
            از طریق تلگرام یا ایمیل با ما در تماس باشید.
          </p>

          <div className="mt-10 flex flex-wrap items-start justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <MagneticLink
                href={`https://t.me/${TELEGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full px-7 text-base font-semibold text-ink"
                style={{ background: "var(--gradient-signal)" }}
              >
                <Send
                  size={18}
                  aria-hidden="true"
                  className="-translate-x-0.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                پیام در تلگرام
              </MagneticLink>
              <a
                href={`https://t.me/${TELEGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-muted transition-colors hover:text-cyan"
              >
                @{TELEGRAM_HANDLE}
              </a>
            </div>
            <MagneticLink
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-border px-7 text-base text-foreground transition-colors hover:border-cyan hover:text-cyan"
            >
              <Mail size={18} aria-hidden="true" />
              {EMAIL}
            </MagneticLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
