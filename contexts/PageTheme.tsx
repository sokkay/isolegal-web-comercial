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
  "/software/sst": {
    className: "sst-page-theme",
    navIndicatorColor: "var(--color-primary-on-dark)",
    riskCalculatorHref: "/software/sst#calcula-tu-riesgo-sst",
    riskCalculatorSectionId: "calcula-tu-riesgo-sst",
    riskCalculatorPath: "/software/sst",
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
