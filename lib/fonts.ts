import { Vazirmatn, Kode_Mono, Geist } from "next/font/google";

export const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
  display: "swap",
});

// English tree only — Vazirmatn is Arabic-script-optimized and, while it does
// include a Latin subset (so it never literally breaks on English text), it's
// not a typeface meant to carry English body copy. Kode Mono stays shared
// across both locales for mono/accent text (already Latin-only).
export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});
