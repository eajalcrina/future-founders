import { NextRequest, NextResponse } from "next/server";
import { brevoConfigured, sendEmail, upsertContact } from "@/lib/brevo";
import { SHEET_HEADERS, label, parseProfile, type FractionalProfile } from "@/lib/fractional";
import { appendRow } from "@/lib/sheets";
import { EMAIL } from "@/lib/site";

// Límite simple en memoria: 5 envíos por IP y hora (por instancia).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

// Una fila por registro en la pestaña «Fractional» (columnas en SHEET_HEADERS).
async function saveToSheet(p: FractionalProfile, attribution: unknown) {
  const l = "es" as const;
  const lima = new Date().toLocaleString("sv-SE", { timeZone: "America/Lima" });
  const a = (attribution ?? {}) as Record<string, string | null>;
  const row = [
    lima,
    p.firstName,
    p.lastName,
    p.email,
    p.phone,
    p.linkedin,
    label("country", p.country, l),
    p.city,
    p.role === "other" ? `Otra: ${p.roleOther}` : label("role", p.role, l),
    label("experience", p.experience, l),
    p.industries.map((i) => label("industries", i, l)).join(", "),
    label("situation", p.situation, l),
    label("availability", p.availability, l),
    label("start", p.start, l),
    p.modality.map((m) => label("modality", m, l)).join(", "),
    p.languages.map((m) => label("languages", m, l)).join(", "),
    p.fee ? label("fee", p.fee, l) : "",
    p.summary,
    p.newsletter ? "Sí" : "No",
    p.lang,
    "nuevo",
    [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / "),
    a.referrer ?? "",
  ];
  if (row.length !== SHEET_HEADERS.length) throw new Error("Columnas de la hoja desalineadas");
  await appendRow(process.env.GOOGLE_SHEET_TAB_FRACTIONAL || "Fractional", row);
}

async function saveToBrevo(p: FractionalProfile) {
  if (!brevoConfigured()) throw new Error("Brevo no configurado");
  const lists = [Number(process.env.BREVO_LIST_FRACTIONAL)].filter((n) => Number.isInteger(n) && n > 0);
  await upsertContact(
    p.email,
    {
      FIRSTNAME: p.firstName,
      LASTNAME: p.lastName,
      FF_FRACTIONAL: true,
      FF_ROL: p.role,
      FF_PAIS: p.country,
      FF_EXPERIENCIA: p.experience,
      FF_DISPONIBILIDAD: p.availability,
      FF_IDIOMA: p.lang,
      FF_BOLETIN: p.newsletter,
      FF_FECHA_REGISTRO: new Date().toISOString().slice(0, 10),
    },
    lists,
  );
}

async function notifyTeam(p: FractionalProfile) {
  if (!brevoConfigured()) throw new Error("Brevo no configurado");
  const l = "es" as const;
  await sendEmail({
    to: process.env.EMAIL_NOTIFY || EMAIL,
    replyTo: p.email,
    subject: `Nuevo perfil fractional: ${p.firstName} ${p.lastName} · ${label("role", p.role, l)}`,
    rows: [
      ["Nombre", `${p.firstName} ${p.lastName}`],
      ["Correo", p.email],
      ["Teléfono", p.phone || "—"],
      ["LinkedIn", p.linkedin],
      ["País / ciudad", `${label("country", p.country, l)}${p.city ? ` · ${p.city}` : ""}`],
      ["Función", p.role === "other" ? p.roleOther : label("role", p.role, l)],
      ["Experiencia", label("experience", p.experience, l)],
      ["Industrias", p.industries.map((i) => label("industries", i, l)).join(", ")],
      ["Situación", label("situation", p.situation, l)],
      ["Disponibilidad", `${label("availability", p.availability, l)} · ${label("start", p.start, l)}`],
      ["Modalidad", p.modality.map((m) => label("modality", m, l)).join(", ")],
      ["Idiomas", p.languages.map((m) => label("languages", m, l)).join(", ") || "—"],
      ["Honorario", p.fee ? label("fee", p.fee, l) : "—"],
      ["Propuesta", p.summary],
      ["Idioma del formulario", p.lang],
    ],
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bots: campo trampa lleno o envío demasiado rápido. Respuesta idéntica a la real.
  const elapsed = Number(body.elapsed_ms);
  if ((typeof body.website === "string" && body.website.trim() !== "") || !Number.isFinite(elapsed) || elapsed < 2500) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const { profile, errors } = parseProfile(body);
  if (errors.length) return NextResponse.json({ ok: false, error: "invalid", fields: errors }, { status: 422 });

  const [sheet, contact, mail] = await Promise.allSettled([
    saveToSheet(profile, body.attribution),
    saveToBrevo(profile),
    notifyTeam(profile),
  ]);
  for (const [name, r] of [["sheets", sheet], ["brevo", contact], ["aviso", mail]] as const) {
    if (r.status === "rejected") console.error(`[fractional] ${name}:`, r.reason);
  }

  // El perfil se pierde solo si no quedó en ningún lado.
  if (sheet.status === "rejected" && contact.status === "rejected" && mail.status === "rejected") {
    return NextResponse.json({ ok: false, error: "storage" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
