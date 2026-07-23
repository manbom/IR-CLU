import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

const COLORS = ["#34d9e8", "#8b5cf6", "#fb7a3c"];

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rand = seededRandom(hashSlug(slug));

  const nodes = Array.from({ length: 7 }).map((_, i) => ({
    x: 60 + rand() * 1080,
    y: 60 + rand() * 510,
    r: 6 + rand() * 10,
    color: COLORS[Math.floor(rand() * COLORS.length)],
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#06070b",
        }}
      >
        {nodes.map((n, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              width: n.r * 2,
              height: n.r * 2,
              borderRadius: "50%",
              background: n.color,
              opacity: 0.7,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(60% 60% at 30% 30%, rgba(52,217,232,0.12) 0%, transparent 60%), radial-gradient(50% 50% at 80% 75%, rgba(251,122,60,0.12) 0%, transparent 60%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 64,
            right: 72,
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#8a93a6",
            fontFamily: "monospace",
          }}
        >
          AUTOMATION JOURNAL
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 72,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 140,
              height: 10,
              borderRadius: 6,
              background: "linear-gradient(90deg, #34d9e8 0%, #8b5cf6 52%, #fb7a3c 100%)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#f5f6fa",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            IR-CLU
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
