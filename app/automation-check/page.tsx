import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AutomationQuiz } from "@/components/AutomationQuiz";

const TITLE = "چه بخشی از کسب‌وکارتان را باید اتوماتیک کنید؟";
const DESCRIPTION =
  "با پاسخ به ۵ سوال ساده، دقیقاً بفهمید IR-CLU برای کسب‌وکار شما باید چه چیزی بسازد — ربات تلگرام، یکپارچه‌سازی با n8n، اپلیکیشن اختصاصی یا یک محصول آماده.";

export const metadata: Metadata = {
  title: `${TITLE} | IR-CLU`,
  description: DESCRIPTION,
  alternates: { canonical: "/automation-check/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "/automation-check/",
  },
};

export default function AutomationCheckPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-2xl">
        <Eyebrow index="—" className="mb-4">
          تشخیص نیاز
        </Eyebrow>
        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">{TITLE}</h1>
        <p className="mt-6 leading-8 text-muted">{DESCRIPTION}</p>

        <div className="mt-12">
          <AutomationQuiz />
        </div>
      </Container>
    </main>
  );
}
