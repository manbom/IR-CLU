"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Languages } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getNavItems } from "@/lib/nav-items";
import { useNavState } from "@/lib/nav-state";
import { useActiveSection } from "@/lib/use-active-section";
import { useLocale, getAlternatePath } from "@/lib/locale";
import { dictionaries } from "@/lib/dictionaries";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const { mobileOpen, setMobileOpen } = useNavState();
  const pathname = usePathname();
  const locale = useLocale();
  const t = dictionaries[locale];
  const navItems = useMemo(() => getNavItems(locale), [locale]);
  const sectionIds = useMemo(
    () => navItems.filter((item) => item.href.includes("#")).map((item) => item.href.split("#")[1]),
    [navItems]
  );
  const activeId = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const homeHref = locale === "en" ? "/en/#top" : "/#top";
  const contactHref = locale === "en" ? "/en/#contact" : "/#contact";
  const alternatePath = pathname ? getAlternatePath(pathname) : locale === "en" ? "/" : "/en/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <Container className={`transition-[padding] duration-300 ${scrolled ? "pt-3" : "pt-5"}`}>
        <div
          className={`glass flex items-center justify-between rounded-full px-5 transition-[height] duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <a href={homeHref} className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="IR-CLU" width={32} height={32} className="rounded-md" />
            <span className="font-mono text-sm font-medium tracking-wide text-foreground">
              IR-CLU
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const hash = item.href.split("#")[1];
              const isActive = hash
                ? activeId === hash
                : pathname?.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative pb-1 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-0 -bottom-0.5 h-px"
                      style={{ background: "var(--gradient-signal)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={alternatePath}
              aria-label={locale === "en" ? "فارسی" : "English"}
              className="flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm text-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <Languages size={14} aria-hidden="true" />
              {locale === "en" ? "فارسی" : "EN"}
            </a>
            <a
              href={contactHref}
              className="inline-flex h-9 items-center rounded-full border border-border px-5 text-sm text-foreground transition-colors hover:border-cyan hover:text-cyan"
            >
              {t.nav.startProject}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t.nav.openMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            <Menu size={19} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
