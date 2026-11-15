import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { SITE_URL, EMAIL } from "@/content/sitio";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const serif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], axes: ["opsz"], style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });

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
};

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Future Founders",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logo-l4.svg`,
  email: EMAIL,
  description: DESC,
  areaServed: "Latinoamérica",
  founder: [
    { "@type": "Person", name: "Eddie Ajalcriña", jobTitle: "CEO y cofundador" },
    { "@type": "Person", name: "Lorenzo Ortiz", jobTitle: "COO y cofundador" },
  ],
  contactPoint: [{ "@type": "ContactPoint", telephone: "+51-989-338-401", contactType: "customer service", availableLanguage: "es" }],
  sameAs: ["https://www.linkedin.com/in/eddieajalcrina/", "https://www.linkedin.com/in/lorenzoortiz/"],
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
