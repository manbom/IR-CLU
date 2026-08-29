import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";
import { renderMotif } from "../cover-motifs";
import { getCoverConfig } from "../cover-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { motif, colors, nodes } = getCoverConfig(slug);

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
              opacity: 0.35,
            }}
          />
        ))}

        {renderMotif(motif, colors)}

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
