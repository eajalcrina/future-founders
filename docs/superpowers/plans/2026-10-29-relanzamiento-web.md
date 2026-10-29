# Relanzamiento web Future Founders — Plan de trabajo

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pasar futurefounders.pe de una one-page con datos no verificados a un sitio multipágina veraz, medible y citado por buscadores de IA, con los mismos mecanismos de leads, suscripción, quiz, checkout, SEO y GEO que redesignlab, bio-business-school, circularclub y eddieajalcrina.

**Architecture:** Next.js App Router. Orden: (0) retirar lo no verificado → (1) diseñar en Claude Design y aprobar → (2) base técnica compartida (`lib/`, tests, tokens) → (3) integraciones server-side → (4) páginas → (5) SEO/GEO → (6) QA y lanzamiento. Lógica pura (forms, scoring, tokens, attribution, robots, llms) con tests vitest; sitio completo validado con `scripts/verify-site.mjs` contra `next start`.

**Tech Stack:** Next 16.3.x · React 19.2 · TypeScript · Tailwind 4 · framer-motion · Brevo · Google Sheets (`google-auth-library`) · listmonk · Mercado Pago Checkout Pro · GTM/GA4 + Consent Mode v2 · Vercel Analytics · Supabase (solo `/toolkit`) · vitest · Playwright.

**Spec:** `docs/superpowers/specs/2026-10-29-relanzamiento-web-design.md`. Ante cualquier duda, manda la spec.

## Global Constraints

- Rama: `claude/brave-carson-b71gdg`. Un commit por tarea, terminando con las líneas de atribución de la sesión.
- **Veracidad:** ninguna cifra, cargo, testimonio o logo sin fuente verificada. Nada generado con IA presentado como real.
- Copy en español (es-PE). Texto nuevo marcado `// COPY: revisar Eddie` hasta aprobación.
- Ningún componente visual nuevo se codifica sin su diseño aprobado en Claude Design (Fase 1).
- Movimiento: respeta `prefers-reduced-motion`; prohibidos revelado de títulos por línea, menú que cambia de color y fotos con clip-path.
- Verificación por tarea: `npx tsc --noEmit`, `npm run lint`, `npm test` cuando toque lógica probada.
- Antes de escribir código Next, leer la guía relevante en `node_modules/next/dist/docs/` (AGENTS.md).

---

## Mapa de archivos (nuevos principales)

| Archivo | Responsabilidad | Origen |
|---|---|---|
| `src/lib/site.ts` | URL, nombre, emails, calendario, WhatsApp, precios | RL `lib/constants.ts` |
| `src/lib/forms.ts` | Registro `FORMS` (campos, whitelist, límites) | BBS |
| `src/lib/brevo.ts` · `sheets.ts` · `listmonk.ts` | Clientes server-only | BBS |
| `src/lib/attribution.ts` | first/last touch | RL/BBS |
| `src/lib/consent.ts` · `analytics.ts` | Consent Mode v2 + `track()` | RL |
| `src/lib/mercadopago.ts` · `fulfillment.ts` · `token.ts` | Checkout, webhook, links HMAC | CC |
| `src/lib/quiz/{preguntas,scoring,arquetipos}.ts` | Quiz puro y probado | refactor de `DiagnosticoSection.tsx` |
| `src/lib/social.ts` · `seo-meta.ts` · `schema.ts` · `robots.ts` · `llms.ts` | SEO/GEO | ED · BBS · RL |
| `src/lib/respuestas/*.ts` · `glosario.ts` | Contenido GEO | ED · BBS |
| `src/app/api/{lead,suscribir,checkout,mp/webhook,descarga,diagnostico-stats,reclamos}/route.ts` | Endpoints | BBS · CC |
| `src/app/{diagnostico,bootcamp,libro,recursos,respuestas,glosario,autores,boletin/confirmado,privacidad,terminos,reembolsos,libro-de-reclamaciones}/` | Páginas | — |
| `src/app/{sitemap.ts,robots.txt/route.ts,llms.txt/route.ts,llms-full.txt/route.ts,og/[...path]/route.tsx,organization.json/route.ts}` | Infra SEO/GEO | RL · BBS |
| `scripts/{verify-site.mjs,indexnow.mjs}` · `tests/*.test.ts` · `vitest.config.ts` | QA | RL · BBS |

**Se eliminan:** `src/app/api/brevo/route.ts`, `src/app/api/quiz-lead/route.ts` (sustituidos por `/api/lead`), `PruebaSocialSection.tsx` (testimonios ficticios), assets de create-next-app en `public/`.

---

## Fase 0 — Saneamiento de veracidad (bloqueante, 0,5 día)

### Task 0.1: Retirar contenido no verificado del sitio vivo
**Files:** `HeroSection.tsx`, `NosotrosSection.tsx`, `PruebaSocialSection.tsx`, `page.tsx`, `BootcampSection.tsx`
- [ ] Quitar la barra de stats del hero y de Nosotros (155+, $20M+, 10+, $1.5M+).
- [ ] Quitar `PruebaSocialSection` de `page.tsx`.
- [ ] Sustituir cargos por los que Eddie confirme (decisión abierta 4); por defecto «Coautor de *Doble Agente*».
- [ ] Quitar «El 99 % de emprendedores fallan» (sin fuente).
- [ ] Verificar build y desplegar como *hotfix* antes del resto del plan.

## Fase 1 — Diseño en Claude Design (3–4 días, iterativo con Eddie)

Cada tarea produce un Artifact de tipo **Design** y termina con la aprobación de Eddie.

- [ ] **1.1 Design System FF v2:** tokens de color (oscuro/crema, azul, amarillo, magenta solo libro), escala tipográfica Spline + DM Sans + mono, botones, kicker numerado, tarjetas, formularios, banner de cookies, estados de foco.
- [ ] **1.2 Home** (desktop 1440 + móvil 390).
- [ ] **1.3 `/bootcamp`**: hero, problema, método 4 pilares, currícula 8 módulos, cómo funciona, precio, FAQ, CTA postulación/calendario.
- [ ] **1.4 `/libro`**: portada, 5 fases / 20 misiones, muestra gratuita, compra, FAQ.
- [ ] **1.5 Quiz**: inicio, pregunta, gate, resultado por arquetipo.
- [ ] **1.6 Plantillas**: respuesta GEO, término de glosario, legales.
- [ ] **1.7 OG image y emails** (bienvenida, doble opt-in, entrega del libro).
- [ ] **1.8** Exportar tokens aprobados a `src/app/globals.css` (`@theme`) — commit.

## Fase 2 — Base técnica (1,5 días)

### Task 2.1: Actualizar stack y tooling
- [ ] Next 16.3.x, `eslint-config-next` a la par; añadir `vitest`, `server-only`, `google-auth-library`, `@vercel/analytics`, `@vercel/speed-insights`.
- [ ] `vitest.config.ts` con alias `@` y stub de `server-only` (patrón BBS). Script `npm test`.
- [ ] README propio (stack, env vars, scripts, change log estilo RL).

### Task 2.2: Fuentes y tokens
- [ ] `layout.tsx`: reducir a Spline Sans + DM Sans + mono; `metadataBase`, title template, `robots.googleBot`.
- [ ] Aplicar tokens de 1.8; quitar Space Grotesk, Cormorant, Barlow y `Courier New`.

### Task 2.3: Layout compartido
- [ ] `Navbar` multipágina (5 ítems + CTA), `Footer` con legales, boletín y redes; `Reveal` con tokens de motion.
- [ ] `src/lib/site.ts` como única fuente de URLs, precios y contacto.

## Fase 3 — Integraciones server-side (3 días)

### Task 3.1: Leads (`/api/lead`)
- [ ] Portar `forms.ts`, `brevo.ts`, `sheets.ts` (con `safeCell`), `attribution.ts`.
- [ ] Ruta con honeypot, `elapsed_ms`, consentimiento, `Promise.allSettled`, 502 solo si fallan email y hoja.
- [ ] Tests: validación por formulario, honeypot, consentimiento, fallo parcial.

### Task 3.2: Quiz modular
- [ ] Extraer preguntas, scoring y arquetipos de `DiagnosticoSection.tsx` a `src/lib/quiz/` (sin cambiar el contenido aprobado).
- [ ] Tests de scoring (límites de cada arquetipo).
- [ ] UI nueva según 1.5; lead al formulario `perfil-fundador` con atributos `FF_*` actuales en Brevo.
- [ ] `/api/diagnostico-stats` (percentil, oculto con < 20 respuestas).

### Task 3.3: Boletín
- [ ] `listmonk.ts` + `/api/suscribir` (pending/already) + `/boletin/confirmado` (noindex) + plantillas en `docs/listmonk/`.
- [ ] Test de la ruta con mocks.

### Task 3.4: Libro (según decisión abierta 2)
- [ ] **Si se vende:** `mercadopago.ts`, `/api/checkout`, `/api/mp/webhook` → `fulfillment.ts` (re-consulta, monto, idempotencia), `token.ts` HMAC, `/api/descarga` desde `private/`, `/libro/gracias` con `TrackPurchase`. Tests de fulfillment y token.
- [ ] **Si es preventa:** formulario `libro-espera` en `FORMS` + muestra gratuita con `lead-access`.

### Task 3.5: Analítica y consentimiento
- [ ] `consent.ts` inline en `<head>`, banner, `CookiePrefs`, GTM/GA4, Vercel Analytics + Speed Insights.
- [ ] Eventos: `quiz_start`, `quiz_complete`, `generate_lead`, `sign_up` (boletín), `begin_checkout`, `purchase`, `cta_calendar`, `cta_whatsapp`.

### Task 3.6: Toolkit
- [ ] Mantener Supabase para auth/fases; registrar altas del toolkit también en `/api/lead` (formulario `toolkit`). Aplicar header/footer y tokens.

## Fase 4 — Páginas (4 días)

- [ ] **4.1 Home** según 1.2: promesa, problema (4 síntomas), método, quiz CTA, libro, bootcamp, autores, FAQ, boletín.
- [ ] **4.2 `/diagnostico`** página propia con el quiz; resultado en estado cliente (no indexable).
- [ ] **4.3 `/bootcamp`** con contenido del doc de feb 2026 (currícula 8 módulos, cómo funciona) y precio confirmado; CTA a calendario y formulario `bootcamp-postulacion`.
- [ ] **4.4 `/libro`** según 1.4 y 3.4.
- [ ] **4.5 `/autores`** con hechos verificados y enlaces a eddieajalcrina.com.
- [ ] **4.6 Legales:** `/privacidad#cookies`, `/terminos`, `/reembolsos`, `/libro-de-reclamaciones` + `/api/reclamos`.
- [ ] **4.7** 404 propia y redirects de anclas antiguas si aplica.

## Fase 5 — SEO y GEO (2,5 días)

- [ ] **5.1** `social.ts` + `seo-meta.ts`; metadata y canonical en todas las páginas.
- [ ] **5.2** `sitemap.ts` (fechas reales), `robots.txt/route.ts` con bots IA y `Content-Signal` (test), bloqueo en previews.
- [ ] **5.3** OG dinámicas `og/[...path]` + `og-pages.ts`.
- [ ] **5.4** `schema.ts`: Organization (parent RL, founder ED), WebSite, Course+Offer, Book, FAQPage, BreadcrumbList, DefinedTermSet; `/organization.json`.
- [ ] **5.5** Contenido GEO: 6–10 respuestas (`/respuestas/[slug]`) a partir de los mensajes clave (runway de libertad, cuándo renunciar con números, ideas de negocio desde gastos inexplicables, activo vs. autoempleo, pricing por valor, side business sin dejar el empleo) — copy para revisión de Eddie.
- [ ] **5.6** Glosario (`/glosario/[termino]`) enlazado a calculadoras del toolkit.
- [ ] **5.7** `llms.txt` + `llms-full.txt` generados desde datos (test).
- [ ] **5.8** `scripts/indexnow.mjs` + key en `public/`.

## Fase 6 — QA y lanzamiento (1,5 días)

- [ ] **6.1** `scripts/verify-site.mjs` en verde contra `next start`.
- [ ] **6.2** Capturas Playwright 390/768/1440 vs. diseños aprobados; Lighthouse móvil ≥ 90 en las 4 categorías.
- [ ] **6.3** Prueba de punta a punta en preview: lead → Brevo + Sheet; boletín → email de confirmación; compra en sandbox MP → email con link → descarga.
- [ ] **6.4** Env vars en Vercel (Production/Preview), dominio y redirects www.
- [ ] **6.5** Search Console + Bing Webmaster: enviar sitemap; IndexNow.
- [ ] **6.6** PR a `main` con checklist de la spec.

## Fuera de este repo (seguimiento)
- RL `lib/schema.ts`: añadir FF como `subOrganization`. ED `lib/schema.tsx`: `founder`/`worksFor` → FF.
- Reconfirmación de la lista de ~1.782 contactos en listmonk (decisión 5).

## Calendario estimado

| Semana | Fases |
|---|---|
| 1 | 0 (hotfix) · 1 (diseño y aprobaciones) · 2 |
| 2 | 3 · inicio 4 |
| 3 | 4 · 5 |
| 4 | 5 (contenido GEO) · 6 · lanzamiento |

## Self-review de cobertura de la spec
§1.2 P1–P3 → F0 · P4–P6 → F5 · P7 → 3.4, 4.3, 4.4 · P8 → 4.6 · P9 → 3.5 · P10–P11 → 3.1 · P12–P13 → F1, 2.2, 2.3 · P14 → 3.2 · P15 → 2.1 · §5 → F1 · §6 → F3 · §7 → F5 · §9 → F6 · §10 → decisiones previas a 0.1, 3.1, 3.3, 3.4, 4.3, 4.5.
