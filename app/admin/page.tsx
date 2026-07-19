import type { Metadata } from "next";
import { BarChart3, Search, GitFork, FileText, Rss } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { formatJalali } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "پنل مدیریت | IR-CLU",
  robots: { index: false, follow: false },
};

const links = [
  {
    icon: BarChart3,
    title: "آمار بازدید (Google Analytics)",
    description: "تعداد بازدیدکننده، صفحات پربازدید، و منبع ورود ترافیک — لحظه‌ای.",
    href: "https://analytics.google.com/",
  },
  {
    icon: Search,
    title: "وضعیت سئو (Search Console)",
    description: "این‌که گوگل چه صفحاتی را دیده، چه کلیدواژه‌هایی سایت را نشان می‌دهد.",
    href: "https://search.google.com/search-console",
  },
  {
    icon: GitFork,
    title: "مخزن کد و مقالات",
    description: "هر مقاله‌ی جدید (دستی یا از طریق ربات n8n) این‌جا کامیت می‌شود.",
    href: "https://github.com/manbom/IR-CLU",
  },
];

export default function AdminPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 md:pt-40">
        <Container>
          <Eyebrow index="—" className="mb-4">
            پنل مدیریت
          </Eyebrow>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-4xl">
            همه‌چیز درباره وضعیت سایت، یک‌جا
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-muted">
            چون سایت به‌صورت استاتیک روی هاست اجرا می‌شود، آمار و تحلیل به‌جای یک پنل اختصاصی،
            از طریق همین سرویس‌های استاندارد و رایگان گوگل در دسترس است — دقیق‌تر و بدون هزینه‌ی
            نگهداری اضافه.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-cyan">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-base font-semibold text-foreground transition-colors group-hover:text-cyan">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                </a>
              );
            })}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-cyan" aria-hidden="true" />
              <h2 className="text-base font-semibold text-foreground">مقالات منتشرشده</h2>
              <span className="font-mono text-xs text-muted">({posts.length})</span>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-foreground">{post.title}</span>
                  <span className="font-mono text-xs text-muted" dir="ltr">
                    {formatJalali(post.date)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-6 text-muted">
              مقاله‌ی جدید هم به‌صورت دستی (یک فایل <code className="font-mono">.md</code> در
              پوشه‌ی <code className="font-mono">content/blog</code>) و هم به‌صورت خودکار از طریق
              ورک‌فلوی n8n اضافه می‌شود؛ هر دو مسیر روی گیت‌هاب کامیت می‌شوند و ظرف چند دقیقه
              روی سایت منتشر می‌گردند.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted">
            <Rss size={14} aria-hidden="true" />
            <span>
              این صفحه در نتایج گوگل نمایه نمی‌شود و در منوی سایت لینک نشده — فقط با آدرس مستقیم در دسترس است.
            </span>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
