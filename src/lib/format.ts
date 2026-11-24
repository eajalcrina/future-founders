// Formato numérico por idioma. Español (es-PE, el del libro): 61.600 y 7,0. Inglés: 61,600 y 7.0.
// Sin imports de alias: lo cargan las pruebas en Node.

export type NumLocale = "es" | "en";

const SEP: Record<NumLocale, { miles: string; decimal: string }> = {
  es: { miles: ".", decimal: "," },
  en: { miles: ",", decimal: "." },
};

/** Cifra con separador de miles y decimales fijos: fmtNum(61600) → «61.600»; fmtNum(7, 1, "en") → «7.0». */
export function fmtNum(v: number, decimals = 0, locale: NumLocale = "es"): string {
  const { miles, decimal } = SEP[locale];
  const neg = v < 0;
  const fixed = Math.abs(v).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, miles);
  return (neg ? "−" : "") + withSep + (dec ? decimal + dec : "");
}

/**
 * Lee un número escrito a mano. En español: puntos de miles y coma decimal (o punto decimal: «7.5»).
 * En inglés: comas de miles y punto decimal (o coma decimal: «7,5»).
 */
export function parseNum(s: string, locale: NumLocale = "es"): number {
  const t = s.replace(/\s/g, "");
  if (!t) return NaN;
  const { miles, decimal } = SEP[locale];
  const m = miles === "." ? "\\." : ",";
  let norm: string;
  if (t.includes(decimal)) norm = t.split(miles).join("").replace(decimal, ".");
  else if (new RegExp(`^\\d{1,3}(${m}\\d{3})+$`).test(t)) norm = t.split(miles).join("");
  else norm = t.replace(",", ".");
  return Number(norm);
}

/** Separador decimal del idioma (para conservar los decimales que escribió la persona al reformatear). */
export function sepDecimal(locale: NumLocale = "es"): string {
  return SEP[locale].decimal;
}
