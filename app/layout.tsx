import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isolegal.cl"), 
  title: {
    default: "Isolegal - Cumplimiento Normativo Digital en Chile",
    template: "%s | Isolegal",
  },
  description:
    "Plataforma digital que simplifica el cumplimiento normativo para industrias reguladas en Chile. Centraliza matriz legal, evidencia y alertas en un solo lugar.",
  keywords: [
    "cumplimiento normativo",
    "compliance Chile",
    "auditoría legal",
    "matriz legal",
    "normativa Chile",
    "RCA",
    "RESO",
    "SIGO",
    "RECSS",
  ],
  authors: [{ name: "Isolegal" }],
  creator: "Isolegal",
  publisher: "Isolegal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://isolegal.cl",
    siteName: "Isolegal",
    title: "Isolegal - Cumplimiento Normativo Digital en Chile",
    description:
      "Plataforma digital que simplifica el cumplimiento normativo para industrias reguladas en Chile.",
    images: [
      {
        url: "/images/og-image.jpg", // Crear esta imagen 1200x630px
        width: 1200,
        height: 630,
        alt: "Isolegal - Cumplimiento Normativo Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isolegal - Cumplimiento Normativo Digital en Chile",
    description:
      "Plataforma digital que simplifica el cumplimiento normativo para industrias reguladas.",
    images: ["/images/og-image.jpg"],
    creator: "@isolegal", // Si tienen Twitter
  },
  verification: {
    google: "tu-codigo-google-verification", // Agregar después de Google Search Console
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Isolegal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={manrope.variable} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
