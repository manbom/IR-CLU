import type { ReactNode } from "react";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/Footer";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}
