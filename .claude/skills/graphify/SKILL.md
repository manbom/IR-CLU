---
name: graphify
description: "Build scroll-driven cinematic frame-sequence sections for the IR-CLU site — a background image/video sequence that advances frame-by-frame as the visitor scrolls, like a short film. Actions: scroll story, scrollytelling, scroll sequence, cinematic scroll, frame sequence, pinned scroll animation. Uses the reusable ScrollSequence component and AI-generated frames (Higgsfield or similar)."
metadata:
  author: irclu
  version: "1.0.0"
---

# Graphify — Scroll-Driven Frame Sequences

Turns a folder of sequential frames (images, ideally AI-generated via Higgsfield or a similar
text/image-to-video tool) into a pinned, scroll-scrubbed cinematic section on the site — the
classic "product page" effect where scrolling plays a short film.

## When to activate
- User asks for a scroll-driven background sequence, "scrollytelling", a cinematic/film-like
  scroll section, or a pinned-canvas animation anywhere on the site.
- User wants to plug in AI-generated (Higgsfield, Runway, etc.) frames into a scroll effect.

## Reusable component
`components/ScrollSequence.tsx` — already built. Given a frame count and a `frameSrc(index)`
function, it renders a tall wrapper (default 300vh) with a `position: sticky` canvas inside;
scroll position within the wrapper maps to a frame index, drawn onto the canvas each frame via
`requestAnimationFrame`. It already handles: image preloading, cover-fit letterboxing, resize,
and `prefers-reduced-motion` (falls back to a single static frame, no forced scroll distance).

Don't rebuild this mechanism from scratch — import and configure `ScrollSequence`, don't
hand-roll a new scroll listener.

## Workflow

1. **Figure out how many frames are needed.** Smooth playback needs roughly 1 frame per ~15–25px
   of scroll at the target `heightVh`. For a 300vh section that's ~40–80 frames; more frames =
   smoother but heavier to preload. Start around 48–60 unless the user asks for more.

2. **Get the actual frames.** These should come from an AI video/image tool (Higgsfield is the
   one this project has referenced) — generate a short clip or an image sequence matching the
   section's theme, then export/extract it as sequentially numbered frames:
   `frame-001.jpg`, `frame-002.jpg`, … zero-padded, same width/height, same aspect ratio.
   Place them under `public/scroll-story/<section-name>/`.

   If real frames aren't available yet (no Higgsfield access/API key configured), say so
   explicitly and use clearly-labeled placeholder frames instead of pretending they're final —
   never ship fake content as if it were the real generated asset.

3. **Wire it into a section component** under `components/sections/`:
   ```tsx
   <ScrollSequence
     frameCount={60}
     frameSrc={(i) => `/scroll-story/<section-name>/frame-${String(i + 1).padStart(3, "0")}.jpg`}
     heightVh={300}
   >
     {/* optional overlay content — headline, CTA — positioned absolutely on top */}
   </ScrollSequence>
   ```

4. **Add it to `app/page.tsx`** (or wherever it belongs) between the existing sections — don't
   replace `Hero.tsx`'s WebGL background unless asked to.

5. **Verify before calling it done** (this is what the `impeccable` skill's checklist covers):
   run the dev server, actually scroll through the section, check both themes, check
   `prefers-reduced-motion`, check it degrades gracefully on a slow/mobile connection (frames
   still loading).
