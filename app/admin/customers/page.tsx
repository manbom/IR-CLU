import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/Footer";
import { AdminCustomersClient } from "./AdminCustomersClient";

export const metadata: Metadata = {
  title: "چت مشتری‌ها | پنل مدیریت IR-CLU",
  robots: { index: false, follow: false },
};

export default function AdminCustomersPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 md:pt-40">
        <Container>
          <Eyebrow index="—" className="mb-4">
            پنل مدیریت
          </Eyebrow>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-4xl">
            مشتری‌ها و گفتگوهاشون با ربات فروش
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-muted">
            این صفحه مستقیم از همون Google Sheet‌ای که ربات فروش استفاده می‌کنه دیتا می‌گیره —
            آمار سریع، لیست مشتری‌ها، گفتگوی هوش مصنوعی فروش با هرکدوم، و سفارش/لایسنس‌هاشون.
            تایید یا رد سفارش همچنان توی خودِ تلگرام انجام می‌شه؛ این صفحه فقط برای دیدنه.
          </p>

          <AdminCustomersClient />

          <div className="mt-16 text-xs leading-6 text-muted">
            این صفحه در نتایج گوگل نمایه نمی‌شود و در منوی سایت لینک نشده — فقط با آدرس مستقیم
            و رمز پنل ادمین در دسترس است.
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
