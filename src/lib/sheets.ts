import "server-only";
import { JWT } from "google-auth-library";

// Google Sheets con cuenta de servicio, igual que en Bio Business School y Redesign Lab.
let cachedClient: JWT | null = null;

function getClient(): JWT | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) return null;
  cachedClient ??= new JWT({
    email,
    // Vercel guarda la llave en una sola línea con "\n" literales.
    key: rawKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return cachedClient;
}

export function sheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEET_ID && getClient());
}

// Evita que un texto que empieza con = + - @ se interprete como fórmula.
export function safeCell(v: string | number): string | number {
  return typeof v === "string" && /^[=+\-@]/.test(v) ? `'${v}` : v;
}

// RAW: Sheets guarda el texto tal cual (sin evaluar fórmulas ni reinterpretar teléfonos o fechas).
export async function appendRow(tab: string, values: (string | number)[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const client = getClient();
  if (!sheetId || !client) throw new Error("Google Sheets no configurado");
  const { token } = await client.getAccessToken();
  const range = encodeURIComponent(`${tab}!A:A`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [values.map(safeCell)] }),
    },
  );
  if (!res.ok) throw new Error(`Sheets append ${res.status}: ${await res.text().catch(() => "")}`);
}
