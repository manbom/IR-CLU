import type { Locale } from "./locale";

export type PortfolioItem = {
  slug: string;
  image: string;
  title: string;
  description: string;
  capabilities: string[];
  howItWorks: string;
  idealFor: string;
};

const portfolioItemsFa: PortfolioItem[] = [
  {
    slug: "cphoto-editor",
    image: "/portfolio/cphoto.png",
    title: "اپلیکیشن ویرایش خودکار عکس",
    description:
      "اپلیکیشنی که روی دسته‌ای از عکس‌ها به‌صورت خودکار تغییرات یکسان اعمال می‌کند و خروجی نهایی را آماده تحویل برمی‌گرداند.",
    capabilities: [
      "پردازش دسته‌ای؛ صدها عکس در یک اجرا، بدون تکرار دستی هر مرحله",
      "خروجی یکدست از نظر رنگ، سایز و برش، بدون نیاز به ویرایش نهایی",
      "قابل اجرا روی یک کامپیوتر شخصی، بدون سرور یا هزینه‌ی ابری جداگانه",
    ],
    howItWorks:
      "کاربر یک پوشه از عکس‌های خام را وارد می‌کند و مجموعه‌ای از تنظیمات (یکسان‌سازی اندازه، حذف پس‌زمینه، واترمارک، کراپ مرکزی) را یک‌بار مشخص می‌کند. اپلیکیشن همان مجموعه تنظیمات را روی تک‌تک عکس‌ها اجرا می‌کند و خروجی را در یک پوشه‌ی جدید و آماده‌ی تحویل قرار می‌دهد.",
    idealFor:
      "فروشگاه‌های اینترنتی و تولیدکنندگانی که هر هفته باید عکس محصولات جدید را برای کاتالوگ یا شبکه‌های اجتماعی آماده کنند.",
  },
  {
    slug: "content-telegram-bot",
    image: "/portfolio/content-bot.png",
    title: "ربات تلگرام تولید محتوا",
    description:
      "نسخه‌ی ربات تلگرامی همان اپلیکیشن ویرایش عکس؛ برای تولید سریع محتوای بصری مستقیم از داخل تلگرام.",
    capabilities: [
      "بدون نیاز به نصب چیزی؛ فقط عکس را به ربات بفرستید",
      "خروجی در چند ثانیه، آماده انتشار",
      "قابل اتصال به کانال یا گروه تیم محتوا",
    ],
    howItWorks:
      "همان موتور پردازش تصویر اپلیکیشن دسکتاپ، این‌بار پشت یک ربات تلگرام. عکس خام را در چت ارسال می‌کنید، ربات همان تنظیمات از پیش تعریف‌شده را اعمال می‌کند و عکس نهایی را در همان مکالمه برمی‌گرداند.",
    idealFor:
      "تیم‌های محتوایی که سرعت انتشار برایشان مهم‌تر از باز کردن یک نرم‌افزار جداگانه است.",
  },
  {
    slug: "folad-joveyn-sales-bot",
    image: "/portfolio/folad.png",
    title: "ربات فروش فولاد جوین",
    description:
      "ربات تلگرامی اختصاصی برای بخش فروش کارخانه فولاد جوین، جهت ثبت سفارش و ارتباط مستقیم با مشتریان.",
    capabilities: [
      "پاسخ به استعلام قیمت و موجودی بدون نیاز به تماس تلفنی",
      "ثبت سفارش مستقیم در مکالمه‌ی تلگرام",
      "کانال ارتباطی همیشه در دسترس بین کارخانه و مشتری",
    ],
    howItWorks:
      "ربات به اطلاعات محصولات و قیمت‌گذاری کارخانه وصل است. مشتری در هر ساعتی از شبانه‌روز می‌تواند قیمت، موجودی، یا وضعیت سفارش را بپرسد و پاسخ را همان لحظه دریافت کند؛ کارشناسان فروش فقط برای مذاکرات واقعی درگیر می‌شوند.",
    idealFor:
      "تولیدکنندگان و عمده‌فروشانی که حجم بالایی از استعلام‌های تکراری مشتری دارند.",
  },
  {
    slug: "melkpro-bot",
    image: "/portfolio/melkpro.png",
    title: "ربات هوشمند املاک",
    description:
      "ربات تلگرامی در حوزه املاک که آگهی‌های باارزش را از منابع مختلف پیدا کرده و در اختیار بنگاه‌دار قرار می‌دهد.",
    capabilities: [
      "رصد مداوم چند منبع آگهی هم‌زمان",
      "فیلتر بر اساس معیارهای دقیق خود بنگاه‌دار (منطقه، قیمت، متراژ)",
      "تحویل فوری در تلگرام، بدون تأخیر و بدون جست‌وجوی دستی",
    ],
    howItWorks:
      "ربات به‌طور مداوم منابع آگهی را بررسی می‌کند و هر آگهی تازه را با معیارهای از پیش تعیین‌شده مقایسه می‌کند. فقط مواردی که واقعاً ارزش بررسی دارند به بنگاه‌دار می‌رسند — نه کل فهرست خام.",
    idealFor:
      "بنگاه‌های املاک و مشاورانی که وقتشان صرف جست‌وجوی دستی در چند سایت مختلف می‌شود.",
  },
  {
    slug: "product-scraper",
    image: "/portfolio/khazeshapp.png",
    title: "اپلیکیشن استخراج اطلاعات محصول",
    description:
      "اپلیکیشنی که به‌صورت خودکار سایت‌های مختلف را بررسی کرده و اطلاعات محصولات موردنظر را جمع‌آوری می‌کند.",
    capabilities: [
      "پایش هم‌زمان چند منبع/رقیب",
      "خروجی ساخت‌یافته، آماده‌ی ورود به اکسل یا دیتابیس",
      "زمان‌بندی دلخواه برای بروزرسانی خودکار داده",
    ],
    howItWorks:
      "اپلیکیشن آدرس‌های موردنظر را طبق زمان‌بندی تعیین‌شده بررسی می‌کند، اطلاعات مشخص‌شده (قیمت، موجودی، مشخصات) را استخراج می‌کند و در قالبی آماده برای تحلیل ذخیره می‌کند.",
    idealFor:
      "کسب‌وکارهایی که نیاز به رصد مداوم قیمت رقبا یا موجودی چند منبع دارند.",
  },
  {
    slug: "content-scout-agent",
    image: "/portfolio/snbot.png",
    title: "ایجنت هوشمند تولید محتوای اینستاگرام",
    description:
      "ایجنتی که پست‌های رقبا را تحلیل می‌کند و از دل آن‌ها سناریوی محتوایی تازه استخراج می‌کند، خودش عکس کاور طراحی می‌کند، و به کامنت‌های صفحه اینستاگرام به‌طور خودکار پاسخ می‌دهد.",
    capabilities: [
      "تحلیل مستمر رقبا در همان حوزه‌ی فعالیت",
      "چند ایده‌ی محتوایی آماده در هر اجرا، نه یک ایده‌ی کلی",
      "طراحی خودکار عکس کاور برای هر سناریو",
      "پاسخ‌گویی خودکار به کامنت‌های صفحه",
    ],
    howItWorks:
      "ایجنت پست‌های پربازدید رقبا در یک حوزه‌ی مشخص را بررسی می‌کند، الگوهای موفق را استخراج می‌کند، و بر همان اساس چند سناریوی محتوایی تازه (نه کپی) پیشنهاد می‌دهد؛ در کنارش کاور بصری هر سناریو را هم می‌سازد.",
    idealFor:
      "پیج‌های اینستاگرام کسب‌وکاری که تولید محتوای منظم برایشان زمان‌بر شده.",
  },
  {
    slug: "article-publisher-agent",
    image: "/portfolio/article-publisher-agent.png",
    title: "ایجنت انتشار خودکار مقاله",
    description:
      "ایجنتی مبتنی بر n8n که مقاله می‌نویسد، در گیت‌هاب کامیت می‌کند و کل زنجیره‌ی انتشار سایت را بدون دخالت دستی جلو می‌برد.",
    capabilities: [
      "تولید مقاله‌ی فارسی روزانه بر اساس تقویم محتوایی از پیش تعیین‌شده",
      "کامیت خودکار در گیت‌هاب، بدون دخالت دستی",
      "انتشار خودکار روی سایت زنده، بدون آپلود دستی",
    ],
    howItWorks:
      "همین وب‌سایتی که الان می‌بینید دقیقاً همین‌طور کار می‌کند: یک ورک‌فلوی n8n هر روز موضوعی از تقویم محتوایی برمی‌دارد، مقاله را می‌نویسد، مستقیم در مخزن کد سایت کامیت می‌کند، و ساخت‌وساز خودکار سایت را برای انتشار آن مقاله راه می‌اندازد.",
    idealFor:
      "کسب‌وکارهایی که می‌خواهند بلاگ سایتشان فعال بماند بدون این‌که هر روز وقت بگذارند.",
  },
  {
    slug: "website-design",
    image: "/portfolio/website.png",
    title: "طراحی وب‌سایت",
    description: "همین وب‌سایتی که پیش روی شماست؛ طراحی و توسعه اختصاصی تیم ما.",
    capabilities: [
      "طراحی اختصاصی، نه قالب آماده",
      "سئوی فنی کامل از روز اول (سایت‌مپ، دیتای ساخت‌یافته، سرعت بارگذاری)",
      "بلاگ و فروشگاه متصل به همان زیرساخت اتوماسیون",
    ],
    howItWorks:
      "سایت به‌صورت کاملاً استاتیک ساخته می‌شود تا روی ساده‌ترین و ارزان‌ترین هاست هم با سرعت بالا اجرا شود، و بخش‌های پویا (مقالات، فروشگاه) از طریق همین ورک‌فلوهای اتوماسیون به‌روزرسانی می‌شوند — بدون نیاز به سرور یا دیتابیس جداگانه.",
    idealFor:
      "کسب‌وکارهایی که هم یک سایت حرفه‌ای می‌خواهند، هم نمی‌خواهند هزینه‌ی هاست و نگهداری سنگین بپردازند.",
  },
  {
    slug: "bale-catalog-bot",
    image: "/portfolio/bale-catalog-bot.png",
    title: "ربات مدیریت محصولات کانال بله",
    description:
      "اتوماسیون کامل مدیریت محصولات یک فروشگاه در بله: کارفرما از داخل چت خصوصی ربات قیمت را تغییر می‌دهد و ربات همان پست قبلی را در کانال ویرایش می‌کند — بدون پنل وب جداگانه.",
    capabilities: [
      "پنل مدیریتی کامل داخل چت با جست‌وجوی هوشمند محصول و دکمه‌های Inline",
      "سیستم جشنواره با تخفیف موقت روی چند محصول و پایان خودکار زمان‌بندی‌شده",
      "ویرایش خودکار همان پست قدیمی در کانال، بدون ساخت پست تکراری",
      "تاریخچه‌ی کامل تغییرات و کنترل دسترسی فقط برای ادمین‌های مجاز",
    ],
    howItWorks:
      "هر پست جدید در کانال بله خودکار در دیتابیس ثبت می‌شود. کارفرما از داخل چت خصوصی ربات محصول را جست‌وجو می‌کند، قیمت یا جشنواره را از منوی دکمه‌ای تغییر می‌دهد، و ربات بدون ارسال پست جدید، همان پست قدیمی را در کانال ویرایش می‌کند — کل منطق روی n8n و PostgreSQL پیاده‌سازی شده، بدون بک‌اند اختصاصی.",
    idealFor:
      "فروشگاه‌هایی که کاتالوگ محصولاتشان را با پست در یک کانال بله معرفی می‌کنند و از ویرایش دستی پست‌ها برای هر تغییر قیمت خسته شده‌اند.",
  },
];

const portfolioItemsEn: PortfolioItem[] = [
  {
    slug: "cphoto-editor",
    image: "/portfolio/cphoto.png",
    title: "Automatic Photo Editing App",
    description:
      "An app that applies the same set of edits to a whole batch of photos automatically and hands back delivery-ready output.",
    capabilities: [
      "Batch processing — hundreds of photos in one run, no repeating each step by hand",
      "Consistent output across color, size, and crop, with no final touch-up needed",
      "Runs on a regular personal computer, no server or extra cloud cost",
    ],
    howItWorks:
      "The user imports a folder of raw photos and defines a set of edits once (resizing, background removal, watermark, center crop). The app applies that exact same edit set to every photo and drops the results into a new, delivery-ready folder.",
    idealFor:
      "Online stores and manufacturers who need fresh product photos ready for a catalog or social media every week.",
  },
  {
    slug: "content-telegram-bot",
    image: "/portfolio/content-bot.png",
    title: "Telegram Content Bot",
    description:
      "A Telegram-bot version of the same photo-editing app, for fast visual content straight from a chat.",
    capabilities: [
      "Nothing to install — just send the photo to the bot",
      "Output in seconds, ready to publish",
      "Can be connected to a content team's channel or group",
    ],
    howItWorks:
      "The same image-processing engine as the desktop app, this time behind a Telegram bot. Send a raw photo in the chat, the bot applies the same predefined settings, and returns the finished photo in the same conversation.",
    idealFor:
      "Content teams for whom publishing speed matters more than opening a separate piece of software.",
  },
  {
    slug: "folad-joveyn-sales-bot",
    image: "/portfolio/folad.png",
    title: "Folad Joveyn Sales Bot",
    description:
      "A dedicated Telegram bot for the Folad Joveyn factory's sales department, for order placement and direct customer contact.",
    capabilities: [
      "Answers price and stock inquiries without a phone call",
      "Places orders directly inside the Telegram conversation",
      "An always-available communication channel between the factory and customers",
    ],
    howItWorks:
      "The bot is connected to the factory's real product and pricing data. A customer can ask about price, stock, or order status at any hour and get an answer instantly; sales staff only get involved for actual negotiations.",
    idealFor:
      "Manufacturers and wholesalers who handle a high volume of repetitive customer inquiries.",
  },
  {
    slug: "melkpro-bot",
    image: "/portfolio/melkpro.png",
    title: "Real Estate Intelligence Bot",
    description:
      "A real-estate Telegram bot that finds valuable listings from multiple sources and delivers them to the agent.",
    capabilities: [
      "Continuously monitors several listing sources at once",
      "Filters by the agent's own exact criteria (area, price, size)",
      "Instant delivery in Telegram — no delay, no manual searching",
    ],
    howItWorks:
      "The bot continuously checks listing sources and compares every new listing against predefined criteria. Only the ones actually worth reviewing reach the agent — not the entire raw feed.",
    idealFor:
      "Real estate agencies and agents who spend their time manually searching several different sites.",
  },
  {
    slug: "product-scraper",
    image: "/portfolio/khazeshapp.png",
    title: "Product Data Extraction App",
    description:
      "An app that automatically checks multiple sites and collects the product data you're after.",
    capabilities: [
      "Monitors several sources/competitors simultaneously",
      "Structured output, ready to drop into Excel or a database",
      "Configurable schedule for automatic data refreshes",
    ],
    howItWorks:
      "The app checks the target URLs on the schedule you set, extracts the specified data (price, stock, specs), and stores it in a format ready for analysis.",
    idealFor:
      "Businesses that need to continuously track competitor pricing or stock across multiple sources.",
  },
  {
    slug: "content-scout-agent",
    image: "/portfolio/snbot.png",
    title: "Instagram Content Idea Agent",
    description:
      "An agent that analyzes competitors' posts, pulls fresh content scenarios out of them, designs its own cover images, and automatically replies to comments on the Instagram page.",
    capabilities: [
      "Continuous competitor analysis within the same niche",
      "Several ready content ideas per run, not one generic idea",
      "Automatic cover-image design for each scenario",
      "Automatic replies to comments on the page",
    ],
    howItWorks:
      "The agent reviews competitors' top-performing posts in a given niche, extracts the patterns behind their success, and proposes several genuinely new content scenarios (not copies) based on those patterns — building a visual cover for each one along the way.",
    idealFor:
      "Business Instagram pages where producing content regularly has become too time-consuming.",
  },
  {
    slug: "article-publisher-agent",
    image: "/portfolio/article-publisher-agent.png",
    title: "Automatic Article Publishing Agent",
    description:
      "An n8n-based agent that writes articles, commits them to GitHub, and drives the site's entire publishing chain with no manual work.",
    capabilities: [
      "Generates a daily article from a predefined content calendar",
      "Commits automatically to GitHub, no manual steps",
      "Publishes automatically to the live site, no manual upload",
    ],
    howItWorks:
      "This exact website works exactly this way: an n8n workflow picks a topic from the content calendar every day, writes the article, commits it directly to the site's code repository, and kicks off the site's automatic build to publish it.",
    idealFor:
      "Businesses that want their site's blog to stay active without spending time on it every day.",
  },
  {
    slug: "website-design",
    image: "/portfolio/website.png",
    title: "Website Design",
    description: "This exact website — designed and built in-house by our own team.",
    capabilities: [
      "Custom design, not a template",
      "Full technical SEO from day one (sitemap, structured data, load speed)",
      "Blog and store connected to the same automation infrastructure",
    ],
    howItWorks:
      "The site is built as a fully static export so it runs fast even on the cheapest, simplest hosting, while the dynamic parts (articles, store) get updated through these same automation workflows — no server or separate database needed.",
    idealFor:
      "Businesses that want a professional site without paying for heavy hosting and maintenance.",
  },
  {
    slug: "bale-catalog-bot",
    image: "/portfolio/bale-catalog-bot.png",
    title: "Bale Channel Product Management Bot",
    description:
      "Full automation of product management for a store on Bale (Iran's Telegram-like messenger): the owner changes a price from inside a private chat with the bot, and the bot edits that same original post in the channel — no separate web panel needed.",
    capabilities: [
      "A full management panel inside the chat, with smart product search and inline buttons",
      "A promotion system with temporary discounts across multiple products and scheduled auto-end",
      "Automatically edits the same original channel post — never creates a duplicate",
      "A complete change history, with access restricted to authorized admins only",
    ],
    howItWorks:
      "Every new post in the Bale channel is automatically registered in the database. The owner searches for a product from a private chat with the bot, changes its price or promotion from a button menu, and the bot edits that same original post in the channel without ever sending a new one — the whole logic runs on n8n and PostgreSQL, with no dedicated backend.",
    idealFor:
      "Stores that showcase their product catalog as posts in a Bale channel and are tired of manually editing posts for every price change.",
  },
];

export function getPortfolioItems(locale: Locale): PortfolioItem[] {
  return locale === "en" ? portfolioItemsEn : portfolioItemsFa;
}
