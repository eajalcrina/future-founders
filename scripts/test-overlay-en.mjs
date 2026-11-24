// Inglés del sitio. Diccionarios (src/i18n/es.ts y en.ts): mismas listas con el mismo largo.
// Overlay en inglés del workbook (src/content/en/workbook-en.ts e ideas-en.ts): avisa qué plantillas, campos,
// partes e ideas no tienen todavía su texto en inglés (en /en se muestran en español) y qué entradas sobran
// o no calzan con el workbook generado (id que no existe, fila que no existe, listas de otro largo).
// Uso: npm run test:overlay            → solo avisa (sale con 0 mientras falten traducciones; etapa 1)
//      npm run test:overlay -- --strict → falla si falta algo (etapa 2, con el inglés terminado)
import { register } from "node:module";
register("./ts-hooks.mjs", import.meta.url);

const { PLANTILLAS, PARTES } = await import("../src/content/workbook.ts");
const { IDEAS } = await import("../src/content/ideas.ts");
const { WORKBOOK_EN, PARTES_EN } = await import("../src/content/en/workbook-en.ts");
const { IDEAS_EN } = await import("../src/content/en/ideas-en.ts");

const { es } = await import("../src/i18n/es.ts");
const { en } = await import("../src/i18n/en.ts");

const strict = process.argv.includes("--strict");
const faltan = [];
const errores = [];
const falta = (m) => faltan.push(m);
const error = (m) => errores.push(m);

const ids = new Set(PLANTILLAS.map((p) => p.id));
for (const id of Object.keys(WORKBOOK_EN)) if (!ids.has(id)) error(`overlay: la plantilla «${id}» no existe en workbook.ts`);
for (const n of Object.keys(PARTES_EN)) if (!(n in PARTES)) error(`overlay: la parte «${n}» no existe`);
for (const n of Object.keys(IDEAS_EN)) if (!(n in IDEAS)) error(`ideas: el capítulo ${n} no existe`);

for (const n of Object.keys(PARTES)) if (!PARTES_EN[n]) falta(`parte ${n}: nombre`);
for (const n of Object.keys(IDEAS)) if (!IDEAS_EN[n]) falta(`idea del capítulo ${n}`);

const largo = (id, campo, es, en) => {
  if (en && en.length !== es.length) error(`${id}.${campo}: ${en.length} textos en inglés y ${es.length} en español`);
  if (es.length && (!en || en.some((x) => !x))) falta(`${id}.${campo}`);
};

for (const p of PLANTILLAS) {
  const o = WORKBOOK_EN[p.id];
  if (!o) {
    falta(`${p.id}: toda la plantilla`);
    continue;
  }
  for (const campo of ["title", "time", "purpose", "intro", "trae", "where", "level", "who"])
    if (p[campo] !== null && p[campo] !== undefined && p[campo] !== "" && !o[campo]) falta(`${p.id}.${campo}`);
  if (p.chapter && !o.chapter) falta(`${p.id}.chapter`);
  if (p.part && !o.part && !PARTES_EN[p.part.num]) falta(`${p.id}.part`);
  largo(p.id, "summary", p.summary, o.summary);
  largo(p.id, "check", p.check, o.check);
  largo(p.id, "avisos", p.avisos, o.avisos);
  p.head.forEach((h, i) => {
    const x = o.head?.[i];
    if (!x?.label) falta(`${p.id}.head[${i}].label`);
    for (const part of h.parts) if (!x?.parts?.[part.field]) falta(`${p.id}.head[${i}].parts.${part.field}`);
  });
  if (!p.calc) continue;
  const filas = p.calc.filter((it) => "field" in it);
  const campos = new Set(filas.map((r) => r.field));
  for (const f of Object.keys(o.calc ?? {})) if (!campos.has(f)) error(`${p.id}.calc: la fila «${f}» no existe`);
  for (const r of filas) {
    const x = o.calc?.[r.field];
    if (!x?.label) falta(`${p.id}.calc.${r.field}.label`);
    for (const k of ["note", "unit", "show"]) if (r[k] && !x?.[k] && !(k === "unit" && /^[A-Z%]/.test(r[k]))) falta(`${p.id}.calc.${r.field}.${k}`);
    for (const op of r.options ?? []) if (!x?.options?.[op.value]) falta(`${p.id}.calc.${r.field}.options[${op.value}]`);
    if (r.kind === "text" && r.ej && !x?.ej) falta(`${p.id}.calc.${r.field}.ej`);
    if (r.fmt === "text" && r.expr) for (const lit of r.expr.match(/"[^"]*"/g) ?? []) if (!x?.valores?.[lit.slice(1, -1)]) falta(`${p.id}.calc.${r.field}.valores[${lit}]`);
  }
  largo(p.id, "bands", p.calc.filter((it) => "band" in it), o.bands);
  const tablas = p.calc.filter((it) => "table" in it);
  if (o.tables && o.tables.length !== tablas.length) error(`${p.id}.tables: ${o.tables.length} en inglés y ${tablas.length} en español`);
  tablas.forEach((tb, i) => {
    const x = o.tables?.[i];
    if (!x?.table) falta(`${p.id}.tables[${i}].table`);
    largo(p.id, `tables[${i}].head`, tb.head, x?.head);
    largo(p.id, `tables[${i}].rows`, tb.cells.map((c) => c[0]), x?.rows);
  });
}

// Diccionarios: el tipo Dict ya exige las mismas claves; aquí se exige además el mismo largo en cada lista,
// porque varias valen por posición (países y situaciones que se envían en español, niveles, opciones del diagnóstico).
(function mismoLargo(a, b, ruta) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return error(`diccionario: ${ruta} tiene ${Array.isArray(b) ? b.length : "otro tipo"} elementos en inglés y ${a.length} en español`);
    a.forEach((x, i) => mismoLargo(x, b[i], `${ruta}[${i}]`));
  } else if (a && typeof a === "object") for (const k of Object.keys(a)) mismoLargo(a[k], b?.[k], ruta ? `${ruta}.${k}` : k);
})(es, en, "");

const porPlantilla = new Set(faltan.map((m) => m.split(/[.:]/)[0]));
for (const e of errores) console.log("FALLA", e);
console.log(`Overlay en inglés: ${faltan.length} textos sin traducir en ${porPlantilla.size} entradas (plantillas, partes e ideas); ${errores.length} errores.`);
if (faltan.length) console.log(`AVISO: en /en esos textos se muestran en español.${strict ? "" : " Detalle: npm run test:overlay -- --strict"}`);
if (strict) for (const m of faltan) console.log("FALTA", m);
process.exit(errores.length || (strict && faltan.length) ? 1 : 0);
