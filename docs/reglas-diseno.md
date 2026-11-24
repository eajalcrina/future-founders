# Reglas de diseño de futurefounders.pe

Estado: **en curso** (24/11/2026, ronda R7 y sitio bilingüe, etapas 1 y 2 de 2, sin publicar). Camino visual: el sistema de «Doble Agente», ronda R3. Referencia: el propio libro (PDF final de la R3).

Público: ejecutivos de 38 a 55 años en Latinoamérica (gerentes, directores y VP). Tono: editorial, sobrio, con datos concretos; tuteo. Español e inglés (sección 11); el español es la versión que manda.

Fuente del sistema: `DESIGN-SYSTEM.md` y `tokens.css` de la R3 (carpeta `sistema-diseno` del proyecto del libro). Los tokens viven en `src/app/globals.css`.

## 1. Color
- Papel `#F6F6F4` (fondo general; es el único blanco de la paleta, también en el logotipo, el favicon y las imágenes para compartir). Papel cálido `#E6E4E0` (recuadros Lectura, bandas, pie).
- Tinta `#0C0C0D` (texto, filetes, rótulos de sección y superficies oscuras, con texto en papel encima). Tinta media `#3D3D42` (secundario). Tinta suave `#5E5E66` (rótulos grises, notas, filetes entre filas). Tinta 10 % y 20 % solo para rellenos, filetes y casillas.
- Magenta `#E6007E` solo en: botón principal, cuadrado de marca, meta y nivel elegido. Magenta de texto `#C8006D` solo para la cifra o el rótulo de la meta y el paso del cursor del botón principal.
- Salvia `#E3EAE8` y salvia profundo `#2F5653` solo para la voz de los arquetipos (fichas, casos, ejemplos).
- El magenta claro `#FF5FB0` salió de la paleta; `--color-magl` queda como alias de tinta 20 % y ningún componente lo usa.
- Errores y avisos en tinta con el icono «error» (componente `Aviso`), nunca en magenta.
- Bandas oscuras por página: como máximo dos (bloque del libro y cierre), más el encabezado y el pie. Sin degradados, sin texturas de grano ni semitono, sin marcas de agua y sin sombras grandes.

## 2. Tipografía
- Titulares: Archivo condensada. Texto corrido: Source Serif 4. Rótulos, cabeceras de tabla y fórmulas: JetBrains Mono en mayúsculas. Caveat solo para cifras manuscritas de ejemplos resueltos.
- Titular del héroe de cada página (`.wh`, componente `Hero`): mayúsculas condensadas, Archivo 800 al 72 %, como la portada y las aperturas del libro. Es el único lugar con mayúsculas condensadas.
- Titulares de sección (`.wh2`, componente `SecHead`): minúsculas, Archivo 750 al 80 %, −0,015em, como las aperturas de sección del libro. Dicen la conclusión, no el tema.
- Titular de figura y de tarjeta (`.ws`, 650 al 84 %), subtítulo (`.wh3`), cifras grandes y códigos (`.num`, 800 al 70 %).
- Cifras tabulares y alineadas fuera del texto corrido (por defecto en `body`); en el texto en serif, de estilo antiguo y proporcionales.
- Siglas (USD, CVM, EPS, CTS, AFP) con `Sc`: versalita verdadera en serif y mayúscula reducida en Archivo y mono. Espacio duro tras la moneda.
- Escala con nombre (sin tamaños sueltos): `text-rotulo` 11/12, `text-recuadro` 14/16, `text-cuerpo` 17/19, `text-h3` 19/21, `text-entradilla` 19/22, `text-figura` 24/27, `text-h2` 28/31, `text-kpi` 34/38, `text-display-md` 40/64, `text-display-lg` 44/72, `text-display-xl` 48/96, `text-cifra` 64/120 (la cifra de la calculadora de runway) y `text-portada` 64/136 (el título del libro). Botones: `--fs-boton` 19 en negrita y `--fs-boton2` 18.
- La única excepción documentada: la figura de la escalera escala sus rótulos con el ancho de la figura (`cqw`), como un SVG.

## 3. Retícula y ritmo
- Contenedor `.wrap` de 1.440 px, márgenes de 20 px en celular y 64 px desde 64rem, un solo eje izquierdo. Secciones a 88 a 96 px en escritorio y 48 a 56 px en celular.
- Celular de revisión: 390 px (barrido en 360 y 390).

## 4. Componentes
- Botones rectos y sin flecha. El principal en magenta con papel a 19 px en negrita (4,16:1, válido como texto grande), uno por vista además del encabezado. El secundario de línea de 1,5 px. En tarjetas repetidas (programas) la acción va como secundario; el principal queda para el formulario.
- Enlaces de texto con subrayado y la flecha «remisión» (trazo 1,5) que avanza al pasar el cursor (`LinkArrow`).
- Rótulos de sección en tinta (`Mono`, tono `ink`); grises en tinta media; sobre tinta, en papel o tinta 20 %; sobre salvia, en salvia profundo.
- Rayas laterales gruesas reemplazadas por un filete superior fino (`.filete-sup`, 0,75 px). Solo la meta puede llevar raya lateral.
- Ficha de arquetipo como el libro: salvia, nombre en 750 al 80 %, indicador de nivel, primera fila con filete en salvia profundo y las demás en tinta 20 %, «Runway» y «Nivel de partida» en negrita, voz del arquetipo en tinta media con filete superior.
- Tablas como el libro (`.tabla`): cabecera mono 500 en tinta suave con filete de 1 px arriba y abajo, filas de 0,5 px en tinta suave, última fila y fila de resultado con 1 px en tinta, columnas numéricas a la derecha.
- Recuadro Lectura siempre en papel cálido; Nota y Fuente con filete superior fino, icono de 16 px y texto en tinta suave.
- Calculadoras: campos numéricos a la derecha; letra de fila en cuadrado de tinta; mínimo de 6 meses con línea discontinua de 1 px en tinta (en papel donde cruza la barra llena); la cifra de runway en `text-cifra` y las salidas en `text-kpi`.
- Foco visible de 3 px en tinta sobre papel y en papel sobre tinta. Iconos de 14 a 18 px.
- Encabezado fijo (`.cab` en `Navbar.tsx`): `position: sticky`, fondo papel opaco, alto fijo `--header-h` (56 px en celular, 72 en escritorio) más `env(safe-area-inset-top)` (`viewportFit: "cover"` en `src/app/raiz.tsx`). Arriba de la página el filete inferior es transparente; al desplazarse aparece en tinta de 1 px en 150 ms (un centinela con `IntersectionObserver` pone `data-scrolled`). Sin sombra y sin animar el alto. Las anclas no quedan tapadas: `scroll-padding-top` en `html` (encabezado + área segura + 16 px); no se usan clases `scroll-mt-*`. Los bloques fijos de `/workbook/[id]` van a `--header-h` + 24 px. La regla de lectura de /libro corre por el borde inferior del encabezado. El menú de celular se desplaza solo si no cabe.
- Botones de compra con logotipo (`.btn-marca`, `BookButtons.tsx`): papel, filete de 1,5 px en tinta, texto corto y el logotipo de la tienda a una tinta (`currentColor`); al pasar el cursor se invierten. Sobre tinta, papel sólido. Nunca en magenta. «Comprar en» + logotipo de Amazon; «Pagar con» + isotipo de Mercado Pago + «Mercado Pago», con el isotipo y el nombre juntos a 7 px y el mismo peso (600) que «Pagar con». Pesan igual y Amazon va primero. Sin `NEXT_PUBLIC_CHECKOUT_URL`, el botón del PDF dice lo que hace, «Pedir el PDF por WhatsApp», sin isotipo (R5b). Los trazados viven en `src/content/logos-terceros.ts`, con su fuente.
- «Agenda 30 minutos» siempre con el icono de calendario y el mismo nombre (`AgendaLink` en `ui.tsx`), como enlace subrayado o botón de línea. Abre la página de citas de Google Calendar o, sin ella, WhatsApp. Como enlace se apoya en la línea base del texto (el icono va centrado aparte) y lleva tinta, nunca el gris de la frase. Un «o escríbenos por WhatsApp» al lado solo aparece cuando hay agenda propia (`HAY_AGENDA`), para no ofrecer dos enlaces al mismo WhatsApp.
- Meta de las calculadoras: la fila marcada con `"meta": true` en `scripts/r2-overlay.json` lleva filete lateral de 2 px en magenta y rótulo y cifra en magenta de texto, solo sobre papel (clase `.calc-meta`). Hoy es la meta de runway de la 1.1. Los mínimos y las cuentas derivadas no se marcan.
- Calculadoras: una salida sin valor se pinta como cero atenuado en tinta suave («0,0 meses», «0 %»), o vacía en los formatos sin cero; nunca con raya (`VACIO` y `formatVacio` en `src/lib/calc.ts`).
- Diagnóstico de nivel: un solo paso por resultado. Con colchón de menos de 6 meses o sin calcular, el botón es «Abrir la K.1» y la plantilla del nivel queda como enlace en «Tu siguiente paso».
- /programas: los programas seguidos del mismo nivel comparten una casilla de nivel (taller y Primer Mandato).
- /libro#metodo: apertura y cierre usan las columnas de los capítulos (código, título y segunda columna). Sin leyenda de niveles: cada parte dice sus niveles y lleva su indicador. En celular solo la Parte 01 llega abierta; las demás se abren con «Ver las N ideas» (`ParteMetodo.tsx`).
- /libro#formatos: dos tarjetas, «Ebook e impreso» (Amazon) y «Libro en PDF». Sin `NEXT_PUBLIC_CHECKOUT_URL`, el rótulo de la tarjeta del PDF es «PDF» (no «WhatsApp»), para no nombrar dos canales en el bloque. Si Amazon da enlaces distintos para cada formato, se vuelven a separar.
- En /kit, el botón del encabezado baja a `#formulario`.
- Páginas legales: el subtítulo de cada bloque va fuera de `.wt` (Archivo, como en el resto del sitio); solo los párrafos van en serif.
- Nosotros (R6, ajustado en R6b): las dos fichas comparten filas con subgrid (cargo, nombre, bloque de credencial y bio, y enlaces); la credencial va pegada a la bio para que la ficha sin credencial no deje hueco. En /libro la credencial va en seminegrita, como en la portada, y los enlaces de las webs y LinkedIn miden 24 px de alto como mínimo (tamaño de destino WCAG 2.2).
- Accesibilidad (R6): los botones y enlaces repetidos llevan contexto para lectores de pantalla («Postular: Primer Mandato», «Ver la parte 01, Diagnóstico»); en `/workbook/k1` el titular de la figura de la calculadora es h2 (sigue al h1); en /kit, h3 bajo el h2 de la sección.
- /programas#postular va sobre papel con filete superior: dos bloques contiguos con funciones distintas no comparten fondo, y el pie es papel cálido.
- Línea de privacidad única bajo los cuatro formularios (`PrivacidadLinea`, texto en `comun.privacidad` de los diccionarios), con el enlace a /privacidad.
- Acordeón «Detalle» (`Detalle` en `ui.tsx`, R7): `details` y `summary` nativos, rótulo «Detalle» subrayado con el signo + que gira 45° al abrir, 44 px de alto como mínimo y el foco del sistema. Guarda un texto secundario útil que estorbaría entre un titular y su contenido (sección 6 ter). Hoy: la calculadora de cada plantilla del workbook.

## 5. Imágenes y diagramas
- Retratos de Eddie y Lorenzo (R6): recortados sobre fondo sólido papel cálido `#E6E4E0`, el mismo del marco (`bg-warm`, filete de 1 px en tinta). El tamaño de las cabezas se iguala en el archivo, no con CSS: las dos a la misma escala y con el pelo al 12 % del alto, para que el parallax no corte la cabeza. Sin `zoom` en `Parallax`. Desde la R6b los retratos van quietos (`Parallax` con `quieto`, sin recorrido ni margen extra), para que el pelo no toque el filete del marco; el parallax sigue en la ilustración del inicio. El de Eddie se rehízo con borde suave y el suéter más oscuro (`web-r6/retrato/rehacer_eddie.py`, misma escala y encuadre). En celular el retrato mide 180 px de ancho (proporción 240/296), no el ancho de la pantalla, porque la foto de origen tiene 600 px.
- Fotos reales de Eddie y Lorenzo en duotono, ilustraciones propias del libro (ajedrez, puerta) y páginas reales del libro. Sin fotos de stock y sin pies de foto visibles (la descripción va en el texto alternativo).
- El cuadrado magenta sobre la ilustración del inicio se mantiene (cuadrado de marca).
- Escalera (marco 0.1) con los colores por token, el nivel elegido marcado en magenta y la ruta discontinua en tinta.
- Imágenes para compartir (`src/lib/og.tsx`): papel, logotipo real, rótulo en tinta, titular en mayúsculas condensadas sin punto final. Hay imagen para inicio, libro, kit, diagnóstico, programas, workbook y valores del año.

## 6. Nombres y estilo
- Compra: «Ebook e impreso en Amazon, PDF con Mercado Pago». El texto de medios de pago («tarjeta de crédito, débito o saldo en cuenta») va una sola vez, en /libro#formatos. No se dice «compra directa».
- Cifras de la casa: son de Future Founders y suman la trayectoria de sus fundadores y la de los participantes de sus programas (nota `sitio.cifrasNota` bajo las cifras, sin repetir el rótulo «Future Founders en cifras», que van justo después del héroe de la portada).
- Bios de Eddie y Lorenzo: cargos «CEO y cofundador» y «COO y cofundador» (web anterior de Future Founders); el resto, solo con datos de eddieajalcrina.com y lorenzoortiz.co (comentario de fuente sobre `FOUNDERS`). Las bios completas viven una vez, en la portada (`/#nosotros`); /libro lleva la versión corta.
- Nombres oficiales: Future Founders; Doble Agente; Kit «Plan de salida» (kit «Plan de salida» dentro de una oración); workbook; Diagnóstico de nivel; taller «Tu primer rol parcial», Primer Mandato, Portafolio, Sesiones individuales, Coconstrucción; niveles Salario, Primer rol parcial, Portafolio, Independencia.
- Cifras: «USD 9.500», «25 %», punto de miles y coma decimal. Cifras de la casa que se mantienen: «155+ ejecutivos formados», «10+ empresas», «USD 26M+ facturados», «USD 2,7M+ capital levantado» (R5c).
- Los pares que se pueden buscar están en `docs/terminos.txt`. Los cambios solo de mayúsculas (Doble Agente, Primer Mandato, Diagnóstico de nivel) se revisan a mano, porque los scripts comparan sin distinguir mayúsculas.
- Textos: tuteo, sin «·», sin exclamaciones, sin lenguaje de espías, sin punto final en titulares, botones ni rótulos. No se tocan cifras del libro. Las páginas legales describen lo que la web hace (texto base, pendiente de revisión legal).

## 7. Decisiones del dueño
- Congeladas el 15/11/2026:
  - Paleta de la sección 1, aplicada también a logotipo, favicon, ícono de Apple e imágenes para compartir (el blanco del logotipo pasa a `#F6F6F4`).
  - Tipografía de la sección 2. Titulares como el libro: mayúsculas condensadas solo en el héroe; secciones en minúsculas semi-negrita condensada.
  - Rótulos de sección en tinta. Rayas laterales gruesas a filete superior fino; solo la meta lleva raya lateral. Ficha de arquetipo y tablas como el libro. Calculadora: mínimo de 6 meses en línea discontinua de tinta y la cifra grande más grande.
  - Foco visible en tinta y papel. Botones sin flecha.
  - Animaciones: el contador de cifras y el parallax se quedan, sutiles y quietos con `prefers-reduced-motion`. Entradas editoriales: un fundido de 8 px, una sola vez; el revelado por líneas solo en el titular del héroe.
  - Reseñas ocultas (15/11/2026). Nada de reseñas de ejemplo visibles: `TESTIMONIOS` está vacío y los textos inventados viven aparte en `EJEMPLOS_DE_FORMATO`, que ninguna página usa. La sección aparece sola cuando `src/content/testimonios.ts` tenga reseñas reales con `ejemplo: false` y fecha de permiso escrito en `permiso`; el componente también filtra y no pinta nada si no hay. Con pocas reseñas van como tarjetas fijas; el carrusel no rota solo y se carga diferido. Pasos en `PENDIENTES-WEB.md`.
  - ~~Solo español~~ (15/11/2026). Reemplazada el 24/11/2026: sitio en español e inglés, con el español en las URL de siempre y el inglés bajo /en (sección 11). Fotos reales e ilustraciones propias. Bordes rectos, sin degradados ni sombras grandes. /toolkit queda fuera y redirige a /workbook.
- Decisiones del dueño del 16/11/2026 (ronda R5):
  1. Privacidad y términos en /privacidad y /terminos. Responsable: Future Founders, una marca de Soluciones Regenerativas LLC (Estados Unidos). Describen los formularios, la hoja de Google, el correo de confirmación, la baja con «baja», las calculadoras en el navegador y la ausencia de cookies de publicidad. Enlazadas en el pie y bajo cada formulario.
  2. Pie: «© 2026 Future Founders | Soluciones Regenerativas LLC» (la barra es el filete vertical del sistema). Instagram `futurefounders.pe`. Sin YouTube.
  3. Amazon: botón con el logotipo oficial a una tinta; `NEXT_PUBLIC_AMAZON_URL` con respaldo a la búsqueda del título.
  4. PDF con Mercado Pago: botón con el isotipo oficial a una tinta; `NEXT_PUBLIC_CHECKOUT_URL` con respaldo a WhatsApp; texto de medios de pago.
  5. Agenda: página de citas de Google Calendar; `NEXT_PUBLIC_AGENDA_URL` y /agenda con respaldo a WhatsApp; «Agenda 30 minutos» con icono de calendario.
  6. Bios desde eddieajalcrina.com y lorenzoortiz.co, solo con hechos de esas webs, con la fuente en un comentario.
  7. Cifras de la casa: de Future Founders (fundadores y participantes), con su nota.
  8. Diagnóstico de nivel: cuatro preguntas, una por señal del libro (situación, comprobante, cobertura de tres meses y 1,2 veces, colchón); sin comprobante se salta la de cobertura. Resultado con plantilla, capítulo y un solo botón. El registro sigue igual (`nivel` «N: Nombre», `situacion`, `cobertura`, `colchon`).
  9. Decisiones de diseño abiertas, elegidas por el asesor (tabla de abajo).
  10. Reseñas ocultas y guardadas para reseñas reales con permiso (ver arriba).
  11. Encabezado fijo con fondo y filete al desplazarse, con área segura y sin tapar anclas (sección 4).
  12. «El método en 21 ideas» en /libro#metodo (reemplaza al índice; `#indice` sigue llegando), meta en magenta en las calculadoras y logos de perfil en `#F6F6F4`.
  13. Pasada general: un solo propósito por sección, titulares que dicen la conclusión y cada mensaje dicho una vez (tabla de la sección 6 bis).
- Decisiones de diseño abiertas, cerradas el 16/11/2026:

| Tema | Elección | Motivo |
|---|---|---|
| Botones | Texto normal de 19 px en negrita, rectos, sin flecha, 56 a 60 px. Sin mayúsculas pequeñas | Papel sobre magenta da 4,16:1 y solo vale como texto grande; en mayúsculas pequeñas la letra baja de ese umbral. Las mayúsculas ya tienen dos voces (héroe y rótulos mono) |
| Cuerpo de texto | Tamaño óptico automático, interlineado 1,55 en `.wt`, párrafos separados por 0,75 em sin sangría, medida máxima de 720 px | En pantalla, a 17 y 19 px y con líneas de 70 caracteres, 1,40 se cierra; la sangría es convención de papel. La entradilla (`.lead`) queda en 1,44 |
| Meta en magenta | Sí, con marca en el dato del generador | Es uno de los usos del magenta en el libro |
| Titular de /kit | «Calcula cuántos meses aguantas sin sueldo» | Dice el resultado, sirve a quien tiene empleo y a quien ya salió y deja atrás la pregunta que apelaba al miedo. Mismo cambio en metadatos e imagen para compartir |
| Logos de perfil | Papel `#F6F6F4` | Un solo blanco en la paleta |
| Titular del inicio | Se queda el del dueño, con su punto | Regla ya escrita |
- Titular del héroe del inicio: «Tu experiencia puede trabajar para más de una empresa. O para la tuya.» Es texto del dueño y se respeta tal cual, con su punto (excepción a la regla de titulares sin punto final; la imagen para compartir lo muestra sin el punto final).

## 6 bis. Dónde se dice cada cosa (consolidación R5)
- «Subes de nivel cuando aparece una señal»: titular del Método de la portada. /programas lo cambia por lo que ofrece cada programa.
- Fechas, cupos y condiciones por convocatoria: solo en `/programas#postular` y en el mensaje de éxito.
- Los cuatro ejecutivos de Lima, Bogotá, Ciudad de México y Santiago y la lista «Qué aprendes»: solo en /libro.
- Bios completas: portada. /libro: retrato, cargo, credencial y enlace a `/#nosotros`.
- «Diecisiete de los 21 capítulos preparan tu primer cliente»: titular de la figura de la escalera. La Lectura de los niveles pasa a /libro, bajo las 21 ideas.
- «Cinco plantillas, unas 2 horas»: rótulo bajo los botones del inicio y cifras del héroe de /kit.
- «El workbook es gratis»: rótulo del héroe de /libro y rótulo de la sección Workbook.
- «Se llena en una tableta, en la computadora o en papel»: formulario de descarga del workbook y «Dónde se llena» de cada plantilla.
- «No es asesoría legal, tributaria ni financiera»: pie de todas las páginas y /terminos. La negación «no promete ingresos ni plazos» queda solo en el pie: las notas de /libro#formatos y /programas dicen solo lo que sí hace cada uno (R6b). /actualizaciones cierra con «Las reglas cambian… valida tu caso con un especialista», sin repetir el descargo.
- /actualizaciones: la columna «Valor vigente» aparece solo cuando alguna cifra tiene `vigente`; mientras tanto, la entradilla lo dice una vez (R6b).
- /workbook/[id]: el recuadro «trae» no se pinta cuando solo nombra plantillas que ya están en «Necesitas antes» (R6b), ni cuando cada parte suya ya está en «Necesitas antes» o en una introducción que enumera materiales («Necesitas…», «Usa…», «Ten a la mano…», «Busca…»); «Antes de empezar» no se pinta cuando solo nombra plantillas de «Necesitas antes» (R7, `soloPlantillas` y `cubierto` en la página; `workbook.ts` no se toca). Hoy el recuadro queda en la K.1, la K.3 y la K.5. «Siguiente plantilla» mide 24 px de alto.
- Portada, Programas: en celular el dato (duración, formato) va debajo del nombre del programa.
- Arquetipos armados a partir de conversaciones reales: nota de la portada; /libro conserva el dato de los más de 30 ejecutivos.
- Programas de cada nivel (R6): una vez en la portada, en la sección Programas, y en detalle en /programas. El panel de la escalera ya no repite «Te acompaña»; dice la señal, los capítulos y qué arquetipo empieza ahí. El resultado del Diagnóstico sí la conserva, porque ahí es la respuesta.
- «Cómo se ve» bajo la escalera: un solo rótulo para la fila («Cómo se ve cada nivel»), no uno por columna.
- «Señal para pasar al siguiente» (nivel 3: «Para sostener el nivel 3»): mismo rótulo en la escalera y en el Diagnóstico.
- Cierre de la portada: habla de la K.1 (el envío del kit lo dice el formulario de al lado, R7); «cinco plantillas, unas 2 horas» queda en el rótulo del héroe. Los dos cierres por correo usan el botón «Recibir el kit».
- Programas: rótulo = tipo, titular = nombre oficial (Taller / Tu primer rol parcial, Programa / Primer Mandato, Mastermind / Portafolio, Acompañamiento / Sesiones individuales de transición, Sprint / Coconstrucción).

## 6 ter. Sin textos sobreexplicativos (regla general, 24/11/2026)
Decisión del dueño (Lorenzo Ortiz), para todo el sitio y todos sus idiomas (español e inglés desde el 24/11/2026), en textos visibles, metadatos e imágenes para compartir. Si el título o el subtítulo ya dice lo que hay en la sección, el texto que lo acompaña sobra. Directo al grano.

Qué se quita:
- Bajadas o descripciones cortas pegadas a un título que repiten lo que el título dice con otras palabras.
- Frases que explican lo obvio de un bloque, un botón o un formulario («Déjanos tus datos y te enviaremos…», «Aquí encontrarás…», «En esta sección…», «Toca una plantilla para ver…»).
- Descripciones de tarjetas que solo parafrasean el título de la tarjeta.
- Textos que repiten algo que ya dice otra parte cercana de la misma página (una nota, una columna, la fila de datos de arriba).
- Introducciones de página que anuncian lo que viene en vez de decirlo.

Qué se conserva:
- Datos, cifras, fechas, precios, plazos, entregables, condiciones y fuentes.
- Preguntas frecuentes, metodología y contenido de fondo (lo que viene del libro: «La idea», «Antes de empezar», «Sabrás que terminaste cuando…»).
- Cualquier texto que agregue una decisión, una condición o un dato que el título no dice.
- Lo que el dueño fijó con fecha: titular del héroe, bios, cifras de la casa y su nota, textos legales, la línea de entrega del PDF en 6 horas, la línea de privacidad bajo los formularios y la baja con «baja».

Cómo se aplica:
- Prueba por texto: ¿agrega una cifra, un plazo, una condición, un entregable, una fuente o una decisión que el título no dice? Si sí, se queda. Si es mixto, se recorta a la parte con el dato, sin escribir palabras nuevas.
- Si un texto secundario es útil pero estorba, no se borra: va al acordeón «Detalle» (sección 4) o a la página que corresponde.
- No se inventa texto para reemplazar lo quitado y no se cambian datos.
- El titular pasa a ser la entrada directa del contenido: `SecHead` sin `sub` deja el espacio normal entre titular y contenido (32 a 48 px), sin alturas reservadas.
- Un `description` o un JSON-LD que reutilice una frase quitada no se vacía: se anota para el dueño.
- La lista de la ronda R7 (qué se quitó, recortó y movió por página) está en la carpeta `web-r7` del proyecto (`CANDIDATOS.md`).

## 8. Plantillas para contenido en serie
- `/workbook/[id]`: héroe con el código y el título de la plantilla, fila de datos (tiempo, capítulo, nivel, ejemplo resuelto, páginas), «Para qué sirve», «Antes de empezar», «Arriba de la hoja», «Lo que trabaja el capítulo», «Necesitas antes», «Sabrás que terminaste cuando…», calculadora si la tiene y navegación anterior y siguiente. Los textos salen de `src/content/workbook.ts`, que se genera con `npm run workbook`.
- `/workbook/parte-NN`: héroe con el nombre de la parte y la lista de sus plantillas.

## 9. Estructura del código
- Tokens: `src/app/globals.css` (bloques `@theme` y `:root`). Clases de componentes en `@layer components`, con sus `@media` dentro.
- Componentes base en `src/components/site/ui.tsx`: `Mono`, `Jn`, `Sc`, `Hero`, `SecHead`, `Detalle`, `Arrow`, `LinkArrow`, `Icon`, `Aviso`, `Lvl`, `Lectura`, `Nota`, `Btn`, `AgendaLink`, `PrivacidadLinea`, `MarcaLogo`, `ConWa`. Los que llevan texto lo reciben por props (`ui.tsx` no importa diccionarios).
- Textos (desde el 24/11/2026): todo el texto visible, los metadatos y las imágenes para compartir viven en los diccionarios `src/i18n/es.ts` y `src/i18n/en.ts` (sección 11). Lo que no es texto sigue en `src/content/`: `sitio.ts` (dominio, contacto, enlaces, fichas de los fundadores), `programas.ts` (id, nivel, orden y tipo de botón), `testimonios.ts`, `logos-terceros.ts` (trazados de Amazon y Mercado Pago con su fuente) e `ideas.ts` (generado por `npm run workbook` desde «La idea» de cada capítulo). Plantilla de /privacidad y /terminos: `LegalPage.tsx`. Cada página vive una sola vez en `src/vistas/` y recibe el idioma; los archivos de `src/app` solo la llaman.
- Diagnóstico de nivel: preguntas, regla de nivel, siguiente paso y campos del registro en `src/lib/diagnostico.ts` (sin React). `npm test` recorre las 132 combinaciones (`scripts/test-diagnostico.mjs`).
- Línea base al empezar (15/11/2026): 1 `!important` y 9 colores escritos a mano fuera de los tokens. Al cerrar esta pasada: 0 `!important` y 6 valores, todos en archivos donde el formato no admite variables (`raiz.tsx`, antes `layout.tsx`, para el color del navegador, `og.tsx` para las imágenes generadas e `ilustraciones.ts`, que trae los SVG del libro), con los mismos valores de los tokens.
- Contenido de origen que no se toca y se excluye de los barridos: `src/content/workbook.ts`, `src/content/ideas.ts`, `scripts/` y el toolkit retirado (`src/app/(es)/toolkit`, `src/components/toolkit`), que sigue solo en español y redirige a /workbook.
- En /libro, el subtítulo del héroe es el de la cubierta: «El método para ejecutivos con salario». Las muestras de páginas y la K.1 salen de los PDF finales de la R3 (`entrega/doble-agente-libro.pdf`, páginas 8 y 9, 12 y 13, 34 y 38, 41 y 42; `doble-agente-workbook.pdf`, página 8).
- Revisión del asesor del 15/11/2026 convertida en reglas: sin pies visibles bajo imágenes (todo al texto alternativo); un solo botón magenta por vista; rótulos que se repetirían en cada fila van una vez como cabecera; en celular, los rótulos con varias partes van un dato por línea, sin filete; «a la vista» como máximo una vez por página; cargos de los arquetipos como en el libro (gerenta de finanzas, exvicepresidente comercial, directora de tecnología, socio de una pyme de reparto); botones de compra con logotipo (sección 4).
- Los valores de `origen` de `DownloadForm.tsx` y `EmailCta.tsx` («Página del kit», «Cierre de página») van a la columna «Origen» de la hoja de registros, no son textos visibles. Los campos de cada formulario están en `src/lib/registro.ts` y en `apps-script/Code.gs`, y se cambian en los dos. Lo que se envía va siempre en español, también desde /en (sección 11).

## 10. Estado del rediseño
- Sitio bilingüe, etapa 2 de 2, 24/11/2026: el inglés escrito en `en.ts` y en los overlays del workbook (`npm run test:overlay -- --strict` da 0), glosario congelado en `docs/terminos.txt` (sección «English»), avisos de lo que sigue en español, legales con «This is a translation. The Spanish version prevails.», JSON-LD con `inLanguage` «en» y 404 en inglés. El español quedó idéntico a 3eaf70b (texto, metadatos y JSON-LD de las 47 rutas, a 1440 y 390). Capturas y texto visible en la carpeta `web-en/etapa2`.
- Estructura bilingüe, etapa 1 de 2, 24/11/2026: rutas /en, diccionarios, mapa de rutas, selector de idioma, hreflang, sitemap y 404 en los dos idiomas, sobre la rama `claude/clever-edison-pcwxrr`, sin publicar. El inglés todavía repite el español (marcas `TODO-EN`); la etapa 2 lo traduce y se publica todo junto. Capturas en la carpeta `web-en/etapa1`.
- Ronda R7, 24/11/2026: regla general «Sin textos sobreexplicativos» (sección 6 ter) aplicada a todas las rutas, sobre la rama `claude/clever-edison-pcwxrr`, sin publicar. Capturas y lista en la carpeta `web-r7` (`antes/`, `despues/`, `antes-despues.png`, `CANDIDATOS.md`).
- Ronda R6b, 16/11/2026: hallazgos de la verificación R6 (Nosotros sin hueco, retratos quietos y recorte nuevo de Eddie, descargos una sola vez, /actualizaciones, workbook, celular).
- Ronda R6, 16/11/2026: pasada de coherencia visual, propuesta de valor, accesibilidad, navegación y redundancias, con la voz sin IA, sobre la rama `claude/clever-edison-pcwxrr`. Capturas en la carpeta `web-r6` del proyecto del libro (`antes/` y `<ancho>_<ruta>.png`).
- Ronda R5b, 16/11/2026: hallazgos de la revisión R5 (diff 214f3cb..4243531) que no eran decisión del dueño, sobre la misma rama y sin publicar. Capturas en `web-r5` (sobrescritas) y lámina `web-r5/antes-despues.png`.
- Ronda R5 de la web, 16/11/2026: las 13 decisiones del dueño de la sección 7, sobre la rama `claude/clever-edison-pcwxrr`, sin publicar. Capturas antes y después en la carpeta `web-r5` del proyecto del libro.
- Ronda R4 de la web, modo «una sola pasada», 15/11/2026. Rama `claude/clever-edison-pcwxrr`, sin publicar.
- Cerrado: sistema de tokens, componentes base, todas las rutas (/, /libro, /kit, /diagnostico, /programas, /workbook, /workbook/[id], /actualizaciones, 404), logotipo y favicon en papel, imágenes para compartir.
- Pendiente: ver `PENDIENTES-WEB.md` (enlaces de Amazon, Mercado Pago y Google Calendar; revisión legal; validación de bios y del diagnóstico).
- Capturas finales y lámina antes y después: carpeta `web-r4` del proyecto del libro.

## 11. Sitio en español e inglés (24/11/2026)
Decisión del dueño (Lorenzo Ortiz), 24/11/2026: el sitio se publica también en inglés y el selector «ES | EN» se hace útil. Reemplaza la decisión «Solo español» del 15/11/2026 (sección 7). Etapa 1: la estructura. Etapa 2 (24/11/2026): el texto en inglés. Se publica una sola vez, con las dos terminadas.

- **El español prevalece.** Si el inglés y el español dicen cosas distintas (una cifra, una condición, un plazo, un texto legal), vale el español. *Supuesto a confirmar por el dueño*, sobre todo para /en/privacy y /en/terms, que abren con «This is a translation. The Spanish version prevails.» (clave `aviso` de cada texto legal; en español va vacía y no se pinta). Ley N.º 29733, Ley N.º 29571 y los nombres de leyes y entidades de cada país quedan con su nombre oficial en español.
- **URL.** Las del español no cambian (los QR impresos del libro apuntan a /workbook/<id>, /kit, /agenda y /actualizaciones). El inglés vive bajo /en con rutas en inglés: /en, /en/book, /en/kit, /en/diagnostic, /en/programs, /en/workbook, /en/workbook/<id> (mismos id), /en/updates, /en/privacy y /en/terms. /agenda, /api/registro, /toolkit, robots y sitemap son únicos.
- **Estructura (guía de Next 16: layouts, «multiple root layouts», y route groups).** Dos root layouts: `src/app/(es)/layout.tsx` con `<html lang="es">` y `src/app/(en)/layout.tsx` con `<html lang="en">`; no hay `app/layout.tsx`. Las piezas comunes (fuentes, viewport, bandera `.js`, metadatos por defecto, JSON-LD de la organización) están en `src/app/raiz.tsx`. Se descartó `app/[lang]`: obligaría a /es en las URL o a reescrituras, y las rutas en inglés tienen otro nombre. Pasar de un idioma al otro recarga la página (cambia el root layout); el selector usa un enlace normal.
- **404.** Con dos root layouts no hay un layout común para `not-found.tsx`; se usa `src/app/global-not-found.tsx` (experimental `globalNotFound` en `next.config.ts`, guía de Next 16, not-found). `src/proxy.ts` corre solo bajo /en y marca la cabecera `x-ff-locale`, así la 404 sale en inglés y con `lang="en"` en /en/<lo que sea>; el resto, en español. Las páginas siguen estáticas.
- **Mapa de rutas único** en `src/i18n/rutas.ts` (`RUTAS`, `lh`, `parDe`, `alternos`). Lo usan el menú, el pie, el selector, los enlaces de los datos, el sitemap y los hreflang. Los enlaces de los diccionarios se escriben con la ruta española («/programas#taller») y `lh(locale, href)` los lleva al idioma al pintar. Los id de ancla son los mismos en los dos idiomas.
- **Diccionarios.** `src/i18n/es.ts` (textos actuales, exactos) y `src/i18n/en.ts`, con el mismo tipo `Dict` (`typeof es`): si a `en.ts` le falta o le sobra una clave, el build falla. Variables entre llaves (`{n}`) con `f()` de `src/i18n/f.ts`. Los componentes de servidor usan `dict(locale)` (`src/i18n/dict.ts`); los de cliente reciben su parte por props, para que el navegador no descargue los diccionarios.
- **Cómo se agrega un texto.** 1) La clave y el texto en `es.ts`, en la sección de su página o componente. 2) La misma clave en `en.ts` (el build lo exige; mientras no haya traducción, el español con `// TODO-EN`). 3) En el componente, `t.<sección>.<clave>`; si es de cliente, se le pasa por props desde la página.
- **Workbook.** `workbook.ts` e `ideas.ts` salen del libro (`npm run workbook`) y no se editan. El inglés llega por overlays por id y campo: `src/content/en/workbook-en.ts` (`WORKBOOK_EN`, `PARTES_EN`) e `ideas-en.ts` (`IDEAS_EN`), que `src/content/workbook-i18n.ts` aplica sobre el español; lo que falta queda en español. Las fórmulas y los valores de las listas no se traducen (solo sus etiquetas; las salidas de texto de una fórmula, con `valores`). `npm run test:overlay` avisa de lo que falta (sale con 0); con `-- --strict`, falla. Las reglas R7 que ocultan «Antes de empezar» y el recuadro «Trae» se calculan con el texto español y valen igual en inglés.
- **Números.** `src/lib/format.ts` y `src/lib/calc.ts` reciben el idioma: español 61.600 y 7,0; inglés 61,600 y 7.0, al escribir y al leer. Los ejemplos del libro (en es-PE) se reescriben al formato del idioma. Lo guardado en el navegador lleva el idioma de sus cifras y se convierte al leerlo en el otro. `npm test` sigue comparando las 99 salidas en español y suma la K.1 en inglés.
- **Formularios.** Lo que se envía a /api/registro va siempre en español (situación, país, programa, «0: Salario» y las respuestas del diagnóstico), porque `apps-script/Code.gs` lo lee y escribe los correos en español. Se suma el campo `idioma` («es» o «en»): `validar_` de Code.gs solo lee los campos de su lista, así que hoy lo ignora sin romper nada; para guardarlo en la hoja hay que sumarlo a `FORMULARIOS` en Code.gs y redesplegar.
- **Selector «ES | EN».** `src/components/site/SelectorIdioma.tsx`. En escritorio, a la derecha del menú y antes de «Diagnóstico de nivel»; en celular, al final del menú; y en el pie, junto a Privacidad y Términos. Cada enlace lleva `lang` y `hreflang` de su idioma y su nombre completo como nombre accesible («Español», «English»); el activo, `aria-current`. Lleva a la misma página en el otro idioma (en /workbook/<id>, al mismo id); desde una ruta desconocida, al inicio.
- **Objetivos táctiles (WCAG 2.2, 2.5.8).** Enlaces del encabezado, del menú móvil, del pie y del selector: al menos 24 × 24 px.
- **Metadatos.** Cada página pone su canonical y sus hreflang (es, en y x-default al español) con `metaPagina` (`src/i18n/metadatos.ts`). El sitemap lista las dos versiones con sus alternates. Cada página en inglés tiene su imagen para compartir, con los textos del diccionario. En /en, `raiz.tsx` suma un JSON-LD `WebSite` con `inLanguage` «en» y la lista de la portada lleva `inLanguage` «en»; el libro conserva `inLanguage` «es» en /en/book, porque el libro está en español. El español no cambia.
- **Inglés (etapa 2).** Glosario congelado en `docs/terminos.txt`, sección «English» (niveles, “Exit plan” kit, Level check, programas, cifras USD 9,500; 25%; 7.0). Las líneas `#en malo => bueno` son los pares del inglés: van comentadas para que `rastros.py` y `textos.mjs` no las apliquen al español; para revisar /en se sacan a un archivo aparte (`grep '^#en '`). Al correr `rastros.py` con los pares del español, ignorar `src/i18n/en.ts` y `src/content/en/` (`--ignorar`), porque «25%» o «advisory board» son correctos en inglés. Voz: las reglas sin IA en inglés (sin «It's not X, it's Y», sin delve/leverage/unlock, sin rayas ni exclamaciones, sentence case, grado 8 a 10) y la 6 ter: no se agregan bajadas que el español no tiene.
- **Lo que sigue en español se dice una vez por bloque.** El libro, el workbook y el kit en PDF y los correos de confirmación están en español. Claves `enEspanol` (vacías en español, no se pintan): `descarga.kit` y `descarga.workbook`, `cierre`, `diagnostico.resultado` y `programas.form` van en la línea de privacidad del formulario, en su propia línea («The kit and the email are in Spanish.»); `libro.hero` va bajo los formatos del héroe y `libro.formatos` se suma a la bajada de /en/book#formatos. Sin clave nueva: la tarjeta del libro en la portada («Ebook, paperback and PDF, in Spanish»), la sección del libro de la portada y «Where to fill it in» de cada plantilla. No se dice en qué idioma se dictan los programas (no está decidido: PENDIENTES-WEB.md).
- **Cifras e ilustraciones.** Las calculadoras escriben «25%» en inglés y «25 %» en español (`pctSuf` en `calc.ts`). Las escenas de los arquetipos traen del libro «Ilustración lineal de…» y la cuenta «61.600 ÷ 8.800»: `Scene` las cambia al pintar en /en («Line illustration of…», «61,600 ÷ 8,800») sin tocar `ilustraciones.ts`.

