export type Lang = "es" | "en";

export const SITE = "https://www.futurefounders.pe";
export const NAME = "Future Founders";
export const EMAIL = "ff@redesignlab.org";
// Mismo enlace de agenda que Redesign Lab y Circular Club.
export const CALENDAR_URL = "https://calendar.app.google/C8nGhVz5m6SAR61r5";
export const EDDIE_URL = "https://eddieajalcrina.com";

// @id compartidos con las otras webs (ver lib/schema.tsx de eddieajalcrina.com).
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const EDDIE_ID = `${EDDIE_URL}/#person`;
export const LORENZO_ID = `${SITE}/#lorenzo-ortiz`;

// Producción nunca se bloquea por accidente: solo la vista previa de Vercel
// (VERCEL_ENV=preview) o SITE_LIVE=0 cierran la indexación.
export const INDEXABLE = process.env.VERCEL_ENV !== "preview" && process.env.SITE_LIVE !== "0";

// Rutas equivalentes en cada idioma, para el selector de idioma, hreflang y el sitemap.
export const ROUTES = {
  home: { es: "/", en: "/en" },
  fractional: { es: "/fractional", en: "/en/fractional" },
  privacy: { es: "/privacidad", en: "/en/privacy" },
} as const;

export type RouteKey = keyof typeof ROUTES;

// Fecha real de la última edición de cada ruta (Google ignora lastmod si siempre es la del build).
export const UPDATED: Record<RouteKey, string> = {
  home: "2026-10-30",
  fractional: "2026-10-30",
  privacy: "2026-10-30",
};

export function alternates(key: RouteKey, lang: Lang) {
  return {
    canonical: ROUTES[key][lang],
    languages: { es: ROUTES[key].es, en: ROUTES[key].en, "x-default": ROUTES[key].es },
  };
}

export function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}
