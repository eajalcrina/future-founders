// Diccionario del idioma de la página. Solo para componentes de servidor: los de cliente reciben su parte
// por props, para que el navegador no descargue los dos diccionarios.
import { es, type Dict } from "./es";
import { en } from "./en";
import type { Locale } from "./rutas";

export type { Dict };

export function dict(locale: Locale): Dict {
  return locale === "en" ? en : es;
}

/** Diccionario español: lo que se envía a /api/registro va siempre con sus textos (lo lee apps-script/Code.gs). */
export const canon = es;

/** Etiquetas canónicas de los formularios de descarga y postulación. */
export const canonFormulario = { situaciones: es.sitio.situaciones.map((s) => s.corto), paises: es.comun.paises };
