import type { ReactNode } from "react";

/**
 * Small mono-spaced system label — the site's recurring "node tag" motif.
 * e.g. <Eyebrow index="01">فرآیند</Eyebrow>
 */
export function Eyebrow({
  children,
  index,
  className = "",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase ${className}`}
    >
      {index && (
        <span className="text-cyan" dir="ltr">
          {index}
        </span>
      )}
      <span className="h-px w-6 bg-border" aria-hidden="true" />
      {children}
    </div>
  );
}
