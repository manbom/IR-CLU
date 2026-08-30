"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Locale = "fa" | "en";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

// Where the language switcher sends you from a given path. Home/store/portfolio
// pages share the same slug across locales by design, so a straight prefix
// add/strip round-trips correctly. Blog posts don't (English translations are
// rolling out separately, slug-by-slug) — sending those to the target locale's
// blog index avoids linking to a post that doesn't exist there yet.
export function getAlternatePath(pathname: string): string {
  const isEnglish = pathname.startsWith("/en");
  const bare = isEnglish ? pathname.slice(3) || "/" : pathname;
  const targetPrefix = isEnglish ? "" : "/en";

  if (/^\/blog\/[^/]+\/?$/.test(bare)) {
    return `${targetPrefix}/blog/`;
  }

  return bare === "/" ? `${targetPrefix}/` : `${targetPrefix}${bare}`;
}
