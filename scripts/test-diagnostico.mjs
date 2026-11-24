// Prueba del diagnóstico de nivel: recorre todas las combinaciones de respuestas (12 sin comprobante y
// 120 con comprobante) y comprueba que cada una da un nivel de 0 a 3, un siguiente paso con plantilla,
// capítulo y botón a una ruta que existe, y un registro que cabe en los campos de /api/registro.
// Uso: npm run test:diagnostico
import { register } from "node:module";
register("./ts-hooks.mjs", import.meta.url);

const { preguntas, nivelDe, pasoDe, registroDe, visibles, FICHAS_IDS } = await import("../src/lib/diagnostico.ts");
const { PLANTILLAS } = await import("../src/content/workbook.ts");
const { es } = await import("../src/i18n/es.ts");
const { en } = await import("../src/i18n/en.ts");
const { CAMPOS } = await import("../src/lib/registro.ts");

// Textos del cuestionario en español (los que se envían a la hoja) y fichas de las plantillas que recomienda.
const T = { c: es.diagnostico.cuestionario, levels: es.sitio.levels, situaciones: es.sitio.situaciones };
const TEN = { c: en.diagnostico.cuestionario, levels: en.sitio.levels, situaciones: en.sitio.situaciones };
const QS = preguntas(T);
const fichas = Object.fromEntries(FICHAS_IDS.map((id) => [id, PLANTILLAS.find((p) => p.id === id)]));
const WITH = es.sitio.with;

const rutas = new Set(["/kit", "/diagnostico", "/programas", "/libro", ...PLANTILLAS.map((p) => `/workbook/${p.id}`)]);
const anclas = new Set(["taller", "primer-mandato", "mastermind", "sesiones", "coconstruccion"]);
const conAncla = (h) => {
  const [r, a] = h.split("#");
  return rutas.has(r) && (!a || anclas.has(a));
};
const acompanan = new Set(WITH.flat().map((w) => w.href));

const n = (id) => QS.find((q) => q.id === id).options.length;
let combos = 0,
  fails = 0;
const porNivel = [0, 0, 0, 0];
const fail = (msg) => {
  fails++;
  console.log("FALLA", msg);
};

for (let s = 0; s < n("situacion"); s++)
  for (let c = 0; c < n("comprobante"); c++)
    for (let cob = 0; cob < (c === 0 ? 1 : n("cobertura")); cob++)
      for (let col = 0; col < n("colchon"); col++) {
        const r = c === 0 ? { situacion: s, comprobante: c, colchon: col } : { situacion: s, comprobante: c, cobertura: cob, colchon: col };
        combos++;
        const tag = JSON.stringify(r);
        const { level, why } = nivelDe(r, T);
        if (![0, 1, 2, 3].includes(level)) fail(`${tag}: nivel ${level}`);
        porNivel[level]++;
        if (!why) fail(`${tag}: sin explicación`);
        if (c === 0 && level !== 0) fail(`${tag}: sin comprobante debe dar nivel 0`);
        if (c > 0 && level === 0) fail(`${tag}: con comprobante no puede dar nivel 0`);
        if (level === 3 && !(cob === 4 && col === 2)) fail(`${tag}: nivel 3 sin las dos condiciones`);
        if (visibles(QS, r).length !== (c === 0 ? 3 : 4)) fail(`${tag}: preguntas visibles`);
        const p = pasoDe(level, r, T, fichas);
        if (!p.plantillas.length || !p.capitulo) fail(`${tag}: paso sin plantilla o capítulo`);
        for (const t of p.plantillas) if (!rutas.has(t.href)) fail(`${tag}: plantilla ${t.href} no existe`);
        if (p.boton !== "agenda" && !conAncla(p.boton.href)) fail(`${tag}: botón a ${p.boton.href}`);
        for (const h of p.acompana) if (!acompanan.has(h) || !conAncla(h)) fail(`${tag}: acompaña ${h}`);
        const reg = registroDe(level, r, T);
        // En inglés el registro sale igual: canónico en español (lo lee apps-script/Code.gs).
        if (JSON.stringify(registroDe(nivelDe(r, TEN).level, r, T)) !== JSON.stringify(reg)) fail(`${tag}: el registro cambia con el idioma`);
        if (!/^[0-3]: .+/.test(reg.nivel)) fail(`${tag}: nivel «${reg.nivel}»`);
        for (const [k, v] of Object.entries(reg)) if (!v || v.length > CAMPOS.diagnostico[k].max) fail(`${tag}: campo ${k} «${v}»`);
      }

console.log(`${combos} combinaciones (niveles 0 a 3: ${porNivel.join(", ")}), ${fails} fallas.`);
if (combos !== 132) {
  console.log(`FALLA: se esperaban 132 combinaciones`);
  process.exit(1);
}
process.exit(fails ? 1 : 0);
