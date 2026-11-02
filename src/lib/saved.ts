// Datos de las calculadoras guardados en este navegador (clave «da:<id de plantilla>»).
// Si el navegador no deja guardar (modo privado, almacenamiento bloqueado), todo sigue funcionando sin guardar.

export type Saved = { v: Record<string, string>; out: Record<string, number | string> };

export function readSaved(id: string): Saved | null {
  try {
    const s = window.localStorage.getItem(`da:${id}`);
    if (!s) return null;
    const d = JSON.parse(s) as Partial<Saved>;
    const out: Saved["out"] = {};
    for (const [k, v] of Object.entries(d.out ?? {})) if (typeof v === "string" || (typeof v === "number" && Number.isFinite(v))) out[k] = v;
    return { v: d.v ?? {}, out };
  } catch {
    return null;
  }
}

export function writeSaved(id: string, data: Saved) {
  try {
    window.localStorage.setItem(`da:${id}`, JSON.stringify(data));
  } catch {
    // Sin almacenamiento: la calculadora funciona igual.
  }
}
