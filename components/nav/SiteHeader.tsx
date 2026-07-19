"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/lib/nav-items";
import { useNavState } from "@/lib/nav-state";
import { useActiveSection } from "@/lib/use-active-section";
import { MobileNav } from "./MobileNav";

const sectionIds = navItems
  .filter((item) => item.href.includes("#"))
  .map((item) => item.href.split("#")[1]);

export function SiteHeader() {
  const { mobileOpen, setMobileOpen } = useNavState();
  const pathname = usePathname();
  const activeId = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-border/60 bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="/#top" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="IR-CLU" width={36} height={36} className="rounded-md" />
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

        <div className="hidden md:block">
          <a
            href="/#contact"
            className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm text-foreground transition-colors hover:border-cyan hover:text-cyan"
          >
            شروع پروژه
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="باز کردن منو"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
