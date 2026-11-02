// Programas de Future Founders (sin precios: se publican con cada convocatoria).

export type Programa = {
  id: string;
  level: number;
  /** Rótulo de nivel, como en el cierre del libro. */
  levelLabel: string;
  tag: string;
  name: string;
  desc: string;
  format: string;
  forWho: string;
  cta: "Postular" | "Ver fechas" | "Agenda 30 minutos" | "Conversemos";
};

export const PROGRAMAS: Programa[] = [
  {
    id: "taller",
    level: 0,
    levelLabel: "Nivel 0, preparando el 1",
    tag: "Taller",
    name: "Tu primer rol parcial",
    desc: "Escribes tu oferta en una página y le pones precio, junto a ejecutivos que están en el mismo punto.",
    format: "2 sesiones de 3 horas en vivo",
    forWho: "Ya mediste tu runway y lo que permite tu contrato, y quieres definir qué ofreces y a qué precio.",
    cta: "Ver fechas",
  },
  {
    id: "primer-mandato",
    level: 0,
    levelLabel: "Nivel 0, preparando el 1",
    tag: "Programa",
    name: "Primer Mandato",
    desc: "Cohorte en vivo para llegar a tu primer comprobante, con oferta, precio, contrato modelo, 30 cuentas objetivo y 10 conversaciones.",
    format: "8 semanas, de 12 a 20 personas",
    forWho: "Tienes tu oferta clara y quieres acompañamiento semana a semana hasta emitir tu primer comprobante.",
    cta: "Postular",
  },
  {
    id: "mastermind",
    level: 1,
    levelLabel: "Nivel 1, camino al 2",
    tag: "Mastermind",
    name: "Portafolio",
    desc: "Grupos de pares que revisan oportunidades, precios y referidos cada quince días.",
    format: "Grupos de 8 a 10, de 6 a 12 meses",
    forWho: "Ya tienes al menos un cliente propio y quieres sumar roles hasta que tus ingresos propios paguen los gastos de tu casa.",
    cta: "Postular",
  },
  {
    id: "sesiones",
    level: 2,
    levelLabel: "Nivel 2, camino al 3",
    tag: "Acompañamiento",
    name: "Sesiones individuales de transición",
    desc: "Planificas tu salida con las dos condiciones del punto de no retorno a la vista.",
    format: "6 a 8 sesiones",
    forWho: "Tus ingresos propios se acercan a 1,2 veces tu costo de vida y estás decidiendo si sales de tu cargo y cuándo.",
    cta: "Agenda 30 minutos",
  },
  {
    id: "coconstruccion",
    level: 3,
    levelLabel: "Nivel 3",
    tag: "Coconstrucción",
    name: "Firma o producto propio",
    desc: "Convertimos tu portafolio en una firma o un producto, junto a ti, en un sprint de 90 días.",
    format: "Sprint de 90 días",
    forWho: "Vives de tu portafolio y quieres que deje de depender solo de tus horas.",
    cta: "Conversemos",
  },
];
