// Diagnóstico de nivel: preguntas y regla de nivel, sin React, para que la prueba (scripts/test-diagnostico.mjs)
// recorra todas las combinaciones. Una pregunta por señal del libro: situación laboral, comprobante emitido,
// parte del costo de vida cubierta por ingresos propios (tres meses seguidos, 1,2 veces) y colchón en meses.
// Los textos llegan del diccionario del idioma (`TextosDiag`); el registro que se envía va siempre en español.
// Imports relativos y solo de tipos: la prueba corre en Node y el componente de cliente no carga los diccionarios.

import type { Dict } from "../i18n/es";

/** Lo que el cuestionario necesita del diccionario: sus textos, los niveles y las situaciones. */
export type TextosDiag = {
  c: Dict["diagnostico"]["cuestionario"];
  levels: string[];
  situaciones: { largo: string; corto: string }[];
};

/** Código y título de las plantillas que el resultado puede recomendar, en el idioma de la página. */
export type Fichas = Record<string, { code: string; title: string }>;
export const FICHAS_IDS = ["k1", "k2", "k3", "13-1", "18-1", "19-1", "21-1"] as const;

export type Pregunta = { id: "situacion" | "comprobante" | "cobertura" | "colchon"; text: string; help?: string; options: string[] };

export function preguntas(t: TextosDiag): Pregunta[] {
  const p = t.c.preguntas;
  return [
    { id: "situacion", text: p.situacion.text, options: t.situaciones.map((s) => s.largo) },
    { id: "comprobante", ...p.comprobante },
    { id: "cobertura", ...p.cobertura },
    { id: "colchon", ...p.colchon },
  ];
}

/** Respuestas por id de pregunta (índice de la opción). `cobertura` queda sin responder si no hay comprobante. */
export type Respuestas = Partial<Record<Pregunta["id"], number>>;

const COL_OK = 2;
const COL_SIN_CALCULO = 3;

/** Preguntas que se muestran: sin comprobante, la de cobertura se salta. */
export function visibles(qs: Pregunta[], r: Respuestas): Pregunta[] {
  return qs.filter((q) => !(q.id === "cobertura" && r.comprobante === 0));
}

export function nivelDe(r: Respuestas, t: TextosDiag): { level: number; why: string } {
  const w = t.c.why;
  const sit = r.situacion ?? 0;
  if (!r.comprobante) return { level: 0, why: sit === 1 ? w.salioSinComprobante : w.sinComprobante };
  const cob = r.cobertura ?? 0;
  const col = r.colchon ?? COL_SIN_CALCULO;
  if (cob < 3) return { level: 1, why: w.nivel1 };
  if (cob === 3) return { level: 2, why: w.nivel2 };
  if (col !== COL_OK) return { level: 2, why: col === COL_SIN_CALCULO ? w.sinColchonCalculado : w.colchonCorto };
  return { level: 3, why: w.nivel3 };
}

export type Paso = {
  /** Plantillas, con su código y su nombre del workbook. `href` con la ruta española (lh la lleva al idioma). */
  plantillas: { code: string; title: string; href: string }[];
  capitulo: string;
  body: string;
  /** Un solo botón. `agenda`: «Agenda 30 minutos» con la página de citas. */
  boton: { label: string; href: string } | "agenda";
  /** Recursos y programas que acompañan este paso (href de sitio.with en el diccionario). */
  acompana: string[];
};

/** Siguiente paso por nivel y situación, siempre con plantilla y capítulo. */
export function pasoDe(level: number, r: Respuestas, t: TextosDiag, fichas: Fichas): Paso {
  const plantilla = (id: string) => {
    const p = fichas[id];
    if (!p) throw new Error(`No existe la plantilla ${id}`);
    return { code: p.code, title: p.title, href: `/workbook/${id}` };
  };
  const ps = t.c.pasos;
  const sit = r.situacion ?? 0;
  if (level === 0 && sit === 1)
    return { plantillas: [plantilla("k3")], capitulo: ps.salio.capitulo, body: ps.salio.body, boton: { label: ps.salio.boton, href: "/workbook/k3" }, acompana: ["/kit"] };
  if (level === 0 && sit === 2)
    return {
      plantillas: [plantilla("13-1")],
      capitulo: ps.proyecto.capitulo,
      body: ps.proyecto.body,
      boton: { label: ps.proyecto.boton, href: "/workbook/13-1" },
      acompana: ["/kit", "/programas#primer-mandato"],
    };
  if (level === 0)
    return {
      plantillas: [plantilla("k1"), plantilla("k2")],
      capitulo: ps.nivel0.capitulo,
      body: ps.nivel0.body,
      boton: { label: ps.nivel0.boton, href: "/kit" },
      acompana: ["/kit", "/programas#taller", "/programas#primer-mandato"],
    };
  if (level === 1)
    return { plantillas: [plantilla("18-1")], capitulo: ps.nivel1.capitulo, body: ps.nivel1.body, boton: { label: ps.nivel1.boton, href: "/workbook/18-1" }, acompana: ["/programas#mastermind"] };
  if (level === 2)
    return { plantillas: [plantilla("19-1")], capitulo: ps.nivel2.capitulo, body: ps.nivel2.body, boton: { label: ps.nivel2.boton, href: "/workbook/19-1" }, acompana: ["/programas#sesiones"] };
  return { plantillas: [plantilla("21-1")], capitulo: ps.nivel3.capitulo, body: ps.nivel3.body, boton: "agenda", acompana: ["/programas#coconstruccion"] };
}

/**
 * Campos del registro (contrato con /api/registro y apps-script/Code.gs). Van siempre en español,
 * con los textos del diccionario español (`canon`), sea cual sea el idioma de la página.
 */
export function registroDe(level: number, r: Respuestas, canon: TextosDiag) {
  const qs = preguntas(canon);
  return {
    nivel: `${level}: ${canon.levels[level]}`,
    situacion: qs[0].options[r.situacion ?? 0],
    cobertura: r.comprobante === 0 ? canon.c.sinIngresos : qs[2].options[r.cobertura ?? 0],
    colchon: qs[3].options[r.colchon ?? COL_SIN_CALCULO],
  };
}

/** Colchón menor de 6 meses o sin calcular. */
export function colchonCorto(r: Respuestas) {
  return r.colchon !== COL_OK;
}
