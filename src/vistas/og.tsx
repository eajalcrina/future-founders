import { ogImage } from "@/lib/og";
import { dict, type Dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import type { Locale } from "@/i18n/rutas";

// Imágenes para compartir de cada página, con sus textos del diccionario (og). Cada opengraph-image.tsx
// de app/(es) y app/(en)/en llama a estas dos funciones con su página y su idioma.

type Clave = keyof Dict["og"];

export function ogAlt(clave: Clave, locale: Locale): string {
  const t = dict(locale);
  if (clave === "inicio") {
    const h = t.sitio.heroTitle;
    return f(t.og.inicio.alt, { titulo: `${h.charAt(0).toLowerCase()}${h.slice(1)}` });
  }
  return t.og[clave].alt;
}

export function ogPagina(clave: Clave, locale: Locale) {
  const t = dict(locale);
  if (clave === "inicio") return ogImage({ kicker: t.og.inicio.kicker, title: t.sitio.heroTitle });
  const o = t.og[clave];
  return ogImage({ kicker: o.kicker, title: o.title, withCover: clave === "libro" });
}
