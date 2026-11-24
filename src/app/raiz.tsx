// Piezas compartidas por los dos root layouts, (es)/layout.tsx y (en)/layout.tsx: fuentes, viewport,
// bandera .js y el documento <html> con su lang. Cada idioma tiene su root layout (guía de Next 16,
// «Creating multiple root layouts»), así <html lang> sale correcto en el HTML estático.
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { EMAIL, FOUNDERS, INSTAGRAM_URL, SITE_URL } from "@/content/sitio";
import { dict } from "@/i18n/dict";
import { ruta, type Locale } from "@/i18n/rutas";

// Fuentes variables incluidas en el repo (src/app/fonts, licencia OFL): el build no depende de Google Fonts.
const archivo = localFont({
  variable: "--font-archivo",
  src: [{ path: "./fonts/archivo-latin-wdth-normal.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  display: "swap",
});
const serif = localFont({
  variable: "--font-source-serif",
  src: [
    { path: "./fonts/source-serif-4-latin-opsz-normal.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/source-serif-4-latin-opsz-italic.woff2", weight: "200 900", style: "italic" },
  ],
  display: "swap",
});
const mono = localFont({
  variable: "--font-jetbrains",
  src: [{ path: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", style: "normal" }],
  display: "swap",
});
const hand = localFont({
  variable: "--font-caveat",
  src: [{ path: "./fonts/caveat-latin-wght-normal.woff2", weight: "400 700", style: "normal" }],
  display: "swap",
});

export const FUENTES = `${archivo.variable} ${serif.variable} ${mono.variable} ${hand.variable}`;

export const viewport: Viewport = {
  themeColor: "#F6F6F4",
  colorScheme: "light",
  // el encabezado fijo se extiende bajo la muesca del celular y suma el área segura (env(safe-area-inset-top))
  viewportFit: "cover",
};

/** Metadatos por defecto de cada root layout (las páginas ponen su título, descripción y hreflang). */
export function metadataRaiz(locale: Locale): Metadata {
  const t = dict(locale);
  const inicio = ruta("inicio", locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.tituloDefecto,
      template: "%s | Future Founders",
    },
    description: t.meta.descripcion,
    applicationName: "Future Founders",
    authors: [{ name: "Eddie Ajalcriña" }, { name: "Lorenzo Ortiz" }],
    alternates: { canonical: inicio },
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      siteName: "Future Founders",
      url: inicio,
      title: "Future Founders",
      description: t.meta.descripcion,
    },
    twitter: { card: "summary_large_image", title: "Future Founders", description: t.meta.descripcion },
  };
}

/** Datos estructurados de la organización, en el idioma de la página. */
export function orgLd(locale: Locale) {
  const t = dict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Future Founders",
    legalName: "Soluciones Regenerativas LLC",
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo-l4.svg`,
    email: EMAIL,
    description: t.meta.descripcion,
    areaServed: t.meta.areaServed,
    founder: FOUNDERS.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: t.sitio.founders[f.key].role,
      url: f.webUrl,
      sameAs: [f.webUrl, f.linkedin],
    })),
    contactPoint: [{ "@type": "ContactPoint", telephone: "+51-989-338-401", contactType: "customer service", availableLanguage: "es" }],
    sameAs: [INSTAGRAM_URL],
  };
}

// Marca .js antes de pintar para que las entradas sutiles solo existan con JavaScript.
// Si el script del sitio no llega a correr, se quita a los 2,5 s y todo queda visible.
const JS_FLAG =
  "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__rv)document.documentElement.classList.remove('js')},2500);";

export function Raiz({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const ld = orgLd(locale);
  return (
    <html lang={locale} className={FUENTES} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
