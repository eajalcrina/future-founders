import { CAMPOS, EMAIL_RE, esFormulario } from "@/lib/registro";

// Recibe los formularios de la web, los valida y los reenvía al Google Apps Script que escribe en la
// hoja de registros y avisa por correo. APPS_SCRIPT_URL y APPS_SCRIPT_SECRET son solo del servidor.

const MAX_BODY = 8_000;

function error(status: number, mensaje: string) {
  return Response.json({ ok: false, error: mensaje }, { status });
}

export async function POST(req: Request) {
  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY) return error(400, "Solicitud no válida.");

  let body: { form?: unknown; data?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return error(400, "Solicitud no válida.");
  }

  // Trampa para bots: una persona nunca ve ni llena «website». Se responde como si todo fuera bien
  // para no darle pistas al bot, pero no se registra nada.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const { form } = body;
  if (!esFormulario(form)) return error(400, "Formulario desconocido.");
  const entrada = body.data && typeof body.data === "object" ? (body.data as Record<string, unknown>) : {};

  const data: Record<string, string> = {};
  for (const [campo, regla] of Object.entries(CAMPOS[form])) {
    const v = entrada[campo];
    const texto = typeof v === "string" || typeof v === "number" ? String(v).trim() : "";
    if (regla.requerido && !texto) return error(400, `Falta el campo ${campo}.`);
    if (texto.length > regla.max) return error(400, `El campo ${campo} es demasiado largo.`);
    if (texto) data[campo] = texto;
  }
  if (!EMAIL_RE.test(data.correo ?? "")) return error(400, "Revisa el correo.");

  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) {
    console.error("[registro] Faltan APPS_SCRIPT_URL o APPS_SCRIPT_SECRET.");
    return error(503, "El registro no está disponible en este momento.");
  }

  try {
    // Apps Script responde los POST con un 302 a script.googleusercontent.com; fetch lo sigue con GET,
    // que es lo que pide Google para leer la respuesta.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, form, data }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !out?.ok) {
      console.error("[registro] El script respondió", res.status, out?.error ?? "sin JSON");
      return error(502, "No pudimos guardar el registro en este momento.");
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[registro] No se pudo llamar al script:", e instanceof Error ? e.message : e);
    return error(502, "No pudimos guardar el registro en este momento.");
  }
}
