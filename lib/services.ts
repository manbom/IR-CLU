import type { Locale } from "./locale";

const servicesFa = [
  {
    icon: "send",
    title: "ربات تلگرام",
    description:
      "ربات‌های سفارشی برای فروش، پشتیبانی مشتری، رزرو و مدیریت گروه — متصل به دیتابیس و سرویس‌های شما.",
  },
  {
    icon: "message-circle",
    title: "ربات بله",
    description:
      "همان قدرت اتوماسیون، روی پیام‌رسان بله — برای کسب‌وکارهایی که مخاطب داخلی را هدف قرار می‌دهند.",
  },
  {
    icon: "layout-grid",
    title: "وب‌سایت و اپلیکیشن",
    description:
      "وب‌سایت و اپلیکیشن با طراحی اختصاصی، سریع و آماده رشد — از صفحه معرفی تا پنل مدیریتی کامل.",
  },
  {
    icon: "workflow",
    title: "اتوماسیون n8n",
    description:
      "اتصال ابزارها، APIها و پایگاه‌داده‌های شما در یک ورک‌فلوی واحد؛ حذف کارهای تکراری و دستی.",
  },
] as const;

const servicesEn = [
  {
    icon: "send",
    title: "Telegram Bots",
    description:
      "Custom bots for sales, customer support, booking, and group management — connected to your database and services.",
  },
  {
    icon: "message-circle",
    title: "Bale Bots",
    description:
      "The same automation power, on the Bale messenger — for businesses targeting a domestic Iranian audience.",
  },
  {
    icon: "layout-grid",
    title: "Websites & Apps",
    description:
      "Custom-designed, fast, growth-ready websites and apps — from a landing page to a full admin panel.",
  },
  {
    icon: "workflow",
    title: "n8n Automation",
    description:
      "Connecting your tools, APIs, and databases into a single workflow — eliminating repetitive manual work.",
  },
] as const;

export function getServices(locale: Locale) {
  return locale === "en" ? servicesEn : servicesFa;
}
