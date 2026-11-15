# futurefounders.pe

Web de Future Founders y del libro *Doble Agente*, de Eddie Ajalcriña y Lorenzo Ortiz. Usa el sistema visual del libro y está solo en español.

- Reglas de diseño y decisiones del dueño: `docs/reglas-diseno.md`
- Lo que falta: `PENDIENTES-WEB.md`
- Términos que se buscan y reemplazan: `docs/terminos.txt`

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Portada: método, cifras, programas, nosotros y cierre |
| `/libro` | El libro: el método en 21 ideas, muestras, formatos y compra |
| `/kit` | Kit «Plan de salida» (PDF gratis con correo) |
| `/diagnostico` | Diagnóstico de nivel (cuatro preguntas) |
| `/programas` | Programas por nivel y postulación |
| `/workbook`, `/workbook/[id]` | Workbook y una página por plantilla, con calculadora cuando la tiene (destino de los QR del libro) |
| `/actualizaciones` | Valores del año por país |
| `/agenda` | Redirige a la agenda («Agenda 30 minutos») o a WhatsApp |
| `/privacidad`, `/terminos` | Textos legales |
| `/api/registro` | Reenvía los formularios al Apps Script de la hoja de registros |

## Código

- Tokens y clases: `src/app/globals.css`. Componentes base: `src/components/site/ui.tsx`.
- Textos: `src/content/` (`sitio.ts`, `programas.ts`, `legal.ts`, `actualizaciones.ts`, `testimonios.ts`). `workbook.ts` e `ideas.ts` se generan con `npm run workbook` y no se editan a mano.
- Formularios: `src/lib/registro.ts` y `apps-script/` (instrucciones en `apps-script/README.md`).
- Fuentes locales en `src/app/fonts/` (licencia OFL), para que el build no dependa de Google Fonts.

## Variables de entorno

Copia `.env.example` como `.env.local`. En Vercel: `NEXT_PUBLIC_AMAZON_URL`, `NEXT_PUBLIC_CHECKOUT_URL`, `NEXT_PUBLIC_AGENDA_URL`, `APPS_SCRIPT_URL` y `APPS_SCRIPT_SECRET`. Sin ellas, los botones y formularios ofrecen WhatsApp.

## Trabajo local

```bash
npm ci
```

```bash
npm run dev
```

Antes de subir cambios:

```bash
npm run lint && npm test && npm run build
```

`npm test` carga el ejemplo del libro en cada calculadora, lo compara con la cifra impresa y recorre las 132 combinaciones del diagnóstico.

## Publicación

Cada push a `main` publica en producción con GitHub Actions (`.github/workflows/`) y el token de Vercel. Vercel no despliega `main` por su cuenta (`vercel.json`); las demás ramas generan vistas previas.
