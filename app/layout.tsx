import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isolegal",
  description:
    "La startup que está transformando el cumplimiento normativo en Chile Conocimiento que guía, cercanía que acompaña, simplicidad que transforma. Soluciones digitales que simplifican la identificación, el cumplimiento y la trazabilidad legal para industrias altamente reguladas Ellos ya descubrieron la simplicidad del cumplimiento normativo, ¡descúbrela tú también! Optimiza tu cumplimiento normativo hoy mismo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
