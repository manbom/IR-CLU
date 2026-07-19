import type { Metadata } from "next";
import { vazirmatn, kodeMono } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { NavStateProvider } from "@/lib/nav-state";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const SITE_URL = "https://irclu.com";
const TITLE = "IR-CLU | استودیوی اتوماسیون هوشمند";
const DESCRIPTION =
  "IR-CLU — طراحی ربات تلگرام، ربات بله، وب‌سایت، اپلیکیشن و ورک‌فلوهای اتوماسیون n8n. اتوماسیونی که واقعاً کار می‌کند.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s" },
  description: DESCRIPTION,
  keywords: [
    "اتوماسیون کسب‌وکار",
    "ربات تلگرام",
    "ربات بله",
    "n8n",
    "طراحی سایت",
    "اتوماسیون سازی",
  ],
  icons: {
    icon: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "IR-CLU",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IR-CLU",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DESCRIPTION,
  areaServed: "IR",
  sameAs: ["https://t.me/bardiaaSam"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NavStateProvider>
          <ScrollProgress />
          <SmoothScroll>{children}</SmoothScroll>
        </NavStateProvider>
        <Analytics />
      </body>
    </html>
  );
}
