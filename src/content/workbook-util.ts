import { PLANTILLAS, PARTES, type Plantilla } from "./workbook";

export const PART_IDS = Object.keys(PARTES).map((n) => `parte-${n}`);

/** Plantillas de una parte, de la lista del idioma de la página (plantillas(locale) en workbook-i18n.ts). */
export function partTemplates(num: string, lista: Plantilla[] = PLANTILLAS): Plantilla[] {
  return lista.filter((p) => p.part?.num === num);
}

/** Los id de /workbook/<id>: los mismos en los dos idiomas (los QR del libro apuntan a la versión en español). */
export function allWorkbookIds(): string[] {
  return [...PLANTILLAS.map((p) => p.id), ...PART_IDS];
}

/** Tiempo en un rótulo, con la forma del libro y el workbook desde R3: «25 MIN» (el texto corrido sigue con «25 minutos»). */
export function timeLabel(time: string): string {
  return time.replace(/\b(minutos?|minutes?)\b/, "min");
}
