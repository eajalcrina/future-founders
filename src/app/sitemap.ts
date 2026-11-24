import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/sitio";
import { allWorkbookIds } from "@/content/workbook-util";
import { LOCALES, alternos, ruta, type Pagina } from "@/i18n/rutas";

// Las dos versiones de cada página, cada una con sus alternates (es, en y x-default al español),
// sacados del mapa único de rutas (src/i18n/rutas.ts). Guía de Next 16: sitemap, «Generate a localized Sitemap».
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  const entrada = (pagina: Pagina, priority: number, changeFrequency: "monthly" | "yearly", id?: string) =>
    LOCALES.map((locale) => ({
      url: abs(ruta(pagina, locale, id)),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: Object.fromEntries(Object.entries(alternos(pagina, id)).map(([k, v]) => [k, abs(v)])) },
    }));
  const main: [Pagina, number][] = [
    ["inicio", 1],
    ["libro", 0.9],
    ["kit", 0.9],
    ["diagnostico", 0.8],
    ["programas", 0.8],
    ["workbook", 0.6],
    ["actualizaciones", 0.5],
    ["privacidad", 0.2],
    ["terminos", 0.2],
  ];
  return [
    ...main.flatMap(([p, priority]) => entrada(p, priority, "monthly")),
    ...allWorkbookIds().flatMap((id) => entrada("workbook", 0.4, "yearly", id)),
  ];
}
