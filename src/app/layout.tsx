import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, EMAIL, FOUNDERS, INSTAGRAM_URL } from "@/content/sitio";

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

const DESC =
  "Future Founders acompaña a gerentes, directores y VP de Latinoamérica a fraccionar su trabajo en roles parciales, uno a uno, hasta que sus ingresos propios cubren su costo de vida.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Future Founders | Tu experiencia puede trabajar para más de una empresa",
    template: "%s | Future Founders",
  },
  description: DESC,
  applicationName: "Future Founders",
  authors: [{ name: "Eddie Ajalcriña" }, { name: "Lorenzo Ortiz" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Future Founders",
    url: "/",
    title: "Future Founders",
    description: DESC,
  },
  twitter: { card: "summary_large_image", title: "Future Founders", description: DESC },
};

export const viewport: Viewport = {
  themeColor: "#F6F6F4",
  colorScheme: "light",
  // el encabezado fijo se extiende bajo la muesca del celular y suma el área segura (env(safe-area-inset-top))
  viewportFit: "cover",
};

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Future Founders",
  legalName: "Soluciones Regenerativas LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logo-l4.svg`,
  email: EMAIL,
  description: DESC,
  areaServed: "Latinoamérica",
  founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role, url: f.webUrl, sameAs: [f.webUrl, f.linkedin] })),
  contactPoint: [{ "@type": "ContactPoint", telephone: "+51-989-338-401", contactType: "customer service", availableLanguage: "es" }],
  sameAs: [INSTAGRAM_URL],
};

// Marca .js antes de pintar para que las entradas sutiles solo existan con JavaScript.
// Si el script del sitio no llega a correr, se quita a los 2,5 s y todo queda visible.
const JS_FLAG =
  "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__rv)document.documentElement.classList.remove('js')},2500);";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${serif.variable} ${mono.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG).replace(/</g, "\\u003c") }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
