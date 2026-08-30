import type { Locale } from "./locale";

const navItemsFa = [
  { href: "/#process", label: "فرآیند" },
  { href: "/#services", label: "خدمات" },
  { href: "/#about", label: "درباره ما" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/blog/", label: "مقالات" },
  { href: "/store/", label: "فروشگاه" },
  { href: "/#contact", label: "تماس" },
];

const navItemsEn = [
  { href: "/en/#process", label: "Process" },
  { href: "/en/#services", label: "Services" },
  { href: "/en/#about", label: "About" },
  { href: "/en/#portfolio", label: "Portfolio" },
  { href: "/en/blog/", label: "Blog" },
  { href: "/en/store/", label: "Store" },
  { href: "/en/#contact", label: "Contact" },
];

export function getNavItems(locale: Locale) {
  return locale === "en" ? navItemsEn : navItemsFa;
}
