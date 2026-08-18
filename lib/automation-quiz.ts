export type QuizCategory = "telegram-bot" | "n8n-integration" | "custom-app" | "store-product";

export type QuizOption = {
  label: string;
  scores: Partial<Record<QuizCategory, number>>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "repetitive-time",
    question: "چقدر از وقت روزانه‌تان صرف پاسخ‌دادن به سوالات تکراری مشتری‌ها می‌شود؟",
    options: [
      { label: "تقریباً هیچی", scores: {} },
      { label: "یکی دو ساعت در روز", scores: { "telegram-bot": 2 } },
      { label: "بیشتر وقتم همینه", scores: { "telegram-bot": 3, "n8n-integration": 1 } },
    ],
  },
  {
    id: "data-location",
    question: "اطلاعات مشتری‌ها، سفارش‌ها یا موجودی الان کجا نگهداری می‌شود؟",
    options: [
      { label: "توی ذهنم، دفترچه یا چند اکسل جدا از هم", scores: { "n8n-integration": 3 } },
      { label: "یک نرم‌افزار دارم ولی خیلی از کارها دستیه", scores: { "n8n-integration": 2, "custom-app": 1 } },
      { label: "یک سیستم منظم دارم، فقط می‌خوام گسترشش بدهم", scores: { "custom-app": 2 } },
    ],
  },
  {
    id: "contact-channel",
    question: "برای ارتباط با مشتری‌ها بیشتر از چه چیزی استفاده می‌کنید؟",
    options: [
      { label: "تلگرام یا بله", scores: { "telegram-bot": 2 } },
      { label: "واتساپ، اینستاگرام یا تلفن", scores: { "telegram-bot": 1, "n8n-integration": 1 } },
      { label: "یک اپلیکیشن یا سایت اختصاصی دارم", scores: { "custom-app": 2 } },
    ],
  },
  {
    id: "sellable-product",
    question: "آیا محصول یا خدمتی دارید که بشود آنلاین یا اشتراکی فروخت؟",
    options: [
      { label: "بله، دقیقاً دنبال همینم", scores: { "store-product": 3 } },
      { label: "شاید، هنوز مطمئن نیستم", scores: { "store-product": 1, "custom-app": 1 } },
      { label: "نه، فعلاً نه", scores: {} },
    ],
  },
  {
    id: "biggest-problem",
    question: "بزرگ‌ترین مشکل الان کدام است؟",
    options: [
      { label: "وقت زیادی صرف کارهای تکراری می‌شود", scores: { "n8n-integration": 2, "telegram-bot": 1 } },
      { label: "مشتری‌ها منتظر جواب می‌مانند", scores: { "telegram-bot": 3 } },
      { label: "می‌خواهم یک محصول یا ایده‌ی جدید را راه بیندازم", scores: { "custom-app": 2, "store-product": 1 } },
    ],
  },
];

export const QUIZ_RESULTS: Record<
  QuizCategory,
  { title: string; description: string; links: { label: string; href: string }[] }
> = {
  "telegram-bot": {
    title: "ربات تلگرام یا بله برای پاسخ‌گویی و فروش",
    description:
      "به‌نظر می‌رسد اولین قدم شما یک ربات تلگرام یا بله است — برای پاسخ‌گویی ۲۴ ساعته یا ثبت سفارش، بدون اینکه مشتری‌ها منتظر بمانند.",
    links: [
      { label: "نمونه واقعی: ربات فروش فولاد جوین", href: "/portfolio/folad-joveyn-sales-bot/" },
      { label: "ربات تلگرام برای کسب‌وکار دقیقاً چه می‌کند؟", href: "/blog/telegram-bot-for-business/" },
    ],
  },
  "n8n-integration": {
    title: "یکپارچه‌سازی ابزارها با n8n",
    description:
      "به‌نظر می‌رسد اطلاعات و ابزارهای شما پراکنده‌اند. یک ورک‌فلوی n8n می‌تواند این‌ها را به‌طور خودکار به هم وصل کند، بدون نیاز به وارد کردن دستی اطلاعات.",
    links: [
      { label: "نمونه واقعی: اپلیکیشن استخراج اطلاعات محصول", href: "/portfolio/product-scraper/" },
      { label: "آموزش مفهومی n8n برای صاحبان کسب‌وکار", href: "/blog/n8n-automation-for-business-owners-2026-07-28/" },
    ],
  },
  "custom-app": {
    title: "اپلیکیشن یا ایجنت هوشمند اختصاصی",
    description:
      "نیاز شما فراتر از یک ربات ساده است — یک اپلیکیشن یا ایجنت هوشمند اختصاصی می‌تواند دقیقاً برای فرآیند خاص کسب‌وکار شما ساخته شود.",
    links: [
      { label: "نمونه واقعی: اپلیکیشن ویرایش خودکار عکس", href: "/portfolio/cphoto-editor/" },
      { label: "نمونه واقعی: ایجنت تولید محتوای اینستاگرام", href: "/portfolio/content-scout-agent/" },
    ],
  },
  "store-product": {
    title: "محصول آماده و اشتراکی",
    description:
      "ایده‌ی شما پتانسیل تبدیل‌شدن به یک محصول اشتراکی آماده را دارد — چیزی که مشتری‌های دیگر هم مستقیم از فروشگاه بخرند.",
    links: [{ label: "فروشگاه محصولات IR-CLU", href: "/store/" }],
  },
};

export function scoreQuiz(answers: number[]): QuizCategory {
  const totals: Record<QuizCategory, number> = {
    "telegram-bot": 0,
    "n8n-integration": 0,
    "custom-app": 0,
    "store-product": 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const option = QUIZ_QUESTIONS[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [category, points] of Object.entries(option.scores)) {
      totals[category as QuizCategory] += points ?? 0;
    }
  });

  return (Object.keys(totals) as QuizCategory[]).reduce((best, category) =>
    totals[category] > totals[best] ? category : best
  );
}
