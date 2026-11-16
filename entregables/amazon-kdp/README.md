# «Doble Agente», 2.ª edición: paquete para Amazon KDP

Preparado el 15-11-2026 a partir de la ronda R3 final (`maqueta-v3`, PDF de `entrega/`). El contenido y el diseño son los aprobados; lo que cambia en la variante de imprenta está en la sección 3.

## 1. Archivos

| Archivo | Para qué | Medidas |
|---|---|---|
| `doble-agente-interior-kdp.pdf` | Interior del impreso, con sangrado, en color | 356 p., 153,175 × 226,35 mm (6,0305 × 8,9114 in), 7,3 MB |
| `doble-agente-interior-kdp-grises.pdf` | El mismo interior convertido a escala de grises (vector). **Es el que se sube si se imprime en blanco y negro** | 356 p., 153,175 × 226,35 mm, 4,6 MB |
| `doble-agente-portada-kdp-blanco.pdf` | Portada completa (contraportada + lomo + portada), papel blanco, CMYK sin perfil | 1 p., 326,71 × 226,35 mm (12,8627 × 8,9114 in), 72 KB, todo en vector |
| `doble-agente-portada-kindle.jpg` | Portada del ebook, proporción 1,6 | 1600 × 2560 px, RGB, 419 KB |
| `doble-agente-portada-kindle-2560alto.jpg` | Portada del ebook con la proporción del libro, 2560 de alto | 1746 × 2560 px, RGB, 438 KB |
| `doble-agente-kindle.pdf` | Interior para Kindle Create, «Print Replica» | 356 p., 150 × 220 mm, sin sangrado ni marcas, 42 marcadores, 217 enlaces, idioma `es`, 4,0 MB |
| `ficha/autor-*.jpg` | Fotos para Author Central | 600 × 600 px (la fuente no da más; no se ampliaron) |
| `ficha/logos/` | Logos de Future Founders en PNG (1999 × 935) y SVG | |
| `ficha/a-plus/` | Tres imágenes de 970 × 600 px para contenido A+ (escalera, arquetipos, capítulo 1) | |
| `vistas/` | Vistas previas de la portada (limpia y con guías), muestra del sangrado, comparación color y grises, páginas con magenta, `comprobaciones.json` | |

Para regenerar todo: `kdp-tools/hacer_kdp.sh` (en la carpeta de trabajo, unos 6 minutos). No toca `maqueta-v3`.

## 2. Requisitos de KDP usados (consultados el 15-11-2026)

| Dato | Cifra | Fuente |
|---|---|---|
| Tamaño personalizado del impreso | ancho de 4 a 8,5 in, alto de 6 a 11,69 in. 150 × 220 mm = 5,906 × 8,661 in, dentro del rango | [Trim size](https://kdp.amazon.com/help?topicId=G201857950) |
| Tamaño «regular» o «grande» | grande si el ancho pasa de 6,12 in o el alto de 9 in. Este libro es **regular** | [Printing cost](https://kdp.amazon.com/en_US/help/topic/G201834340) |
| Sangrado | 0,125 in (3,2 mm) arriba, abajo y por el lado exterior. Página = corte + 0,125 in de ancho y + 0,25 in de alto. Si una página sangra, todo el archivo va con sangrado | [Manuscript formatting](https://kdp.amazon.com/en_US/help/topic/GVBQ3CMEQW3W2VL6) |
| Margen interior (medianil) | 301 a 500 páginas: 0,625 in (15,9 mm) | misma página |
| Margen exterior, superior e inferior | sin sangrado 0,25 in (6,4 mm); con sangrado 0,375 in (9,6 mm). La página no dice desde dónde se mide (ver 3.2) | misma página |
| Grosor del papel por página | blanco 0,002252 in (0,0572 mm); crema 0,0025 in (0,0635 mm); color estándar 0,002252 in; color premium 0,002347 in (0,0596 mm) | [Cover](https://kdp.amazon.com/en_US/help/topic/G201953020) |
| Portada completa | ancho = sangrado + contraportada + lomo + portada + sangrado; alto = sangrado + corte + sangrado; un solo PDF; fuentes incrustadas, transparencias aplanadas, sin marcas de corte; imágenes ≥ 300 ppp, CMYK; sin perfiles de color incrustados; texto ≥ 0,125 in dentro del corte; texto ≥ 7 pt | misma página |
| Texto del lomo | desde 79/80 páginas; 0,0625 in (1,6 mm) de aire a cada lado y 0,0625 in de tolerancia en cada pliegue | misma página |
| Código de barras | si no se aporta, KDP pone uno en un recuadro blanco de 2 × 1,2 in (50,8 × 30,5 mm) abajo a la derecha de la contraportada. Si se aporta: ≥ 0,25 in (6 mm) de la bisagra del lomo y ≥ 0,76 in (19 mm) del pie | [Barcode](https://kdp.amazon.com/en_US/help/topic/GDTKFJPNQCBTMRV6) |
| Costo de impresión (EE. UU.) | negro: USD 1,00 + 0,012/p.; color estándar: 1,00 + 0,0255/p. (72 a 600 p.); color premium: 1,00 + 0,065/p. (tamaño regular) | [Printing cost](https://kdp.amazon.com/en_US/help/topic/G201834340) |
| Portada del ebook | ideal 2560 × 1600 px (alto × ancho), proporción 1,6; mínimo 500 px en el lado largo, máximo 10.000 px; JPEG preferido; RGB; ≤ 50 MB | [Ebook cover](https://kdp.amazon.com/en_US/help/topic/G6GTK3T3NUHKLEFX) |
| Formatos del ebook | DOCX, KPF (Kindle Create), EPUB; también HTML, RTF, TXT y PDF. PDF admitido en español. MOBI ya no para diseño fijo | [eBook formats](https://kdp.amazon.com/en_US/help/topic/G200634390) |
| Print Replica | Kindle Create convierte un PDF en ebook de diseño fijo; se lee en tabletas Fire y apps Kindle (no en lectores de tinta). Activar *Edit > Preserve Links* para conservar los enlaces; el índice se marca página por página | [Print Replica](https://kdp.amazon.com/en_US/help/topic/GMUKXSTBCN6F2TGM) |

## 3. Variante de imprenta

### 3.1 Qué cambió

La variante se arma en `maqueta-v3-imprenta/` (copia de `maqueta-v3` con `kdp-tools/parche_imprenta.py`). El núcleo de `maqueta-v3` no se tocó: copia de respaldo en `bak/maqueta-v3-pre-kdp.tgz`, sumas md5 de los 25 archivos del núcleo iguales antes y después, y `./build.sh` normal sigue dando el mismo libro (356 páginas, mismo texto página por página que `entrega/doble-agente-libro.pdf`).

| Ajuste | Antes | Variante de imprenta | Motivo |
|---|---|---|---|
| Texto de las pestañas laterales | a 4,3 mm del corte | a 6,8 mm (relleno 15 → 26 px; ancho visible 39 → 46 px la activa, 32 → 41 px las demás) | margen exterior de KDP |
| Caja de las dobles páginas fijas (arquetipos, contenido) | par a 64 px, impar a 60 px del borde | par 58 px, impar 66 px | medianil ≥ 15,9 mm |
| Cifra grande de las aperturas de parte | a 15,0 mm del lomo | a 16,5 mm | medianil |
| Escalera (Marco 0.1), página impar | columnas, Lectura y Fuente a 15,0 mm del lomo | a 16,5 mm | medianil |
| Fondo de página | papel de pantalla #F6F6F4 | blanco (el papel del libro) | evita una trama del 4 % en las 356 páginas |
| Ilustraciones con tramas SVG (46) | teselas con transparencia a baja resolución | imagen opaca a ~500 ppp | sin transparencias, resolución ≥ 300 ppp |
| Sangrado | — | franja del borde prolongada en vector 3,175 mm por el exterior, arriba y abajo; nada en el lomo | pestañas, paneles salvia y aperturas de parte llegan al corte |
| Enlaces y marcadores | sí | no (no sirven en papel) | |

**Paginación:** no cambia. Siguen 356 páginas, con las mismas anclas y folios. `verify.py` en la variante: texto 0 no encontrados y 0 fuera de orden, 0 «·», 0 cortes con guion, 36 QR legibles (lado mínimo 21 mm), 136 citas libro → workbook y 35 workbook → libro válidas, DOM 0 incidencias. Solo cambian las páginas 8 y 34 en el texto extraíble: las cifras manuscritas dentro de dos escenas quedan en la imagen aplanada.

### 3.2 Márgenes medidos en `doble-agente-interior-kdp.pdf` (desde el corte)

| | Mínimo de KDP | Antes | Ahora |
|---|---|---|---|
| Medianil | 15,9 mm | 15,0 mm (7 páginas) | 16,5 mm |
| Exterior | 6,35 mm desde el corte (0,375 in desde el borde del archivo con sangrado) | 4,3 mm (pestañas) | 6,8 mm |
| Superior | idem | 7,4 mm (cabeceras) | 7,4 mm |
| Inferior | idem | 6,6 mm (folios) | 6,6 mm |

KDP pide 0,375 in «con sangrado» sin decir si se mide desde el corte o desde el borde del archivo. Las plantillas de KDP lo aplican desde el borde del archivo (0,125 de sangrado + 0,25 dentro del corte), y así lo cumple todo el libro. Si el revisor de KDP lo midiera desde el corte (9,6 mm), marcaría cabeceras, folios y pestañas; cumplirlo exigiría rehacer la retícula (pestañas de 13 mm que chocarían con la columna lateral), así que no se hizo. El previsualizador de KDP lo dirá al subir el archivo.

## 4. Color o blanco y negro

Uso real del color (medido en el PDF, no 28 páginas): **156 páginas con paneles salvia** (#E3EAE8), **40 con magenta** y 8 con salvia oscuro (#2F5653).

En grises (luma Rec. 601):

| Color | Gris | Qué pasa |
|---|---|---|
| Salvia #E3EAE8 | 9 % | Los paneles se siguen viendo, pero igual que los recuadros cálidos #E6E4E0 (11 %): contraste salvia/cálido 1,0:1. Se pierde la señal «esto es de un arquetipo»; la conservan el rótulo («Ejemplo de Carmen», «Ejemplo resuelto») y la figura del arquetipo. |
| Salvia oscuro #2F5653 | 71 % | Legible sobre salvia (7,2:1). |
| Magenta #E6007E | 67 % | Casi igual que la tinta media #5E5E66 (63 %). Contra tinta: 2,5:1. |
| Magenta de texto #C8006D | 72 % | Legible (9,1:1 sobre blanco), pero deja de destacar. |

Páginas que pierden algo de información (ver `vistas/comparacion-color-grises.png` y `vistas/paginas-con-magenta.png`):

- **38** (Marco 1.1): la línea «META 9» pasa a gris oscuro; se distingue de «MÍNIMO 6» porque una es continua y la otra discontinua, y por el rótulo.
- **128** (Marco 9.1): «USD 27.000» (meta del primer año) ya no destaca frente a las otras dos cifras; el rótulo «Meta del primer año» lo dice.
- **222** (Marco 17.1): el total «8 horas» y su filete pasan a gris; se sigue leyendo.
- **13** y **279** (escalera): la bandera de la meta y los cuadros de los arquetipos se ven en gris medio.
- **31, 89, 137, 181, 229** (aperturas de parte) y **1**: el cuadrado del logo sobre tinta queda con poco contraste (2,5:1). Es decorativo.
- Las 21 aperturas de capítulo, los anexos y las escenas: el cuadrado magenta de la ilustración pasa a gris; decorativo.
- 156 páginas con salvia: ver la primera fila de la tabla.

Costo de impresión por ejemplar (356 páginas, tamaño regular):

| | EE. UU. | Europa | Reino Unido | Relativo |
|---|---|---|---|---|
| Negro, papel blanco | USD 5,27 | EUR 5,02 | GBP 4,41 | 1 |
| Color estándar | USD 10,08 | EUR 9,29 | GBP 7,97 | 1,9 veces |
| Color premium | USD 24,14 | EUR 19,44 | GBP 16,34 | 4,6 veces |

**Recomendación: blanco y negro estándar, papel blanco, subiendo `doble-agente-interior-kdp-grises.pdf`.** El color no lleva información que el texto no diga, y casi duplica el costo de impresión, que sale de la regalía (60 % del precio menos la impresión). Por ejemplo, con un precio de USD 19,99 (cifra de ejemplo, el precio no está definido), la regalía baja de USD 6,72 a USD 1,91 con color estándar. Subir la versión ya convertida evita sorpresas con la conversión de KDP. Antes de aprobar, pedir una prueba impresa y mirar los paneles salvia al 9 %, que en papel no estucado pueden salir un poco moteados.

Por eso no se hizo la portada de la variante en color. Si se decide color estándar, sirve la misma portada (el grosor por página es igual, 0,002252 in); para color premium el lomo sería de 21,22 mm y para papel crema de 22,61 mm: `python3 kdp-tools/portada.py 356 color-premium …` o `crema`.

## 5. Portada completa

- Lomo: 356 × 0,002252 in = **0,8017 in = 20,36 mm** (papel blanco).
- Portada completa: 0,125 + 5,9055 + 0,8017 + 5,9055 + 0,125 = **12,8627 in × 8,9114 in = 326,71 × 226,35 mm**.
- Frente: la cubierta aprobada (R1 actualizada, `maqueta-v3/out/cubierta.pdf`, igual a `entrega/doble-agente-cubierta.pdf`) en vector, con el borde prolongado al sangrado. La banda de papel #F6F6F4 pasa a blanco.
- Lomo: magenta, «DOBLE AGENTE» en Archivo 800 condensado a 25 pt y «Eddie Ajalcriña y Lorenzo Ortiz» a 14 pt en blanco, de arriba abajo; logo de Future Founders derecho, 13 mm de ancho, al pie. El texto queda a 5,2 mm de cada pliegue (KDP pide 1,6 mm + 1,6 mm de tolerancia).
- Contraportada: blanco, tinta, cálido y magenta del sistema; Archivo, Source Serif 4 y JetBrains Mono; la escalera de cuatro niveles con las barras de la doble página y los marcadores ■□□□ de las fichas.
- Zona del código de barras libre: 60 × 55,7 mm en la esquina inferior derecha de la contraportada (cubre el recuadro de 2 × 1,2 in a 0,25 in de la bisagra, tanto a 0,25 in como a 19 mm del pie).
- Color: DeviceCMYK sin perfil incrustado. Magenta #E6007E = C0 M100 Y0 K0; tinta = K100; cálido = C0 M1 Y3 K10. Sin imágenes (todo vector), sin transparencias, 9 fuentes incrustadas.
- Vistas previas: `vistas/doble-agente-portada-kdp-blanco.png` y `-guias.png` (corte en rojo, pliegues en azul, zona segura en verde, código de barras en gris).

### Texto de la contraportada

> DOBLE AGENTE | 2.ª EDICIÓN · NEGOCIOS | EMPRENDIMIENTO *(rótulo mono con filetes; en la portada no hay «·»)*
>
> **Si diriges un área en una empresa grande, sabes resolver problemas por los que otras empresas pagan. Este libro te ayuda a cobrar por eso fuera de tu cargo, con tu sueldo todavía en la cuenta.**
>
> El método de *Doble Agente* avanza por cuatro niveles. Para pasar de uno al siguiente necesitas una señal concreta en tu estado de cuenta.
>
> MARCO 0.1 | LA ESCALERA
> - Nivel 0, **Salario**. Todo tu ingreso viene de un empleador.
> - Nivel 1, **Primer rol parcial**. Tu primer cliente propio, unas horas por semana y a la vista de tu empresa.
> - Nivel 2, **Portafolio**. Varios roles o productos pagan los gastos de tu casa.
> - Nivel 3, **Independencia**. Tus ingresos propios sostienen tu vida con margen.
>
> Son 21 capítulos en cinco partes. Cada uno cierra con una plantilla del workbook, y cuatro arquetipos de Lima, Bogotá, Ciudad de México y Santiago muestran cada cálculo resuelto. Los anexos cubren contratos, impuestos y salida del empleo en Perú, Colombia, México y Chile.
>
> Es para gerentes y directores de 38 a 55 años que quieren saber cuánto vale su experiencia fuera de la empresa y decidir cada paso con sus propios números.
>
> KIT GRATIS | PLAN DE SALIDA. Cinco plantillas para calcular cuántos meses aguanta tu hogar sin sueldo y revisar qué permite tu contrato. Descárgalas en futurefounders.pe/kit
>
> LOS AUTORES. **Eddie Ajalcriña** es CEO y cofundador de Future Founders y docente en MIT Professional Education. **Lorenzo Ortiz** es COO y cofundador de Future Founders. Dirigió plantas en el Grupo Breca.

## 6. Ebook

- `doble-agente-kindle.pdf` es el interior de pantalla (el de `entrega/doble-agente-libro.pdf`), sin la tapa: KDP sube la portada aparte y repetirla dentro la mostraría dos veces. El PDF de entrega con portada tiene 357 páginas y lleva la tapa como página 1, por eso no se usó. Ya cumple: 150 × 220 mm, sin sangrado ni marcas, fuentes incrustadas, 42 marcadores, 217 enlaces (QR, URL y contenido).
- En Kindle Create: *Create New > Print Replica*, importar el PDF, activar *Edit > Preserve Links*, marcar en el índice las páginas de cada parte y capítulo (los marcadores del PDF sirven de guía) y exportar el KPF.
- Portada: `doble-agente-portada-kindle.jpg` (1600 × 2560) recorta 95 px por la izquierda y 51 por la derecha de la cubierta a 2560 de alto, porque la cubierta es 1,47 y KDP recomienda 1,6. Si se prefiere no recortar, `doble-agente-portada-kindle-2560alto.jpg` (1746 × 2560) mantiene la cubierta entera.
- En este PDF las ilustraciones con tramas siguen como teselas a ~100 ppp, igual que en la entrega. En pantalla no se nota.

## 7. Comprobaciones (`vistas/comprobaciones.json`)

| Archivo | Páginas | Tamaño | Fuentes | Transparencias | Imágenes, ppp mín. | Color |
|---|---|---|---|---|---|---|
| interior-kdp | 356 (par) | 153,18 × 226,35 mm todas | 27, todas incrustadas (TrueType CID, Type0) | 0 | 56, 367 ppp | RGB (imágenes con sRGB) |
| interior-kdp-grises | 356 (par) | ídem | 27, incrustadas | 0 | 56, 367 ppp | solo DeviceGray, 0 páginas con color |
| portada-kdp-blanco | 1 | 326,71 × 226,35 mm | 9, incrustadas | 0 | ninguna (vector) | DeviceCMYK y gris, sin perfil ICC |
| kindle | 356 (par) | 150 × 220 mm | 28, incrustadas | tramas de las escenas (no afectan al ebook) | 10 fotos ≥ 367 ppp | RGB |

## 8. Pendiente antes de subir

- ISBN: KDP da uno gratis; los créditos del libro todavía no lo llevan (aviso de `verify.py`).
- Las fotos de los autores solo existen a 600 × 600 px. Para Author Central alcanzan; para prensa conviene pedir originales de al menos 1000 px.
- Revisar en el previsualizador de KDP que no marque cabeceras, folios ni pestañas (ver 3.2).
- Pedir una prueba impresa (sección 4).
