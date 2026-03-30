import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PostHogProvider } from "@/lib/posthog/PostHogProvider";
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
  alternates: {
    canonical: "https://isolegal.cl",
  },
  description:
    "Plataforma que convierte requisitos legales en acciones operativas, trazables y priorizadas por riesgo. Gestiona matriz legal, evidencia y cumplimiento en un solo lugar.",
  keywords: [
    "cumplimiento normativo Chile",
    "gestión de cumplimiento legal",
    "matriz legal Chile",
    "control de cumplimiento normativo",
    "riesgo legal operacional",
    "software compliance Chile",
    "auditoría cumplimiento legal",
    "gestión normativa empresas",
    "RCA cumplimiento ambiental",
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
    title: "Isolegal - Control operativo del cumplimiento normativo",
    description:
      "Convierte requisitos legales en acciones trazables, priorizadas por riesgo y listas para auditoría.",
    images: [
      {
        url: "/images/og-image.png", // Crear esta imagen 1200x630px
        width: 1200,
        height: 630,
        alt: "Isolegal plataforma de cumplimiento normativo y control de riesgo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isolegal - Cumplimiento normativo con control operativo",
    description:
      "Gestiona tu matriz legal, evidencia y riesgo en un solo lugar. Cumplimiento trazable y listo para auditoría.",
    images: ["/images/og-image.png"],
    creator: "@isolegal",
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
          <ReactQueryProvider>
            <PostHogProvider>
              <Header />
              {children}
              <Footer />
            </PostHogProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
