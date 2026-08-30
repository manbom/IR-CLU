import type { Locale } from "./locale";

const fa = {
  nav: {
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
    navAria: "منوی ناوبری",
    menu: "منو",
    startProject: "شروع پروژه",
  },
  hero: {
    eyebrow: "استودیوی اتوماسیون IR-CLU",
    titleLine1: "اتوماسیونی که",
    titleGradient: "واقعاً کار می‌کند",
    subtitle:
      "ربات تلگرام، ربات بله، وب‌سایت، اپلیکیشن و ورک‌فلوهای اتوماسیون n8n — از ایده تا اجرا، برای کسب‌وکاری که می‌خواهد کارهای تکراری را برای همیشه حذف کند.",
    ctaPrimary: "شروع پروژه",
    ctaSecondary: "دیدن فرآیند کار",
  },
  scrollStory: {
    heading: "هر اسکرول، یک قدم از",
    headingGradient: "خط تولید اتوماسیون",
  },
  process: {
    eyebrow: "فرآیند کار",
    heading: "پنج مرحله، یک مسیر روشن تا اتوماسیون کامل",
  },
  services: {
    eyebrow: "خدمات",
    heading: "هر چیزی که برای اتوماسیون کسب‌وکارتان لازم دارید",
  },
  about: {
    eyebrow: "درباره ما",
    heading: "وقتی اتوماسیون وارد کسب‌وکارتان شود، کیفیت بالا می‌رود و هزینه پایین می‌آید",
    paragraph1:
      "IR-CLU را برای حل یک مسئله مشخص راه انداختم: کارهایی که در کسب‌وکارها هنوز با نیروی انسانی، به‌صورت تکراری و با احتمال خطا انجام می‌شوند. با زبان‌ها و ابزارهای مختلف برنامه‌نویسی، این فرآیندها را به ربات، وب‌اپلیکیشن یا ورک‌فلوی اتوماسیون تبدیل می‌کنم.",
    paragraph2:
      "نتیجه‌اش ملموس است: پاسخ‌گویی سریع‌تر و بدون خطا به مشتری، کیفیت خدمات بالاتر، و هزینه‌ای که به‌جای نیروی تکراری، صرف رشد واقعی کسب‌وکارتان می‌شود.",
    paragraph3:
      "با توجه به نوع پروژه و محدودیت‌های زیرساختی داخل ایران، راه‌حلی طراحی می‌کنم که بدون دردسر اجرا شود و در درازمدت پایدار بماند.",
    specs: [
      { label: "موقعیت", value: "جوین، ایران" },
      { label: "تمرکز", value: "اتوماسیون و یکپارچه‌سازی سیستم‌ها" },
      { label: "ابزارها", value: "n8n · Python · TypeScript · Node.js" },
    ],
  },
  team: {
    eyebrow: "تیم",
    heading: "آدم‌هایی که پشت IR-CLU هستند",
  },
  portfolio: {
    eyebrow: "نمونه‌کارها",
    heading: "قسمتی از پروژه‌های تیم IR-CLU",
    subtitle: "روی هر پروژه بزنید تا ببینید دقیقاً چطور کار می‌کند.",
    viewDetails: "جزئیات بیشتر",
  },
  portfolioDetail: {
    back: "بازگشت به نمونه‌کارها",
    eyebrow: "نمونه‌کار",
    whatItDoes: "این ابزار چه کاری انجام می‌دهد",
    howItWorks: "چطور کار می‌کند",
    idealFor: "مناسب چه کسب‌وکارهایی است",
    storeCta: "همین ابزار به‌صورت اشتراک ماهانه در فروشگاه ما آماده‌ی خرید است.",
    viewInStore: "مشاهده در فروشگاه",
    contactPrompt: "می‌خواهید چیزی شبیه این برای کسب‌وکار خودتان بسازیم؟",
    startConversation: "شروع گفت‌وگو",
  },
  quizTeaser: {
    eyebrow: "نمی‌دانید از کجا شروع کنید؟",
    headingBefore: "با ۵ سوال بفهمید دقیقاً به",
    headingGradient: "چه اتوماسیونی",
    headingAfter: "نیاز دارید",
    cta: "شروع تست",
  },
  quiz: {
    previousQuestion: "سوال قبلی",
    resultLabel: "نتیجه",
    sentMessage: "دریافت شد — به‌زودی از طریق تلگرام یا تماسی که دادید باهاتون در ارتباط خواهیم بود.",
    followUpPrompt: "می‌خواهید همین نتیجه را با ما در میان بگذارید تا مستقیم پیگیری کنیم؟",
    namePlaceholder: "اسم شما (اختیاری)",
    contactPlaceholder: "شماره تماس یا آیدی تلگرام",
    sending: "در حال ارسال...",
    submit: "ارسال و پیگیری",
    errorPrefix: "ارسال خودکار ممکن نشد — می‌توانید مستقیم در تلگرام پیام بدهید:",
  },
  blog: {
    metaTitle: "مقالات اتوماسیون | IR-CLU",
    metaDescription:
      "یادداشت‌هایی درباره اتوماسیون کسب‌وکار، ربات تلگرام، و ورک‌فلوهای n8n — با مثال‌های واقعی از پروژه‌های IR-CLU.",
    eyebrow: "مقالات",
    heading: "یادداشت‌هایی درباره اتوماسیون، ربات‌ها و کاری که واقعاً جواب می‌دهد",
    subtitle: "هر مقاله از یک سؤال واقعی شروع می‌شود که در پروژه‌های IR-CLU با آن روبه‌رو شده‌ایم.",
    readingTime: "دقیقه مطالعه",
    emptyState: "مقاله‌های انگلیسی به‌زودی اضافه می‌شوند — نسخه‌ی فارسی همین حالا در دسترس است.",
    viewFarsiBlog: "مشاهده‌ی بلاگ فارسی",
    backToArticles: "بازگشت به مقالات",
    faqHeading: "سوالات متداول",
    relatedHeading: "مقالات مرتبط",
    closingPrompt: "می‌خواهید ببینید این موضوع دقیقاً برای کسب‌وکار شما چه شکلی می‌شود؟",
    startConversation: "شروع گفت‌وگو",
  },
  automationCheck: {
    title: "چه بخشی از کسب‌وکارتان را باید اتوماتیک کنید؟",
    description:
      "با پاسخ به ۵ سوال ساده، دقیقاً بفهمید IR-CLU برای کسب‌وکار شما باید چه چیزی بسازد — ربات تلگرام، یکپارچه‌سازی با n8n، اپلیکیشن اختصاصی یا یک محصول آماده.",
    eyebrow: "تشخیص نیاز",
  },
  store: {
    metaTitle: "فروشگاه محصولات IR-CLU",
    metaDescription: "اپلیکیشن‌ها و ربات‌های آماده‌ی IR-CLU — با اشتراک ماهانه، مستقیم از تلگرام تحویل بگیرید.",
    eyebrow: "فروشگاه",
    heading: "اپلیکیشن‌ها و ربات‌های آماده، با اشتراک ماهانه",
    subtitle: "هر محصول را با یک پیام در تلگرام سفارش بدهید — پرداخت امن، و تحویل فوری بعد از تأیید.",
    typeBot: "ربات تلگرام",
    typeApp: "اپلیکیشن",
    monthly: "ماهانه",
    buyOnTelegram: "خرید در تلگرام",
  },
  contact: {
    eyebrow: "شروع همکاری",
    headingBefore: "بگویید چه کاری را می‌خواهید",
    headingGradient: "حذف کنیم",
    paragraph: "برای مشاوره رایگان درباره ربات، وب‌سایت یا اتوماسیون کسب‌وکارتان، از طریق تلگرام یا ایمیل با ما در تماس باشید.",
    telegramCta: "پیام در تلگرام",
  },
  footer: {
    tagline: "NBN Automation Solutions",
  },
};

type Dictionary = typeof fa;

const en: Dictionary = {
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navAria: "Navigation menu",
    menu: "Menu",
    startProject: "Start a project",
  },
  hero: {
    eyebrow: "IR-CLU Automation Studio",
    titleLine1: "Automation that",
    titleGradient: "actually works",
    subtitle:
      "Telegram bots, Bale bots, websites, apps, and n8n automation workflows — from idea to launch, for businesses that want repetitive work gone for good.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See how it works",
  },
  scrollStory: {
    heading: "Every scroll, one step down",
    headingGradient: "the automation pipeline",
  },
  process: {
    eyebrow: "Process",
    heading: "Five stages, one clear path to full automation",
  },
  services: {
    eyebrow: "Services",
    heading: "Everything you need to automate your business",
  },
  about: {
    eyebrow: "About",
    heading: "When automation enters your business, quality goes up and cost goes down",
    paragraph1:
      "I started IR-CLU to solve one specific problem: work that businesses still do manually, repetitively, and error-prone. With a range of programming languages and tools, I turn those processes into a bot, a web app, or an automation workflow.",
    paragraph2:
      "The result is tangible: faster, error-free responses to customers, higher service quality, and money that goes toward real growth instead of repetitive labor.",
    paragraph3:
      "Given the specific project and Iran's infrastructure constraints, I design solutions that deploy without headaches and stay stable long-term.",
    specs: [
      { label: "Location", value: "Joveyn, Iran" },
      { label: "Focus", value: "Automation & systems integration" },
      { label: "Stack", value: "n8n · Python · TypeScript · Node.js" },
    ],
  },
  team: {
    eyebrow: "Team",
    heading: "The people behind IR-CLU",
  },
  portfolio: {
    eyebrow: "Portfolio",
    heading: "Some of the IR-CLU team's projects",
    subtitle: "Click any project to see exactly how it works.",
    viewDetails: "View details",
  },
  portfolioDetail: {
    back: "Back to portfolio",
    eyebrow: "Case study",
    whatItDoes: "What this tool does",
    howItWorks: "How it works",
    idealFor: "Who it's for",
    storeCta: "This exact tool is available as a monthly subscription in our store.",
    viewInStore: "View in store",
    contactPrompt: "Want us to build something like this for your business?",
    startConversation: "Start a conversation",
  },
  quizTeaser: {
    eyebrow: "Not sure where to start?",
    headingBefore: "Answer 5 questions to find out exactly",
    headingGradient: "what to automate",
    headingAfter: "first",
    cta: "Start the test",
  },
  quiz: {
    previousQuestion: "Previous question",
    resultLabel: "Result",
    sentMessage: "Got it — we'll reach out soon over Telegram or whatever contact info you gave us.",
    followUpPrompt: "Want to share this result with us so we can follow up directly?",
    namePlaceholder: "Your name (optional)",
    contactPlaceholder: "Phone number or Telegram handle",
    sending: "Sending...",
    submit: "Send & follow up",
    errorPrefix: "Automatic sending failed — you can message us directly on Telegram:",
  },
  blog: {
    metaTitle: "Automation Articles | IR-CLU",
    metaDescription:
      "Notes on business automation, Telegram bots, and n8n workflows — with real examples from IR-CLU projects.",
    eyebrow: "Blog",
    heading: "Notes on automation, bots, and what actually works",
    subtitle: "Every article starts from a real question we've run into on IR-CLU projects.",
    readingTime: "min read",
    emptyState: "English articles are on the way — the Persian version is available right now.",
    viewFarsiBlog: "View the Persian blog",
    backToArticles: "Back to articles",
    faqHeading: "Frequently asked questions",
    relatedHeading: "Related articles",
    closingPrompt: "Want to see exactly what this looks like for your business?",
    startConversation: "Start a conversation",
  },
  automationCheck: {
    title: "What part of your business should you automate?",
    description:
      "Answer 5 simple questions to find out exactly what IR-CLU should build for your business — a Telegram bot, n8n integration, a custom app, or a ready-made product.",
    eyebrow: "Needs assessment",
  },
  store: {
    metaTitle: "IR-CLU Product Store",
    metaDescription: "IR-CLU's ready-made apps and bots — monthly subscription, delivered straight through Telegram.",
    eyebrow: "Store",
    heading: "Ready-made apps and bots, on a monthly subscription",
    subtitle: "Order any product with one message on Telegram — secure payment, instant delivery after approval.",
    typeBot: "Telegram bot",
    typeApp: "App",
    monthly: "Monthly",
    buyOnTelegram: "Buy on Telegram",
  },
  contact: {
    eyebrow: "Let's work together",
    headingBefore: "Tell us what you want",
    headingGradient: "gone",
    paragraph: "For a free consultation about your bot, website, or business automation, reach out via Telegram or email.",
    telegramCta: "Message on Telegram",
  },
  footer: {
    tagline: "NBN Automation Solutions",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { fa, en };
