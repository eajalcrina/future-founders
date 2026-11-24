// Overlay en inglés del workbook (src/content/workbook.ts), que genera scripts/gen-workbook.py desde el libro y no se edita a mano.
// Una entrada por id de plantilla y, dentro, solo los campos con texto. Lo que falte se muestra en español
// (el español prevalece). La prueba scripts/test-overlay-en.mjs lista las entradas y los campos que faltan.
// TODO-EN: etapa 2, traducir cada plantilla.

import type { PlantillaEn } from "../workbook-i18n";

/** Nombres de las partes, por número («01»). */
export const PARTES_EN: Record<string, string> = {};

export const WORKBOOK_EN: Record<string, PlantillaEn> = {};
