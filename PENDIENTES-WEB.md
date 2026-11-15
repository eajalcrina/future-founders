# Pendientes de la web nueva

Lista de lo que falta para pasar de vista previa a la web definitiva. Marca cada punto cuando quede resuelto.

## Bloquean la publicación definitiva

- [ ] **Reseñas reales.** La sección de reseñas no se muestra (decisión del 15/11/2026): no se publican reseñas de ejemplo. El componente (`src/components/site/Testimonials.tsx`) y los datos (`src/content/testimonios.ts`) quedan listos para activarla. Pasos en «Cómo activar las reseñas», al final de este archivo.
- [ ] **Enlace de Amazon.** El botón «Comprar en» con el logotipo de Amazon ya está (16/11/2026). Falta definir `NEXT_PUBLIC_AMAZON_URL` en el hosting con la ficha del libro. Sin ella, el botón lleva a la búsqueda del título en Amazon.
- [ ] **Logotipo de Amazon: normas de uso.** Es el logotipo oficial (archivo de Wikimedia Commons) a una tinta. Confirmar con las normas de marca de Amazon para autores; si piden la insignia oficial «Disponible en Amazon», cambiar los trazados en `src/content/logos-terceros.ts`.
- [ ] **Enlace de Mercado Pago.** El botón «Pagar con» con el isotipo de Mercado Pago y el texto de medios de pago ya están (16/11/2026). Falta crear el enlace de pago en Mercado Pago y definir `NEXT_PUBLIC_CHECKOUT_URL`. Sin ella, el botón abre WhatsApp con el pedido del libro en PDF y /libro#formatos avisa que la compra se coordina por WhatsApp.
- [ ] **Logotipo de Mercado Pago: versión oficial.** Hoy va el isotipo oficial a una tinta (de Simple Icons) con el nombre en texto. Al abrir la cuenta, descargar el kit de marca de Mercado Pago y, si publica una versión horizontal a una tinta, reemplazar los trazados en `src/content/logos-terceros.ts`.
- [ ] **Enlace de agenda.** Crear la página de citas de Google Calendar («Agenda 30 minutos») y definir `NEXT_PUBLIC_AGENDA_URL`. Sin ella, «Agenda 30 minutos» y `/agenda` abren WhatsApp. El QR del cierre del libro apunta a `futurefounders.pe/agenda`, que redirige a esta agenda.
- [ ] **Publicar el Apps Script y poner las dos variables en Vercel.** Los formularios (kit, workbook, diagnóstico, programas y el cierre de cada página) van a `/api/registro`, que reenvía al Apps Script de `apps-script/`. Pasos en `apps-script/README.md`: pegar el script en la hoja, ejecutar `configurar()`, publicarlo como aplicación web y poner `APPS_SCRIPT_URL` y `APPS_SCRIPT_SECRET` en Vercel. Sin ellas, los formularios ofrecen WhatsApp y los de descarga entregan el PDF en pantalla igual.
- [x] **PDF del kit.** Copiar `entrega/doble-agente-kit.pdf` (paso N-05 del plan del libro) a `public/descargas/`. Mientras no esté, el formulario del kit entrega el workbook y avisa que el kit está en sus páginas 5 a 13.
- [x] **PDF del workbook R2.** `public/descargas/doble-agente-workbook.pdf` es el de `entrega/` del 31 de octubre. Reemplazarlo por el workbook de la segunda edición cuando salga del build del libro, con el mismo nombre.
- [ ] **Puerta de impresión.** Antes de mandar el libro a imprenta: cada plantilla con «Calculadora en línea» en el workbook tiene su calculadora en `/workbook/<id>` en producción (hoy: K.1, 1.1, 2.1, 5.1, 6.1, 9.1, 10.1, 11.1, 13.1, 14.1, 17.1, 18.1 y 19.1), y `futurefounders.pe/workbook`, `/kit`, `/actualizaciones` y `/agenda` responden.
- [x] **Privacidad y términos.** /privacidad y /terminos publicadas en la rama (16/11/2026), enlazadas en el pie y bajo cada formulario. Texto en `src/content/legal.ts`.
- [ ] **Privacidad y términos: texto base, pendiente de revisión legal.** Que un abogado revise las dos páginas. Preguntas abiertas para el dueño: plazo de conservación de los datos, ley aplicable y jurisdicción, y política de devolución del PDF. Confirmar que el hosting no tiene activada analítica propia (la página dice que no hay cookies de publicidad ni de seguimiento; en el repo no hay analítica).

## Rediseño R4 y R5: decisiones de diseño

- [x] **Cuerpo de texto.** Cerrado el 16/11/2026: tamaño óptico automático, interlineado de 1,55 en pantalla y párrafos separados por espacio, sin sangría (motivo en `docs/reglas-diseno.md`, sección 7).
- [x] **Botones.** Cerrado el 16/11/2026: texto normal de 19 px en negrita, sin mayúsculas pequeñas ni flecha.
- [ ] **Propuesta de titular del inicio (no aplicada).** Se mantiene el texto del dueño, «Tu experiencia puede trabajar para más de una empresa. O para la tuya.». Propuesta para evaluar, sin fragmento suelto ni punto final: «Tu experiencia puede trabajar para más de una empresa, incluida la tuya».
- [x] **Logos para perfiles (fila 33).** Regenerados en `#F6F6F4` el 16/11/2026 (`logos/out`, el zip y las vistas en círculo). Los nombres de archivo con «blanco» no cambian.
- [x] **Meta en las calculadoras.** La meta de la 1.1 va con filete lateral magenta y cifra en magenta de texto, marcada con `"meta": true` en `scripts/r2-overlay.json` (16/11/2026).
- [x] **Titular de /kit.** «Calcula cuántos meses aguantas sin sueldo», también en metadatos e imagen para compartir (16/11/2026).

- [ ] **Encabezado fijo en un iPhone con muesca.** El área segura (`env(safe-area-inset-top)`) está en el código, pero el emulador no la simula: probarlo en un teléfono real al publicar la vista previa.

## Validación de contenido (Eddie y Lorenzo)

- [x] Bio de Eddie: la frase «La escalera de cuatro niveles del método es su idea» salió (no está en eddieajalcrina.com).
- [ ] Bios de Eddie y Lorenzo: validar el texto nuevo (16/11/2026), escrito solo con datos de eddieajalcrina.com y lorenzoortiz.co. Salieron «Mentor de MIT» (la fuente dice «Docente»), «Singularity University Fellow», «vendió su primer activo» y «arquitecto de sistemas empresariales», que no están en las fuentes.
- [ ] **Página de LinkedIn de la empresa.** El pie ya no enlaza el perfil personal de Eddie con el rótulo «LinkedIn». Si Future Founders abre una página de empresa, sumarla a la columna Contacto y a `sameAs` en `layout.tsx`.
- [x] Cifras: son de Future Founders, suma de fundadores y participantes (decisión del dueño, 16/11/2026), con su nota bajo las cifras.
- [ ] Diagnóstico de nivel: validar con Eddie y Lorenzo las cuatro preguntas nuevas y la regla de nivel (`src/lib/diagnostico.ts`).
- [x] Formatos de venta: el PDF del libro se paga con Mercado Pago y el workbook es gratis. Queda abierto si habrá audiolibro.
- [ ] «Más de 30 ejecutivos» del libro (`/libro`): confirmarlo con el registro de los autores (WP-02).
- [x] Titular legal del pie: «© 2026 Future Founders | Soluciones Regenerativas LLC» (16/11/2026).
- [x] Instagram en el pie (`https://www.instagram.com/futurefounders.pe/`). Sin YouTube (16/11/2026).

## Después del lanzamiento

- [ ] Dominio `futurefounders.pe` apuntando a esta web: los 30 QR del libro y los 31 del workbook van a `/workbook/<id>`; el QR del cierre va a `/agenda`.
- [ ] **Revisión anual de `/actualizaciones` cada enero.** Llenar `vigente` en `src/content/actualizaciones.ts` con el valor del año (UIT, UMA, salario mínimo, UVT, UF y tasa de retención de Chile) y la fecha de `REVISION`.
- [ ] **Datos que quedaron en Supabase (WP-03).** La web ya no usa Supabase. Revisar en el panel las tablas `quiz_leads`, `toolkit_users` y `toolkit_phases`: si guardan datos de personas, decidir con el abogado cómo avisarles y borrarlos, y después cerrar el proyecto y la lista de Brevo.
- [ ] **Borrar el toolkit (WP-04).** `/toolkit` redirige a `/workbook` desde la ronda R2. Borrar `src/app/toolkit` y `src/components/toolkit` cuando el redirect lleve un mes sin quejas.
- [ ] **Segunda tanda de calculadoras (WP-05).** 3.1, 7.1, 12.1, 16.1 por país, K.3 por país y A.1 a D.1. Necesitan la revisión de un contador por país y el compromiso de actualizar cada año UF, UMA, salario mínimo y UVT.
- [ ] **Registro mensual en línea (WP-06).** Con historial y hoja de cálculo descargable. Hoy cada calculadora descarga un CSV.
- [ ] **Correo por país con la regla de la K.3 (WP-07).** La hoja de registros ya guarda el país; falta elegir con qué herramienta se envían los correos.
- [x] **«El método en 21 ideas» en `/libro#metodo` (WP-08).** Hecho el 16/11/2026: `src/content/ideas.ts` se genera con `npm run workbook` desde «La idea» de cada capítulo (primer párrafo). Reemplaza al índice; `/libro#indice` sigue llegando.

## Cómo se mantiene el workbook en la web

- `src/content/workbook.ts` se genera con `npm run workbook -- <carpeta de maqueta-v3>` (o `MAQUETA_DIR=… npm run workbook`). No se edita a mano.
- Las calculadoras, los niveles R2 y los «trae» que la maqueta todavía no tiene están en `scripts/r2-overlay.json`. Cuando `wb.json` trae `ej`, la cifra del libro reemplaza a la del overlay y el script lo avisa. Si el libro anota la cifra («7,0 y 4,9», «25 % (solo México)»), el ejemplo de la calculadora es la primera cifra y el texto completo queda en `ejLibro`. Los nombres de campo del overlay tienen que ser los de `wb.json`.
- `npm test` carga el ejemplo del libro en cada calculadora y compara cada resultado con la cifra impresa. Si el manuscrito cambia una cifra, la prueba falla antes de publicar.

## Cómo activar las reseñas

1. Pedir a cada persona permiso escrito para publicar su reseña, con su nombre, cargo y ciudad. Guardar el permiso.
2. En `src/content/testimonios.ts`, agregar cada reseña al arreglo `TESTIMONIOS` con `ejemplo: false` y la fecha del permiso en `permiso` (por ejemplo `"2026-12-03"`). Una reseña sin `permiso` o con `ejemplo: true` no se muestra.
3. La cita va en palabras de la persona, corta, sin cifras de ingresos ni promesas. `EJEMPLOS_DE_FORMATO`, en el mismo archivo, sirve de guía de largo y tono: son textos inventados y no se copian a `TESTIMONIOS`.
4. Con la primera reseña la sección aparece sola en la portada, entre «Nosotros» y el cierre, sobre papel cálido. Mientras todas quepan en pantalla (una a tres en escritorio, una en celular) se ven como tarjetas fijas, sin botones; con más aparece el carrusel, que no rota solo: el botón de reproducir lo activa. El código del carrusel se descarga solo cuando hay reseñas (`ResenasDiferidas.tsx`).
5. Correr `npm run lint`, `npm run build` y revisar la portada a 1440 y 390 px antes de publicar.
