import { getContent } from "@/lib/content";
import { CALENDAR_URL, EDDIE_URL, EMAIL, ROUTES, SITE } from "@/lib/site";

export const dynamic = "force-static";

// Resumen del sitio para modelos de lenguaje (llmstxt.org), en los dos idiomas.
export function GET() {
  const es = getContent("es");
  const en = getContent("en");
  const faq = (t: typeof es) => t.faq.items.map((f) => `- **${f.q}** ${f.a}`).join("\n");
  const body = `# Future Founders

> ${es.meta.description}

> ${en.meta.description}

Future Founders acompaña a ejecutivos con trayectoria de América Latina por dos rutas: **Fractional** (vender su experiencia por partes, como CFO, CMO o COO de varias empresas) y **empresa propia** (crear un negocio que no dependa de ellos). Trabaja por venta consultiva: una conversación de 30 minutos sin costo, un diagnóstico y una ruta acompañada. Fundadores: Eddie Ajalcriña (${EDDIE_URL}) y Lorenzo Ortiz, coautores del libro *Doble Agente: el manual para fundadores con salario* (en edición, en español e inglés).

## Páginas / Pages
- [Inicio](${SITE}/): propuesta, rutas, cómo trabajamos y preguntas frecuentes
- [Home (English)](${SITE}${ROUTES.home.en})
- [Red Fractional](${SITE}${ROUTES.fractional.es}): registro de profesionales dispuestos a trabajar como fractional
- [Fractional network (English)](${SITE}${ROUTES.fractional.en})
- [Privacidad](${SITE}${ROUTES.privacy.es})

## Preguntas frecuentes
${faq(es)}

## FAQ (English)
${faq(en)}

## Contacto / Contact
- Correo: ${EMAIL}
- Agenda: ${CALENDAR_URL}
`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
