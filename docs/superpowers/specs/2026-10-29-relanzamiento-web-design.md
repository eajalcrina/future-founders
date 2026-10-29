# Relanzamiento web Future Founders — Spec de diseño

**Fecha:** 2026-10-29 · **Autor:** Claude Code (para Eddie Ajalcriña) · **Estado:** borrador, pendiente de aprobación de Eddie

**Fuentes revisadas:**
- Sitio vivo `https://www.futurefounders.pe/` (capturas desktop 1440 y móvil 390, HTML servido, `robots.txt` y `sitemap.xml`).
- Este repo (`main` = `claude/brave-carson-b71gdg` @ `8138356`).
- Propuesta previa en Drive: `PRD.md` (22 mar 2026), doc «Página web de Future Founders» (feb 2026), ficha interna `future-founders.md` (22 oct 2026).
- Proyectos hermanos como referencia de criterios: `redesignlab` (RL), `bio-business-school/web` (BBS), `circularclub-web` (CC), `eddieajalcrina-web` (ED).

---

## 1. Diagnóstico del estado actual

### 1.1 Lo que funciona
- One-page en Next 16.2.1 + Tailwind 4 + framer-motion, oscuro, con identidad azul `#1a27c9` / amarillo `#f7e05f`.
- Quiz «Descubre tu perfil de fundador» (9 preguntas, arquetipos, lead gate) → `/api/brevo` (lista 2) + `/api/quiz-lead` (Supabase `quiz_leads`).
- `/toolkit`: 15 calculadoras en 5 fases, auth Supabase, reportes PDF.
- Sección del libro *Doble Agente* con mockup real.

### 1.2 Problemas encontrados

| # | Severidad | Hallazgo | Evidencia |
|---|---|---|---|
| P1 | **Crítica (reputación)** | Testimonios ficticios publicados («Carlos M.», «Ana P.», …) | `src/components/PruebaSocialSection.tsx:6-55` |
| P2 | **Crítica (reputación)** | Cifras sin fuente que la ficha interna marca como «No usar»: 155+ ejecutivos, $20M+, 10+ empresas, $1.5M+ | `HeroSection.tsx`, `NosotrosSection.tsx:8-11` |
| P3 | **Crítica (reputación)** | Cargos no validados: «CEO & Co-fundador», «Mentor MIT Professional Education», «Singularity University Fellow» | `NosotrosSection.tsx:18-32` |
| P4 | Alta (SEO) | Sin `robots.txt` (devuelve 404 HTML) ni `sitemap.xml` | curl al sitio vivo |
| P5 | Alta (SEO) | Sin `metadataBase`, canonical, OG image, JSON-LD | `src/app/layout.tsx` |
| P6 | Alta (GEO) | Sin `llms.txt`, sin páginas de respuesta ni glosario; todo el contenido vive en una sola URL | árbol `src/app` |
| P7 | Alta (conversión) | Bootcamp sin landing propia; CTA a WhatsApp; libro a un link suelto de Mercado Pago (`mpago.la/2bTNVGE`) sin entrega automática | `BootcampSection.tsx:161`, `DobleAgenteSection.tsx:64` |
| P8 | Alta (legal) | Sin `/privacidad`, `/terminos`, libro de reclamaciones (obligatorio en Perú) ni consentimiento en formularios | árbol `src/app` |
| P9 | Media | Sin analítica ni Consent Mode | `layout.tsx` |
| P10 | Media | `/api/brevo` y `/api/quiz-lead` sin validación, honeypot ni anti-spam; Brevo y Supabase se llaman por separado desde el cliente | `DiagnosticoSection.tsx:515-530` |
| P11 | Media | Supabase como única persistencia: RL lo abandonó porque un proyecto pausado por inactividad perdió todos los envíos | `RL/lib/lead-notify.ts` |
| P12 | Media (diseño) | 5 familias tipográficas (Spline, Space Grotesk, DM Sans, Cormorant, Barlow) + Courier en subtítulos; jerarquía inconsistente | `layout.tsx`, `globals.css` |
| P13 | Media (diseño) | Navbar con anclas a una sola página; stats que se apilan mal en móvil; secciones sin ritmo claro de contraste | capturas `mobile-00`, `desktop-05` |
| P14 | Baja | `DiagnosticoSection.tsx` de 1.201 líneas mezcla datos, scoring y UI; sin tests | — |
| P15 | Baja | Next 16.2.1 vs 16.3.8 en los hermanos; README de create-next-app | `package.json` |

### 1.3 Estado de la propuesta previa
- El **PRD (mar 2026)** se ejecutó solo en su Fase 1 (one-page). Quedan pendientes: `/bootcamp`, `/libro` con checkout, email de bienvenida, blog/recursos, analítica, `opengraph-image`, `sitemap/robots`, legales.
- El **doc de feb 2026** propone 4 secciones (Home, Bootcamp, Comunidad «Founders Circle», Business Center *done-for-you*). Las dos últimas **no tienen oferta confirmada**; la ficha de oct 2026 solo da como diseñados el Bootcamp (USD 2.995) y el libro (USD 99), y dice que el manuscrito está en edición, sin fecha.
- Decisiones del PRD que **este spec revierte**: testimonios generados con IA (descartado por la ficha: riesgo reputacional); paleta sky-blue/naranja (nunca se aplicó; se mantiene azul/amarillo).

## 2. Objetivo

Relanzar futurefounders.pe como un sitio multipágina, veraz y medible, con los mismos mecanismos que RL/BBS/CC/ED: captura de leads y suscripción con doble opt-in, quiz modular, venta del libro con entrega automática, SEO técnico completo y GEO (ser citado por buscadores de IA), con un sistema visual refinado en Claude Design.

**Métricas de éxito** (medidas en GA4 desde el día 1):
- Leads del quiz / sesiones ≥ 4 %.
- Suscriptores confirmados (doble opt-in) / altas ≥ 60 %.
- Indexación: 100 % de las URLs del sitemap en Search Console a las 4 semanas.
- Core Web Vitals en verde (LCP < 2,5 s móvil, CLS < 0,1, INP < 200 ms).
- Aparición del sitio como fuente en ≥ 3 consultas objetivo en ChatGPT/Perplexity/Google AI a los 60 días.

## 3. Alcance

### Incluido
1. **Saneamiento de veracidad** (bloqueante, va primero).
2. **Sistema visual v2** diseñado en Claude Design y portado a tokens.
3. **Arquitectura multipágina** (§4).
4. **Integraciones**: leads, suscripción, quiz, checkout del libro, analítica, consentimiento, calendario, WhatsApp.
5. **SEO técnico + GEO**.
6. **Legales Perú**.
7. **Tests y verificación** al estilo de los hermanos.

### Excluido (explícito)
- «Founders Circle» y «Business Center» como páginas de venta: sin oferta confirmada. Se deja solo una lista de espera si Eddie lo aprueba.
- Área de miembros / LMS del bootcamp (Thinkific/Circle).
- Versión en inglés (se deja preparada la estructura `alternates`, sin traducir).
- Testimonios, logos de clientes o cifras sin fuente verificable.
- Rediseño del `/toolkit` (solo se le aplican tokens y header comunes).

## 4. Arquitectura de información

```
/                         Home: promesa, problema, método, quiz, libro, bootcamp, autores, FAQ, boletín
/diagnostico              Quiz «Perfil de fundador» (página propia, indexable; resultado noindex)
/bootcamp                 Landing del programa: currícula 8 módulos, cómo funciona, precio, FAQ, postulación
/libro                    Landing Doble Agente: misiones, fases, muestra gratuita (lead), compra
/libro/gracias            Post-compra (noindex), evento purchase
/toolkit                  Existente (15 calculadoras)
/recursos                 Índice de recursos gratuitos y respuestas
/respuestas/[slug]        Páginas de respuesta GEO (p. ej. «¿Cuánto runway necesito para renunciar?»)
/glosario, /glosario/[t]  Términos del método (runway de libertad, activo vs. autoempleo, pricing por valor…)
/autores                  Eddie y Lorenzo, solo con hechos verificados → enlaza @id de ED
/boletin/confirmado       Post doble opt-in (noindex)
/privacidad · /terminos · /reembolsos · /libro-de-reclamaciones
/robots.txt · /sitemap.xml · /llms.txt · /llms-full.txt · /og/[...path] · /organization.json
```

Navegación principal (máx. 5): Diagnóstico · Bootcamp · Libro · Recursos · Autores + CTA «Haz el diagnóstico».

## 5. Sistema visual v2 (Claude Design)

**Proceso:** cada propuesta se diseña primero como **Artifact de tipo Design** (Claude Design) y se aprueba antes de codificar:
1. Design System FF v2 (tokens, tipografía, componentes base) — partiendo de la identidad actual.
2. Home · 3. `/bootcamp` · 4. `/libro` · 5. Quiz (inicio, pregunta, gate, resultado) · 6. Plantilla de respuesta GEO · 7. Imagen OG · 8. Emails (bienvenida, doble opt-in, entrega del libro).

**Dirección propuesta** (a validar en el paso 1):
- **Color:** se conserva azul `#1a27c9` y amarillo `#f7e05f`; fondo oscuro `#050508` como base y **secciones crema** alternadas para ritmo (gramática compartida con RL/BBS). Magenta del libro (`#e6197d` aprox., del mockup) solo en `/libro`. Contraste WCAG AA verificado.
- **Tipografía:** de 5 familias a 2 + mono: Spline Sans (display, 300/400), DM Sans (texto) y una mono para kickers numerados en mayúsculas (sustituye a Courier). Se retiran Space Grotesk, Cormorant y Barlow.
- **Motion:** tokens de BBS (`--ease-out`, `--t-fast/base/enter`, `--stag`); reveal por sección, `prefers-reduced-motion`. Prohibidos (criterio de RL): revelado de títulos por línea, menú que cambia de color, fotos con clip-path.
- **Prueba social honesta:** en vez de testimonios, «lo que encontrarás» (misiones, fases, calculadoras reales), muestra del libro y trayectoria verificada de los autores.

## 6. Integraciones (mismos mecanismos que los hermanos)

| Mecanismo | Implementación | Referencia a portar |
|---|---|---|
| Formularios/leads | Registro `FORMS` único (cliente + servidor), honeypot `website`, `elapsed_ms` < 2.500, consentimiento obligatorio, `Promise.allSettled` → notificación Brevo + fila en Sheets + `upsertContact` Brevo | BBS `lib/forms.ts`, `app/api/lead`, `lib/brevo.ts`, `lib/sheets.ts` |
| Persistencia | Google Sheets (pestaña por formulario) como registro primario; Supabase se mantiene solo para el `/toolkit` (auth + datos de fases) | RL `safeCell()`, BBS `lib/sheets.ts` |
| Boletín | listmonk con doble opt-in → `/boletin/confirmado`; plantillas FF | RL/BBS `lib/listmonk.ts`, `docs/listmonk/*` |
| Atribución | first/last touch UTM + referrers IA (chatgpt.com…) en localStorage, columnas al final de cada fila | RL/BBS `lib/attribution.ts` |
| Quiz | Datos y scoring puros + tests; UI tonta; gate antes del resultado; lead al registro `FORMS` (`perfil-fundador`); percentil vía `/api/diagnostico-stats` (≥ 20 respuestas) | RL MaturityChecker + spec BBS diagnóstico |
| Libro | Checkout Pro Mercado Pago: `/api/checkout` → fila `Pedidos` → `/api/mp/webhook` re-consulta pago, valida monto, idempotente → email con link HMAC → `/api/descarga` desde `private/` | CC `lib/mercadopago.ts`, `lib/fulfillment.ts`, `lib/token.ts` |
| Muestra gratuita | Lead → descarga; flag localStorage para no repetir el formulario | BBS `lib/lead-access.ts` |
| Analítica | GTM/GA4 con Consent Mode v2 (denegado por defecto), banner «Aceptar / Solo necesarias», `track()` a `dataLayer`; Vercel Analytics + Speed Insights | RL `lib/consent.ts`, ED `Medicion.tsx` |
| Conversación | `CalendarButton` (Google Calendar appointments) + helper `wa.me` | RL `lib/constants.ts` |
| Anuncios | Pestaña de campaña (p. ej. próxima cohorte) | RL `lib/announcements.ts` |
| Reclamos | `/api/reclamos` + página | BBS |

**Env vars nuevas:** `BREVO_LIST_LEADS`, `BREVO_LIST_COMPRAS`, `EMAIL_FROM`, `EMAIL_NOTIFY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `LISTMONK_URL`, `LISTMONK_LIST_UUID`, `MP_ACCESS_TOKEN`, `MP_CURRENCY`, `DOWNLOAD_SECRET`, `SITE_URL`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`, `INDEXNOW_KEY`. Se mantienen `BREVO_API_KEY` y las de Supabase.

## 7. SEO y GEO

- `lib/social.ts` (patrón ED: siempre devuelve el `openGraph` completo) + `lib/seo-meta.ts` (mapa por ruta: título ≤ 60, keyword primero; descripción 140–160).
- `metadataBase`, title template, canonical por página, `robots.googleBot.max-image-preview: large`.
- `app/sitemap.ts` con `lastModified` reales a mano; `app/robots.txt/route.ts` con `Content-Signal` y lista de bots IA permitidos, bloqueando solo `/api/`; todo bloqueado en previews de Vercel.
- OG dinámicas `app/og/[...path]/route.tsx` (patrón BBS, < 300 KB).
- **JSON-LD** con grafo `@id` compartido: `Organization` FF con `parentOrganization` → `https://redesignlab.org/#organization` y `founder` → `https://eddieajalcrina.com/#person`; `WebSite`; `Course` (bootcamp, con `Offer`); `Book` (Doble Agente, `author` Eddie + Lorenzo, sin `datePublished` hasta que exista); `FAQPage`; `BreadcrumbList`; `Quiz`/`WebApplication` para el diagnóstico; `DefinedTermSet` para el glosario. Servido también en `/organization.json`.
- **GEO:** `llms.txt` y `llms-full.txt` generados desde los módulos de datos; 6–10 páginas de respuesta con el formato ED (pregunta H1, respuesta de 40–60 palabras con dato y fecha, atribución, tablas, FAQ, fuentes, `actualizado`); glosario con definiciones citables; IndexNow tras cada deploy.
- Enlazar FF desde RL (`subOrganization`) y ED (Person `worksFor`/`founder`) — cambio en esos repos, fuera de este PR.

## 8. Reglas de contenido

- Solo hechos con fuente en la ficha de hechos (`publico`). Lo no verificado no se publica (P1–P3).
- El libro se presenta como «en edición / preventa» hasta que haya fecha; precio y estado de venta los confirma Eddie.
- Copy en español (es-PE), horarios America/Lima. Todo texto nuevo se marca para revisión de Eddie.

## 9. Verificación

- `npx tsc --noEmit`, `npm run lint`, `npm test` (vitest) por tarea.
- `scripts/verify-site.mjs` (patrón RL) contra `next start`: estado 200/308/404 esperado por ruta, canonical, JSON-LD parseable, `robots.txt`, `sitemap.xml`, `llms.txt`.
- Capturas Playwright 390/768/1440 por página contra los diseños aprobados.
- Lighthouse móvil ≥ 90 en Performance, SEO, Accesibilidad y Buenas prácticas.

## 10. Decisiones abiertas para Eddie

1. **Persistencia de leads:** Sheets (estándar de los hermanos, recomendado) o mantener Supabase.
2. **Libro:** ¿se vende ya (USD 99) con entrega automática, o preventa / lista de espera hasta publicar?
3. **Bootcamp:** precio vigente (PRD USD 2.995 vs. doc USD 3.995), formato y fecha de próxima cohorte; ¿postulación con llamada o pago directo?
4. **Autores:** qué cargos y logros de Eddie y Lorenzo son publicables (lista verificada).
5. **Boletín:** ¿lista nueva en listmonk con reconfirmación de los ~1.782 contactos actuales?
6. **Comunidad / Business Center:** ¿lista de espera o fuera por completo?
