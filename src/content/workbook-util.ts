import { PLANTILLAS, PARTES, type Plantilla } from "./workbook";

export const PART_IDS = Object.keys(PARTES).map((n) => `parte-${n}`);

export function partTemplates(num: string): Plantilla[] {
  return PLANTILLAS.filter((p) => p.part?.num === num);
}

export function allWorkbookIds(): string[] {
  return [...PLANTILLAS.map((p) => p.id), ...PART_IDS];
}

export function kindLabel(p: Plantilla): string {
  return { kit: "Kit «Plan de salida»", capitulo: `Parte ${p.part?.num ?? ""}`, anexo: "Anexo por país", cierre: "Cierre del libro" }[p.kind];
}
