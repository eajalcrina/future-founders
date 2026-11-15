// Diagnóstico de nivel: preguntas y regla de nivel, sin React, para que la prueba (scripts/test-diagnostico.mjs)
// recorra todas las combinaciones. Una pregunta por señal del libro: situación laboral, comprobante emitido,
// parte del costo de vida cubierta por ingresos propios (tres meses seguidos, 1,2 veces) y colchón en meses.
// Imports relativos: la prueba corre en Node sin los alias de Next.

import { LEVELS, SITUACIONES } from "../content/sitio";
import { PLANTILLAS } from "../content/workbook";

export type Pregunta = { id: "situacion" | "comprobante" | "cobertura" | "colchon"; text: string; help?: string; options: string[] };

export const QS: Pregunta[] = [
  { id: "situacion", text: "¿Cuál es tu situación hoy?", options: SITUACIONES.map((s) => s.largo) },
  {
    id: "comprobante",
    text: "¿Ya cobraste con comprobante a un cliente propio?",
    help: "Comprobante es la factura, el recibo por honorarios, el CFDI o la boleta de honorarios, según tu país. Cuenta un rol parcial, una asesoría, un producto o tu empresa.",
    options: ["Todavía no", "Sí, a un cliente", "Sí, a dos o más clientes"],
  },
  {
    id: "cobertura",
    text: "En los últimos tres meses, ¿qué parte de tu costo de vida sin empleo cubrieron tus ingresos propios netos?",
    help: "Ingresos propios son los que no vienen de un empleador. Tu costo de vida sin empleo es lo que gastas hoy más lo que hoy paga tu empleador y tendrías que pagar tú (plantilla 2.1).",
    options: [
      "Menos de la mitad",
      "La mitad o más, sin llegar a cubrirlo",
      "Lo cubrieron algún mes, pero no los tres seguidos",
      "Lo cubrieron los tres meses seguidos",
      "1,2 veces o más, los tres meses seguidos",
    ],
  },
  {
    id: "colchon",
    text: "¿Cuántos meses de ese costo de vida cubre hoy tu ahorro líquido?",
    help: "Es tu runway: el dinero que puedes usar en una semana sin una penalidad grande, dividido entre tu costo de vida mensual.",
    options: ["Menos de 3", "De 3 a menos de 6", "6 o más", "No lo he calculado"],
  },
];

/** Respuestas por id de pregunta (índice de la opción). `cobertura` queda sin responder si no hay comprobante. */
export type Respuestas = Partial<Record<Pregunta["id"], number>>;

export const SIN_INGRESOS = "Sin ingresos propios todavía";
const COL_OK = 2;
const COL_SIN_CALCULO = 3;

/** Preguntas que se muestran: sin comprobante, la de cobertura se salta. */
export function visibles(r: Respuestas): Pregunta[] {
  return QS.filter((q) => !(q.id === "cobertura" && r.comprobante === 0));
}

export function nivelDe(r: Respuestas): { level: number; why: string } {
  const sit = r.situacion ?? 0;
  if (!r.comprobante)
    return {
      level: 0,
      why:
        sit === 1
          ? "Ya no tienes sueldo, pero tu nivel lo marcan tus ingresos propios, y todavía no hay un comprobante."
          : "Todavía no cobras con comprobante a un cliente propio.",
    };
  const cob = r.cobertura ?? 0;
  const col = r.colchon ?? COL_SIN_CALCULO;
  if (cob < 3) return { level: 1, why: "Ya cobraste a un cliente propio. Tus ingresos propios todavía no cubren tu costo de vida tres meses seguidos." };
  if (cob === 3) return { level: 2, why: "Tus ingresos propios cubren tu costo de vida tres meses seguidos. Para el nivel 3 te falta llegar a 1,2 veces." };
  if (col !== COL_OK)
    return {
      level: 2,
      why:
        col === COL_SIN_CALCULO
          ? "Ya llegas a 1,2 veces tu costo de vida. Te falta calcular tu colchón con la K.1, que toma 20 minutos."
          : "Ya llegas a 1,2 veces tu costo de vida. Te falta la segunda condición, un colchón de 6 meses.",
    };
  return { level: 3, why: "Cumples las dos condiciones del punto de no retorno." };
}

function plantilla(id: string) {
  const p = PLANTILLAS.find((x) => x.id === id);
  if (!p) throw new Error(`No existe la plantilla ${id}`);
  return { code: p.code, title: p.title, href: `/workbook/${id}` };
}

export type Paso = {
  /** Plantillas, con su código y su nombre del workbook. */
  plantillas: { code: string; title: string; href: string }[];
  capitulo: string;
  body: string;
  /** Un solo botón. `agenda`: «Agenda 30 minutos» con la página de citas. */
  boton: { label: string; href: string } | "agenda";
  /** Recursos y programas que acompañan este paso (href de WITH en sitio.ts). */
  acompana: string[];
};

/** Siguiente paso por nivel y situación, siempre con plantilla y capítulo. */
export function pasoDe(level: number, r: Respuestas): Paso {
  const sit = r.situacion ?? 0;
  if (level === 0 && sit === 1)
    return {
      plantillas: [plantilla("k3")],
      capitulo: "Capítulo 5",
      body: "Antes de firmar tu salida, llena la K.3 y anota la fecha límite para impugnar o reclamar. Revisa tu liquidación con un abogado laboral y después recalcula tu runway con la K.1.",
      boton: { label: "Abrir la K.3", href: "/workbook/k3" },
      acompana: ["/kit"],
    };
  if (level === 0 && sit === 2)
    return {
      plantillas: [plantilla("13-1")],
      capitulo: "Capítulo 13",
      body: "Calcula cuánto te deja un cliente durante toda la relación y cuánto llega a tu bolsillo después del costo fijo y el impuesto.",
      boton: { label: "Abrir la 13.1", href: "/workbook/13-1" },
      acompana: ["/kit", "/programas#primer-mandato"],
    };
  if (level === 0)
    return {
      plantillas: [plantilla("k1"), plantilla("k2")],
      capitulo: "Capítulo 1",
      body: "Calcula tu runway y lo que te permite tu contrato. Son las dos primeras plantillas del kit, unos 50 minutos en total.",
      boton: { label: "Descarga el kit", href: "/kit" },
      acompana: ["/kit", "/programas#taller", "/programas#primer-mandato"],
    };
  if (level === 1)
    return {
      plantillas: [plantilla("18-1")],
      capitulo: "Capítulo 18",
      body: "Suma un segundo rol o un producto sin que un cliente pase de la mitad de tus ingresos. Mide tus roles juntos el primer día de cada mes.",
      boton: { label: "Abrir la 18.1", href: "/workbook/18-1" },
      acompana: ["/programas#mastermind"],
    };
  if (level === 2)
    return {
      plantillas: [plantilla("19-1")],
      capitulo: "Capítulos 19 y 20",
      body: "Mide cada mes las dos condiciones del punto de no retorno y prepara la conversación con tu empleador.",
      boton: { label: "Abrir la 19.1", href: "/workbook/19-1" },
      acompana: ["/programas#sesiones"],
    };
  return {
    plantillas: [plantilla("21-1")],
    capitulo: "Capítulo 21",
    body: "Revisa tus números cada mes y arma un plan de 90 días que baje tu mayor riesgo. Si quieres convertir tu portafolio en una firma o un producto, agenda una conversación con el equipo.",
    boton: "agenda",
    acompana: ["/programas#coconstruccion"],
  };
}

/** Campos del registro (contrato con /api/registro y apps-script/Code.gs). */
export function registroDe(level: number, r: Respuestas) {
  return {
    nivel: `${level}: ${LEVELS[level]}`,
    situacion: QS[0].options[r.situacion ?? 0],
    cobertura: r.comprobante === 0 ? SIN_INGRESOS : QS[2].options[r.cobertura ?? 0],
    colchon: QS[3].options[r.colchon ?? COL_SIN_CALCULO],
  };
}

/** Colchón menor de 6 meses o sin calcular. */
export function colchonCorto(r: Respuestas) {
  return r.colchon !== COL_OK;
}
