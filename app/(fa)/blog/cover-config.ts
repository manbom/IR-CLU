import type { MotifName } from "./cover-motifs";

export const COLORS = ["#34d9e8", "#8b5cf6", "#fb7a3c"] as const;
export const CYAN = COLORS[0];
export const VIOLET = COLORS[1];
export const EMBER = COLORS[2];

type MotifConfig = { motif: MotifName; colors: [string, string] };

// One motif per article, chosen by topic — see cover-motifs.tsx for the shape definitions.
const MOTIF_BY_SLUG: Record<string, MotifConfig> = {
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
const DEFAULT_MOTIF: MotifConfig = { motif: "agent-orbit", colors: [CYAN, VIOLET] };

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

export type CoverNode = { x: number; y: number; r: number; color: string };

export type CoverConfig = { motif: MotifName; colors: [string, string]; nodes: CoverNode[] };

export function getCoverConfig(slug: string): CoverConfig {
  const rand = seededRandom(hashSlug(slug));
  const { motif, colors } = MOTIF_BY_SLUG[slug] ?? DEFAULT_MOTIF;
  const nodes: CoverNode[] = Array.from({ length: 4 }).map(() => ({
    x: 60 + rand() * 1080,
    y: 60 + rand() * 510,
    r: 4 + rand() * 6,
    color: COLORS[Math.floor(rand() * COLORS.length)],
  }));
  return { motif, colors, nodes };
}
