import type { Metadata } from "next";
import { geist, kodeMono } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { NavStateProvider } from "@/lib/nav-state";
import { LocaleProvider } from "@/lib/locale";
import { Analytics } from "@/components/Analytics";
import "../globals.css";

const SITE_URL = "https://irclu.com";
const TITLE = "IR-CLU | Intelligent Automation Studio";
const DESCRIPTION =
  "IR-CLU builds Telegram bots, Bale bots, websites, apps, and n8n automation workflows — automation that actually works.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s" },
  description: DESCRIPTION,
  keywords: [
    "business automation",
    "telegram bot",
    "bale bot",
    "n8n",
    "website design",
    "automation studio",
  ],
  icons: {
    icon: "/logo.png",
  },
  alternates: {
    canonical: "/en/",
    languages: {
      fa: "/",
      en: "/en/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/en/`,
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

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geist.variable} ${kodeMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-foreground font-display">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LocaleProvider locale="en">
          <NavStateProvider>
            <ScrollProgress />
            <SmoothScroll>{children}</SmoothScroll>
          </NavStateProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
