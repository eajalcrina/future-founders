// Prueba de aceptación de las calculadoras en línea: carga el ejemplo del libro (ej) en cada
// entrada, calcula y compara cada salida con la cifra que imprime el libro. Una diferencia rompe la prueba.
// Uso: npm run test:calc
import { register } from "node:module";
register("./ts-hooks.mjs", import.meta.url);

const { PLANTILLAS } = await import("../src/content/workbook.ts");
const { computeAll, exampleInputs, formatVal, isRow, evaluate } = await import("../src/lib/calc.ts");

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
  const vals = computeAll(p.calc, exampleInputs(p.calc));
  for (const r of rows) {
    if (!r.expr || r.ej === undefined) continue;
    checked++;
    const got = formatVal(r, vals[r.field]);
    say(got === r.ej, `${p.code} ${r.field}: ${got}${got === r.ej ? "" : ` (el libro dice ${r.ej})`}`);
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
