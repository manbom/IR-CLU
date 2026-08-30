import type { Locale } from "./locale";

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

// Scoring only ever reads `scores`, keyed by option index within a question — as
// long as both locale arrays keep the same question/option order and score
// values (which they do below), scoreQuiz() works identically regardless of
// which locale's questions were actually shown to the visitor.
const quizQuestionsFa: QuizQuestion[] = [
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

const quizQuestionsEn: QuizQuestion[] = [
  {
    id: "repetitive-time",
    question: "How much of your daily time goes into answering repetitive customer questions?",
    options: [
      { label: "Almost none", scores: {} },
      { label: "An hour or two a day", scores: { "telegram-bot": 2 } },
      { label: "Most of my time", scores: { "telegram-bot": 3, "n8n-integration": 1 } },
    ],
  },
  {
    id: "data-location",
    question: "Where do you currently keep customer info, orders, or inventory?",
    options: [
      { label: "In my head, a notebook, or a few separate spreadsheets", scores: { "n8n-integration": 3 } },
      { label: "I have software, but a lot of it is still manual", scores: { "n8n-integration": 2, "custom-app": 1 } },
      { label: "I have an organized system, I just want to expand it", scores: { "custom-app": 2 } },
    ],
  },
  {
    id: "contact-channel",
    question: "What do you mostly use to reach customers?",
    options: [
      { label: "Telegram or Bale", scores: { "telegram-bot": 2 } },
      { label: "WhatsApp, Instagram, or phone calls", scores: { "telegram-bot": 1, "n8n-integration": 1 } },
      { label: "I have my own app or website", scores: { "custom-app": 2 } },
    ],
  },
  {
    id: "sellable-product",
    question: "Do you have a product or service that could be sold online or as a subscription?",
    options: [
      { label: "Yes, that's exactly what I'm after", scores: { "store-product": 3 } },
      { label: "Maybe, I'm not sure yet", scores: { "store-product": 1, "custom-app": 1 } },
      { label: "No, not right now", scores: {} },
    ],
  },
  {
    id: "biggest-problem",
    question: "What's the single biggest problem right now?",
    options: [
      { label: "Too much time spent on repetitive tasks", scores: { "n8n-integration": 2, "telegram-bot": 1 } },
      { label: "Customers are left waiting for answers", scores: { "telegram-bot": 3 } },
      { label: "I want to launch a new product or idea", scores: { "custom-app": 2, "store-product": 1 } },
    ],
  },
];

export function getQuizQuestions(locale: Locale): QuizQuestion[] {
  return locale === "en" ? quizQuestionsEn : quizQuestionsFa;
}

type QuizResult = { title: string; description: string; links: { label: string; href: string }[] };

const quizResultsFa: Record<QuizCategory, QuizResult> = {
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

// Blog-post links are omitted here on purpose: those two Persian posts don't
// have English translations yet (rolling out separately, post by post), and a
// quiz result linking to a page that doesn't exist would be worse than no link.
// Add the /en/blog/... equivalents here once they're translated.
const quizResultsEn: Record<QuizCategory, QuizResult> = {
  "telegram-bot": {
    title: "A Telegram or Bale bot for support and sales",
    description:
      "Your first move looks like a Telegram or Bale bot — for round-the-clock responses or taking orders, without customers left waiting.",
    links: [{ label: "Real example: Folad Joveyn sales bot", href: "/en/portfolio/folad-joveyn-sales-bot/" }],
  },
  "n8n-integration": {
    title: "Integrating your tools with n8n",
    description:
      "Your data and tools look scattered. An n8n workflow can connect them automatically, without manual data entry.",
    links: [{ label: "Real example: Product data extraction app", href: "/en/portfolio/product-scraper/" }],
  },
  "custom-app": {
    title: "A custom app or AI agent",
    description:
      "Your need goes beyond a simple bot — a custom app or AI agent can be built specifically for your business's exact process.",
    links: [
      { label: "Real example: Automatic photo editing app", href: "/en/portfolio/cphoto-editor/" },
      { label: "Real example: Instagram content idea agent", href: "/en/portfolio/content-scout-agent/" },
    ],
  },
  "store-product": {
    title: "A ready-made, subscription product",
    description:
      "Your idea has the potential to become a ready subscription product — something other customers could buy directly from the store.",
    links: [{ label: "IR-CLU product store", href: "/en/store/" }],
  },
};

export function getQuizResults(locale: Locale): Record<QuizCategory, QuizResult> {
  return locale === "en" ? quizResultsEn : quizResultsFa;
}

export function scoreQuiz(answers: number[], locale: Locale = "fa"): QuizCategory {
  const questions = getQuizQuestions(locale);
  const totals: Record<QuizCategory, number> = {
    "telegram-bot": 0,
    "n8n-integration": 0,
    "custom-app": 0,
    "store-product": 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [category, points] of Object.entries(option.scores)) {
      totals[category as QuizCategory] += points ?? 0;
    }
  });

  return (Object.keys(totals) as QuizCategory[]).reduce((best, category) =>
    totals[category] > totals[best] ? category : best
  );
}
