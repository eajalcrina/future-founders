# futurefounders.pe

Sitio de Future Founders: acompañamiento para ejecutivos con trayectoria que quieren convertir su experiencia en ingresos propios, por dos rutas, **Fractional** y **empresa propia**. Es una web breve de venta consultiva: el objetivo de cada página es una conversación, ya sea agendar 30 minutos o escribir por correo.

- Diseño: sistema **B+D 1 · Plano con firma**, con tokens en `src/app/globals.css`. La referencia es el sistema de diseño «Future Founders» en Claude Design.
- Idiomas: español en `/` e inglés en `/en`. Cada idioma tiene su propio layout raíz con `<html lang>`.
- Stack: Next.js 16 (App Router), Tailwind 4, Google Sheets, Brevo y Vercel Analytics, que no usa cookies. Supabase solo lo usa el toolkit.

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

## Red Fractional: dónde se guardan los perfiles

Se usa la misma fórmula que en Bio Business School y Redesign Lab: **Google Sheets + Brevo**.

1. En el Google Sheet del proyecto, crea una pestaña llamada `Fractional` (o el nombre que pongas en `GOOGLE_SHEET_TAB_FRACTIONAL`) con estos encabezados en la fila 1, en este orden (`SHEET_HEADERS` en `src/lib/fractional.ts`):
   `Fecha (Lima) · Nombre · Apellido · Correo · Teléfono · LinkedIn · País · Ciudad · Función · Experiencia · Industrias · Situación · Disponibilidad · Desde · Modalidad · Idiomas · Honorario · Propuesta · Boletín · Idioma · Estado · UTM · Referente`
2. Comparte el Sheet con la cuenta de servicio (`GOOGLE_SERVICE_ACCOUNT_EMAIL`) como editora.
3. Configura las variables de entorno en Vercel.

Cada registro agrega una fila a la hoja, crea o actualiza el contacto en Brevo (lista `BREVO_LIST_FRACTIONAL`) y avisa al equipo por correo, los tres en paralelo. Solo devuelve error si fallan los tres. La columna «Estado» empieza en «nuevo» y sirve para el seguimiento manual. Tiene campo trampa, tiempo mínimo de llenado y un límite de 5 envíos por IP y hora.

## Variables de entorno

| Variable | Uso |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` | Cuenta de servicio de Google (la llave con `\n` literales) |
| `GOOGLE_SHEET_ID` | Id del Google Sheet |
| `GOOGLE_SHEET_TAB_FRACTIONAL` | Pestaña de los perfiles (por defecto `Fractional`) |
| `BREVO_API_KEY` | Contactos y correo |
| `BREVO_LIST_FRACTIONAL` | Id de la lista de Brevo para la Red Fractional |
| `EMAIL_FROM` | Remitente verificado en Brevo (por defecto `ff@redesignlab.org`) |
| `EMAIL_NOTIFY` | Destinatario del aviso de cada registro (por defecto `ff@redesignlab.org`) |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Solo para el inicio de sesión del toolkit |
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
