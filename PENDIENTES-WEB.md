# Pendientes de la web nueva

Lista de lo que falta para pasar de vista previa a la web definitiva. Marca cada punto cuando quede resuelto.

## Bloquean la publicación definitiva

- [ ] **Reseñas reales.** Las 7 reseñas de `src/content/testimonios.ts` son de ejemplo y muestran el rótulo «Testimonio de ejemplo». Reemplazarlas por reseñas con permiso de cada persona y poner `ejemplo: false`.
- [ ] **Enlace de Amazon.** Definir `NEXT_PUBLIC_AMAZON_URL` en el hosting. Sin ella, el botón lleva a la búsqueda del título en Amazon.
- [ ] **Enlace de compra directa.** Elegir la pasarela y definir `NEXT_PUBLIC_CHECKOUT_URL`. Sin ella, el botón abre WhatsApp con el pedido del libro en PDF.
- [ ] **Enlace de agenda.** Definir `NEXT_PUBLIC_AGENDA_URL` (Calendly, Cal.com u otro). Sin ella, «Agenda 30 minutos» y `/agenda` abren WhatsApp. El QR del cierre del libro apunta a `futurefounders.pe/agenda`, que redirige a esta agenda.
- [ ] **Credenciales.** Confirmar `BREVO_API_KEY` y las variables de Supabase en el hosting (ver `.env.example`).
- [ ] **Correo del kit y del workbook en Brevo.** El formulario ya entrega el PDF en pantalla; el correo es un respaldo. Crear las dos plantillas de correo con el enlace a `/descargas/doble-agente-kit.pdf` y `/descargas/doble-agente-workbook.pdf` (atributo `archetype`: «Kit Plan de salida» o «Workbook»).
- [x] **PDF del kit.** Copiar `entrega/doble-agente-kit.pdf` (paso N-05 del plan del libro) a `public/descargas/`. Mientras no esté, el formulario del kit entrega el workbook y avisa que el kit está en sus páginas 5 a 13.
- [x] **PDF del workbook R2.** `public/descargas/doble-agente-workbook.pdf` es el de `entrega/` del 31 de octubre. Reemplazarlo por el workbook de la segunda edición cuando salga del build del libro, con el mismo nombre.
- [ ] **Puerta de impresión.** Antes de mandar el libro a imprenta: cada plantilla con «Calculadora en línea» en el workbook tiene su calculadora en `/workbook/<id>` en producción (hoy: K.1, 1.1, 2.1, 5.1, 6.1, 9.1, 10.1, 11.1, 13.1, 14.1, 17.1, 18.1 y 19.1), y `futurefounders.pe/workbook`, `/kit`, `/actualizaciones` y `/agenda` responden.
- [ ] **Privacidad y términos.** Redactar las dos páginas. Hoy los enlaces del pie abren un correo.

## Validación de contenido (Eddie y Lorenzo)

- [ ] Bio de Eddie: confirmar «La escalera de cuatro niveles del método es su idea» o quitar la frase.
- [ ] Bios de Eddie y Lorenzo: validar el texto completo.
- [ ] Cifras: confirmar si «USD 20M+ facturados» y «10+ empresas construidas» son de los fundadores o de los participantes.
- [ ] Preguntas del diagnóstico de nivel (`/diagnostico`).
- [x] Formatos de venta: el PDF del libro se vende por compra directa y el workbook es gratis (decisión R2). Queda abierto si habrá audiolibro.
- [ ] Cifras de la casa: «155+ ejecutivos formados», «10+ empresas», «USD 20M+», «USD 1,5M+» (`sitio.ts`, `STATS`) y «más de 30 ejecutivos» del libro (`/libro`). Confirmarlas con el registro de los autores (WP-02).
- [ ] Titular legal del pie: «© 2026 Future Founders» o Soluciones Regenerativas LLC.
- [ ] URL de Instagram y YouTube para el pie.

## Después del lanzamiento

- [ ] Dominio `futurefounders.pe` apuntando a esta web: los 30 QR del libro y los 31 del workbook van a `/workbook/<id>`; el QR del cierre va a `/agenda`.
- [ ] **Revisión anual de `/actualizaciones` cada enero.** Llenar `vigente` en `src/content/actualizaciones.ts` con el valor del año (UIT, UMA, salario mínimo, UVT, UF y tasa de retención de Chile) y la fecha de `REVISION`.
- [ ] **Datos del toolkit en Supabase (WP-03).** Revisar en el panel que la tabla `toolkit_phases` tenga seguridad por fila y ninguna lectura pública. Si guarda datos de personas, decidir con el abogado cómo avisarles y borrarlos. `quiz-lead` usa las mismas variables, así que no se tocan.
- [ ] **Borrar el toolkit (WP-04).** `/toolkit` redirige a `/workbook` desde la ronda R2. Borrar `src/app/toolkit` y `src/components/toolkit` cuando el redirect lleve un mes sin quejas.
- [ ] **Segunda tanda de calculadoras (WP-05).** 3.1, 7.1, 12.1, 16.1 por país, K.3 por país y A.1 a D.1. Necesitan la revisión de un contador por país y el compromiso de actualizar cada año UF, UMA, salario mínimo y UVT.
- [ ] **Registro mensual en línea (WP-06).** Con historial y hoja de cálculo descargable. Hoy cada calculadora descarga un CSV.
- [ ] **Correo por país con la regla de la K.3 (WP-07).** Plantillas en Brevo con el atributo `country`.
- [ ] **«El método en 21 ideas» en `/libro#metodo` (WP-08).** El texto sale de «La idea» de cada capítulo.

## Cómo se mantiene el workbook en la web

- `src/content/workbook.ts` se genera con `npm run workbook -- <carpeta de maqueta-v3>` (o `MAQUETA_DIR=… npm run workbook`). No se edita a mano.
- Las calculadoras, los niveles R2 y los «trae» que la maqueta todavía no tiene están en `scripts/r2-overlay.json`. Cuando `wb.json` trae `ej`, la cifra del libro reemplaza a la del overlay y el script lo avisa.
- `npm test` carga el ejemplo del libro en cada calculadora y compara cada resultado con la cifra impresa. Si el manuscrito cambia una cifra, la prueba falla antes de publicar.
