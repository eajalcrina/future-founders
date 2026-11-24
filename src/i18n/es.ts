// Diccionario en español: todo el texto visible del sitio, sus metadatos y los textos de las imágenes para compartir.
// Es la versión que manda: si el inglés difiere, prevalece el español (docs/reglas-diseno.md).
// en.ts tiene la MISMA forma (tipo Dict): una clave que falte allí rompe el build.
// Las rutas de los enlaces se escriben en español («/programas#taller») y se llevan al idioma al pintar (lh en rutas.ts).
// Variables entre llaves ({n}) se rellenan con f() de f.ts. Imports relativos: lo cargan las pruebas en Node.

import { EMAIL } from "../content/sitio";
import type { ProgramaId } from "../content/programas";

const RESPONSABLE = "Future Founders, una marca de Soluciones Regenerativas LLC (Estados Unidos)";
const VIGENTE = "Vigente desde el 16 de noviembre de 2026";
const DESC =
  "Future Founders acompaña a gerentes, directores y VP de Latinoamérica a fraccionar su trabajo en roles parciales, uno a uno, hasta que sus ingresos propios cubren su costo de vida.";
const HERO_TITLE = "Tu experiencia puede trabajar para más de una empresa. O para la tuya.";
const LEGAL = "Nada en este sitio es asesoría legal, tributaria ni financiera, ni una promesa de ingresos.";

export const es = {
  /* ------------------------------------------------------------ comunes */
  comun: {
    saltar: "Saltar al contenido",
    nuevaPestana: " (se abre en otra pestaña)",
    agenda: "Agenda 30 minutos",
    nota: "Nota",
    lectura: "Lectura",
    detalle: "Detalle",
    /** Línea única bajo los cuatro formularios; «enlace» lleva a la política de privacidad. */
    privacidad: {
      antes: "Usamos tus datos como explica la ",
      enlace: "política de privacidad",
      despues: ". Para dejar de recibir correos, responde «baja».",
    },
    enviando: "Enviando...",
    nombre: "Nombre",
    correo: "Correo",
    pais: "País",
    tuNombre: "Tu nombre",
    correoEjemplo: "nombre@correo.com",
    correoInvalido: "Revisa el correo: falta algo para que sea válido.",
    whatsapp: "WhatsApp",
    nivel: "Nivel {k}",
    /** Países de los formularios. Se envían siempre en español (los lee apps-script/Code.gs). */
    paises: ["Perú", "México", "Colombia", "Chile", "Otro país"],
    /** Mensaje de WhatsApp de «Agenda 30 minutos» cuando no hay página de citas. */
    agendaWa: "Hola, quiero agendar 30 minutos con el equipo de Future Founders.",
  },

  /** Selector de idioma: el nombre de cada idioma va en su propio idioma. */
  idioma: {
    grupo: "Idioma",
    nombres: { es: "Español", en: "English" },
    cortos: { es: "ES", en: "EN" },
  },

  /* ------------------------------------------------------------ metadatos del sitio */
  meta: {
    descripcion: DESC,
    tituloDefecto: "Future Founders | Tu experiencia puede trabajar para más de una empresa",
    ogLocale: "es_PE",
    areaServed: "Latinoamérica",
  },

  /* ------------------------------------------------------------ encabezado y pie */
  nav: {
    items: [
      { label: "El método", href: "/#metodo" },
      { label: "Para quién es", href: "/#para-quien" },
      { label: "El libro", href: "/libro" },
      { label: "Programas", href: "/programas" },
      { label: "Nosotros", href: "/#nosotros" },
    ],
    inicioAria: "Future Founders, inicio",
    principalAria: "Principal",
    menuAria: "Menú",
    diagnostico: "Diagnóstico de nivel",
    descargaKit: "Descarga el kit",
    kitGratis: "Kit gratis",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    kitPlan: "Kit «Plan de salida»",
  },
  footer: {
    lema: "Acompañamos a ejecutivos senior de Latinoamérica a convertir su experiencia en ingresos propios, nivel por nivel.",
    cols: [
      {
        title: "El método",
        links: [
          { label: "La escalera", href: "/#metodo" },
          { label: "Para quién es", href: "/#para-quien" },
          { label: "Programas", href: "/programas" },
          { label: "Nosotros", href: "/#nosotros" },
        ],
      },
      {
        title: "El libro",
        links: [
          { label: "Doble Agente", href: "/libro" },
          { label: "El método en 21 ideas", href: "/libro#metodo" },
          { label: "El workbook", href: "/workbook" },
          { label: "Dónde comprar", href: "/libro#formatos" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Kit «Plan de salida»", href: "/kit" },
          { label: "Diagnóstico de nivel", href: "/diagnostico" },
          { label: "Calculadora de runway", href: "/kit#calculadora" },
          { label: "Valores del año", href: "/actualizaciones" },
        ],
      },
    ],
    contacto: "Contacto",
    whatsapp: "WhatsApp {numero}",
    waMensaje: "Hola, escribo desde futurefounders.pe.",
    instagram: "Instagram",
    privacidad: "Privacidad",
    terminos: "Términos",
    legal: LEGAL,
    /** Titular del pie (decisión del dueño, 16/11/2026). */
    copyright: ["© 2026 Future Founders", "Soluciones Regenerativas LLC"],
  },

  /* ------------------------------------------------------------ contenido compartido (antes en content/sitio.ts) */
  sitio: {
    /** Situación de quien llena un formulario: etiqueta larga (diagnóstico) y corta (formularios de descarga). */
    situaciones: [
      { largo: "Tengo empleo", corto: "Tengo empleo" },
      { largo: "Acabo de salir de mi empresa", corto: "Acabo de salir" },
      { largo: "Tengo un proyecto o una pyme propia", corto: "Tengo un proyecto" },
    ],
    /** Titular de la portada y de la imagen para compartir general. Texto del dueño: se respeta tal cual. */
    heroTitle: HERO_TITLE,
    levels: ["Salario", "Primer rol parcial", "Portafolio", "Independencia"],
    look: [
      "Todo tu ingreso viene de un empleador.",
      "Tienes un cliente propio, junto a tu cargo o después de él.",
      "Varios roles o productos pagan los gastos de tu casa.",
      "Tus ingresos propios sostienen tu vida con margen.",
    ],
    signal: [
      "Emitiste o recibiste tu primer comprobante por un rol parcial.",
      "Tus ingresos propios netos cubren tu costo de vida tres meses seguidos.",
      "Cumples las dos condiciones del punto de no retorno.",
      "Revisas tus números cada mes y tu plan de 90 días baja tu mayor riesgo.",
    ],
    chaps: ["Partes 01 a 04", "Capítulo 18", "Capítulos 19 y 20", "Capítulo 21"],
    doNow: [
      {
        head: "Mide lo que ya tienes antes de ofrecer nada",
        body: "Calcula tu runway y lo que te permite tu contrato. Son las plantillas K.1 y K.2 del kit, unos 50 minutos en total.",
      },
      {
        head: "Suma un segundo rol sin que un cliente pese demasiado",
        body: "Suma un segundo rol o un producto sin que un cliente pase de la mitad de tus ingresos. Mides tus roles juntos cada mes en el tablero de la 18.1.",
      },
      {
        head: "Suma roles hasta que tus ingresos propios paguen los gastos de tu casa",
        body: "Pasas de un cliente a un portafolio de 2 a 4 roles recurrentes. Rodrigo combina su pyme de reparto con un rol de operaciones y suma USD 7.600 netos al mes frente a un costo de vida de 7.000.",
      },
      {
        head: "Vive de tu portafolio o conviértelo en una firma o un producto propio",
        body: "Das el paso cuando tus ingresos propios llegan a 1,2 veces tu costo de vida durante tres meses seguidos y tu colchón cubre 6 meses. A Rodrigo le faltan USD 800 al mes y 4.000 de ahorro.",
      },
    ],
    /** Recursos y programas por nivel (portada y diagnóstico). */
    with: [
      [
        { name: "Kit «Plan de salida»", meta: "Gratis", href: "/kit" },
        { name: "Diagnóstico de nivel", meta: "Gratis", href: "/diagnostico" },
        { name: "Taller «Tu primer rol parcial»", meta: "2 sesiones de 3 horas", href: "/programas#taller" },
        { name: "Primer Mandato", meta: "Cohorte de 8 semanas", href: "/programas#primer-mandato" },
      ],
      [{ name: "Mastermind «Portafolio»", meta: "Grupos de 8 a 10", href: "/programas#mastermind" }],
      [{ name: "Sesiones individuales de transición", meta: "6 a 8 sesiones", href: "/programas#sesiones" }],
      [{ name: "Coconstrucción", meta: "Sprint de 90 días", href: "/programas#coconstruccion" }],
    ],
    here: [
      "Aquí empiezan Carmen, Andrea y Javier.",
      "Javier es el primero en llegar, con un rol de director comercial dos días por semana.",
      "Aquí empieza Rodrigo, con su pyme y un rol parcial.",
      "Rodrigo trabaja este tramo en el capítulo 19.",
    ],
    lectura:
      "La mayor parte del libro está en el nivel 0. Las cuatro primeras partes preparan el primer cliente, que en nuestras conversaciones es el paso que más ejecutivos postergan. Desde el primer cliente, la Parte 05 trabaja con tus cobros reales.",
    arch: [
      {
        who: "carmen",
        level: 0,
        tag: "Con empleo",
        name: "Carmen",
        role: "Gerenta de finanzas en una minera mediana de Lima, 47 años",
        rows: [
          ["Años de carrera", "21, 14 en la minera"],
          ["Ahorro líquido", "USD 61.600"],
          ["Costo de vida", "USD 8.800 al mes"],
          ["Runway", "7,0 meses"],
          ["Nivel de partida", "0, Salario"],
        ],
        voice:
          "El código de ética de su minera pide declarar por escrito cualquier actividad remunerada fuera de la empresa, así que esa declaración entra en su plan antes del primer rol.",
        start: "K.1 Tu runway hoy y K.2 Lo que dice tu contrato",
        href: "/kit",
      },
      {
        who: "javier",
        level: 0,
        tag: "Recién despedido",
        name: "Javier",
        role: "Exvicepresidente comercial de una multinacional de consumo masivo en Bogotá, 52 años",
        rows: [
          ["Años de carrera", "26, 4 en la última empresa"],
          ["Ahorro líquido", "USD 61.150, con la indemnización"],
          ["Costo de vida", "USD 12.500, que baja a 10.000"],
          ["Runway", "4,9 meses, 6,1 con el recorte"],
          ["Nivel de partida", "0, Salario"],
        ],
        voice:
          "Su primera liquidación no incluía el bono proporcional del año. Lo notó al llenar la K.3, lo revisó con un abogado laboral y lo pidió por escrito antes de firmar.",
        start: "K.3 Tu salida en números, antes de firmar",
        href: "/workbook/k3",
      },
      {
        who: "andrea",
        level: 0,
        tag: "En sector regulado",
        name: "Andrea",
        role: "Directora de tecnología en un banco grande de Ciudad de México, 44 años",
        rows: [
          ["Años de carrera", "18, 9 en el banco"],
          ["Ahorro líquido", "USD 51.300"],
          ["Costo de vida", "USD 9.500 al mes"],
          ["Runway", "5,4 meses"],
          ["Nivel de partida", "0, Salario"],
        ],
        voice:
          "Su primer rol es un asiento en el consejo asesor de una fintech que no compite con su banco. Lo acepta con autorización escrita del banco, por USD 2.000 al mes.",
        start: "K.2 Lo que dice tu contrato y la autorización por escrito",
        href: "/workbook/k2",
      },
      {
        who: "rodrigo",
        level: 2,
        tag: "Con proyecto propio",
        name: "Rodrigo",
        role: "Socio de una pyme de reparto en Santiago, con un rol parcial en una cadena de farmacias, 49 años",
        rows: [
          ["Años de carrera", "23, 11 en la última empresa"],
          ["Ahorro líquido", "USD 38.000"],
          ["Costo de vida", "USD 7.000 al mes"],
          ["Runway", "5,4 meses"],
          ["Nivel de partida", "2, Portafolio"],
        ],
        voice:
          "Su pyme le deja USD 3.600 netos y un rol de operaciones en una cadena de farmacias, unos 4.000. Suma 7.600 frente a un costo de vida de 7.000, así que empieza en el nivel 2.",
        start: "19.1 El punto de no retorno",
        href: "/workbook/19-1",
      },
    ] as Arch[],
    archNote:
      "Carmen, Javier, Andrea y Rodrigo son arquetipos del libro, armados a partir de conversaciones con ejecutivos. No son personas reales.",
    products: [
      [
        { tag: "Gratis", name: "Kit «Plan de salida» y Diagnóstico de nivel", desc: "Cinco plantillas para saber cuántos meses aguantas sin sueldo y un cuestionario que te dice en qué nivel estás.", meta: "Unas 2 horas", cta: "Descargar el kit", href: "/kit" },
        { tag: "Libro", name: "Doble Agente", desc: "21 capítulos en cinco partes, con una plantilla del workbook por capítulo.", meta: "Ebook, impreso y PDF", cta: "Ver el libro", href: "/libro" },
        { tag: "Taller", name: "Tu primer rol parcial", desc: "Escribes tu oferta en una página y le pones precio, junto a ejecutivos que están en el mismo punto.", meta: "2 sesiones de 3 horas en vivo", cta: "Ver fechas", href: "/programas#taller" },
        { tag: "Programa", name: "Primer Mandato", desc: "Cohorte en vivo para llegar a tu primer comprobante, con oferta, precio, contrato modelo, 30 cuentas objetivo y 10 conversaciones.", meta: "8 semanas, de 12 a 20 personas", cta: "Ver la próxima cohorte", href: "/programas#primer-mandato" },
      ],
      [{ tag: "Mastermind", name: "Portafolio", desc: "Grupos de pares que revisan oportunidades, precios y referidos cada quince días.", meta: "Grupos de 8 a 10, de 6 a 12 meses", cta: "Postular", href: "/programas#mastermind" }],
      [{ tag: "Acompañamiento", name: "Sesiones individuales de transición", desc: "Planificas tu salida midiendo las dos condiciones del punto de no retorno.", meta: "6 a 8 sesiones", cta: "Agenda 30 minutos", href: "/programas#sesiones" }],
      [{ tag: "Sprint", name: "Coconstrucción", desc: "Convertimos tu portafolio en una firma o un producto, junto a ti.", meta: "Sprint de 90 días", cta: "Agenda 30 minutos", href: "/programas#coconstruccion" }],
    ],
    /** Cifras de Future Founders (decisión del dueño, 16/11/2026). Se muestran con la nota cifrasNota. */
    stats: [
      { value: 155, suffix: "+", label: "ejecutivos formados" },
      { value: 10, suffix: "+", label: "empresas construidas" },
      { prefix: "USD ", value: 26, suffix: "M+", label: "facturados" },
      { prefix: "USD ", value: 2.7, decimals: 1, suffix: "M+", label: "capital levantado" },
    ] as Stat[],
    cifrasNota: "Suman la trayectoria de los fundadores y la de los participantes de los programas.",
    /**
     * Bios de los fundadores. Fuente: eddieajalcrina.com y lorenzoortiz.co, leídas el 15/11/2026; no agregar datos que no estén ahí.
     * Los cargos vienen de la web anterior de Future Founders, escrita por ellos (decisión del dueño, 16/11/2026).
     */
    founders: {
      eddie: {
        role: "CEO y cofundador",
        cred: "Docente en MIT Professional Education desde 2022",
        bio: "Lleva más de 15 años entre la industria, la cooperación internacional y el emprendimiento. Lideró la estrategia de sostenibilidad de TASA, del grupo Breca, y dirigió la sostenibilidad y los asuntos regulatorios de Alicorp-Vitapro en cuatro países entre 2019 y 2023. En 2021, todavía en Alicorp-Vitapro, cofundó Redesign Lab, que dirige como CEO y cuyo portafolio facturó USD 26 millones en 2025.",
      },
      lorenzo: {
        role: "COO y cofundador",
        cred: "",
        bio: "Empezó en el Grupo Gloria y a fines de 2013 pasó a TASA, del Grupo Breca, donde dirigió a la vez dos plantas industriales. En 2021 dejó la vida corporativa y cofundó Redesign Lab con Eddie. Desde entonces evalúa proyectos de inversión industrial en paralelo a sus otros roles, con más de 20 empresas industriales en 7 países.",
      },
    },
    learn: [
      "Calcular cuántos meses aguanta tu hogar sin sueldo y armar tu plan de salida.",
      "Encontrar problemas de USD 100.000 que tu mercado pagaría por resolver hoy.",
      "Ponerle precio a tu primer rol parcial y firmar tu primer contrato sin conflicto de interés.",
      "Pasar de un rol a un portafolio y medir cuándo llegas al punto de no retorno.",
    ],
    kit: [
      { id: "k1", code: "K.1", title: "Tu runway hoy", purpose: "Saber cuántos meses aguantas sin sueldo.", time: "20 min", icon: "reloj", done: "Tienes tu runway con un decimal." },
      { id: "k2", code: "K.2", title: "Lo que dice tu contrato", purpose: "Saber qué puedes hacer fuera de tu cargo.", time: "30 min", icon: "documento", done: "Cada fila tiene una respuesta o una pregunta para el abogado." },
      { id: "k3", code: "K.3", title: "Tu salida en números", purpose: "Estimar tu indemnización antes de negociar o firmar.", time: "20 min", icon: "salida", done: "Sabes cuánto te correspondería y qué diferencia tienes con lo que te ofrecen." },
      { id: "k4", code: "K.4", title: "Tus primeros 30 días", purpose: "Tener decidido qué haces cada semana si sales.", time: "30 min", icon: "calendario", done: "Cada semana tiene al menos una decisión tuya escrita." },
      { id: "k5", code: "K.5", title: "Tus primeras 20 llamadas", purpose: "Saber a quién llamas y qué le dices.", time: "20 min", icon: "meta", done: "Tienes 20 nombres y la fecha de la primera llamada." },
    ],
    /** Mensaje de WhatsApp para pedir el PDF mientras no hay pago en línea. */
    checkoutWa: "Hola, quiero comprar Doble Agente en PDF. ¿Me indican cómo pagar?",
  },

  /* ------------------------------------------------------------ componentes */
  ladder: {
    elige: "Elige tu nivel en la escalera",
    capitulos: "Cap. 1 a 17",
    senal: "Señal para pasar al siguiente",
    sostener: "Para sostener el nivel 3",
    enLibro: "En el libro",
    comoSeVe: "Cómo se ve cada nivel",
    nivelNombre: "Nivel {k}, {nombre}",
  },
  libroBotones: {
    comprarEn: "Comprar en",
    amazonAria: "Comprar en Amazon (se abre en otra pestaña)",
    pedirWa: "Pedir el PDF por WhatsApp",
    pedirWaAria: "Pedir el PDF por WhatsApp (se abre en otra pestaña)",
    pagarCon: "Pagar con",
    mpAria: "Comprar el PDF con Mercado Pago (se abre en otra pestaña)",
  },
  cierre: {
    rotulo: ["Kit gratuito", "Plan de salida"],
    titulo: "Empieza por tu runway",
    texto: "La K.1, la primera plantilla del kit «Plan de salida», te dice en 20 minutos cuántos meses aguantas sin sueldo.",
    boton: "Recibir el kit",
    tuCorreo: "Tu correo",
    listo: "Listo. Te enviamos el kit a {correo}.",
    promociones: "Si no lo ves en unos minutos, revisa la carpeta de promociones.",
    error: "No pudimos registrar tu correo en este momento. Pídenos el kit por {wa} y te lo enviamos.",
    waMensaje: "Hola, quiero recibir el kit «Plan de salida».",
    /** Aviso de que algo sigue en español: vacío en español (no se pinta); en inglés, una línea. */
    enEspanol: "",
  },
  descarga: {
    kit: {
      h: "Descarga el kit",
      intro: "Un PDF que puedes llenar, con los ejemplos de Carmen y Javier y la regla de cada país.",
      button: "Descargar el kit",
      next: "Empieza por la K.1: son 20 minutos y te deja el dato del que parte todo el método.",
      wa: "el kit «Plan de salida»",
      enEspanol: "",
    },
    workbook: {
      h: "Descarga el workbook",
      intro: "Las 31 plantillas del libro en un PDF. Se llena en una tableta, en la computadora o en papel.",
      button: "Descargar el workbook",
      next: "Abre primero «Tu nivel en la escalera», al comienzo del workbook, y anota tu nivel con la fecha.",
      wa: "el workbook de Doble Agente",
      enEspanol: "",
    },
    escribeNombre: "Escribe tu nombre.",
    situacion: "¿En qué situación estás?",
    listo: "Listo, {nombre}. Aquí está tu PDF.",
    tambien: " También te lo enviamos a {correo}.",
    descargarPdf: "Descargar el PDF",
    error: "No pudimos registrar tu correo en este momento. Si quieres recibir las novedades del libro, escríbenos por {wa}.",
    waMensaje: "Hola, soy {nombre}. Descargué {producto} y quiero recibir las novedades en {correo}.",
    /** Mientras el PDF del kit no esté publicado, el formulario del kit entrega el workbook. */
    fallbackLabel: "Descargar el workbook con el kit",
    fallbackNota: "El kit K.1 a K.5 está al comienzo del workbook, en las páginas 5 a 13.",
  },
  resenas: {
    aria: "Reseñas de participantes",
    carrusel: "carrusel",
    diapositiva: "diapositiva",
    pausar: "Pausar el avance automático",
    reanudar: "Reanudar el avance automático",
    anterior: "Reseña anterior",
    siguiente: "Reseña siguiente",
    nDeTotal: "{n} de {total}",
    elegir: "Elegir reseña",
    irA: "Ir a la reseña {n}",
  },

  /* ------------------------------------------------------------ calculadora K.1 */
  runway: {
    ejemplos: {
      carmen: {
        name: "Carmen",
        a: 61600,
        b: 8800,
        bio: "47 años, gerenta de finanzas en Lima. Tiene empleo y empieza el kit por la K.1.",
        /** Con <Sc>: EPS y USD en versalitas; el espacio duro tras USD va escrito (\u00a0). */
        lectura:
          "El capítulo 2 afina el costo de vida. Si Carmen suma lo que hoy paga la minera, como la EPS, el celular y el seguro de vida, su costo sube a USD\u00a09.400 y su runway baja a 6,6 meses.",
      },
      javier: {
        name: "Javier",
        a: 61150,
        b: 12500,
        bio: "52 años, exvicepresidente comercial en Bogotá. Acaba de salir de su empresa y hace la K.1 con la indemnización incluida.",
        lectura: "Con el recorte que acordó en casa, el costo de vida de Javier baja a USD\u00a010.000 y su runway sube a 6,1 meses.",
      },
    },
    numeros: ["", "uno", "dos", "tres", "cuatro", "cinco", "seis"],
    tituloVacio: "Escribe tus dos números para ver tu runway",
    cubre: "{nombre} cubre",
    cubres: "Cubres",
    mas: "{quien} {runway} meses sin sueldo, {dif} más que el colchón mínimo de 6",
    justo: "{quien} {runway} meses sin sueldo, justo el colchón mínimo de 6",
    menos: "{quien} {runway} meses sin sueldo, {dif} menos que el colchón mínimo de 6",
    calculadora: "Calculadora K.1",
    ejemploCon: "Ejemplo con {nombre}",
    tusNumeros: "Tus números",
    ejemplo: "Ejemplo",
    campoA: "A  Ahorro líquido",
    campoB: "B  Costo de vida mensual",
    moneda: "En dólares o en tu moneda, la misma en las dos.",
    estimar: "Estimar B con tres meses",
    meses: ["Mes 1", "Mes 2", "Mes 3", "Gastos anuales del último año"],
    formulaB: "B = (mes 1 + mes 2 + mes 3) ÷ 3 + gastos anuales ÷ 12",
    escribeMeses: "Escribe los tres meses",
    usarB: "Usar {b} como B",
    formula: "Runway = A ÷ B",
    mesesSinSueldo: "Meses que vives sin sueldo",
    mesesUnidad: "meses",
    costoCero: "El costo de vida tiene que ser mayor que cero.",
    misNumeros: "Calcular con mis números",
    volver: "Volver al ejemplo de {nombre}",
    marco: ["Marco 1.1", "Tu runway"],
    barra: "Barra: {runway} meses de runway; el mínimo recomendado es 6.",
    barraVacia: "Barra sin datos",
    minimo: "Mínimo 6",
    mesesBarra: "{runway} meses",
    nota: "Ahorro líquido es el dinero que puedes usar en una semana sin una penalidad grande. Tu fondo de pensiones, tu casa y tu auto quedan fuera.",
    siguiente: "Siguiente: tus tres runways (plantilla 1.1)",
  },

  /* ------------------------------------------------------------ calculadora de las plantillas */
  calc: {
    titulo: "Calculadora en línea",
    ejemploCon: "Ejemplo con {nombre}",
    arquetipo: "el arquetipo",
    tusNumeros: "Tus números",
    moneda: "Escribe en tu moneda o en dólares, la misma en todo el workbook.",
    detalle: "Hace las cuentas de la {code} con las mismas filas del workbook.",
    guardados: "Tienes datos guardados de otra plantilla: {lista}.",
    traer: "Traerlos aquí",
    elige: "Elige",
    bajoMinimo: "bajo el saldo mínimo",
    misNumeros: "Calcular con mis números",
    volver: "Volver al ejemplo de {nombre}",
    csv: "Descargar mis números (CSV)",
    csvFila: "Fila",
    csvValor: "Valor",
    csvArchivo: "doble-agente-{id}.csv",
    navegador: "Tus números se guardan solo en este navegador. No necesitas cuenta.",
    terminaste: "Sabrás que terminaste cuando…",
    siguiente: "Siguiente plantilla",
    /** Formato de las salidas «sí o no» y «mes». */
    si: "Sí",
    no: "No",
    mes: "mes {n}",
    ninguno: "ninguno",
  },

  /* ------------------------------------------------------------ páginas */
  inicio: {
    meta: {
      titulo: "Future Founders | Tu experiencia puede trabajar para más de una empresa",
      descripcion:
        "Método por niveles para ejecutivos senior de Latinoamérica: fraccionas tu trabajo en roles parciales, uno a uno, hasta que tus ingresos propios cubren tu costo de vida.",
    },
    listaLd: "Recursos y programas de Future Founders por nivel",
    cuantas: ["una", "dos", "tres", "cuatro", "cinco"],
    hero: {
      label: ["Para ejecutivos senior en Latinoamérica", "Método por niveles"],
      lead: "Future Founders acompaña a gerentes, directores y VP a fraccionar su trabajo en roles parciales, uno a uno, hasta que sus ingresos propios cubren su costo de vida.",
      lead2: "Avanzas con tu cargo a la vista y sin apostar tu estabilidad a un solo salto.",
      kitCorto: "Descarga el kit gratis",
      kitLargo: "Descarga el kit «Plan de salida»",
      libro: "Conoce el libro",
      datos: ["Kit gratuito", "Cinco plantillas", "Unas 2 horas"],
      imgAlt: "Ilustración en duotono: una mano sobre una pieza de ajedrez, tu cargo y tu plan propio en el mismo tablero",
    },
    cifras: "Future Founders en cifras",
    metodo: {
      label: ["El método"],
      title: "Subes de nivel cuando aparece una señal en tu estado de cuenta",
      marco: ["Marco 0.1", "La escalera"],
      h3: "Diecisiete de los 21 capítulos preparan tu primer cliente",
      diag: "El Diagnóstico de nivel te ubica con tus números en {n} preguntas.",
      diagLink: "Hacer el Diagnóstico de nivel",
    },
    quien: {
      label: ["Para quién es"],
      title: "Tu punto de partida decide tu primera plantilla",
      sub: "Para gerentes, directores y VP de 38 a 55 años, con 12 a 25 años de carrera en empresas grandes de Latinoamérica.",
      nivelPartida: "Nivel de partida: {k}",
      empiezaPor: "Empieza por",
    },
    libro: {
      portadaAlt: "Portada de Doble Agente, libro y workbook, 2.ª edición",
      label: ["El libro", "Eddie Ajalcriña y Lorenzo Ortiz"],
      title: "Doble Agente te lleva de tu primer rol parcial a la independencia",
      lead: "Son 21 capítulos en cinco partes, con una plantilla del workbook por capítulo.",
      metodo: "Ver el método en 21 ideas",
    },
    programas: {
      label: ["Programas", "Ordenados por nivel"],
      title: "Cada nivel tiene su programa y empiezas gratis",
      ver: "Ver los programas y postular",
      dudas: "Si dudas por dónde empezar,",
    },
    nosotros: {
      label: ["Nosotros", "Autores del libro"],
      title: "Eddie y Lorenzo escribieron el libro y dirigen los programas",
      retrato: "Retrato de {nombre} en duotono",
      linkedin: "LinkedIn",
      linkedinSr: " de {nombre} (se abre en otra pestaña)",
    },
    resenas: { label: ["Reseñas"], title: "Lo que cuentan quienes ya pasaron por los programas" },
  },

  libro: {
    meta: {
      titulo: "Doble Agente, el libro",
      descripcion:
        "Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz: el método en 21 ideas, con un workbook para pasar de tu primer rol parcial a la independencia sin dejar tu cargo de golpe.",
    },
    ld: {
      alternateName: "Doble Agente: el método para ejecutivos con salario",
      bookEdition: "2.ª edición",
      description:
        "21 capítulos en cinco partes, con un workbook, para convertir la experiencia ejecutiva en ingresos propios por niveles: salario, primer rol parcial, portafolio e independencia.",
    },
    nivel1: "Nivel {a}",
    nivel2: "Niveles {a} y {b}",
    nivelN: "Niveles {a} a {b}",
    toc: {
      apertura: { n1: "Apertura", n2: "y kit", items: [["", "Manifiesto: dos roles a la vista"], ["", "Los cuatro arquetipos"], ["", "La escalera: de un sueldo a varios ingresos"], ["", "Cómo usar este libro"], ["K", "Kit «Plan de salida», plantillas K.1 a K.5"]] },
      capitulos: {
        "01": [["1", "El riesgo que no se ve"], ["2", "Tu costo de vida real"], ["3", "Tu criterio ejecutivo es vendible"], ["4", "Juego limpio: contrato, conflicto de interés y transparencia"], ["5", "Si te despiden mañana"]],
        "02": [["6", "El problema de los USD 100.000"], ["7", "Tu puerto de entrada"], ["8", "Quién decide y por qué compra"], ["9", "¿Alcanza el mercado?"]],
        "03": [["10", "Tu propuesta de valor, en números"], ["11", "Tu primer rol parcial: formato, precio y contrato"], ["12", "De servicio a producto"], ["13", "La unidad económica"]],
        "04": [["14", "Tu red como canal"], ["15", "La conversación de diagnóstico"], ["16", "El primer contrato y el primer comprobante"], ["17", "Tu agenda, tu energía y tu familia"]],
        "05": [["18", "Del primer rol al portafolio"], ["19", "El punto de no retorno"], ["20", "La conversación con tu empleador"], ["21", "Independencia: saltar o quedarte"]],
      } as Record<string, [string, string][]>,
      cierre: { n1: "Cierre", n2: "y anexos", items: [["", "Lo que sigue"], ["", "Anexos por país: Perú, México, Colombia y Chile"], ["", "Glosario e índices"]] },
    } as { apertura: TocExtremo; capitulos: Record<string, [string, string][]>; cierre: TocExtremo },
    muestras: [
      "Páginas 8 y 9 del libro: los cuatro arquetipos, Carmen, Javier, Andrea y Rodrigo, con sus números de partida",
      "Páginas 12 y 13 del libro: el marco 0.1, la escalera de cuatro niveles con la ruta de los 21 capítulos",
      "Páginas 34 y 38 del capítulo 1: el caso de Carmen y el marco 1.1, sus tres runways frente al mínimo de 6 meses y la meta de 9",
      "Páginas 41 y 42 del capítulo 1: el ejemplo resuelto de la plantilla 1.1 y el cierre con las tres acciones",
    ],
    incluye: [
      { t: "Kit «Plan de salida»", d: "Cinco plantillas, K.1 a K.5, para tu runway, tu contrato, tu salida, tus primeros 30 días y tus primeras 20 llamadas." },
      { t: "21 plantillas, una por capítulo", d: "Cada una toma de 15 a 40 minutos con los datos a mano y deja una decisión o un dato nuevo sobre tu situación." },
      { t: "Las tres acciones de cada capítulo", d: "Lo que haces esa semana, escrito y con fecha." },
      { t: "Los cálculos de los cuatro arquetipos", d: "" },
    ],
    hero: {
      portadaAlt: "Portada del libro Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz",
      label: ["Libro y workbook", "2.ª edición"],
      title: "Doble Agente",
      sub: "El método para ejecutivos con salario",
      autores: "Eddie Ajalcriña y Lorenzo Ortiz",
      lead: "Durante dos décadas construiste tu carrera en empresas grandes. Este libro te ayuda a convertir esa experiencia en ingresos propios, paso a paso y sin ocultárselo a tu empleador.",
      formatos: ["Ebook", "Impreso", "PDF", "Workbook gratis"],
      enEspanol: "",
    },
    contratapa: {
      label: ["De qué trata"],
      title: "Un plan para cobrar por lo que ya sabes hacer",
      p: [
        "Si diriges un área, sabes resolver problemas que a otras empresas les cuestan cientos de miles de dólares. Lo que suele faltar es un plan para cobrar por eso fuera de tu cargo, y para el día en que una reestructuración cambie lo que tenías previsto.",
        "Cuatro ejecutivos de Lima, Bogotá, Ciudad de México y Santiago recorren el método con números que puedes revisar. Cada capítulo cierra con una plantilla del workbook y tres acciones para la semana.",
      ],
      aprender: "En estas páginas vas a aprender a",
      lectura:
        "Los cuatro arquetipos están armados a partir de conversaciones con más de 30 ejecutivos. Sus sueldos y gastos están en el rango de las guías salariales de cada país, y puedes revisar cada cálculo en el libro.",
    },
    metodo: {
      label: ["El método"],
      title: "El método en 21 ideas",
      verIdeas: "Ver las {n} ideas",
      verContenido: "Ver el contenido",
      ocultar: "Ocultar",
      trabaja: "Trabaja los niveles {niveles}",
    },
    muestra: {
      label: ["Muestra", "Páginas del interior"],
      title: "Cada capítulo abre con un caso y cierra con su plantilla",
      sub: "En el medio va un marco con nombre que explica la idea con números.",
    },
    workbook: {
      label: ["Workbook", "Gratis"],
      title: "El libro explica y el workbook es donde lo haces",
      sub: "Las plantillas que hacen cuentas tienen su calculadora en línea.",
      ver: "Ver las plantillas y descargar el workbook",
      imgAlt: "Página 8 del workbook: la plantilla K.1, Tu runway hoy, con el ahorro líquido y el costo de vida de Carmen y Javier y el espacio para tus números",
    },
    formatos: {
      label: ["Formatos", "Dónde comprar"],
      title: "Ebook e impreso en Amazon, PDF con Mercado Pago",
      subPago:
        "El libro en PDF se paga con Mercado Pago: tarjeta de crédito, débito o saldo en cuenta. Después del pago te enviamos el PDF al correo que registraste en Mercado Pago, en un plazo máximo de 6 horas.",
      subWa:
        "El libro en PDF se pagará con Mercado Pago: tarjeta de crédito, débito o saldo en cuenta. Mientras activamos el pago en línea, el PDF se pide por WhatsApp.",
      ebookN: "Ebook e impreso",
      ebookD: "El ebook se lee en Kindle, en una tableta o en la computadora. El impreso es una edición de bolsillo ejecutivo de 150 × 220 mm, impresa por Amazon.",
      pdfN: "Libro en PDF",
      pdfDPago: "Para leer en una tableta o en la computadora. Te llega a tu correo en un plazo máximo de 6 horas después del pago.",
      pdfD: "Para leer en una tableta o en la computadora.",
      nota: "Cada persona parte de un sueldo, un ahorro y un mercado distintos, y el libro te ayuda a medir los tuyos.",
      enEspanol: "",
    },
    autores: {
      label: ["Autores"],
      title: "Lo escribieron los fundadores de Future Founders",
      quienes: "Quiénes son Eddie y Lorenzo",
    },
    cierre: {
      title: "Empieza antes de comprar",
      text: "El kit «Plan de salida» es la primera sección práctica del libro y lo descargas gratis. Si te sirve, el libro sigue desde ahí con la Parte 01.",
    },
  },

  kit: {
    meta: {
      titulo: "Calcula cuántos meses aguantas sin sueldo",
      descripcion:
        "Kit «Plan de salida» gratis: cinco plantillas, K.1 a K.5, para saber cuántos meses aguantas sin sueldo, qué permite tu contrato y qué haces en tus primeros 30 días si sales.",
    },
    hero: {
      label: ["Kit gratuito", "Plan de salida"],
      title: "Calcula cuántos meses aguantas sin sueldo",
      datos: [
        ["5", "plantillas, K.1 a K.5"],
        ["2", "horas, aproximadamente"],
        ["4", "países con su regla general"],
      ],
    },
    plantillas: {
      label: ["Contenido", "K.1 a K.5"],
      title: "Cada plantilla termina en algo que puedes comprobar",
      terminaste: "Sabrás que terminaste cuando…",
      tiempo: "Tiempo",
      terminas: "Terminas cuando ",
      terminasSr: "Sabrás que terminaste cuando: ",
    },
    calculadora: {
      label: ["Calculadora", "Plantilla K.1"],
      title: "Prueba la K.1 con los números de Carmen o de Javier",
    },
    uso: {
      imgAlt: "Ilustración en duotono: una persona camina hacia una puerta iluminada",
      label: ["Cómo se usa", "Antes de la Parte 01"],
      title: "El orden depende de si tienes empleo o ya saliste",
      empleo: "Si tienes empleo",
      empleoD: "K.1, K.2 y K.3, y sigues con el capítulo 1. La K.4 y la K.5 van antes del capítulo 5.",
      saliste: "Si ya saliste",
      salisteD: "Empieza por la K.3 antes de firmar, vuelve a la K.1 y sigue con el capítulo 5.",
      paises: "Las reglas de Perú, México, Colombia y Chile son la regla general de cada país. El anexo del libro explica las excepciones y dónde verificar la norma vigente.",
    },
    cierre: {
      title: "Llénalo esta semana",
      text: "La K.1 toma 20 minutos y te deja el dato del que parte todo el método.",
      button: "Recibir el kit",
    },
  },

  diagnostico: {
    meta: {
      titulo: "Diagnóstico de nivel",
      descripcion:
        "Cuatro preguntas sobre tu situación, tu primer comprobante, tus ingresos propios y tu colchón te dicen en qué nivel de la escalera estás y qué plantilla llenar ahora.",
    },
    cuantas: ["Una", "Dos", "Tres", "Cuatro", "Cinco"],
    label: ["Gratis", "{n} preguntas"],
    title: "Diagnóstico de nivel",
    lead: "Responde con lo que ves hoy en tu estado de cuenta. El resultado te dice qué plantilla y qué capítulo siguen.",
    niveles: "Los cuatro niveles",
    nota: "Tus respuestas se quedan en tu navegador. Solo se envían si pides el resultado por correo.",
    /** Cuestionario (componente Diagnostico y src/lib/diagnostico.ts). */
    cuestionario: {
      pregunta: "Pregunta {n} de {total}",
      anterior: "Anterior",
      siguiente: "Siguiente",
      verNivel: "Ver mi nivel",
      preguntas: {
        /** Las opciones de la situación son las etiquetas largas de sitio.situaciones. */
        situacion: { text: "¿Cuál es tu situación hoy?" },
        comprobante: {
          text: "¿Ya cobraste con comprobante a un cliente propio?",
          help: "Comprobante es la factura, el recibo por honorarios, el CFDI o la boleta de honorarios, según tu país. Cuenta un rol parcial, una asesoría, un producto o tu empresa.",
          options: ["Todavía no", "Sí, a un cliente", "Sí, a dos o más clientes"],
        },
        cobertura: {
          text: "En los últimos tres meses, ¿qué parte de tu costo de vida sin empleo cubrieron tus ingresos propios netos?",
          help: "Ingresos propios son los que no vienen de un empleador. Tu costo de vida sin empleo es lo que gastas hoy más lo que hoy paga tu empleador y tendrías que pagar tú (plantilla 2.1).",
          options: [
            "Menos de la mitad",
            "La mitad o más, sin llegar a cubrirlo",
            "Lo cubrieron algún mes, pero no los tres seguidos",
            "Lo cubrieron los tres meses seguidos",
            "1,2 veces o más, los tres meses seguidos",
          ],
        },
        colchon: {
          text: "¿Cuántos meses de ese costo de vida cubre hoy tu ahorro líquido?",
          help: "Es tu runway: el dinero que puedes usar en una semana sin una penalidad grande, dividido entre tu costo de vida mensual.",
          options: ["Menos de 3", "De 3 a menos de 6", "6 o más", "No lo he calculado"],
        },
      },
      sinIngresos: "Sin ingresos propios todavía",
      why: {
        salioSinComprobante: "Ya no tienes sueldo, pero tu nivel lo marcan tus ingresos propios, y todavía no hay un comprobante.",
        sinComprobante: "Todavía no cobras con comprobante a un cliente propio.",
        nivel1: "Ya cobraste a un cliente propio. Tus ingresos propios todavía no cubren tu costo de vida tres meses seguidos.",
        nivel2: "Tus ingresos propios cubren tu costo de vida tres meses seguidos. Para el nivel 3 te falta llegar a 1,2 veces.",
        sinColchonCalculado: "Ya llegas a 1,2 veces tu costo de vida. Te falta calcular tu colchón con la K.1, que toma 20 minutos.",
        colchonCorto: "Ya llegas a 1,2 veces tu costo de vida. Te falta la segunda condición, un colchón de 6 meses.",
        nivel3: "Cumples las dos condiciones del punto de no retorno.",
      },
      pasos: {
        salio: {
          capitulo: "Capítulo 5",
          body: "Antes de firmar tu salida, llena la K.3 y anota la fecha límite para impugnar o reclamar. Revisa tu liquidación con un abogado laboral y después recalcula tu runway con la K.1.",
          boton: "Abrir la K.3",
        },
        proyecto: {
          capitulo: "Capítulo 13",
          body: "Calcula cuánto te deja un cliente durante toda la relación y cuánto llega a tu bolsillo después del costo fijo y el impuesto.",
          boton: "Abrir la 13.1",
        },
        nivel0: {
          capitulo: "Capítulo 1",
          body: "Calcula tu runway y lo que te permite tu contrato. Son las dos primeras plantillas del kit, unos 50 minutos en total.",
          boton: "Descarga el kit",
        },
        nivel1: {
          capitulo: "Capítulo 18",
          body: "Suma un segundo rol o un producto sin que un cliente pase de la mitad de tus ingresos. Mide tus roles juntos el primer día de cada mes.",
          boton: "Abrir la 18.1",
        },
        nivel2: {
          capitulo: "Capítulos 19 y 20",
          body: "Mide cada mes las dos condiciones del punto de no retorno y prepara la conversación con tu empleador.",
          boton: "Abrir la 19.1",
        },
        nivel3: {
          capitulo: "Capítulo 21",
          body: "Revisa tus números cada mes y arma un plan de 90 días que baje tu mayor riesgo. Si quieres convertir tu portafolio en una firma o un producto, agenda una conversación con el equipo.",
          boton: "",
        },
      },
    },
    resultado: {
      tuResultado: "Tu resultado",
      titulo: "Nivel {k}: {nombre}",
      nivelDe: "Nivel {k} de 3",
      siguientePaso: "Tu siguiente paso",
      delLibro: "{capitulo} del libro",
      avisoColchon: "Tu colchón no llega a 6 meses o no lo has calculado. Empieza por la K.1 del kit, que toma 20 minutos, y después sigue con {lista}.",
      la: "la {code}",
      y: " y ",
      abrirK1: "Abrir la K.1",
      anota: "Anota tu nivel con la fecha en «Tu nivel en la escalera», al comienzo del workbook.",
      senal: "Señal para pasar al siguiente",
      sostener: "Para sostener el nivel 3",
      acompana: "Te acompaña",
      volver: "Volver a empezar el diagnóstico",
      enviarTitulo: "Recibe tu resultado y el kit en tu correo",
      enviado: "Listo. Te enviamos tu nivel y el kit «Plan de salida» a {correo}.",
      enviar: "Enviar",
      error: "No pudimos registrar tus datos en este momento. Escríbenos por {wa} y te respondemos con tu siguiente paso.",
      waMensaje: "Hola, hice el diagnóstico y salí en el nivel {k}, {nombre}.",
      enEspanol: "",
    },
  },

  programas: {
    meta: {
      titulo: "Programas por nivel",
      descripcion:
        "Taller «Tu primer rol parcial», programa Primer Mandato, mastermind Portafolio, sesiones individuales de transición y coconstrucción: cada uno para un nivel de la escalera.",
    },
    hero: {
      label: ["Programas", "Ordenados por nivel"],
      title: "Lo que te acompaña en cada nivel",
      lead: "Cinco programas, del taller de dos sesiones al sprint de 90 días.",
      diag: "¿No sabes tu nivel? Haz el diagnóstico",
      kit: "Nivel 0: empieza por el kit gratuito",
    },
    aria: "Programas",
    formato: "Formato",
    paraTi: "Es para ti si",
    agendaSr: " para {nombre} (se abre en otra pestaña)",
    postularSr: ": {nombre}",
    nota: "Cada programa trabaja sobre tus números y tu mercado, y la decisión de cuándo avanzar es tuya.",
    postular: {
      label: ["Postulación", "Fechas y cupos"],
      title: "Te escribimos con las fechas de la próxima convocatoria",
      sub: "Las fechas, los cupos y las condiciones se publican con cada convocatoria.",
      conversar: "Si prefieres conversar antes,",
      wa: "o escríbenos por WhatsApp",
      waMensaje: "Hola, quiero información sobre los programas de Future Founders.",
    },
    /** Programas por id (el nivel y el orden viven en src/content/programas.ts). Sin precios: se publican con cada convocatoria. */
    lista: {
      taller: {
        levelLabel: "Nivel 0, preparando el 1",
        tag: "Taller",
        name: "Tu primer rol parcial",
        desc: "Escribes tu oferta en una página y le pones precio, junto a ejecutivos que están en el mismo punto.",
        format: "2 sesiones de 3 horas en vivo",
        forWho: "Ya mediste tu runway y lo que permite tu contrato, y quieres definir qué ofreces y a qué precio.",
        cta: "Ver fechas",
      },
      "primer-mandato": {
        levelLabel: "Nivel 0, preparando el 1",
        tag: "Programa",
        name: "Primer Mandato",
        desc: "Cohorte en vivo para llegar a tu primer comprobante, con oferta, precio, contrato modelo, 30 cuentas objetivo y 10 conversaciones.",
        format: "8 semanas, de 12 a 20 personas",
        forWho: "Tienes tu oferta clara y quieres acompañamiento semana a semana hasta emitir tu primer comprobante.",
        cta: "Postular",
      },
      mastermind: {
        levelLabel: "Nivel 1, camino al 2",
        tag: "Mastermind",
        name: "Portafolio",
        desc: "Grupos de pares que revisan oportunidades, precios y referidos cada quince días.",
        format: "Grupos de 8 a 10, de 6 a 12 meses",
        forWho: "Ya tienes al menos un cliente propio y quieres sumar roles hasta que tus ingresos propios paguen los gastos de tu casa.",
        cta: "Postular",
      },
      sesiones: {
        levelLabel: "Nivel 2, camino al 3",
        tag: "Acompañamiento",
        name: "Sesiones individuales de transición",
        desc: "Planificas tu salida midiendo las dos condiciones del punto de no retorno.",
        format: "6 a 8 sesiones",
        forWho: "Tus ingresos propios se acercan a 1,2 veces tu costo de vida y estás decidiendo si sales de tu cargo y cuándo.",
        cta: "Agenda 30 minutos",
      },
      coconstruccion: {
        levelLabel: "Nivel 3",
        tag: "Sprint",
        name: "Coconstrucción",
        desc: "Convertimos tu portafolio en una firma o un producto, junto a ti.",
        format: "Sprint de 90 días",
        forWho: "Vives de tu portafolio y quieres que deje de depender solo de tus horas.",
        cta: "Agenda 30 minutos",
      },
    } as Record<ProgramaId, Programa>,
    form: {
      programa: "Programa",
      opcion: "{tag}: {nombre}",
      mensaje: "Tu situación en dos líneas (opcional)",
      mensajePh: "Cargo, años de carrera y en qué nivel de la escalera crees que estás",
      verFechas: "Quiero ver las fechas",
      enviar: "Enviar postulación",
      recibida: "Recibimos tu postulación a {nombre}.",
      teEscribimos: "Te escribimos a {correo} con las fechas, los cupos y las condiciones de la próxima convocatoria.",
      invalido: "Escribe tu nombre y un correo válido.",
      error: "No pudimos registrar tu postulación en este momento. Escríbenos por {wa} y te respondemos con las fechas.",
      waMensaje: "Hola, soy {nombre}. Quiero postular a {programa}.",
      enEspanol: "",
    },
  },

  workbook: {
    meta: {
      titulo: "Workbook de Doble Agente",
      descripcion:
        "Descarga gratis el workbook de Doble Agente: el kit K.1 a K.5, una plantilla por capítulo, los anexos por país y el cierre. Cada código QR del libro lleva aquí, y las plantillas que hacen cuentas tienen su calculadora en línea.",
      parteTitulo: "Workbook, Parte {n}: {nombre}",
      parteDescripcion: "Las plantillas del workbook de la Parte {n}, {nombre}, de Doble Agente.",
      plantillaTitulo: "Plantilla {code}: {titulo}",
      conCalculadora: " Con calculadora en línea.",
    },
    /** Rótulo del tipo de plantilla (antes kindLabel en workbook-util.ts). */
    tipo: { kit: "Kit «Plan de salida»", capitulo: "Parte {n}", anexo: "Anexo por país", cierre: "Cierre del libro" },
    indice: {
      label: ["Doble Agente", "Workbook gratis"],
      title: "Las plantillas del workbook",
      qr: "Cada capítulo del libro cierra con un código QR que lleva a su plantilla.",
      icono: "Las plantillas con este icono hacen cuentas y tienen su calculadora en línea en su página.",
      calcTitle: "Calculadora en línea",
      calcSr: ", con calculadora en línea",
      kit: "Kit «Plan de salida»",
      kitSub: "Va antes de la Parte 01 del libro",
      parte: "Parte {n}, {nombre}",
      verParte: "Ver la parte",
      anexos: "Anexos y cierre",
    },
    parte: {
      label: ["Workbook", "Parte {n}"],
      lead: "Llénalas en orden, porque cada una usa datos de la anterior.",
      todas: "Ver todas las plantillas",
    },
    plantilla: {
      workbook: "Workbook",
      plantilla: "Plantilla {code}",
      tiempo: "Tiempo",
      enLibro: "En el libro",
      nivel: "Nivel",
      ejemplo: "Ejemplo resuelto",
      paginas: "Páginas",
      libroPag: "libro {n}",
      workbookPag: "workbook {n}",
      paraQue: "Para qué sirve",
      antes: "Antes de empezar",
      arriba: "Arriba de la hoja",
      cadaDato: "{label}, cada dato en su campo:",
      trabajaCap: "Lo que trabaja el capítulo {n}",
      trabajaSec: "Lo que trabaja esta sección",
      necesitas: "Necesitas antes",
      terminaste: "Sabrás que terminaste cuando…",
      donde: "Dónde se llena",
      dondeKit: "En el kit «Plan de salida» o en el workbook. Los dos se descargan gratis.",
      dondeWb: "En el workbook, en una tableta, en la computadora o en papel.",
      descargaKit: "Descarga el kit",
      descargaWb: "Descarga el workbook",
      calcK1: "Calculadora en línea de la K.1",
      otras: "Otras plantillas",
      anterior: "Anterior",
      siguiente: "Siguiente",
      parteN: "Parte {n}, {nombre}",
      todas: "Todas las plantillas",
    },
  },

  actualizaciones: {
    meta: {
      titulo: "Valores del año",
      descripcion:
        "Las cifras de Doble Agente que cambian cada año (UIT, UMA, UVT, salario mínimo, UF y tasas de retención) en Perú, México, Colombia y Chile, con el valor 2026 del libro y el sitio oficial donde verificar el vigente.",
    },
    label: ["Doble Agente", "Anexos por país"],
    title: "Valores del año",
    lead: "Las cifras que cambian cada año van marcadas «valor 2026» en el libro.",
    leadPendiente: " Cuando la autoridad fije el valor del año, lo sumamos a la tabla.",
    paises: "Países",
    cols: { cifra: "Cifra", v2026: "Valor 2026 en el libro", donde: "Dónde se usa", vigente: "Valor vigente", verificar: "Dónde verificar" },
    pendiente: "Pendiente",
    tramites: "Trámites en curso",
    revision: "Última revisión: {fecha}",
    nota: "Las reglas cambian entre países y con el tiempo. Antes de firmar un contrato, aceptar un rol o emitir tu primer comprobante, valida tu caso con un especialista.",
    otroPais:
      "Si tu país no está aquí, el método funciona igual; lleva las preguntas de cada anexo a tu abogado o abogada laboral y a tu contador o contadora.",
    verPlantillas: "Ver las plantillas del workbook",
    /** Fecha de la última revisión. La revisión anual cambia estos datos: llena `vigente` cuando la autoridad fije el valor del año. */
    fecha: "30 de octubre de 2026",
    datos: [
      {
        id: "peru",
        pais: "Perú",
        anexo: "Anexo A y plantilla A.1",
        valores: [
          { nombre: "UIT", v2026: "S/ 5.500", donde: "Anexo A, secciones 3 y 4", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
          {
            nombre: "Monto del recibo por honorarios desde el que el cliente retiene el 8 %",
            v2026: "S/ 1.500",
            donde: "Capítulo 16, plantillas 16.1 y A.1",
            fuente: { label: "SUNAT, pagos a cuenta de cuarta categoría", href: "https://orientacion.sunat.gob.pe/node/283" },
          },
          {
            nombre: "Tope de ingresos de cuarta y quinta categoría para pedir la suspensión de retenciones",
            v2026: "S/ 48.125 (S/ 38.500 si eres director de empresa, síndico o mandatario)",
            donde: "Anexo A, sección 3",
            fuente: { label: "SUNAT, R. S. 000390-2025/SUNAT", href: "https://www.sunat.gob.pe/legislacion/superin/2025/000390-2025.pdf" },
          },
          { nombre: "Tope de la deducción del 20 % de cuarta categoría (24 UIT)", v2026: "S/ 132.000", donde: "Anexo A, sección 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
          { nombre: "Deducción de 7 UIT de las rentas de trabajo", v2026: "S/ 38.500", donde: "Anexo A, sección 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
          { nombre: "Renta neta desde la que se aplica el 30 % (45 UIT)", v2026: "S/ 247.500", donde: "Anexo A, sección 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
        ],
        tramites: [
          "Aportes a pensiones de los independientes: la Ley 32445 los volvió voluntarios. Así estaban al 30 de octubre de 2026; confirma su estado con tu contador o contadora.",
          "CTS: para el ahorro líquido de la K.1 cuenta solo la parte que hoy puedes retirar. Esa parte cambia cuando una ley autoriza retiros extraordinarios; confírmala con tu banco el mes en que calculas.",
        ],
      },
      {
        id: "mexico",
        pais: "México",
        anexo: "Anexo B y plantilla B.1",
        valores: [
          {
            nombre: "Salario mínimo general, al día",
            v2026: "MXN 315,04",
            donde: "Anexo B, prima de antigüedad",
            fuente: { label: "Diario Oficial de la Federación", href: "https://www.dof.gob.mx" },
          },
          {
            nombre: "Tope diario de la prima de antigüedad (doble del salario mínimo)",
            v2026: "MXN 630,08",
            donde: "Anexo B, prima de antigüedad",
            fuente: { label: "Diario Oficial de la Federación", href: "https://www.dof.gob.mx" },
          },
          {
            nombre: "UMA, al día",
            v2026: "MXN 117,31",
            donde: "Anexo B, exención del ISR por separación",
            fuente: { label: "INEGI, UMA 2026", href: "https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/uma/uma2026.pdf" },
          },
        ],
        tramites: [],
      },
      {
        id: "colombia",
        pais: "Colombia",
        anexo: "Anexo C y plantilla C.1",
        valores: [
          { nombre: "Salario mínimo mensual", v2026: "COP 1.750.905", donde: "Anexo C, secciones 1 y 4", fuente: { label: "Consejo de Estado", href: "https://www.consejodeestado.gov.co" } },
          { nombre: "Diez salarios mínimos (base del salario integral)", v2026: "COP 17.509.050", donde: "Anexo C, sección 1", fuente: { label: "Ministerio del Trabajo", href: "https://www.mintrabajo.gov.co" } },
          { nombre: "UVT", v2026: "COP 52.374", donde: "Anexo C, secciones 2 y 3", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "204 UVT (retención del 20 % de la indemnización)", v2026: "COP 10.684.296", donde: "Anexo C, sección 2", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "790 UVT (tope anual de la renta exenta del 25 %)", v2026: "COP 41.375.460", donde: "Anexo C, sección 2", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "3.500 UVT (responsable de IVA)", v2026: "COP 183.309.000", donde: "Anexo C, sección 3, y plantilla C.1", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "Tope de la base de cotización (25 salarios mínimos)", v2026: "COP 43.772.625", donde: "Anexo C, sección 4", fuente: { label: "UGPP", href: "https://www.ugpp.gov.co" } },
          { nombre: "Base desde la que se aporta al Fondo de Solidaridad Pensional (4 salarios mínimos)", v2026: "COP 7.003.620", donde: "Anexo C, sección 4", fuente: { label: "UGPP", href: "https://www.ugpp.gov.co" } },
        ],
        tramites: [
          "Salario mínimo: al 30 de octubre de 2026, el decreto del salario mínimo de ese año estaba en revisión en el Consejo de Estado. Usa el salario mínimo vigente del año en que calculas.",
          "Reforma pensional: la Ley 2381 de 2024 cambiaría las tarifas de los aportes. Al 30 de octubre de 2026 no estaba claro desde cuándo rige; confírmalo con tu contador o contadora antes de pagar tu PILA.",
        ],
      },
      {
        id: "chile",
        pais: "Chile",
        anexo: "Anexo D y plantilla D.1",
        valores: [
          {
            nombre: "Retención de la boleta de honorarios",
            v2026: "15,25 %",
            donde: "Capítulo 16, plantillas 16.1 y D.1",
            fuente: { label: "SII, boletas de honorarios", href: "https://www.sii.cl/destacados/boletas_honorarios/index.html" },
          },
          {
            nombre: "UF que usa el libro para sus cuentas",
            v2026: "CLP 39.500",
            donde: "Anexo D y plantilla D.1",
            fuente: { label: "SII, valores de la UF", href: "https://www.sii.cl" },
          },
          { nombre: "Tope de 90 UF para calcular la indemnización", v2026: "CLP 3.555.000", donde: "Anexo D, sección 2, y plantilla D.1", fuente: { label: "Dirección del Trabajo", href: "https://www.dt.gob.cl" } },
        ],
        tramites: [
          "Datos personales: la Ley 21.719 modifica de forma amplia la Ley 19.628 y crea la Agencia de Protección de Datos Personales. Al 30 de octubre de 2026 su entrada en vigencia estaba fijada para el 1 de diciembre de 2026 y había un proyecto para postergarla. Confirma en LeyChile la fecha vigente antes de preparar tu política de datos.",
        ],
      },
    ] as Pais[],
  },

  /**
   * Textos de /privacidad y /terminos. Describen lo que la web hace hoy (formularios a la hoja de Google de los fundadores
   * por /api/registro y apps-script/Code.gs, correo de confirmación, calculadoras en el navegador, sin analítica).
   * Texto base, pendiente de revisión legal: ver PENDIENTES-WEB.md.
   */
  legal: {
    privacidad: {
      title: "Política de privacidad",
      description:
        "Qué datos guarda Future Founders cuando llenas un formulario, dónde se guardan, para qué se usan y cómo dejas de recibir correos o pides que los borremos.",
      label: ["Legal", "Privacidad"],
      vigente: VIGENTE,
      /** En inglés: «This is a translation. The Spanish version prevails.» En español, vacío. */
      aviso: "",
      bloques: [
        { h: "Quién responde por tus datos", p: [`${RESPONSABLE}. Contacto: ${EMAIL}.`] },
        {
          h: "Qué datos guardamos",
          p: [
            "Solo los que escribes en un formulario. Al pedir el kit «Plan de salida» o el workbook: nombre, correo, situación laboral y país. Al pedir el resultado del diagnóstico de nivel: nombre, correo, tu nivel y tus respuestas sobre situación, ingresos propios y colchón. Al postular a un programa: programa, nombre, correo, país y el mensaje que escribas.",
            "Junto a cada registro queda la fecha y la hora. En los formularios de descarga queda también la página desde la que lo enviaste.",
          ],
        },
        {
          h: "Dónde se guardan",
          p: [
            "El sitio se aloja en Vercel, que procesa cada envío de formulario y lo pasa a una hoja de cálculo de Google a la que solo acceden los fundadores de Future Founders. Google presta el servicio de la hoja y del correo. Vercel y Google guardan los datos en servidores fuera del Perú, principalmente en Estados Unidos.",
          ],
        },
        {
          h: "Para qué los usamos",
          p: [
            "Para enviarte un correo de confirmación con el PDF que pediste o con la respuesta a tu postulación, para avisar al equipo de que llegó tu registro y para escribirte sobre el libro y los programas. No vendemos ni cedemos tus datos.",
          ],
        },
        {
          h: "Cuánto tiempo los guardamos",
          p: [
            "Mientras sigas recibiendo nuestros correos y hasta 24 meses después de tu último registro o de tu última respuesta. Si pides la baja o que borremos tus datos, dejamos de escribirte de inmediato y los borramos de la hoja en un plazo máximo de 30 días. Los datos de una compra se guardan el tiempo que exige la ley tributaria.",
          ],
        },
        {
          h: "Cómo dejas de recibir correos",
          p: [`Responde cualquier correo nuestro con la palabra «baja». Para corregir o borrar tus datos, escribe a ${EMAIL}.`],
        },
        {
          h: "Las calculadoras",
          p: [
            "Los números que escribes en las calculadoras del sitio se guardan solo en tu navegador, en su almacenamiento local, para que los encuentres al volver. No llegan a nuestros servidores y se borran al limpiar los datos del navegador.",
          ],
        },
        { h: "El diagnóstico de nivel", p: ["Tus respuestas se quedan en tu navegador. Solo se envían si pides el resultado por correo."] },
        {
          h: "Ley aplicable y tus derechos",
          p: [
            `Esta política se rige por la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento. Puedes pedir acceso, rectificación, cancelación u oposición sobre tus datos escribiendo a ${EMAIL}, y te respondemos dentro de los plazos de esa ley. Si no quedas conforme con la respuesta, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.`,
          ],
        },
        { h: "Cookies", p: ["El sitio no usa cookies de publicidad ni de seguimiento."] },
        {
          h: "Enlaces a otros servicios",
          p: ["Los botones de WhatsApp, Amazon, Mercado Pago y la agenda de Google Calendar abren servicios de terceros, con sus propias políticas."],
        },
        { h: "Cambios", p: ["Si esta política cambia, publicamos aquí la versión nueva con su fecha."] },
      ],
    } as Legal,
    terminos: {
      title: "Términos de uso",
      description:
        "Condiciones de uso de futurefounders.pe: qué ofrece el sitio, cómo se compra el libro, el alcance de las calculadoras y el diagnóstico, y el uso del material.",
      label: ["Legal", "Términos"],
      vigente: VIGENTE,
      /** En inglés: «This is a translation. The Spanish version prevails.» En español, vacío. */
      aviso: "",
      bloques: [
        { h: "Quién opera el sitio", p: [`${RESPONSABLE}. Contacto: ${EMAIL}.`] },
        {
          h: "Qué ofrece",
          p: ["Información sobre el libro Doble Agente y los programas, el kit «Plan de salida» y el workbook en PDF sin costo, el diagnóstico de nivel y calculadoras en línea."],
        },
        {
          h: "Sin asesoría ni promesas",
          p: [
            "Nada en este sitio es asesoría legal, tributaria ni financiera, ni una promesa de ingresos. Las reglas por país son la regla general; verifica la norma vigente y consulta a un profesional antes de decidir.",
          ],
        },
        {
          h: "Calculadoras y diagnóstico",
          p: ["Hacen cuentas con los números que tú escribes. El resultado depende de esos números y sirve como referencia."],
        },
        {
          h: "Compras",
          p: [
            "El ebook y el impreso se compran en Amazon, con las condiciones de Amazon. El libro en PDF se paga con Mercado Pago, con las condiciones de Mercado Pago.",
            `Después del pago con Mercado Pago te enviamos el PDF al correo que registraste en el pago, en un plazo máximo de 6 horas. Si no te llega en ese plazo o el archivo no abre, escríbenos a ${EMAIL} y te lo reenviamos. Si no podemos entregártelo, te devolvemos el pago completo. Como es un producto digital, una vez entregado el PDF solo hay devolución si el archivo tiene una falla que no podamos corregir.`,
          ],
        },
        { h: "Programas", p: ["Las fechas, los cupos, el precio y las condiciones de cada programa se informan en cada convocatoria."] },
        {
          h: "Uso del material",
          p: [
            "El libro, el workbook, el kit y los textos del sitio son de sus autores. Puedes usar las plantillas para tu propio plan; no puedes revenderlas ni publicarlas como propias.",
          ],
        },
        { h: "Personajes", p: ["Carmen, Javier, Andrea y Rodrigo son arquetipos del libro, armados a partir de conversaciones reales."] },
        {
          h: "Ley aplicable",
          p: [
            `Estos términos se rigen por las leyes del Perú, incluido el Código de Protección y Defensa del Consumidor (Ley N.º 29571). Para un reclamo, escríbenos a ${EMAIL}.`,
          ],
        },
        { h: "Cambios", p: ["Estos términos pueden cambiar. La versión vigente es la publicada aquí, con su fecha."] },
      ],
    } as Legal,
  },

  noEncontrada: {
    label: ["Error 404"],
    title: "Esta página no existe",
    lead: "Si llegaste desde un código QR del libro, revisa el índice del workbook.",
    inicio: "Ir al inicio",
    workbook: "Ver el workbook",
  },

  /** Imágenes para compartir (opengraph-image de cada página): rótulo, titular y texto alternativo. */
  og: {
    /** El titular es sitio.heroTitle; el texto alternativo lo lleva en minúscula inicial. */
    inicio: { kicker: "Para ejecutivos senior en Latinoamérica", alt: "Future Founders: {titulo}" },
    libro: { kicker: "Libro y workbook, 2.ª edición", title: "Doble Agente", alt: "Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz. Libro y workbook." },
    kit: {
      kicker: "Kit gratuito, Plan de salida",
      title: "Calcula cuántos meses aguantas sin sueldo",
      alt: "Kit «Plan de salida» de Future Founders: calcula cuántos meses aguantas sin sueldo con cinco plantillas gratuitas",
    },
    diagnostico: { kicker: "Gratis, cuatro preguntas", title: "Diagnóstico de nivel", alt: "Diagnóstico de nivel de Future Founders: cuatro preguntas para saber en qué nivel de la escalera estás" },
    programas: { kicker: "Programas por nivel", title: "Lo que te acompaña en cada nivel", alt: "Programas de Future Founders ordenados por nivel de la escalera" },
    workbook: { kicker: "Doble Agente, workbook gratis", title: "Las plantillas del workbook", alt: "Workbook de Doble Agente: las plantillas del libro, gratis" },
    actualizaciones: { kicker: "Doble Agente, anexos por país", title: "Valores del año", alt: "Valores del año de los anexos por país de Doble Agente" },
    privacidad: { kicker: "Legal", title: "Política de privacidad", alt: "Política de privacidad de Future Founders" },
    terminos: { kicker: "Legal", title: "Términos de uso", alt: "Términos de uso de Future Founders" },
  },
};

/* ------------------------------------------------------------ tipos */

export type Arch = {
  who: "carmen" | "javier" | "andrea" | "rodrigo";
  /** Nivel de la escalera en que empieza el arquetipo (Carmen, Andrea y Javier en el 0; Rodrigo en el 2). */
  level: number;
  tag: string;
  name: string;
  role: string;
  rows: [string, string][];
  voice: string;
  start: string;
  href: string;
};
export type Programa = { levelLabel: string; tag: string; name: string; desc: string; format: string; forWho: string; cta: string };
export type Stat = { prefix?: string; value: number; decimals?: number; suffix: string; label: string };
export type TocExtremo = { n1: string; n2: string; items: [string, string][] };
export type Valor = {
  nombre: string;
  /** Valor 2026 tal como lo imprime el anexo. */
  v2026: string;
  donde: string;
  fuente: { label: string; href: string };
  vigente?: string;
};
export type Pais = { id: string; pais: string; anexo: string; valores: Valor[]; tramites: string[] };
export type Bloque = { h: string; p: string[] };
export type Legal = { title: string; description: string; label: string[]; vigente: string; aviso: string; bloques: Bloque[] };

/** Forma de los diccionarios. en.ts se declara con este tipo: una clave que falte o sobre rompe el build. */
export type Dict = typeof es;
