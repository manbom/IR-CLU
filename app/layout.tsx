import type { Metadata } from "next";
import { vazirmatn, kodeMono } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { NavStateProvider } from "@/lib/nav-state";
import "./globals.css";

export const metadata: Metadata = {
  title: "IR-CLU | استودیوی اتوماسیون هوشمند",
  description:
    "IR-CLU — طراحی ربات تلگرام، ربات بله، وب‌سایت، اپلیکیشن و ورک‌فلوهای اتوماسیون n8n. اتوماسیونی که واقعاً کار می‌کند.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${kodeMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-foreground font-display">
        <NavStateProvider>
          <ScrollProgress />
          <SmoothScroll>{children}</SmoothScroll>
        </NavStateProvider>
      </body>
    </html>
  );
}
