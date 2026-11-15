import fs from "node:fs";
import path from "node:path";

// PDFs gratuitos que se descargan desde /kit y /workbook. Se publican en public/descargas/.
export const DESCARGAS = {
  kit: "/descargas/doble-agente-kit.pdf",
  workbook: "/descargas/doble-agente-workbook.pdf",
} as const;

/** true si el PDF ya está en public/ (se comprueba al generar la página). */
export function publicado(href: string): boolean {
  try {
    return fs.statSync(path.join(process.cwd(), "public", href)).isFile();
  } catch {
    return false;
  }
}

/** Mientras el PDF del kit no esté publicado, el formulario del kit entrega el workbook, que trae las mismas cinco plantillas. */
export function kitFallback() {
  if (publicado(DESCARGAS.kit)) return undefined;
  return {
    file: DESCARGAS.workbook,
    label: "Descargar el workbook con el kit",
    note: "El kit K.1 a K.5 está al comienzo del workbook, en las páginas 5 a 13.",
  };
}
