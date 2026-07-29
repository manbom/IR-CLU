"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollSequence } from "@/components/ScrollSequence";

const FRAME_COUNT = 48;

/**
 * Placeholder cinematic scroll section — frames are procedurally generated stand-ins (see
 * scripts used to fill public/scroll-story/pipeline) until real AI-generated frames (Higgsfield
 * or similar) replace them. See the `graphify` skill for how to swap these in.
 */
export function ScrollStory() {
  return (
    <ScrollSequence
      frameCount={FRAME_COUNT}
      frameSrc={(i) => `/scroll-story/pipeline/frame-${String(i + 1).padStart(3, "0")}.svg`}
      heightVh={300}
      className="bg-ink"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow index="—" className="mx-auto justify-center">
              پیش‌نمایش — منتظر فریم‌های واقعی
            </Eyebrow>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-5xl">
              هر اسکرول، یک قدم از <span className="text-gradient-signal">خط تولید اتوماسیون</span>
            </h2>
            <p className="mt-6 text-sm text-muted">
              این بخش فعلاً با فریم‌های موقت ساخته شده — به‌محض آماده شدن فریم‌های واقعی
              (Higgsfield یا مشابه)، جایگزین می‌شن.
            </p>
          </div>
        </Container>
      </div>
    </ScrollSequence>
  );
}
