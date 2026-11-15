// Registro de los formularios de la web. El navegador envía a /api/registro y esa ruta reenvía al
// Google Apps Script (apps-script/Code.gs), que escribe en la hoja y avisa por correo.
// Este archivo no lleva secretos: lo usan el navegador y el servidor.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Formulario = "kit" | "workbook" | "diagnostico" | "programa";

type Campo = { max: number; requerido?: boolean };

/**
 * Campos que acepta cada formulario, con su largo máximo. Lo que no está aquí se descarta.
 * Mantener alineado con FORMULARIOS en apps-script/Code.gs.
 */
export const CAMPOS: Record<Formulario, Record<string, Campo>> = {
  kit: {
    origen: { max: 80 },
    nombre: { max: 100 },
    correo: { max: 254, requerido: true },
    situacion: { max: 60 },
    pais: { max: 40 },
  },
  workbook: {
    origen: { max: 80 },
    nombre: { max: 100, requerido: true },
    correo: { max: 254, requerido: true },
    situacion: { max: 60 },
    pais: { max: 40 },
  },
  diagnostico: {
    nombre: { max: 100 },
    correo: { max: 254, requerido: true },
    nivel: { max: 80, requerido: true },
    situacion: { max: 120 },
    cobertura: { max: 120 },
    colchon: { max: 120 },
  },
  programa: {
    programa: { max: 80, requerido: true },
    nivel: { max: 10 },
    nombre: { max: 100, requerido: true },
    correo: { max: 254, requerido: true },
    pais: { max: 40 },
    mensaje: { max: 500 },
  },
};

export function esFormulario(x: unknown): x is Formulario {
  return typeof x === "string" && Object.prototype.hasOwnProperty.call(CAMPOS, x);
}

/** Lee la trampa para bots (campo oculto «website») del formulario que se envía. */
export function leerTrampa(form: EventTarget | null): string {
  if (!(form instanceof HTMLFormElement)) return "";
  return String(new FormData(form).get("website") ?? "");
}

/**
 * Envía un registro. Devuelve ok: false si la ruta o el script fallan (o faltan sus variables),
 * para que el formulario muestre el aviso amable con WhatsApp.
 */
export async function enviarRegistro(form: Formulario, data: Record<string, string>, website = ""): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form, data, website }),
    });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean };
    return { ok: res.ok && out.ok === true };
  } catch {
    return { ok: false };
  }
}
