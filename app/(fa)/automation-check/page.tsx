import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AutomationQuiz } from "@/components/AutomationQuiz";
import { dictionaries } from "@/lib/dictionaries";

const t = dictionaries.fa.automationCheck;

export const metadata: Metadata = {
  title: `${t.title} | IR-CLU`,
  description: t.description,
  alternates: { canonical: "/automation-check/" },
  openGraph: {
    title: t.title,
    description: t.description,
    type: "website",
    url: "/automation-check/",
  },
};

export default function AutomationCheckPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40">
      <Container className="max-w-2xl">
        <Eyebrow index="—" className="mb-4">
          {t.eyebrow}
        </Eyebrow>
        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">{t.title}</h1>
        <p className="mt-6 leading-8 text-muted">{t.description}</p>

        <div className="mt-12">
          <AutomationQuiz />
        </div>
      </Container>
    </main>
  );
}
