"use client";

import dynamic from "next/dynamic";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media";
import { useNavState } from "@/lib/nav-state";

const AutomationGraph = dynamic(
  () => import("./AutomationGraph").then((m) => m.AutomationGraph),
  { ssr: false },
);

export function AutomationGraphScene({ className = "" }: { className?: string }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = usePrefersReducedMotion();
  const { mobileOpen } = useNavState();

  // Don't keep a WebGL canvas painting behind the full-screen mobile menu.
  if (mobileOpen) return null;

  return (
    <AutomationGraph
      variant={isDesktop ? "full" : "light"}
      reducedMotion={reducedMotion}
      className={className}
    />
  );
}
