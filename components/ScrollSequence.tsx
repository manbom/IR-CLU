"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollSequenceProps = {
  /** total number of frames in the sequence */
  frameCount: number;
  /** frame path builder, given a zero-based frame index */
  frameSrc: (index: number) => string;
  /** total scroll distance driving the sequence, in viewport-heights (default 300 = 3x viewport) */
  heightVh?: number;
  className?: string;
  /** optional content pinned on top of the canvas (headline, CTA, ...) */
  children?: ReactNode;
};

/**
 * Pins a full-viewport canvas for the duration of a tall wrapper and paints the frame that
 * corresponds to how far the visitor has scrolled through it — the standard "scroll plays a
 * short film" effect. Frames are preloaded up front; with `prefers-reduced-motion` it skips the
 * scroll-driven playback entirely and just shows one static frame at normal section height.
 */
export function ScrollSequence({
  frameCount,
  frameSrc,
  heightVh = 300,
  className = "",
  children,
}: ScrollSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawFrame(index: number) {
      const img = imagesRef.current[index];
      if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let dw = canvas.width;
      let dh = canvas.height;
      let dx = 0;
      let dy = 0;
      if (imgRatio > canvasRatio) {
        dh = canvas.height;
        dw = dh * imgRatio;
        dx = (canvas.width - dw) / 2;
      } else {
        dw = canvas.width;
        dh = dw / imgRatio;
        dy = (canvas.height - dh) / 2;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function frameForScroll() {
      if (!wrap) return 0;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;
      return Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
    }

    function render() {
      if (!canvas) return;
      drawFrame(reducedMotion ? Math.floor(frameCount / 2) : frameForScroll());
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        render();
        ticking = false;
      });
    }

    resize();
    const imgs = imagesRef.current;
    let remaining = imgs.length;
    imgs.forEach((img) => {
      img.onload = () => {
        remaining -= 1;
        render();
      };
    });

    window.addEventListener("resize", resize);
    if (!reducedMotion) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [frameCount, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", height: reducedMotion ? "100vh" : `${heightVh}vh` }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        {children}
      </div>
    </div>
  );
}
