import { getMotifShapes, type Shape } from "./cover-motifs";
import { getCoverConfig } from "./cover-config";

// Renders the same per-slug cover (background + drifting nodes + motif) as
// opengraph-image.tsx, but as a real inline SVG instead of a hotlinked <img> to
// that metadata route. Next.js only guarantees that route's URL for the
// auto-injected <head> og:image tag (itself cache-busted with a query hash) —
// not for manual references elsewhere, and its exact path is not stable across
// build configurations (confirmed: adding a route group changed it). An SVG
// with a viewBox scales to the container natively, no hotlink/coordinate-
// scaling tricks needed.
function shapeToSvg(shape: Shape) {
  const s = shape.style;
  const width = Number(s.width);
  const height = Number(s.height);
  const x = Number(s.left);
  const y = Number(s.top);
  const isCircle = s.borderRadius === "50%";
  const rx = isCircle ? width / 2 : Number(s.borderRadius ?? 0);
  const transform = shape.rotate
    ? `rotate(${shape.rotate} ${shape.rotateOrigin!.x} ${shape.rotateOrigin!.y})`
    : undefined;

  return (
    <rect
      key={shape.key}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      fill={String(s.background)}
      opacity={typeof s.opacity === "number" ? s.opacity : 1}
      transform={transform}
    />
  );
}

export function BlogCover({ slug, className = "" }: { slug: string; className?: string }) {
  const { motif, colors, nodes } = getCoverConfig(slug);
  const shapes = getMotifShapes(motif, colors);

  return (
    <svg
      viewBox="0 0 1200 630"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x={0} y={0} width={1200} height={630} fill="#06070b" />

      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={0.35} />
      ))}

      {shapes.map(shapeToSvg)}

      <defs>
        <radialGradient id="cover-glow-1" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(52,217,232,0.12)" />
          <stop offset="100%" stopColor="rgba(52,217,232,0)" />
        </radialGradient>
        <radialGradient id="cover-glow-2" cx="80%" cy="75%" r="50%">
          <stop offset="0%" stopColor="rgba(251,122,60,0.12)" />
          <stop offset="100%" stopColor="rgba(251,122,60,0)" />
        </radialGradient>
        <linearGradient id="cover-brand-bar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d9e8" />
          <stop offset="52%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#fb7a3c" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1200} height={630} fill="url(#cover-glow-1)" />
      <rect x={0} y={0} width={1200} height={630} fill="url(#cover-glow-2)" />

      <text
        x={1128}
        y={80}
        textAnchor="end"
        fontSize={26}
        letterSpacing={6}
        fill="#8a93a6"
        fontFamily="var(--font-mono, monospace)"
      >
        AUTOMATION JOURNAL
      </text>

      <rect x={72} y={550} width={140} height={10} rx={5} fill="url(#cover-brand-bar)" />
      <text x={72} y={604} fontSize={52} fontWeight={700} fill="#f5f6fa" fontFamily="var(--font-mono, monospace)">
        IR-CLU
      </text>
    </svg>
  );
}
