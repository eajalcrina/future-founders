import "server-only";

// Cliente mínimo de Brevo (contactos y correo transaccional), como en los otros sitios.
const API = "https://api.brevo.com/v3";

function key() {
  return process.env.BREVO_API_KEY ?? "";
}

export function brevoConfigured() {
  return Boolean(key());
}

async function call(path: string, method: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "api-key": key(), "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok && res.status !== 204) throw new Error(`Brevo ${path} ${res.status}: ${await res.text()}`);
}

// Crea o actualiza el contacto y lo agrega a las listas indicadas.
export async function upsertContact(email: string, attributes: Record<string, string | number | boolean>, listIds: number[]) {
  await call("/contacts", "POST", { email, attributes, listIds, updateEnabled: true });
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(o: { to: string; subject: string; rows?: [string, string][]; text?: string; replyTo?: string }) {
  const from = process.env.EMAIL_FROM || "ff@redesignlab.org";
  const table = (o.rows ?? [])
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5E5E66;vertical-align:top">${escape(k)}</td><td style="padding:6px 0">${escape(v)}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#0C0C0D;max-width:640px">
<p style="font-weight:700;font-size:18px;margin:0 0 4px">future founders<span style="color:#E6007E">.</span></p>
${o.text ? `<p style="font-size:15px;line-height:1.55">${escape(o.text)}</p>` : ""}
${table ? `<table style="border-collapse:collapse;font-size:14px">${table}</table>` : ""}
</div>`;
  await call("/smtp/email", "POST", {
    sender: { email: from, name: "Future Founders" },
    to: [{ email: o.to }],
    subject: o.subject,
    htmlContent: html,
    ...(o.replyTo ? { replyTo: { email: o.replyTo } } : {}),
  });
}
