// Textos del sitio, tomados de los tableros aprobados (web-tools/web_gen.py).

export const SITE_URL = "https://futurefounders.pe";
export const EMAIL = "ff@redesignlab.org";
export const WHATSAPP_NUMBER = "51989338401";
export const WHATSAPP_LABEL = "+51 989 338 401";
export const LEGAL =
  "Nada en este sitio es asesoría legal, tributaria ni financiera, ni una promesa de ingresos.";
/** Titular del pie (decisión del dueño, 16/11/2026). */
export const COPYRIGHT = ["© 2026 Future Founders", "Soluciones Regenerativas LLC"];
/** Responsable de los datos y operador del sitio, en /privacidad y /terminos. */
export const RESPONSABLE = "Future Founders, una marca de Soluciones Regenerativas LLC (Estados Unidos)";
export const INSTAGRAM_URL = "https://www.instagram.com/futurefounders.pe/";

/**
 * Línea única bajo los cuatro formularios (descarga, cierre, diagnóstico y postulación).
 * El componente PrivacidadLinea (ui.tsx) enlaza «política de privacidad» a /privacidad.
 */
export const PRIVACIDAD_LINEA = {
  antes: "Usamos tus datos como explica la ",
  enlace: "política de privacidad",
  despues: ". Para dejar de recibir correos, responde «baja».",
};

/** Situación de quien llena un formulario: etiqueta larga (diagnóstico) y corta (formularios de descarga). */
export const SITUACIONES = [
  { largo: "Tengo empleo", corto: "Tengo empleo" },
  { largo: "Acabo de salir de mi empresa", corto: "Acabo de salir" },
  { largo: "Tengo un proyecto o una pyme propia", corto: "Tengo un proyecto" },
] as const;

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** URL de la página de citas de Google Calendar («Agenda 30 minutos»). Si no está definida, abre WhatsApp. */
export function agendaUrl() {
  return (
    process.env.NEXT_PUBLIC_AGENDA_URL ||
    whatsappUrl("Hola, quiero agendar 30 minutos con el equipo de Future Founders.")
  );
}

/** Hay página de citas propia. Sin ella, «Agenda 30 minutos» ya abre WhatsApp y no se ofrece WhatsApp aparte. */
export const HAY_AGENDA = Boolean(process.env.NEXT_PUBLIC_AGENDA_URL);

/** Titular de la portada y de la imagen para compartir general. Texto del dueño: se respeta tal cual. */
export const HERO_TITLE = "Tu experiencia puede trabajar para más de una empresa. O para la tuya.";

export const LEVELS = ["Salario", "Primer rol parcial", "Portafolio", "Independencia"] as const;

export const LOOK = [
  "Todo tu ingreso viene de un empleador.",
  "Tienes un cliente propio, junto a tu cargo o después de él.",
  "Varios roles o productos pagan los gastos de tu casa.",
  "Tus ingresos propios sostienen tu vida con margen.",
];

export const SIGNAL = [
  "Emitiste o recibiste tu primer comprobante por un rol parcial.",
  "Tus ingresos propios netos cubren tu costo de vida tres meses seguidos.",
  "Cumples las dos condiciones del punto de no retorno.",
  "Revisas tus números cada mes y tu plan de 90 días baja tu mayor riesgo.",
];

export const CHAPS = ["Partes 01 a 04", "Capítulo 18", "Capítulos 19 y 20", "Capítulo 21"];

export const DO_NOW: { head: string; body: string }[] = [
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
];

export type WithItem = { name: string; meta: string; href: string };
export const WITH: WithItem[][] = [
  [
    { name: "Kit «Plan de salida»", meta: "Gratis", href: "/kit" },
    { name: "Diagnóstico de nivel", meta: "Gratis", href: "/diagnostico" },
    { name: "Taller «Tu primer rol parcial»", meta: "2 sesiones de 3 horas", href: "/programas#taller" },
    { name: "Primer Mandato", meta: "Cohorte de 8 semanas", href: "/programas#primer-mandato" },
  ],
  [{ name: "Mastermind «Portafolio»", meta: "Grupos de 8 a 10", href: "/programas#mastermind" }],
  [{ name: "Sesiones individuales de transición", meta: "6 a 8 sesiones", href: "/programas#sesiones" }],
  [{ name: "Coconstrucción", meta: "Sprint de 90 días", href: "/programas#coconstruccion" }],
];

export const HERE = [
  "Aquí empiezan Carmen, Andrea y Javier.",
  "Javier es el primero en llegar, con un rol de director comercial dos días por semana.",
  "Aquí empieza Rodrigo, con su pyme y un rol parcial.",
  "Rodrigo trabaja este tramo en el capítulo 19.",
];

export const LECTURA =
  "La mayor parte del libro está en el nivel 0. Las cuatro primeras partes preparan el primer cliente, que en nuestras conversaciones es el paso que más ejecutivos postergan. Desde el primer cliente, la Parte 05 trabaja con tus cobros reales.";

export type Arch = {
  who: "carmen" | "javier" | "andrea" | "rodrigo";
  /** Nivel de la escalera en que empieza el arquetipo (HERE: Carmen, Andrea y Javier en el 0; Rodrigo en el 2). */
  level: number;
  tag: string;
  name: string;
  role: string;
  rows: [string, string][];
  voice: string;
  start: string;
  href: string;
};

export const ARCH: Arch[] = [
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
];

export const ARCH_NOTE =
  "Carmen, Javier, Andrea y Rodrigo son arquetipos del libro, armados a partir de conversaciones con ejecutivos. No son personas reales.";

export type Product = { tag: string; name: string; desc: string; meta: string; cta: string; href: string };
export const PRODUCTS: Product[][] = [
  [
    { tag: "Gratis", name: "Kit «Plan de salida» y Diagnóstico de nivel", desc: "Cinco plantillas para saber cuántos meses aguantas sin sueldo y un cuestionario que te dice en qué nivel estás.", meta: "Unas 2 horas", cta: "Descargar el kit", href: "/kit" },
    { tag: "Libro", name: "Doble Agente", desc: "21 capítulos en cinco partes, con una plantilla del workbook por capítulo.", meta: "Ebook, impreso y PDF", cta: "Ver el libro", href: "/libro" },
    { tag: "Taller", name: "Tu primer rol parcial", desc: "Escribes tu oferta en una página y le pones precio, junto a ejecutivos que están en el mismo punto.", meta: "2 sesiones de 3 horas en vivo", cta: "Ver fechas", href: "/programas#taller" },
    { tag: "Programa", name: "Primer Mandato", desc: "Cohorte en vivo para llegar a tu primer comprobante, con oferta, precio, contrato modelo, 30 cuentas objetivo y 10 conversaciones.", meta: "8 semanas, de 12 a 20 personas", cta: "Ver la próxima cohorte", href: "/programas#primer-mandato" },
  ],
  [
    { tag: "Mastermind", name: "Portafolio", desc: "Grupos de pares que revisan oportunidades, precios y referidos cada quince días.", meta: "Grupos de 8 a 10, de 6 a 12 meses", cta: "Postular", href: "/programas#mastermind" },
  ],
  [
    { tag: "Acompañamiento", name: "Sesiones individuales de transición", desc: "Planificas tu salida midiendo las dos condiciones del punto de no retorno.", meta: "6 a 8 sesiones", cta: "Agenda 30 minutos", href: "/programas#sesiones" },
  ],
  [
    { tag: "Sprint", name: "Coconstrucción", desc: "Convertimos tu portafolio en una firma o un producto, junto a ti, en un sprint de 90 días.", meta: "Sprint de 90 días", cta: "Agenda 30 minutos", href: "/programas#coconstruccion" },
  ],
];

/**
 * Cifras de Future Founders (decisión del dueño, 16/11/2026): suman la trayectoria de sus fundadores
 * y la de los participantes de sus programas. Se muestran con la nota CIFRAS_NOTA.
 */
export const STATS: { prefix?: string; value: number; decimals?: number; suffix: string; label: string }[] = [
  { value: 155, suffix: "+", label: "ejecutivos formados" },
  { value: 10, suffix: "+", label: "empresas construidas" },
  { prefix: "USD ", value: 26, suffix: "M+", label: "facturados" },
  { prefix: "USD ", value: 2.7, decimals: 1, suffix: "M+", label: "capital levantado" },
];

export const CIFRAS_NOTA = "Suman la trayectoria de los fundadores y la de los participantes de los programas.";

// Bios de los fundadores.
// Fuente: https://eddieajalcrina.com (inicio, /trayectoria, /cv) y https://lorenzoortiz.co (inicio, /trayectoria),
// leídas el 15/11/2026. Cada dato de `cred` y `bio` está ahí; no agregar ninguno que no esté.
// Los cargos de `role` («CEO y cofundador», «COO y cofundador») vienen de la web anterior de Future Founders,
// escrita por ellos (decisión del dueño, 16/11/2026).
export const FOUNDERS = [
  {
    key: "eddie",
    name: "Eddie Ajalcriña",
    role: "CEO y cofundador",
    cred: "Docente en MIT Professional Education desde 2022",
    bio: "Lleva más de 15 años entre la industria, la cooperación internacional y el emprendimiento. Lideró la estrategia de sostenibilidad de TASA, del grupo Breca, y dirigió la sostenibilidad y los asuntos regulatorios de Alicorp-Vitapro en cuatro países entre 2019 y 2023. En 2021, todavía en Alicorp-Vitapro, cofundó Redesign Lab, que dirige como CEO y cuyo portafolio facturó USD 26 millones en 2025.",
    web: "eddieajalcrina.com",
    webUrl: "https://eddieajalcrina.com",
    linkedin: "https://www.linkedin.com/in/eddieajalcrina/",
    photo: "/img/eddie-ajalcrina.webp",
  },
  {
    key: "lorenzo",
    name: "Lorenzo Ortiz",
    role: "COO y cofundador",
    cred: "",
    bio: "Empezó en el Grupo Gloria y a fines de 2013 pasó a TASA, del Grupo Breca, donde dirigió a la vez dos plantas industriales. En 2021 dejó la vida corporativa y cofundó Redesign Lab con Eddie. Desde entonces evalúa proyectos de inversión industrial en paralelo a sus otros roles, con más de 20 empresas industriales en 7 países.",
    web: "lorenzoortiz.co",
    webUrl: "https://lorenzoortiz.co",
    linkedin: "https://www.linkedin.com/in/lorenzoortiz/",
    photo: "/img/lorenzo-ortiz.webp",
  },
];

export const LEARN = [
  "Calcular cuántos meses aguanta tu hogar sin sueldo y armar tu plan de salida.",
  "Encontrar problemas de USD 100.000 que tu mercado pagaría por resolver hoy.",
  "Ponerle precio a tu primer rol parcial y firmar tu primer contrato sin conflicto de interés.",
  "Pasar de un rol a un portafolio y medir cuándo llegas al punto de no retorno.",
];

export type KitItem = { code: string; title: string; purpose: string; time: string; icon: string; done: string; id: string };
export const KIT: KitItem[] = [
  { id: "k1", code: "K.1", title: "Tu runway hoy", purpose: "Saber cuántos meses aguantas sin sueldo.", time: "20 min", icon: "reloj", done: "Tienes tu runway con un decimal." },
  { id: "k2", code: "K.2", title: "Lo que dice tu contrato", purpose: "Saber qué puedes hacer fuera de tu cargo.", time: "30 min", icon: "documento", done: "Cada fila tiene una respuesta o una pregunta para el abogado." },
  { id: "k3", code: "K.3", title: "Tu salida en números", purpose: "Estimar tu indemnización antes de negociar o firmar.", time: "20 min", icon: "salida", done: "Sabes cuánto te correspondería y qué diferencia tienes con lo que te ofrecen." },
  { id: "k4", code: "K.4", title: "Tus primeros 30 días", purpose: "Tener decidido qué haces cada semana si sales.", time: "30 min", icon: "calendario", done: "Cada semana tiene al menos una decisión tuya escrita." },
  { id: "k5", code: "K.5", title: "Tus primeras 20 llamadas", purpose: "Saber a quién llamas y qué le dices.", time: "20 min", icon: "meta", done: "Tienes 20 nombres y la fecha de la primera llamada." },
];

export const NAV = [
  { label: "El método", href: "/#metodo" },
  { label: "Para quién es", href: "/#para-quien" },
  { label: "El libro", href: "/libro" },
  { label: "Programas", href: "/programas" },
  { label: "Nosotros", href: "/#nosotros" },
];

/** Ficha del libro en Amazon. Mientras no esté definida, lleva a la búsqueda del título. */
export const AMAZON_URL =
  process.env.NEXT_PUBLIC_AMAZON_URL || "https://www.amazon.com/s?k=Doble+Agente+Ajalcri%C3%B1a+Ortiz";
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "";
export const CHECKOUT_WHATSAPP = whatsappUrl(
  "Hola, quiero comprar Doble Agente en PDF. ¿Me indican cómo pagar?"
);
