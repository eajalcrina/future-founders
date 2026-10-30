import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getContent } from "@/lib/content";
import { JsonLd, siteGraph } from "@/lib/schema";
import { INDEXABLE, NAME, SITE, alternates, type Lang } from "@/lib/site";
import "@/app/globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", axes: ["wdth"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"] });

export const viewport: Viewport = { themeColor: "#f6f6f4" };

export function baseMetadata(lang: Lang): Metadata {
  const t = getContent(lang);
  const og = lang === "en" ? "/og/og-en.png" : "/og/og-es.png";
  return {
    metadataBase: new URL(SITE),
    title: { default: t.meta.title, template: `%s · ${NAME}` },
    description: t.meta.description,
    alternates: alternates("home", lang),
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : "es_PE",
      siteName: NAME,
      url: lang === "en" ? "/en" : "/",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: og, width: 1200, height: 630, alt: t.hero.titleA + " " + t.hero.titleB }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [og] },
    robots: INDEXABLE ? { index: true, follow: true, googleBot: { "max-image-preview": "large" } } : { index: false, follow: false },
  };
}

// Raíz del documento por idioma: <html lang>, fuentes, datos estructurados y analítica sin cookies.
export function Root({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${archivo.variable} ${mono.variable}`}>
      <body className="ff">
        <JsonLd data={siteGraph(lang)} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
