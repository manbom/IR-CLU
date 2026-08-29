import type { Metadata } from "next";
import Image from "next/image";
import { Send, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllProducts, formatToman, STORE_BOT_USERNAME } from "@/lib/products";

export const metadata: Metadata = {
  title: "فروشگاه محصولات IR-CLU",
  description:
    "اپلیکیشن‌ها و ربات‌های آماده‌ی IR-CLU — با اشتراک ماهانه، مستقیم از تلگرام تحویل بگیرید.",
  alternates: { canonical: "/store/" },
};

export default function StorePage() {
  const products = getAllProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, i) => ({
      "@type": "Product",
      position: i + 1,
      name: product.title,
      description: product.description,
      image: `https://irclu.com${product.image}`,
      offers: {
        "@type": "Offer",
        price: product.price * 10, // stored in Toman; schema.org priceCurrency IRR expects Rial
        priceCurrency: "IRR",
        availability: "https://schema.org/InStock",
        url: "https://irclu.com/store/",
      },
    })),
  };

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <Eyebrow index="—" className="mb-4">
          فروشگاه
        </Eyebrow>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
          اپلیکیشن‌ها و ربات‌های آماده، با اشتراک ماهانه
        </h1>
        <p className="mt-6 max-w-xl leading-8 text-muted">
          هر محصول را با یک پیام در تلگرام سفارش بدهید — پرداخت امن، و تحویل فوری بعد از تأیید.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full border border-border bg-ink/80 px-3 py-1 font-mono text-[11px] text-muted backdrop-blur-sm">
                  {product.type === "bot" ? "ربات تلگرام" : "اپلیکیشن"}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-semibold text-foreground">{product.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{product.description}</p>

                <ul className="mt-4 flex flex-col gap-2">
                  {product.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted">
                      <Check size={15} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-1 items-end justify-between gap-4">
                  <div>
                    <div className="font-tabular text-xl font-bold text-foreground">
                      {formatToman(product.price)}
                    </div>
                    <div className="font-mono text-[11px] text-muted">ماهانه</div>
                  </div>

                  <a
                    href={`https://t.me/${STORE_BOT_USERNAME}?start=${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                    style={{ background: "var(--gradient-signal)" }}
                  >
                    <Send size={15} aria-hidden="true" />
                    خرید در تلگرام
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
