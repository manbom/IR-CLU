"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type NavState = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

const NavStateContext = createContext<NavState | null>(null);

export function NavStateProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const value = useMemo(() => ({ mobileOpen, setMobileOpen }), [mobileOpen]);
  return <NavStateContext.Provider value={value}>{children}</NavStateContext.Provider>;
}

export function useNavState() {
  const ctx = useContext(NavStateContext);
  if (!ctx) throw new Error("useNavState must be used within NavStateProvider");
  return ctx;
}
