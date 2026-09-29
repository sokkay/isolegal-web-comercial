"use client";

import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useContext } from "react";

type PageThemeConfig = {
  className: string;
  navIndicatorColor: string;
  riskCalculatorHref: string;
  riskCalculatorSectionId: string;
  riskCalculatorPath: string;
};

const defaultThemeConfig: PageThemeConfig = {
  className: "",
  navIndicatorColor: "var(--color-nav-indicator)",
  riskCalculatorHref: "/#calcula-tu-riesgo",
  riskCalculatorSectionId: "calcula-tu-riesgo",
  riskCalculatorPath: "/",
};

const pageThemeConfigs: Record<string, PageThemeConfig> = {
  "/areas/sst": {
    className: "sst-page-theme",
    navIndicatorColor: "var(--color-primary-on-dark)",
    riskCalculatorHref: "/areas/sst#calcula-tu-riesgo-sst",
    riskCalculatorSectionId: "calcula-tu-riesgo-sst",
    riskCalculatorPath: "/areas/sst",
  },
  "/areas/grc": {
    className: "grc-page-theme",
    navIndicatorColor: "var(--color-primary-on-dark)",
    riskCalculatorHref: "/calcula-tu-riesgo?step=1",
    riskCalculatorSectionId: "calcula-tu-riesgo",
    riskCalculatorPath: "/calcula-tu-riesgo",
  },
  "/areas/resso": {
    className: "resso-page-theme",
    navIndicatorColor: "var(--color-primary-on-dark)",
    riskCalculatorHref: "/calcula-tu-riesgo?step=1",
    riskCalculatorSectionId: "calcula-tu-riesgo",
    riskCalculatorPath: "/calcula-tu-riesgo",
  },
  "/soluciones/mdp": {
    className: "mpd-page-theme",
    navIndicatorColor: "var(--color-primary-on-dark)",
    riskCalculatorHref: "/calcula-tu-riesgo?step=1",
    riskCalculatorSectionId: "calcula-tu-riesgo",
    riskCalculatorPath: "/calcula-tu-riesgo",
  },
};

const PageThemeContext = createContext<PageThemeConfig>(defaultThemeConfig);

export function usePageTheme() {
  return useContext(PageThemeContext);
}

export function PageThemeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const themeConfig = pageThemeConfigs[pathname] ?? defaultThemeConfig;

  return (
    <PageThemeContext.Provider value={themeConfig}>
      <div className={themeConfig.className || undefined}>{children}</div>
    </PageThemeContext.Provider>
  );
}
