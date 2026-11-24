// El workbook en el idioma de la página. workbook.ts e ideas.ts los genera scripts/gen-workbook.py desde el libro
// (en español) y no se editan; el inglés llega por los overlays de src/content/en/, campo por campo.
// Lo que el overlay no trae queda en español (el español prevalece). Imports relativos: lo cargan las pruebas en Node.

import { PLANTILLAS, PARTES, type CalcItem, type CalcRow, type Plantilla } from "./workbook";
import { IDEAS } from "./ideas";
import { PARTES_EN, WORKBOOK_EN } from "./en/workbook-en";
import { IDEAS_EN } from "./en/ideas-en";
import type { Locale } from "../i18n/rutas";

/** Textos de una fila de calculadora. `options` va por `value` (el valor no se traduce: lo leen las fórmulas). */
export type FilaEn = {
  label?: string;
  note?: string;
  unit?: string;
  show?: string;
  /** Ejemplo de una entrada de texto («julio» → «July»). Las cifras no van aquí: se reformatean solas. */
  ej?: string;
  options?: Record<string, string>;
  /** Salidas de texto de una fórmula («ya la cerraste»): valor en español → texto en inglés. */
  valores?: Record<string, string>;
};

export type PlantillaEn = {
  title?: string;
  time?: string;
  purpose?: string;
  intro?: string;
  trae?: string;
  where?: string;
  /** Título del capítulo. */
  chapter?: string;
  /** Nombre de la parte. */
  part?: string;
  level?: string;
  who?: string;
  summary?: string[];
  check?: string[];
  /** Datos de una línea arriba de la hoja, en el mismo orden; `parts` por `field`. */
  head?: { label?: string; parts?: Record<string, string> }[];
  /** Filas de la calculadora, por `field`. */
  calc?: Record<string, FilaEn>;
  /** Bandas de la calculadora, en orden. */
  bands?: string[];
  /** Tablas de la calculadora, en orden: título, encabezados y la etiqueta de cada fila. */
  tables?: { table?: string; head?: string[]; rows?: string[] }[];
  /** Avisos, en orden. */
  avisos?: string[];
};

/** Fila de calculadora con las salidas de texto traducidas. */
export type CalcRowL = CalcRow & { valores?: Record<string, string> };

function calcEn(items: CalcItem[], o: PlantillaEn): CalcItem[] {
  let b = 0;
  let t = 0;
  return items.map((it) => {
    if ("band" in it) return { band: o.bands?.[b++] ?? it.band };
    if ("table" in it) {
      const x = o.tables?.[t++];
      return {
        ...it,
        table: x?.table ?? it.table,
        head: it.head.map((h, i) => x?.head?.[i] ?? h),
        cells: it.cells.map(([label, ...cs], i) => [x?.rows?.[i] ?? label, ...cs]),
      };
    }
    const f = o.calc?.[it.field];
    if (!f) return it;
    const r: CalcRowL = {
      ...it,
      label: f.label ?? it.label,
      note: f.note ?? it.note,
      unit: f.unit ?? it.unit,
      show: f.show ?? it.show,
      ej: it.kind === "text" && f.ej !== undefined ? f.ej : it.ej,
      options: it.options?.map((op) => ({ ...op, label: f.options?.[op.value] ?? op.label })),
      valores: f.valores,
    };
    return r;
  });
}

function plantillaEn(p: Plantilla): Plantilla {
  const o = WORKBOOK_EN[p.id];
  if (!o) return { ...p, part: p.part && { ...p.part, name: PARTES_EN[p.part.num] ?? p.part.name } };
  return {
    ...p,
    title: o.title ?? p.title,
    time: o.time ?? p.time,
    purpose: p.purpose === null ? null : (o.purpose ?? p.purpose),
    intro: p.intro === null ? null : (o.intro ?? p.intro),
    trae: p.trae === null ? null : (o.trae ?? p.trae),
    where: o.where ?? p.where,
    chapter: p.chapter && { ...p.chapter, title: o.chapter ?? p.chapter.title },
    part: p.part && { ...p.part, name: o.part ?? PARTES_EN[p.part.num] ?? p.part.name },
    level: p.level === null ? null : (o.level ?? p.level),
    who: p.who === null ? null : (o.who ?? p.who),
    summary: p.summary.map((s, i) => o.summary?.[i] ?? s),
    check: p.check.map((s, i) => o.check?.[i] ?? s),
    head: p.head.map((h, i) => ({
      label: o.head?.[i]?.label ?? h.label,
      parts: h.parts.map((x) => ({ ...x, label: o.head?.[i]?.parts?.[x.field] ?? x.label })),
    })),
    calc: p.calc && calcEn(p.calc, o),
    avisos: p.avisos.map((a, i) => ({ ...a, text: o.avisos?.[i] ?? a.text })),
  };
}

const EN = PLANTILLAS.map(plantillaEn);

/** Las plantillas en el idioma pedido, en el orden del workbook. */
export function plantillas(locale: Locale): Plantilla[] {
  return locale === "en" ? EN : PLANTILLAS;
}

/** Nombres de las partes, por número («01»). */
export function partes(locale: Locale): Record<string, string> {
  if (locale === "es") return PARTES;
  return Object.fromEntries(Object.entries(PARTES).map(([n, nombre]) => [n, PARTES_EN[n] ?? nombre]));
}

/** «La idea» de cada capítulo. */
export function ideas(locale: Locale): Record<number, string> {
  if (locale === "es") return IDEAS;
  return Object.fromEntries(Object.entries(IDEAS).map(([n, t]) => [n, IDEAS_EN[Number(n)] ?? t]));
}
