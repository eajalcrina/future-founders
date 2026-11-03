import { agendaUrl } from "@/content/sitio";

// futurefounders.pe/agenda es la URL que imprime el QR del cierre del libro.
// Redirige a la agenda vigente (NEXT_PUBLIC_AGENDA_URL) o, si no está definida, a WhatsApp,
// para que la URL impresa no dependa del proveedor de agenda.
export const dynamic = "force-dynamic";

export function GET() {
  return new Response(null, { status: 307, headers: { Location: agendaUrl(), "Cache-Control": "no-store" } });
}
