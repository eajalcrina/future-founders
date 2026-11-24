// Datos de las calculadoras guardados en este navegador (clave «da:<id de plantilla>»).
// Si el navegador no deja guardar (modo privado, almacenamiento bloqueado), todo sigue funcionando sin guardar.
// /workbook/<id> y /en/workbook/<id> comparten la clave: cada guardado lleva el idioma de sus cifras («l»;
// sin marca, español) y al leerlo en el otro idioma las cifras se reescriben («61.600» ↔ «61,600»).

import { fmtNum, parseNum, type NumLocale } from "./format";

export type Saved = { v: Record<string, string>; out: Record<string, number | string>; l?: NumLocale };

/** Reescribe una cifra escrita a mano de un idioma al otro. Lo que no es una cifra queda igual. */
function convertir(s: string, de: NumLocale, a: NumLocale): string {
  if (de === a || !/^\s*\d[\d\s.,]*$/.test(s)) return s;
  const n = parseNum(s, de);
  if (!Number.isFinite(n)) return s;
  const dec = Number.isInteger(n) ? 0 : (String(n).split(".")[1]?.length ?? 0);
  return fmtNum(n, dec, a);
}

/**
 * Lee lo guardado de una plantilla con las cifras en el idioma `locale`.
 * `fijos`: campos cuyo valor no se reescribe (listas desplegables, que guardan el valor del libro).
 */
export function readSaved(id: string, locale: NumLocale = "es", fijos?: Set<string>): Saved | null {
  try {
    const s = window.localStorage.getItem(`da:${id}`);
    if (!s) return null;
    const d = JSON.parse(s) as Partial<Saved>;
    const de: NumLocale = d.l === "en" ? "en" : "es";
    const out: Saved["out"] = {};
    for (const [k, v] of Object.entries(d.out ?? {})) if (typeof v === "string" || (typeof v === "number" && Number.isFinite(v))) out[k] = v;
    const v: Saved["v"] = {};
    for (const [k, x] of Object.entries(d.v ?? {})) if (typeof x === "string") v[k] = fijos?.has(k) ? x : convertir(x, de, locale);
    return { v, out, l: locale };
  } catch {
    return null;
  }
}

export function writeSaved(id: string, data: Saved, locale: NumLocale = "es") {
  try {
    window.localStorage.setItem(`da:${id}`, JSON.stringify({ ...data, l: locale }));
  } catch {
    // Sin almacenamiento: la calculadora funciona igual.
  }
}
