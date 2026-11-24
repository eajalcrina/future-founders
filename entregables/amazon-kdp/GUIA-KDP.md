# Cómo publicar «Doble Agente» en Amazon KDP

Guía para subir el libro como impreso (tapa blanda) y como ebook Kindle. Todos los archivos están en esta carpeta. Los textos de la ficha (título, descripción, palabras clave, categorías y biografías) están en `AMAZON-KDP.md`. Las cifras técnicas de KDP, con su fuente, están en `README.md`.

## Antes de empezar

1. **Cuenta de KDP.** Entra a kdp.amazon.com con la cuenta que va a cobrar las regalías. Completa los datos fiscales y bancarios de Soluciones Regenerativas LLC si aún no están.
2. **ISBN.** KDP da uno gratis para el impreso. Si van a vender el impreso también fuera de Amazon, conviene comprar uno propio. Cuando lo tengan, avísenle a Lorenzo para agregarlo a la página de créditos y regenerar el interior. El ebook no necesita ISBN.
3. **Decisión de color.** Recomendamos imprimir en **blanco y negro, papel blanco**. Cuesta unos USD 5,27 por ejemplar frente a USD 10,08 en color estándar. El color no aporta información que el texto no diga ya. La comparación está en `vistas/comparacion-color-grises.png`.

## Parte 1. Libro impreso (tapa blanda)

En la Biblioteca de KDP: **Crear > Tapa blanda**.

### Pantalla 1: detalles
- **Idioma:** Español.
- **Título:** Doble Agente
- **Subtítulo:** El sutil arte de construir una empresa rentable sin abandonar el mundo corporativo
- **Edición:** 2
- **Autor:** Eddie Ajalcriña. **Colaboradores:** Lorenzo Ortiz, como Autor.
- **Descripción:** copiar el bloque «Descripción» de `AMAZON-KDP.md`.
- **Derechos de publicación:** «Soy el propietario de los derechos de autor».
- **Palabras clave:** las siete de `AMAZON-KDP.md`, una por casilla.
- **Categorías:** las tres de `AMAZON-KDP.md`.
- **Contenido para adultos:** No.

### Pantalla 2: contenido
- **ISBN:** «Obtener un ISBN gratuito de KDP» o el propio.
- **Fecha de publicación:** dejar vacía para usar la fecha del día en que se publique.
- **Opciones de impresión:**
  - Tinta y papel: **Blanco y negro, papel blanco**.
  - Tamaño de corte: **Seleccionar otro tamaño** > 15 × 22 cm (5,91 × 8,66 in).
  - Sangrado: **Con sangrado**.
  - Acabado de la tapa: **Mate** (va mejor con el magenta plano de la portada).
- **Manuscrito:** subir `doble-agente-interior-kdp-grises.pdf`. Si eligieron color, subir `doble-agente-interior-kdp.pdf`.
- **Portada:** «Subir una portada que ya tienes» y subir `doble-agente-portada-kdp-blanco.pdf`. El lomo está calculado para 356 páginas en papel blanco: 20,36 mm. Si cambian a papel crema o a color premium, avísenle a Lorenzo: el lomo cambia y hay que regenerar la portada.
- **Código de barras:** dejar que KDP lo ponga. La zona abajo a la derecha de la contraportada está libre para eso.
- **Vista previa:** abrir el «Previsualizador» y revisar página por página. Si marca algún problema de márgenes en cabeceras, folios o pestañas laterales, mándenle a Lorenzo una captura con la página. Es el único punto que puede pedir un ajuste (ver la sección 3.2 de `README.md`).

### Pantalla 3: precio
- **Territorios:** todos.
- **Mercado principal:** Amazon.com.
- **Precio:** lo definen ustedes. Con blanco y negro el costo de impresión es de unos USD 5,27 en EE. UU., EUR 5,02 en Europa y GBP 4,41 en el Reino Unido. KDP muestra la regalía de cada precio en la misma pantalla.
- **Antes de publicar:** pedir una **copia de prueba** desde esta pantalla y revisar en papel los paneles grises claros (en color son salvia) y las pestañas laterales.

## Parte 2. Ebook Kindle

En la Biblioteca de KDP: **Crear > Ebook Kindle**. La forma más simple es crear el ebook desde el mismo título del impreso, así Amazon los muestra juntos.

### Preparar el archivo en Kindle Create
1. Instalar Kindle Create (gratis, Windows o Mac) desde kdp.amazon.com/kindle-create.
2. **Nuevo proyecto desde archivo > Print Replica** y abrir `doble-agente-kindle.pdf`.
3. Activar **Edit > Preserve Links** para que funcionen los enlaces del índice y los QR.
4. Marcar el índice de contenido página por página siguiendo el índice del libro.
5. **Exportar** como archivo KPF.

### En KDP
- **Detalles:** los mismos textos de la tapa blanda.
- **Manuscrito:** subir el KPF exportado.
- **Portada:** subir `doble-agente-portada-kindle.jpg` (1600 × 2560 px). Si prefieren la portada sin recorte, usar `doble-agente-portada-kindle-2560alto.jpg`.
- **DRM:** a elección. Recomendamos activarlo.
- **Precio:** lo definen ustedes. Para la regalía del 70 % el precio tiene que estar entre USD 2,99 y USD 9,99.
- **KDP Select:** opcional. Da Kindle Unlimited y promociones a cambio de exclusividad del ebook en Amazon durante 90 días. Como el PDF también se vende directo en la web, **no conviene activarlo**.

El ebook en Print Replica se lee en tabletas Fire y en las apps de Kindle para celular y computadora. No se lee en los Kindle de tinta electrónica.

## Parte 3. Author Central y ficha

1. Entrar a author.amazon.com con la misma cuenta, reclamar el libro para cada autor.
2. **Biografía:** las de `AMAZON-KDP.md`.
3. **Foto:** `ficha/autor-eddie-ajalcrina.jpg` y `ficha/autor-lorenzo-ortiz.jpg`. Son de 1200 × 1200 px, en gris sobre fondo claro, con la cabeza al mismo tamaño y altura en las dos.
4. **Contenido A+ (opcional):** desde KDP, en la sección «Contenido A+», con las imágenes de `ficha/a-plus/` (970 × 600 px): la escalera de niveles, los arquetipos y el capítulo 1.
5. **Logos:** `ficha/logos/` tiene el logo de Future Founders en PNG y SVG si los necesitan para el A+ o para la página de autor.

## Después de publicar

- **Enlace de Amazon en la web.** Cuando el libro esté en venta, pásenle a Lorenzo el enlace de la ficha. Se carga en Vercel como `NEXT_PUBLIC_AMAZON_URL` y el botón «Comprar en Amazon» de futurefounders.pe empieza a llevar ahí.
- **Revisión de la ficha.** Comprobar que el impreso y el ebook aparecen juntos y que el «Leer muestra» funciona.

## Archivos de esta carpeta

| Archivo | Para qué |
|---|---|
| `doble-agente-interior-kdp-grises.pdf` | Interior del impreso en blanco y negro (el recomendado) |
| `doble-agente-interior-kdp.pdf` | Interior del impreso en color |
| `doble-agente-portada-kdp-blanco.pdf` | Portada completa con lomo y contraportada, papel blanco |
| `doble-agente-kindle.pdf` | Interior para Kindle Create |
| `doble-agente-portada-kindle.jpg` | Portada del ebook, 1600 × 2560 px |
| `doble-agente-portada-kindle-2560alto.jpg` | Portada del ebook sin recorte |
| `AMAZON-KDP.md` | Textos de la ficha: descripción, palabras clave, categorías y biografías |
| `README.md` | Cifras técnicas de KDP con su fuente y detalles de la variante de imprenta |
| `ficha/` | Fotos de los autores, logos e imágenes A+ |
| `vistas/` | Vistas previas de la portada y comparación color y grises |
