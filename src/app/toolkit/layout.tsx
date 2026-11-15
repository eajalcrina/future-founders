import type { Metadata } from "next";

// El toolkit está retirado (next.config redirige /toolkit a /workbook). Sus calculadoras leen estas
// variables de fuente; apuntan a las fuentes locales del sitio para que el build no dependa de Google Fonts.
const FONT_VARS = {
  "--font-space-grotesk": "var(--font-archivo)",
  "--font-dm-sans": "var(--font-archivo)",
  "--font-badge": "var(--font-archivo)",
  "--font-spline": "var(--font-archivo)",
} as React.CSSProperties;

export const metadata: Metadata = {
  title: "Toolkit de calculadoras",
  description: "Calculadoras de Future Founders para tu runway, tu valor de mercado, tu mercado y tu punto de no retorno.",
  alternates: { canonical: "/toolkit" },
};

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...FONT_VARS,
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
