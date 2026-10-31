# Pendientes de la web nueva

Lista de lo que falta para pasar de vista previa a la web definitiva. Marca cada punto cuando quede resuelto.

## Bloquean la publicación definitiva

- [ ] **Reseñas reales.** Las 7 reseñas de `src/content/testimonios.ts` son de ejemplo y muestran el rótulo «Testimonio de ejemplo». Reemplazarlas por reseñas con permiso de cada persona y poner `ejemplo: false`.
- [ ] **Enlace de Amazon.** Definir `NEXT_PUBLIC_AMAZON_URL` en el hosting. Sin ella, el botón lleva a la búsqueda del título en Amazon.
- [ ] **Enlace de compra directa.** Elegir la pasarela y definir `NEXT_PUBLIC_CHECKOUT_URL`. Sin ella, el botón abre WhatsApp con el pedido del PDF con workbook.
- [ ] **Enlace de agenda.** Definir `NEXT_PUBLIC_AGENDA_URL` (Calendly, Cal.com u otro). Sin ella, «Agenda 30 minutos» abre WhatsApp. El QR del cierre del libro apunta a esta agenda.
- [ ] **Credenciales.** Confirmar `BREVO_API_KEY` y las variables de Supabase en el hosting (ver `.env.example`).
- [ ] **Correo automático del kit.** Configurar en Brevo el envío del PDF del kit a la lista 2. Hoy el formulario registra a la persona, pero el PDF no sale solo.
- [ ] **Privacidad y términos.** Redactar las dos páginas. Hoy los enlaces del pie abren un correo.

## Validación de contenido (Eddie y Lorenzo)

- [ ] Bio de Eddie: confirmar «La escalera de cuatro niveles del método es su idea» o quitar la frase.
- [ ] Bios de Eddie y Lorenzo: validar el texto completo.
- [ ] Cifras: confirmar si «USD 20M+ facturados» y «10+ empresas construidas» son de los fundadores o de los participantes.
- [ ] Preguntas del diagnóstico de nivel (`/diagnostico`).
- [ ] Formatos de venta: ¿habrá audiolibro? ¿El PDF con workbook se vende solo por compra directa?
- [ ] Titular legal del pie: «© 2026 Future Founders» o Soluciones Regenerativas LLC.
- [ ] URL de Instagram y YouTube para el pie.

## Después del lanzamiento

- [ ] Dominio `futurefounders.pe` apuntando a esta web: los 31 QR del libro van a `/workbook/<id>`.
- [ ] Llevar la cabecera y el pie nuevos al `/toolkit`.
- [ ] Revisar el aviso de lint en `src/app/toolkit/pdfReport.ts`.
