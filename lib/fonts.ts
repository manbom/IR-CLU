import { Vazirmatn, Kode_Mono } from "next/font/google";

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
