// Prueba de aceptación de las calculadoras en línea: carga el ejemplo del libro (ej) en cada
// entrada, calcula y compara cada salida con la cifra que imprime el libro. Una diferencia rompe la prueba.
// Uso: npm run test:calc
import { register } from "node:module";
register("./ts-hooks.mjs", import.meta.url);

const { PLANTILLAS } = await import("../src/content/workbook.ts");
const { computeAll, exampleInputs, formatVal, isRow, evaluate } = await import("../src/lib/calc.ts");

const { parseNum, fmtNum } = await import("../src/lib/format.ts");
const { es } = await import("../src/i18n/es.ts");
const { en } = await import("../src/i18n/en.ts");
const FC = { locale: "es", ...es.calc };
const FC_EN = { locale: "en", ...en.calc };

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
    const got = formatVal(r, vals[r.field], FC);
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

// Formato en inglés (/en): el ejemplo de la K.1 con las cifras en inglés, en las dos direcciones.
{
  const k1 = PLANTILLAS.find((p) => p.id === "k1");
  const ej = exampleInputs(k1.calc, "en");
  say(ej.A === "61,600" && ej.B === "8,800", `K.1 en inglés: el ejemplo se escribe ${ej.A} y ${ej.B} (61,600 y 8,800)`);
  const vals = computeAll(k1.calc, ej, "en");
  const salida = k1.calc.filter(isRow).find((r) => r.expr);
  const got = formatVal(salida, vals[salida.field], FC_EN);
  say(got === "7.0", `K.1 en inglés: runway ${got} (7.0)`);
  say(parseNum("61,600", "en") === 61600 && parseNum("7.0", "en") === 7 && parseNum("61,600.5", "en") === 61600.5, "lectura en inglés: 61,600 y 7.0");
  say(fmtNum(61600, 0, "en") === "61,600" && fmtNum(7, 1, "en") === "7.0" && fmtNum(61600) === "61.600" && fmtNum(7, 1) === "7,0", "formato: 61.600 y 7,0 en español; 61,600 y 7.0 en inglés");
}
// Todas las calculadoras: el ejemplo escrito en inglés da los mismos valores que en español.
{
  let filas = 0;
  for (const p of PLANTILLAS) {
    if (!p.calc) continue;
    const a = computeAll(p.calc, exampleInputs(p.calc, "es"), "es");
    const b = computeAll(p.calc, exampleInputs(p.calc, "en"), "en");
    for (const r of p.calc.filter(isRow)) {
      filas++;
      const x = a[r.field];
      const y = b[r.field];
      const igual = typeof x === "number" ? (Number.isNaN(x) ? Number.isNaN(y) : Math.abs(x - y) < 1e-9) : x === y;
      if (!igual) say(false, `${p.code} ${r.field}: ${x} en español y ${y} en inglés`);
    }
  }
  console.log(`Inglés: ${filas} filas de las calculadoras dan lo mismo que en español.`);
}
console.log(`Prueba en inglés (K.1 y calculadoras): ${fails} fallas en total.`);
process.exit(fails ? 1 : 0);
