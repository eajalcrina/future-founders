# futurefounders.pe

Sitio de Future Founders: acompañamiento para ejecutivos con trayectoria que quieren convertir su experiencia en ingresos propios, por dos rutas, **Fractional** y **empresa propia**. Es una web breve de venta consultiva: el objetivo de cada página es una conversación, ya sea agendar 30 minutos o escribir por correo.

- Diseño: sistema **B+D 1 · Plano con firma**, con tokens en `src/app/globals.css`. La referencia es el sistema de diseño «Future Founders» en Claude Design.
- Idiomas: español en `/` e inglés en `/en`. Cada idioma tiene su propio layout raíz con `<html lang>`.
- Stack: Next.js 16 (App Router), Tailwind 4, Supabase, Brevo y Vercel Analytics, que no usa cookies.

## Rutas

| Ruta | Qué es |
|---|---|
| `/`, `/en` | Página principal: oportunidad, dos rutas, cómo trabajamos, autores, libro y preguntas frecuentes |
| `/fractional`, `/en/fractional` | Registro de la Red Fractional |
| `/privacidad`, `/en/privacy` | Política de privacidad (Ley 29733) |
| `/toolkit` | Calculadoras (sin enlace en el menú, `noindex`) |
| `/api/fractional` | `POST` del registro |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | SEO y GEO. El `robots.txt` lista los bots de IA y la línea `Content-Signal` |

El texto público está en `src/lib/content.ts`, en los dos idiomas. Las bios solo usan hechos con versión «público» validada en la base de perfil. El formulario y su validación comparten una sola definición, `src/lib/fractional.ts`.

## Red Fractional: base de datos

1. En Supabase, ejecuta `supabase/migrations/20261030_fractional_profiles.sql`. Crea la tabla `fractional_profiles` con RLS activo y sin políticas públicas, de modo que solo el servidor escribe.
2. Configura las variables de entorno en Vercel.

Cada registro se guarda en paralelo en Supabase y como contacto en Brevo, y además envía un aviso por correo al equipo. Solo devuelve error si fallan los tres. Tiene campo trampa, tiempo mínimo de llenado y un límite de 5 envíos por IP y hora.

## Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Base de datos de perfiles |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Inicio de sesión del toolkit |
| `BREVO_API_KEY` | Contactos y correo |
| `BREVO_LIST_FRACTIONAL` | Id de la lista de Brevo para la Red Fractional |
| `EMAIL_FROM` | Remitente verificado en Brevo (por defecto `ff@redesignlab.org`) |
| `EMAIL_NOTIFY` | Destinatario del aviso de cada registro (por defecto `ff@redesignlab.org`) |
| `SITE_LIVE` | `0` bloquea la indexación (las vistas previas de Vercel se bloquean solas) |

## Desarrollo

```bash
npm ci
```

```bash
npm run dev
```

Antes de subir cambios:

```bash
npx tsc --noEmit && npm run build
```
