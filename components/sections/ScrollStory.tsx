"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollSequence } from "@/components/ScrollSequence";

const FRAME_COUNT = 55;

/**
 * Cinematic scroll section — frames extracted from a real video (ffmpeg, 7fps, 640x640) into
 * public/scroll-story/pipeline/frame-001.jpg .. frame-055.jpg (trimmed to end on the fully-
 * bloomed frame instead of the clip's full length). See the `graphify` skill for how to swap in
 * a different clip later.
 */
export function ScrollStory() {
  return (
    <ScrollSequence
      frameCount={FRAME_COUNT}
      frameSrc={(i) => `/scroll-story/pipeline/frame-${String(i + 1).padStart(3, "0")}.jpg`}
      heightVh={300}
      className="bg-ink"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow index="—" className="mx-auto justify-center">
              IR-CLU
            </Eyebrow>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-5xl">
              هر اسکرول، یک قدم از <span className="text-gradient-signal">خط تولید اتوماسیون</span>
            </h2>
          </div>
        </Container>
      </div>
    </ScrollSequence>
  );
}
