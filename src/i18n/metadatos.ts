// Metadatos de cada página en su idioma: título, descripción, canonical y los hreflang (es, en y x-default al español),
// sacados del mapa único de rutas. alternates de una página reemplaza al del layout, así que cada página lo trae completo.
import type { Metadata } from "next";
import { alternos, ruta, type Locale, type Pagina } from "./rutas";

type Opciones = {
  title: Metadata["title"];
  description: string;
  /** /workbook/<id>. */
  id?: string;
  /** Datos para compartir propios de la página (como hasta ahora: título, URL y, en /libro, el tipo «book»). */
  og?: { title: string; type?: "book" };
  robots?: Metadata["robots"];
};

export function metaPagina(pagina: Pagina, locale: Locale, o: Opciones): Metadata {
  const url = ruta(pagina, locale, o.id);
  const alt = alternos(pagina, o.id);
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url, languages: alt },
    ...(o.robots ? { robots: o.robots } : {}),
    ...(o.og ? { openGraph: { title: o.og.title, url, ...(o.og.type ? { type: o.og.type } : {}) } } : {}),
  };
}
