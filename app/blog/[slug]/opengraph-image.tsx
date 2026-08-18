import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";
import { renderMotif, type MotifName } from "./cover-motifs";

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
const CYAN = COLORS[0];
const VIOLET = COLORS[1];
const EMBER = COLORS[2];

// One motif per article, chosen by topic — see cover-motifs.tsx for the shape definitions.
const MOTIF_BY_SLUG: Record<string, { motif: MotifName; colors: [string, string] }> = {
  "automation-ai-complete-guide": { motif: "agent-orbit", colors: [VIOLET, CYAN] },
  "automation-cost-quality": { motif: "scale-balance", colors: [CYAN, EMBER] },
  "business-automation-importance-1405-2026-07-20": { motif: "growth-steps", colors: [CYAN, VIOLET] },
  "comparison-of-telegram-bale-bots-2026-07-26": { motif: "twin-bubbles", colors: [CYAN, VIOLET] },
  "cost-of-business-automation-in-iran-2026-07-22": { motif: "price-tag", colors: [EMBER, VIOLET] },
  "how-to-manage-dispersed-services-with-n8n-2026-07-19": { motif: "hub-spoke", colors: [VIOLET, CYAN] },
  "n8n-automation-for-business-owners-2026-07-28": { motif: "flow-chain", colors: [CYAN, VIOLET] },
  "n8n-vs-zapier-in-iran-2026-07-27": { motif: "flow-chain", colors: [EMBER, CYAN] },
  "signs-to-automate-manual-process-2026-07-19": { motif: "growth-steps", colors: [EMBER, VIOLET] },
  "support-bot-vs-sales-bot-which-to-build-first-2026-07-20": { motif: "twin-bubbles", colors: [VIOLET, CYAN] },
  "telegram-bot-cheap-vs-professional-database-2026-07-24": { motif: "twin-bubbles", colors: [CYAN, VIOLET] },
  "telegram-bot-for-business": { motif: "hub-spoke", colors: [CYAN, EMBER] },
  "telegram-bot-price-1405-2026-07-23": { motif: "price-tag", colors: [VIOLET, EMBER] },
  "telegram-bot-vs-database-bot": { motif: "twin-bubbles", colors: [VIOLET, EMBER] },
};
const DEFAULT_MOTIF: { motif: MotifName; colors: [string, string] } = { motif: "agent-orbit", colors: [CYAN, VIOLET] };

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rand = seededRandom(hashSlug(slug));
  const { motif, colors } = MOTIF_BY_SLUG[slug] ?? DEFAULT_MOTIF;

  const nodes = Array.from({ length: 4 }).map((_, i) => ({
    x: 60 + rand() * 1080,
    y: 60 + rand() * 510,
    r: 4 + rand() * 6,
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
