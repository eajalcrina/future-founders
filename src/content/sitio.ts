// Datos del sitio que no son texto: dominio, contacto, enlaces y fichas de los fundadores.
// El texto visible vive en los diccionarios (src/i18n/es.ts y en.ts). Este archivo no los importa,
// para que los componentes de cliente que lo usan no carguen los diccionarios en el navegador.

export const SITE_URL = "https://futurefounders.pe";
export const EMAIL = "ff@redesignlab.org";
export const WHATSAPP_NUMBER = "51989338401";
export const WHATSAPP_LABEL = "+51 989 338 401";
export const INSTAGRAM_URL = "https://www.instagram.com/futurefounders.pe/";

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * URL de la página de citas de Google Calendar («Agenda 30 minutos»). Si no está definida, abre WhatsApp
 * con el mensaje del diccionario (comun.agendaWa) en el idioma de la página.
 */
export function agendaUrl(mensajeWa: string) {
  return process.env.NEXT_PUBLIC_AGENDA_URL || whatsappUrl(mensajeWa);
}

/** Hay página de citas propia. Sin ella, «Agenda 30 minutos» ya abre WhatsApp y no se ofrece WhatsApp aparte. */
export const HAY_AGENDA = Boolean(process.env.NEXT_PUBLIC_AGENDA_URL);

/** Fundadores: nombre, enlaces y foto. Su cargo, credencial y bio están en el diccionario (sitio.founders). */
export const FOUNDERS = [
  {
    key: "eddie",
    name: "Eddie Ajalcriña",
    web: "eddieajalcrina.com",
    webUrl: "https://eddieajalcrina.com",
    linkedin: "https://www.linkedin.com/in/eddieajalcrina/",
    photo: "/img/eddie-ajalcrina.webp",
  },
  {
    key: "lorenzo",
    name: "Lorenzo Ortiz",
    web: "lorenzoortiz.co",
    webUrl: "https://lorenzoortiz.co",
    linkedin: "https://www.linkedin.com/in/lorenzoortiz/",
    photo: "/img/lorenzo-ortiz.webp",
  },
] as const;

/** Ficha del libro en Amazon. Mientras no esté definida, lleva a la búsqueda del título. */
export const AMAZON_URL =
  process.env.NEXT_PUBLIC_AMAZON_URL || "https://www.amazon.com/s?k=Doble+Agente+Ajalcri%C3%B1a+Ortiz";
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "";
