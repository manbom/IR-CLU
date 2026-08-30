import type { Locale } from "./locale";

const processStagesFa = [
  {
    index: "01",
    title: "کشف",
    description:
      "بررسی فرآیندهای فعلی کسب‌وکار شما و شناسایی دقیق نقاطی که اتوماسیون بیشترین زمان و هزینه را صرفه‌جویی می‌کند.",
  },
  {
    index: "02",
    title: "طراحی",
    description:
      "طراحی معماری ربات، وب‌سایت یا ورک‌فلو — با تمرکز بر تجربه کاربری ساده و مسیر داده‌ای روشن بین هر بخش.",
  },
  {
    index: "03",
    title: "ساخت",
    description:
      "پیاده‌سازی فنی روی زیرساخت مناسب — از ربات تلگرام و بله گرفته تا وب‌اپلیکیشن و اتصال به سرویس‌های شما.",
  },
  {
    index: "04",
    title: "اتوماسیون",
    description:
      "اتصال همه بخش‌ها با ورک‌فلوهای n8n تا داده‌ها بدون دخالت دستی بین سیستم‌های شما جریان پیدا کنند.",
  },
  {
    index: "05",
    title: "پشتیبانی",
    description:
      "پایش، بهبود مستمر و پشتیبانی فنی پس از راه‌اندازی، تا اتوماسیون شما همیشه به‌روز و پایدار بماند.",
  },
];

const processStagesEn = [
  {
    index: "01",
    title: "Discover",
    description:
      "Reviewing your current business processes and pinpointing exactly where automation saves the most time and money.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "Designing the bot, website, or workflow architecture — focused on a simple user experience and a clear data path between every part.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Technical implementation on the right infrastructure — from Telegram and Bale bots to web apps and connecting to your services.",
  },
  {
    index: "04",
    title: "Automate",
    description:
      "Connecting every part with n8n workflows so data flows between your systems without manual intervention.",
  },
  {
    index: "05",
    title: "Support",
    description:
      "Monitoring, continuous improvement, and technical support after launch, so your automation stays up to date and stable.",
  },
];

export function getProcessStages(locale: Locale) {
  return locale === "en" ? processStagesEn : processStagesFa;
}
