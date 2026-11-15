// Prueba de aceptación de las calculadoras en línea: carga el ejemplo del libro (ej) en cada
// entrada, calcula y compara cada salida con la cifra que imprime el libro. Una diferencia rompe la prueba.
// Uso: npm run test:calc
import { register } from "node:module";
register("./ts-hooks.mjs", import.meta.url);

const { PLANTILLAS } = await import("../src/content/workbook.ts");
const { computeAll, exampleInputs, formatVal, isRow, evaluate } = await import("../src/lib/calc.ts");

const { parseNum } = await import("../src/lib/format.ts");

// Primera cifra de un texto del libro: «61.600 y 61.150» → «61.600», «Sí: 2.133 a 2.500» → «Sí».
const lead = (s) => (/^(Sí|No|ninguno|mes \d+|[−-]?\d[\d.]*(?:,\d+)?(?:\s?%)?)(?=$|[\s:;(])/.exec(s.trim())?.[1] ?? s.trim());
// Mismo valor aunque cambie el formato («8» y «8,0»; «25 %» y «25%»).
function sameVal(a, b) {
  if (a === b) return true;
  const num = (s) => {
    const m = /^([−-]?)([\d.]+(?:,\d+)?)(\s?%)?$/.exec(s);
    return m ? { v: (m[1] ? -1 : 1) * parseNum(m[2]), pct: Boolean(m[3]) } : null;
  };
  const x = num(a);
  const y = num(b);
  return Boolean(x && y && x.pct === y.pct && Math.abs(x.v - y.v) < 1e-9);
}

let fails = 0;
let checked = 0;
const say = (ok, msg) => {
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FALLA"} ${msg}`);
};

// Evaluador.
const env = { A: 61600, B: 8800, t: "julio" };
for (const [src, want] of [
  ["A / B", 7],
  ["(A + 163000) ÷ B", 224600 / 8800],
  ["max(2, 1) × 3 − 1", 5],
  ["if(A >= B, t, \"no\")", "julio"],
  ["!(A < B) && B > 0", 1],
  ["ceil(3.0000000001)", 3],
]) {
  const got = evaluate(src, env);
  say(typeof want === "number" ? Math.abs(got - want) < 1e-6 : got === want, `evaluador: ${src} = ${got}`);
}

for (const p of PLANTILLAS) {
  if (!p.calc) continue;
  const rows = p.calc.filter(isRow);
  const fields = new Set();
  for (const r of rows) {
    if (fields.has(r.field)) say(false, `${p.code}: campo repetido ${r.field}`);
    fields.add(r.field);
    if (!r.expr && r.ej === undefined) say(false, `${p.code}: la entrada ${r.field} no tiene ej`);
  }
  for (const t of p.calc.filter((it) => "table" in it))
    for (const c of t.cells.flatMap((row) => row.slice(1))) if (!fields.has(c)) say(false, `${p.code}: la tabla «${t.table}» cita ${c}, que no existe`);
  for (const r of rows) {
    // El libro puede anotar la cifra («25 % (solo México)», «7,0 y 4,9»): el valor de ejemplo es la primera cifra.
    if (r.ejLibro !== undefined && !sameVal(lead(r.ejLibro), r.ej))
      say(false, `${p.code} ${r.field}: el ejemplo «${r.ej}» no es la primera cifra del libro «${r.ejLibro}»`);
    if (!r.expr && r.ej !== undefined && r.kind !== "text" && r.kind !== "select" && !Number.isFinite(parseNum(r.ej)))
      say(false, `${p.code}: la entrada ${r.field} tiene un ejemplo que no es un número («${r.ej}»)`);
  }
  const vals = computeAll(p.calc, exampleInputs(p.calc));
  for (const r of rows) {
    if (!r.expr || r.ej === undefined) continue;
    checked++;
    const got = formatVal(r, vals[r.field]);
    const ok = sameVal(got, r.ej);
    const libro = r.ejLibro ?? r.ej;
    say(ok, `${p.code} ${r.field}: ${got}${ok ? (libro !== got ? ` (libro: ${libro})` : "") : ` (el libro dice ${libro})`}`);
  }
  for (const a of p.avisos) {
    try {
      evaluate(a.when, vals);
    } catch (e) {
      say(false, `${p.code}: aviso con fórmula inválida «${a.when}»: ${e.message}`);
    }
  }
}
console.log(`\n${checked} salidas comparadas, ${fails} fallas.`);
process.exit(fails ? 1 : 0);
