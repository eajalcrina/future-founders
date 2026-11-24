// Programas de Future Founders: id, nivel y orden. Sus textos (nombre, descripción, formato, «es para ti si»
// y el botón) están en el diccionario, en programas.lista[id]. Sin precios: se publican con cada convocatoria.

export type ProgramaId = "taller" | "primer-mandato" | "mastermind" | "sesiones" | "coconstruccion";

/**
 * Botón de cada programa: «agenda» abre «Agenda 30 minutos»; «fechas» y «postular» bajan al formulario con el
 * programa elegido («fechas» cambia el botón del formulario a «Quiero ver las fechas»).
 */
export const PROGRAMAS: { id: ProgramaId; level: number; cta: "fechas" | "postular" | "agenda" }[] = [
  { id: "taller", level: 0, cta: "fechas" },
  { id: "primer-mandato", level: 0, cta: "postular" },
  { id: "mastermind", level: 1, cta: "postular" },
  { id: "sesiones", level: 2, cta: "agenda" },
  { id: "coconstruccion", level: 3, cta: "agenda" },
];
