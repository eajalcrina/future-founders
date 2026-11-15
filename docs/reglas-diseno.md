# Reglas de diseño de futurefounders.pe

Estado: **en curso** (15/11/2026). Camino visual: el sistema de «Doble Agente», ronda R3. Referencia: el propio libro (PDF final de la R3).

Público: ejecutivos de 38 a 55 años en Latinoamérica (gerentes, directores y VP). Tono: editorial, sobrio, con datos concretos; tuteo, solo español.

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

## 5. Imágenes y diagramas
- Fotos reales de Eddie y Lorenzo en duotono, ilustraciones propias del libro (ajedrez, puerta) y páginas reales del libro. Sin fotos de stock y sin pies de foto visibles (la descripción va en el texto alternativo).
- El cuadrado magenta sobre la ilustración del inicio se mantiene (cuadrado de marca).
- Escalera (marco 0.1) con los colores por token, el nivel elegido marcado en magenta y la ruta discontinua en tinta.
- Imágenes para compartir (`src/lib/og.tsx`): papel, logotipo real, rótulo en tinta, titular en mayúsculas condensadas sin punto final. Hay imagen para inicio, libro, kit, diagnóstico, programas, workbook y valores del año.

## 6. Nombres y estilo
- Nombres oficiales: Future Founders; Doble Agente; Kit «Plan de salida» (kit «Plan de salida» dentro de una oración); workbook; Diagnóstico de nivel; taller «Tu primer rol parcial», Primer Mandato, Portafolio, Sesiones individuales, Coconstrucción; niveles Salario, Primer rol parcial, Portafolio, Independencia.
- Cifras: «USD 9.500», «25 %», punto de miles y coma decimal. Cifras de la casa que se mantienen: «155+ ejecutivos formados», «10+ empresas», «USD 20M+», «USD 1,5M+».
- Los pares que se pueden buscar están en `docs/terminos.txt`. Los cambios solo de mayúsculas (Doble Agente, Primer Mandato, Diagnóstico de nivel) se revisan a mano, porque los scripts comparan sin distinguir mayúsculas.
- Textos: tuteo, sin «·», sin exclamaciones, sin lenguaje de espías, sin punto final en titulares, botones ni rótulos. No se tocan cifras del libro, textos legales ni bios (pendientes de validar).

## 7. Decisiones del dueño
- Congeladas el 15/11/2026:
  - Paleta de la sección 1, aplicada también a logotipo, favicon, ícono de Apple e imágenes para compartir (el blanco del logotipo pasa a `#F6F6F4`).
  - Tipografía de la sección 2. Titulares como el libro: mayúsculas condensadas solo en el héroe; secciones en minúsculas semi-negrita condensada.
  - Rótulos de sección en tinta. Rayas laterales gruesas a filete superior fino; solo la meta lleva raya lateral. Ficha de arquetipo y tablas como el libro. Calculadora: mínimo de 6 meses en línea discontinua de tinta y la cifra grande más grande.
  - Foco visible en tinta y papel. Botones sin flecha.
  - Animaciones: el contador de cifras y el parallax se quedan, sutiles y quietos con `prefers-reduced-motion`. Entradas editoriales: un fundido de 8 px, una sola vez; el revelado por líneas solo en el titular del héroe.
  - Reseñas de ejemplo ocultas. La sección se muestra sola cuando `src/content/testimonios.ts` tenga reseñas con `ejemplo: false`, y el carrusel no rota solo.
  - Solo español. Fotos reales e ilustraciones propias. Bordes rectos, sin degradados ni sombras grandes. /toolkit queda fuera y redirige a /workbook.
- Supuestos tomados en esta pasada, para confirmar (tabla «Cambios respecto de la web actual», filas 17 a 19): tamaño óptico del cuerpo automático (`font-optical-sizing: auto`), interlineado del cuerpo en pantalla de 1,55 (el libro usa 1,40) y párrafos separados por espacio, sin sangría.
- 15/11/2026: el titular del inicio pasa de «… O para la tuya.» a «…, incluida la tuya» (sin fragmento suelto ni punto final). En /libro, el subtítulo es el de la cubierta: «El método para ejecutivos con salario».

## 8. Plantillas para contenido en serie
- `/workbook/[id]`: héroe con el código y el título de la plantilla, fila de datos (tiempo, capítulo, nivel, ejemplo resuelto, páginas), «Para qué sirve», «Antes de empezar», «Arriba de la hoja», «Lo que trabaja el capítulo», «Necesitas antes», «Sabrás que terminaste cuando…», calculadora si la tiene y navegación anterior y siguiente. Los textos salen de `src/content/workbook.ts`, que se genera con `npm run workbook`.
- `/workbook/parte-NN`: héroe con el nombre de la parte y la lista de sus plantillas.

## 9. Estructura del código
- Tokens: `src/app/globals.css` (bloques `@theme` y `:root`). Clases de componentes en `@layer components`, con sus `@media` dentro.
- Componentes base en `src/components/site/ui.tsx`: `Mono`, `Jn`, `Sc`, `Hero`, `SecHead`, `Arrow`, `LinkArrow`, `Icon`, `Aviso`, `Lvl`, `Lectura`, `Nota`, `Btn`.
- Textos: `src/content/sitio.ts`, `programas.ts`, `actualizaciones.ts`, `testimonios.ts`; las páginas llevan su texto propio.
- Línea base al empezar (15/11/2026): 1 `!important` y 9 colores escritos a mano fuera de los tokens. Al cerrar esta pasada: 0 `!important` y 6 valores, todos en archivos donde el formato no admite variables (`layout.tsx` para el color del navegador, `og.tsx` para las imágenes generadas e `ilustraciones.ts`, que trae los SVG del libro), con los mismos valores de los tokens.
- Contenido de origen que no se toca y se excluye de los barridos: `src/content/workbook.ts`, `scripts/` y el toolkit retirado (`src/app/toolkit`, `src/components/toolkit`).
- Los atributos «Kit Plan de salida» de `DownloadForm.tsx` y `EmailCta.tsx` son valores del campo `archetype` en Brevo, no textos visibles; no se cambian sin cambiar las plantillas de correo.

## 10. Estado del rediseño
- Ronda R4 de la web, modo «una sola pasada», 15/11/2026. Rama `claude/clever-edison-pcwxrr`, sin publicar.
- Cerrado: sistema de tokens, componentes base, todas las rutas (/, /libro, /kit, /diagnostico, /programas, /workbook, /workbook/[id], /actualizaciones, 404), logotipo y favicon en papel, imágenes para compartir.
- Pendiente: ver `PENDIENTES-WEB.md`. Esperando decisión del dueño: los supuestos de la sección 7.
- Capturas finales y lámina antes y después: carpeta `web-r4` del proyecto del libro.
