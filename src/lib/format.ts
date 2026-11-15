/** Formato numérico del libro (es-PE con coma decimal y punto de miles): 61.600 y 7,0. */
export function fmtNum(v: number, decimals = 0): string {
  const neg = v < 0;
  const fixed = Math.abs(v).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const withDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (neg ? "−" : "") + withDots + (dec ? "," + dec : "");
}

/** Lee un número escrito con puntos de miles y coma decimal (o con punto decimal). */
export function parseNum(s: string): number {
  const t = s.replace(/\s/g, "");
  if (!t) return NaN;
  let norm: string;
  if (t.includes(",")) norm = t.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) norm = t.replace(/\./g, "");
  else norm = t;
  return Number(norm);
}
