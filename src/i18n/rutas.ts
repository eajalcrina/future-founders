// Mapa único de rutas español ↔ inglés. Lo usan el menú, el pie, el selector de idioma, los enlaces de
// los datos (que se escriben con la ruta española), el sitemap y los hreflang de cada página.
// Las URL en español no cambian (los QR impresos del libro apuntan a ellas); el inglés vive bajo /en.
// Sin texto visible y sin imports: lo cargan componentes de cliente y las pruebas en Node.

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Páginas del sitio: ruta en español (la clave canónica) y su par en inglés. */
export const RUTAS = {
  inicio: { es: "/", en: "/en" },
  libro: { es: "/libro", en: "/en/book" },
  kit: { es: "/kit", en: "/en/kit" },
  diagnostico: { es: "/diagnostico", en: "/en/diagnostic" },
  programas: { es: "/programas", en: "/en/programs" },
  workbook: { es: "/workbook", en: "/en/workbook" },
  actualizaciones: { es: "/actualizaciones", en: "/en/updates" },
  privacidad: { es: "/privacidad", en: "/en/privacy" },
  terminos: { es: "/terminos", en: "/en/terms" },
} as const satisfies Record<string, Record<Locale, string>>;

export type Pagina = keyof typeof RUTAS;

/** Ruta de una página en un idioma. Con `id`, la plantilla /workbook/<id> (mismos id en los dos idiomas). */
export function ruta(pagina: Pagina, locale: Locale, id?: string): string {
  const base = RUTAS[pagina][locale];
  return id ? `${base}/${id}` : base;
}

/** Separa ruta y ancla («/programas#taller» → ["/programas", "#taller"]). */
function partir(href: string): [string, string] {
  const i = href.indexOf("#");
  return i < 0 ? [href, ""] : [href.slice(0, i), href.slice(i)];
}

/** Busca a qué página y plantilla corresponde una ruta (en cualquiera de los dos idiomas). */
export function identificar(pathname: string): { pagina: Pagina; locale: Locale; id?: string } | null {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  for (const locale of LOCALES)
    for (const pagina of Object.keys(RUTAS) as Pagina[]) {
      const base = RUTAS[pagina][locale];
      if (p === base) return { pagina, locale };
      if (pagina === "workbook" && p.startsWith(`${base}/`) && !p.slice(base.length + 1).includes("/"))
        return { pagina, locale, id: p.slice(base.length + 1) };
    }
  return null;
}

/** Idioma de una ruta: /en y todo lo que cuelga de /en es inglés; lo demás, español. */
export function localeDe(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/**
 * Lleva un enlace escrito con la ruta española («/programas#taller», «/workbook/k3», «/#metodo») al idioma pedido.
 * Los enlaces externos, mailto, anclas sueltas y rutas que no son páginas (PDF, /agenda) quedan igual.
 */
export function lh(locale: Locale, href: string): string {
  if (locale === "es" || !href.startsWith("/")) return href;
  const [p, hash] = partir(href);
  const m = identificar(p);
  if (!m || m.locale !== "es") return href;
  const dest = ruta(m.pagina, locale, m.id);
  return dest + hash;
}

/** La misma página en el otro idioma (para el selector). Si la ruta no es una página conocida, el inicio. */
export function parDe(pathname: string, destino: Locale): string {
  const m = identificar(pathname);
  if (!m) return RUTAS.inicio[destino];
  return ruta(m.pagina, destino, m.id);
}

/** Rutas de una página en los dos idiomas, para alternates (hreflang) y el sitemap. x-default es el español. */
export function alternos(pagina: Pagina, id?: string): Record<Locale | "x-default", string> {
  return { es: ruta(pagina, "es", id), en: ruta(pagina, "en", id), "x-default": ruta(pagina, "es", id) };
}
