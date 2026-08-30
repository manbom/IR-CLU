"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { getNavItems } from "@/lib/nav-items";
import { useLocale } from "@/lib/locale";
import { dictionaries } from "@/lib/dictionaries";

export function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const t = dictionaries[locale];
  const navItems = getNavItems(locale);

  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="IR-CLU" width={28} height={28} className="rounded-md" />
          <div>
            <div className="font-mono text-sm text-foreground">IR-CLU</div>
            <div className="text-xs text-muted">{t.footer.tagline}</div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-xs text-muted">
          © {year} IR-CLU
        </p>
      </Container>
    </footer>
  );
}
