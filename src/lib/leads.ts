// Envío de formularios a las rutas existentes: /api/brevo (lista de correo) y /api/quiz-lead (Supabase).
// Si ninguna de las dos guarda el contacto (por ejemplo, sin credenciales), devuelve ok: false
// para que el formulario muestre un mensaje amable y la alternativa por WhatsApp.

export type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  country?: string;
  yearsExperience?: string;
  /** Origen o resultado: «Kit Plan de salida», «Nivel 1: Primer rol parcial», «Programa: Primer Mandato». */
  archetype: string;
  archetypeNumber?: number;
  score?: number;
  maxScore?: number;
  situacion?: string;
  disposicionInversion?: string;
  urgencia?: string;
};

async function post(url: string, body: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; skipped?: boolean };
    return Boolean(data.success) && !data.skipped;
  } catch {
    return false;
  }
}

export async function sendLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  const [brevo, supa] = await Promise.all([post("/api/brevo", payload), post("/api/quiz-lead", payload)]);
  return { ok: brevo || supa };
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
