"use client";

import { usePathname } from "next/navigation";
import { LOCALES, parDe, type Locale } from "@/i18n/rutas";
import type { Dict } from "@/i18n/es";

/**
 * Selector «ES | EN»: lleva a la misma página en el otro idioma (en /workbook/<id>, al mismo id).
 * Cada enlace lleva lang y hreflang de su idioma y su nombre completo («Español», «English») como nombre accesible;
 * el idioma activo lleva aria-current. Es un <a> normal: cambiar de idioma cambia de root layout y recarga la página.
 * Objetivo táctil de al menos 24 × 24 px (WCAG 2.2, 2.5.8).
 */
export default function SelectorIdioma({ locale, t, className = "" }: { locale: Locale; t: Dict["idioma"]; className?: string }) {
  const pathname = usePathname() ?? "/";
  return (
    <div role="group" aria-label={t.grupo} className={`inline-flex items-center ${className}`}>
      {LOCALES.map((l, i) => {
        const activo = l === locale;
        return (
          <span key={l} className="inline-flex items-center">
            {i > 0 && <span className="vr" aria-hidden="true" />}
            <a
              href={activo ? pathname : parDe(pathname, l)}
              lang={l}
              hrefLang={l}
              aria-label={t.nombres[l]}
              aria-current={activo ? "true" : undefined}
              className={`inline-flex items-center justify-center min-h-6 min-w-6 px-1 text-recuadro ${activo ? "font-bold border-b-2 border-current" : "font-medium lnk"}`}
            >
              {t.cortos[l]}
            </a>
          </span>
        );
      })}
    </div>
  );
}
