import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Space_Grotesk, Spline_Sans } from "next/font/google";

// El toolkit conserva su estilo propio: carga aquí las fuentes que usan sus componentes.
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const barlow = Barlow_Condensed({ variable: "--font-badge", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const spline = Spline_Sans({ variable: "--font-spline", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = { title: "Toolkit", robots: { index: false } };

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${barlow.variable} ${spline.variable}`}
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#F5F6FF",
        color: "#0B0B1E",
        zIndex: 50,
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      {children}
    </div>
  );
}
