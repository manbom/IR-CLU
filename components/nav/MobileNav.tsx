"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navItems } from "@/lib/nav-items";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="منوی ناوبری"
          className="fixed inset-0 z-50 flex flex-col bg-ink md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
              منو
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="بستن منو"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="border-b border-border py-5 text-3xl font-semibold text-foreground active:text-cyan"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.05, ease: "easeOut" }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <a
              href="/#contact"
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center rounded-full text-base font-semibold text-ink"
              style={{ background: "var(--gradient-signal)" }}
            >
              شروع پروژه
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
