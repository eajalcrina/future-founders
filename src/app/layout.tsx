import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Cormorant_Garamond, Barlow_Condensed, Spline_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-badge",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const splineSans = Spline_Sans({
  variable: "--font-spline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Future Founders — Transforma tu experiencia corporativa en patrimonio empresarial",
  description:
    "Bootcamp para ejecutivos senior que quieren construir un activo empresarial rentable mientras mantienen su carrera corporativa.",
  openGraph: {
    title: "Future Founders — Transforma tu experiencia corporativa en patrimonio empresarial",
    description:
      "Bootcamp para ejecutivos senior que quieren construir un activo empresarial rentable mientras mantienen su carrera corporativa.",
    type: "website",
    locale: "es_PE",
    siteName: "Future Founders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Founders — Transforma tu experiencia corporativa en patrimonio empresarial",
    description:
      "Bootcamp para ejecutivos senior que quieren construir un activo empresarial rentable mientras mantienen su carrera corporativa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${cormorant.variable} ${barlowCondensed.variable} ${splineSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
