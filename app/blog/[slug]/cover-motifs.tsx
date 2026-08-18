// Per-article cover motifs for opengraph-image.tsx — small abstract-geometric compositions
// (circles, pills, connecting lines) in the brand palette, built the same way the existing
// glowing-node background is: plain positioned divs, no external assets or AI generation
// (no Gemini/image-gen tooling is available in this environment).

const CYAN = "#34d9e8";
const VIOLET = "#8b5cf6";
const EMBER = "#fb7a3c";

type Shape = { key: string; style: React.CSSProperties };

function circle(key: string, x: number, y: number, d: number, color: string, opacity = 1): Shape {
  return {
    key,
    style: {
      position: "absolute",
      left: x - d / 2,
      top: y - d / 2,
      width: d,
      height: d,
      borderRadius: "50%",
      background: color,
      opacity,
      display: "flex",
    },
  };
}

function pill(key: string, x: number, y: number, w: number, h: number, color: string, rotate = 0): Shape {
  return {
    key,
    style: {
      position: "absolute",
      left: x - w / 2,
      top: y - h / 2,
      width: w,
      height: h,
      borderRadius: h,
      background: color,
      ...(rotate ? { transform: `rotate(${rotate}deg)` } : {}),
      display: "flex",
    },
  };
}

function line(key: string, x1: number, y1: number, x2: number, y2: number, thickness: number, color: string): Shape {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return {
    key,
    style: {
      position: "absolute",
      left: x1,
      top: y1 - thickness / 2,
      width: len,
      height: thickness,
      background: color,
      opacity: 0.55,
      transformOrigin: "0 50%",
      transform: `rotate(${angle}deg)`,
      display: "flex",
    },
  };
}

function bubble(key: string, x: number, y: number, w: number, h: number, color: string, tail: "left" | "right" = "left"): Shape[] {
  return [
    {
      key: `${key}-body`,
      style: {
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 20,
        background: color,
        display: "flex",
      },
    },
    {
      key: `${key}-tail`,
      style: {
        position: "absolute",
        left: tail === "left" ? x + 18 : x + w - 34,
        top: y + h - 8,
        width: 22,
        height: 22,
        background: color,
        transform: "rotate(45deg)",
        display: "flex",
      },
    },
  ];
}

function renderShapes(shapes: Shape[]) {
  return shapes.map((s) => <div key={s.key} style={s.style} />);
}

// Center point for all motifs — right-of-center, clear of the top-right label and
// bottom-left wordmark that opengraph-image.tsx draws on top.
const CX = 860;
const CY = 300;

export type MotifName =
  | "agent-orbit"
  | "scale-balance"
  | "growth-steps"
  | "twin-bubbles"
  | "hub-spoke"
  | "flow-chain"
  | "price-tag";

export function renderMotif(name: MotifName, colors: [string, string] = [CYAN, VIOLET]) {
  const [a, b] = colors;

  switch (name) {
    case "agent-orbit": {
      const satellites = [
        { angle: -60, d: 46 },
        { angle: 10, d: 38 },
        { angle: 95, d: 50 },
        { angle: 170, d: 34 },
        { angle: 235, d: 42 },
      ];
      const R = 150;
      const shapes: Shape[] = [];
      satellites.forEach((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const sx = CX + Math.cos(rad) * R;
        const sy = CY + Math.sin(rad) * R;
        shapes.push(line(`o-line-${i}`, CX, CY, sx, sy, 3, a));
        shapes.push(circle(`o-sat-${i}`, sx, sy, s.d, i % 2 === 0 ? a : b, 0.85));
      });
      shapes.push(circle("o-core", CX, CY, 120, b, 0.95));
      return renderShapes(shapes);
    }

    case "scale-balance": {
      const beamW = 300;
      const armY = CY - 30;
      return renderShapes([
        pill("s-post", CX, CY + 40, 220, 14, a, 90),
        pill("s-beam", CX, armY, beamW, 12, b),
        line("s-left", CX - beamW / 2, armY, CX - beamW / 2, CY + 90, 4, a),
        line("s-right", CX + beamW / 2, armY, CX + beamW / 2, CY + 60, 4, b),
        circle("s-pan-l", CX - beamW / 2, CY + 100, 70, a, 0.9),
        circle("s-pan-r", CX + beamW / 2, CY + 70, 50, b, 0.9),
      ]);
    }

    case "growth-steps": {
      const bars = [70, 120, 175, 235];
      const colors4 = [a, a, b, b];
      const baseY = CY + 130;
      const startX = CX - 210;
      const gap = 110;
      const shapes: Shape[] = bars.map((h, i) =>
        ({
          key: `bar-${i}`,
          style: {
            position: "absolute",
            left: startX + i * gap,
            top: baseY - h,
            width: 60,
            height: h,
            borderRadius: 12,
            background: colors4[i],
            opacity: 0.5 + i * 0.12,
            display: "flex",
          },
        } as Shape)
      );
      shapes.push(line("growth-arrow", startX - 10, baseY + 10, startX + 3 * gap + 70, baseY - bars[3] - 30, 5, b));
      shapes.push(circle("growth-tip", startX + 3 * gap + 70, baseY - bars[3] - 30, 26, b));
      return renderShapes(shapes);
    }

    case "twin-bubbles": {
      const shapes: Shape[] = [
        ...bubble("bl", CX - 260, CY - 60, 220, 130, a, "left"),
        ...bubble("br", CX + 40, CY - 10, 220, 130, b, "right"),
      ];
      return renderShapes(shapes);
    }

    case "hub-spoke": {
      const satellites = [-90, -18, 54, 126, 198];
      const R = 190;
      const shapes: Shape[] = [];
      satellites.forEach((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const sx = CX + Math.cos(rad) * R;
        const sy = CY + Math.sin(rad) * R;
        shapes.push(line(`h-line-${i}`, CX, CY, sx, sy, 3, i % 2 === 0 ? a : b));
        shapes.push(circle(`h-sat-${i}`, sx, sy, 48, i % 2 === 0 ? a : b, 0.85));
      });
      shapes.push(circle("h-core", CX, CY, 90, b));
      return renderShapes(shapes);
    }

    case "flow-chain": {
      const nodes = [-260, -90, 80, 250];
      const shapes: Shape[] = [];
      nodes.forEach((dx, i) => {
        const x = CX + dx;
        if (i < nodes.length - 1) {
          shapes.push(line(`f-line-${i}`, x + 34, CY, CX + nodes[i + 1] - 34, CY, 4, i % 2 === 0 ? a : b));
        }
        shapes.push(circle(`f-node-${i}`, x, CY, 68, i % 2 === 0 ? a : b, 0.9));
      });
      return renderShapes(shapes);
    }

    case "price-tag": {
      return renderShapes([
        pill("p-tag", CX - 20, CY, 280, 160, a, -18),
        circle("p-hole", CX - 130, CY - 60, 24, "#06070b", 1),
        circle("p-coin", CX + 130, CY + 60, 110, b, 0.95),
        circle("p-coin-inner", CX + 130, CY + 60, 70, "#06070b", 0.25),
      ]);
    }
  }
}
