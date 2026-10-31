import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Barlow_Condensed, Spline_Sans } from "next/font/google";

// Tipografías propias del toolkit (sus calculadoras las usan por variable CSS).
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const barlowCondensed = Barlow_Condensed({ variable: "--font-badge", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const splineSans = Spline_Sans({ variable: "--font-spline", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Toolkit de calculadoras",
  description: "Calculadoras de Future Founders para tu runway, tu valor de mercado, tu mercado y tu punto de no retorno.",
  alternates: { canonical: "/toolkit" },
};

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${barlowCondensed.variable} ${splineSans.variable}`}
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#F5F6FF",
        color: "#0B0B1E",
        zIndex: 50,
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
