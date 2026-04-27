import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PostHogProvider } from "@/lib/posthog/PostHogProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
const GTM_ID = "GTM-K6KZ57WP";
const LINKEDIN_PARTNER_ID = "10047017";

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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <Script id="linkedin-partner" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l) {
                window.lintrk = function(a, b) {
                  window.lintrk.q.push([a, b]);
                };
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
          />
        </noscript>
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
