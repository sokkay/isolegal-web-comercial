import { PageThemeProvider } from "@/contexts/PageTheme";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

export default function ThemedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <PageThemeProvider>
      <Header />
      {children}
      <Footer />
    </PageThemeProvider>
  );
}
