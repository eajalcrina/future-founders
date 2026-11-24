// Diccionario en inglés: la MISMA forma que es.ts (tipo Dict), así una clave que falte o sobre rompe el build.
// Si una traducción difiere del español, prevalece el español (docs/reglas-diseno.md, sección 11).
// Glosario congelado del inglés: docs/terminos.txt, sección «English». Comillas “ ”, cifras 61,600 y 7.0, «25%».
// Las rutas de los enlaces se quedan en español («/programas#taller»): lh() en rutas.ts las lleva a /en al pintar.
// Las cifras de las calculadoras no se escriben aquí: se formatean con el idioma (61,600 y 7.0).
// Lo que sigue en español (PDF, correos, el libro) se avisa una vez por bloque con las claves `enEspanol` y `aviso`.

import { EMAIL } from "../content/sitio";
import type { Dict } from "./es";

const RESPONSABLE = "Future Founders, a brand of Soluciones Regenerativas LLC (United States)";
const VIGENTE = "In force since November 16, 2026";
const TRADUCCION = "This is a translation. The Spanish version prevails.";
const DESC =
  "Future Founders helps managers, directors and VPs in Latin America split their work into part-time roles, one at a time, until their own income covers their cost of living.";
/** Titular del dueño, traducido fiel. Propuesta a confirmar (PENDIENTES-WEB.md). */
const HERO_TITLE = "Your experience can work for more than one company. Or for your own.";
const LEGAL = "Nothing on this site is legal, tax or financial advice, or a promise of income.";

export const en: Dict = {
  /* ------------------------------------------------------------ comunes */
  comun: {
    saltar: "Skip to content",
    nuevaPestana: " (opens in a new tab)",
    agenda: "Book 30 minutes",
    nota: "Note",
    lectura: "Reading",
    detalle: "Details",
    /** «baja» es la palabra que lee apps-script/Code.gs para dar de baja: se queda en español. */
    privacidad: {
      antes: "We use your data as our ",
      enlace: "privacy policy",
      despues: " explains. To stop receiving emails, reply with the word “baja”.",
    },
    enviando: "Sending...",
    nombre: "Name",
    correo: "Email",
    pais: "Country",
    tuNombre: "Your name",
    correoEjemplo: "name@email.com",
    correoInvalido: "Check your email: something is missing for it to be valid.",
    whatsapp: "WhatsApp",
    nivel: "Level {k}",
    /** Lo que se envía es la etiqueta española de la misma posición (canonFormulario). */
    paises: ["Peru", "Mexico", "Colombia", "Chile", "Other country"],
    agendaWa: "Hi, I'd like to book 30 minutes with the Future Founders team.",
  },

  idioma: {
    grupo: "Language",
    nombres: { es: "Español", en: "English" },
    cortos: { es: "ES", en: "EN" },
  },

  /* ------------------------------------------------------------ metadatos del sitio */
  meta: {
    descripcion: DESC,
    tituloDefecto: "Future Founders | Your experience can work for more than one company",
    ogLocale: "en_US",
    areaServed: "Latin America",
  },

  /* ------------------------------------------------------------ encabezado y pie */
  nav: {
    items: [
      { label: "The method", href: "/#metodo" },
      { label: "Who it's for", href: "/#para-quien" },
      { label: "The book", href: "/libro" },
      { label: "Programs", href: "/programas" },
      { label: "About us", href: "/#nosotros" },
    ],
    inicioAria: "Future Founders, home",
    principalAria: "Main",
    menuAria: "Menu",
    diagnostico: "Level check",
    descargaKit: "Download the kit",
    kitGratis: "Free kit",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    kitPlan: "“Exit plan” kit",
  },
  footer: {
    lema: "We help senior executives in Latin America turn their experience into their own income, level by level.",
    cols: [
      {
        title: "The method",
        links: [
          { label: "The ladder", href: "/#metodo" },
          { label: "Who it's for", href: "/#para-quien" },
          { label: "Programs", href: "/programas" },
          { label: "About us", href: "/#nosotros" },
        ],
      },
      {
        title: "The book",
        links: [
          { label: "Doble Agente", href: "/libro" },
          { label: "The method in 21 ideas", href: "/libro#metodo" },
          { label: "The workbook", href: "/workbook" },
          { label: "Where to buy", href: "/libro#formatos" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "“Exit plan” kit", href: "/kit" },
          { label: "Level check", href: "/diagnostico" },
          { label: "Runway calculator", href: "/kit#calculadora" },
          { label: "Annual figures", href: "/actualizaciones" },
        ],
      },
    ],
    contacto: "Contact",
    whatsapp: "WhatsApp {numero}",
    waMensaje: "Hi, I'm writing from futurefounders.pe.",
    instagram: "Instagram",
    privacidad: "Privacy",
    terminos: "Terms",
    legal: LEGAL,
    copyright: ["© 2026 Future Founders", "Soluciones Regenerativas LLC"],
  },

  /* ------------------------------------------------------------ contenido compartido */
  sitio: {
    /** Lo que se envía es la etiqueta española de la misma posición (canonFormulario). */
    situaciones: [
      { largo: "I have a job", corto: "I have a job" },
      { largo: "I just left my company", corto: "I just left" },
      { largo: "I have my own project or small business", corto: "I have a project" },
    ],
    heroTitle: HERO_TITLE,
    levels: ["Salary", "First part-time role", "Portfolio", "Independence"],
    look: [
      "All your income comes from one employer.",
      "You have a client of your own, alongside your job or after it.",
      "Several roles or products pay your household expenses.",
      "Your own income supports your life with room to spare.",
    ],
    signal: [
      "You issued or received your first invoice for a part-time role.",
      "Your net own income covers your cost of living three months in a row.",
      "You meet both conditions of the point of no return.",
      "You review your numbers every month and your 90-day plan lowers your biggest risk.",
    ],
    chaps: ["Parts 01 to 04", "Chapter 18", "Chapters 19 and 20", "Chapter 21"],
    doNow: [
      {
        head: "Measure what you already have before you offer anything",
        body: "Calculate your runway and what your contract allows. These are templates K.1 and K.2 of the kit, about 50 minutes in total.",
      },
      {
        head: "Add a second role without letting one client weigh too much",
        body: "Add a second role or a product without any client going over half of your income. You track your roles together each month on the 18.1 dashboard.",
      },
      {
        head: "Add roles until your own income pays your household expenses",
        body: "You go from one client to a portfolio of 2 to 4 recurring roles. Rodrigo combines his delivery business with an operations role and makes USD 7,600 net a month against a cost of living of 7,000.",
      },
      {
        head: "Live off your portfolio or turn it into a firm or a product of your own",
        body: "You take the step when your own income reaches 1.2 times your cost of living for three months in a row and your cushion covers 6 months. Rodrigo is still USD 800 a month and 4,000 in savings short.",
      },
    ],
    with: [
      [
        { name: "“Exit plan” kit", meta: "Free", href: "/kit" },
        { name: "Level check", meta: "Free", href: "/diagnostico" },
        { name: "“Your first part-time role” workshop", meta: "2 sessions of 3 hours", href: "/programas#taller" },
        { name: "First Mandate", meta: "8-week cohort", href: "/programas#primer-mandato" },
      ],
      [{ name: "Portfolio mastermind", meta: "Groups of 8 to 10", href: "/programas#mastermind" }],
      [{ name: "One-on-one transition sessions", meta: "6 to 8 sessions", href: "/programas#sesiones" }],
      [{ name: "Co-building", meta: "90-day sprint", href: "/programas#coconstruccion" }],
    ],
    here: [
      "Carmen, Andrea and Javier start here.",
      "Javier is the first to get here, with a commercial director role two days a week.",
      "Rodrigo starts here, with his business and a part-time role.",
      "Rodrigo works through this stage in chapter 19.",
    ],
    lectura:
      "Most of the book is at level 0. The first four parts prepare your first client, which in our conversations is the step most executives put off. From the first client on, Part 05 works with the payments you actually receive.",
    arch: [
      {
        who: "carmen",
        level: 0,
        tag: "Employed",
        name: "Carmen",
        role: "Finance manager at a mid-sized mining company in Lima, 47",
        rows: [
          ["Years of experience", "21, 14 at the mining company"],
          ["Liquid savings", "USD 61,600"],
          ["Cost of living", "USD 8,800 a month"],
          ["Runway", "7.0 months"],
          ["Starting level", "0, Salary"],
        ],
        voice:
          "Her mining company's code of ethics requires a written disclosure of any paid work outside the company, so that disclosure goes into her plan before her first role.",
        start: "K.1 Your runway today and K.2 What your contract says",
        href: "/kit",
      },
      {
        who: "javier",
        level: 0,
        tag: "Just laid off",
        name: "Javier",
        role: "Former commercial VP at a consumer goods multinational in Bogotá, 52",
        rows: [
          ["Years of experience", "26, 4 at his last company"],
          ["Liquid savings", "USD 61,150, with severance"],
          ["Cost of living", "USD 12,500, down to 10,000"],
          ["Runway", "4.9 months, 6.1 with the cut"],
          ["Starting level", "0, Salary"],
        ],
        voice:
          "His first settlement left out the prorated bonus for the year. He caught it while filling in K.3, checked it with an employment lawyer and asked for it in writing before signing.",
        start: "K.3 Your exit in numbers, before you sign",
        href: "/workbook/k3",
      },
      {
        who: "andrea",
        level: 0,
        tag: "In a regulated sector",
        name: "Andrea",
        role: "Technology director at a large bank in Mexico City, 44",
        rows: [
          ["Years of experience", "18, 9 at the bank"],
          ["Liquid savings", "USD 51,300"],
          ["Cost of living", "USD 9,500 a month"],
          ["Runway", "5.4 months"],
          ["Starting level", "0, Salary"],
        ],
        voice:
          "Her first role is a seat on the advisory board of a fintech that doesn't compete with her bank. She takes it with the bank's written authorization, for USD 2,000 a month.",
        start: "K.2 What your contract says, and written authorization",
        href: "/workbook/k2",
      },
      {
        who: "rodrigo",
        level: 2,
        tag: "Runs his own business",
        name: "Rodrigo",
        role: "Partner in a delivery business in Santiago, with a part-time role at a pharmacy chain, 49",
        rows: [
          ["Years of experience", "23, 11 at his last company"],
          ["Liquid savings", "USD 38,000"],
          ["Cost of living", "USD 7,000 a month"],
          ["Runway", "5.4 months"],
          ["Starting level", "2, Portfolio"],
        ],
        voice:
          "His business pays him USD 3,600 net and an operations role at a pharmacy chain about 4,000. That adds up to 7,600 against a cost of living of 7,000, so he starts at level 2.",
        start: "19.1 The point of no return",
        href: "/workbook/19-1",
      },
    ],
    archNote:
      "Carmen, Javier, Andrea and Rodrigo are archetypes from the book, built from conversations with executives. They are not real people.",
    products: [
      [
        { tag: "Free", name: "“Exit plan” kit and Level check", desc: "Five templates to find out how many months you can last without a salary, and a questionnaire that tells you which level you're at.", meta: "About 2 hours", cta: "Download the kit", href: "/kit" },
        { tag: "Book", name: "Doble Agente", desc: "21 chapters in five parts, with one workbook template per chapter.", meta: "Ebook, paperback and PDF, in Spanish", cta: "See the book", href: "/libro" },
        { tag: "Workshop", name: "Your first part-time role", desc: "You write your offer on one page and price it, alongside executives at the same point.", meta: "2 live sessions of 3 hours", cta: "See dates", href: "/programas#taller" },
        { tag: "Program", name: "First Mandate", desc: "A live cohort to reach your first invoice, with an offer, a price, a model contract, 30 target accounts and 10 conversations.", meta: "8 weeks, 12 to 20 people", cta: "See the next cohort", href: "/programas#primer-mandato" },
      ],
      [{ tag: "Mastermind", name: "Portfolio", desc: "Peer groups that review opportunities, prices and referrals every two weeks.", meta: "Groups of 8 to 10, for 6 to 12 months", cta: "Apply", href: "/programas#mastermind" }],
      [{ tag: "Guidance", name: "One-on-one transition sessions", desc: "You plan your exit by measuring the two conditions of the point of no return.", meta: "6 to 8 sessions", cta: "Book 30 minutes", href: "/programas#sesiones" }],
      [{ tag: "Sprint", name: "Co-building", desc: "We turn your portfolio into a firm or a product, together with you.", meta: "90-day sprint", cta: "Book 30 minutes", href: "/programas#coconstruccion" }],
    ],
    stats: [
      { value: 155, suffix: "+", label: "executives trained" },
      { value: 10, suffix: "+", label: "companies built" },
      { prefix: "USD ", value: 26, suffix: "M+", label: "in billings" },
      { prefix: "USD ", value: 2.7, decimals: 1, suffix: "M+", label: "capital raised" },
    ],
    cifrasNota: "They add up the track record of the founders and of the program participants.",
    /** Bios: traducción fiel de es.ts (fuente: eddieajalcrina.com y lorenzoortiz.co). No agregar datos. */
    founders: {
      eddie: {
        role: "CEO and co-founder",
        cred: "Lecturer at MIT Professional Education since 2022",
        bio: "He has spent more than 15 years across industry, international cooperation and entrepreneurship. He led the sustainability strategy at TASA, part of the Breca group, and headed sustainability and regulatory affairs at Alicorp-Vitapro in four countries between 2019 and 2023. In 2021, while still at Alicorp-Vitapro, he co-founded Redesign Lab, which he runs as CEO and whose portfolio billed USD 26 million in 2025.",
      },
      lorenzo: {
        role: "COO and co-founder",
        cred: "",
        bio: "He started at Grupo Gloria and in late 2013 moved to TASA, part of Grupo Breca, where he ran two industrial plants at the same time. In 2021 he left corporate life and co-founded Redesign Lab with Eddie. Since then he has evaluated industrial investment projects alongside his other roles, with more than 20 industrial companies in 7 countries.",
      },
    },
    learn: [
      "Work out how many months your household can last without a salary and build your exit plan.",
      "Find USD 100,000 problems your market would pay to solve today.",
      "Price your first part-time role and sign your first contract without a conflict of interest.",
      "Go from one role to a portfolio and measure when you reach the point of no return.",
    ],
    kit: [
      { id: "k1", code: "K.1", title: "Your runway today", purpose: "Know how many months you can last without a salary.", time: "20 min", icon: "reloj", done: "You have your runway to one decimal place." },
      { id: "k2", code: "K.2", title: "What your contract says", purpose: "Know what you can do outside your job.", time: "30 min", icon: "documento", done: "Every row has an answer or a question for your lawyer." },
      { id: "k3", code: "K.3", title: "Your exit in numbers", purpose: "Estimate your severance before you negotiate or sign.", time: "20 min", icon: "salida", done: "You know what you would be owed and how it differs from what you're offered." },
      { id: "k4", code: "K.4", title: "Your first 30 days", purpose: "Have each week decided in case you leave.", time: "30 min", icon: "calendario", done: "Every week has at least one decision of yours in writing." },
      { id: "k5", code: "K.5", title: "Your first 20 calls", purpose: "Know who you'll call and what you'll say.", time: "20 min", icon: "meta", done: "You have 20 names and the date of your first call." },
    ],
    checkoutWa: "Hi, I'd like to buy Doble Agente as a PDF. How do I pay?",
  },

  /* ------------------------------------------------------------ componentes */
  ladder: {
    elige: "Pick your level on the ladder",
    capitulos: "Ch. 1 to 17",
    senal: "Signal to move up",
    sostener: "To sustain level 3",
    enLibro: "In the book",
    comoSeVe: "What each level looks like",
    nivelNombre: "Level {k}, {nombre}",
  },
  libroBotones: {
    comprarEn: "Buy on",
    amazonAria: "Buy on Amazon (opens in a new tab)",
    pedirWa: "Order the PDF on WhatsApp",
    pedirWaAria: "Order the PDF on WhatsApp (opens in a new tab)",
    pagarCon: "Pay with",
    mpAria: "Buy the PDF with Mercado Pago (opens in a new tab)",
  },
  cierre: {
    rotulo: ["Free kit", "Exit plan"],
    titulo: "Start with your runway",
    texto: "K.1, the first template in the “Exit plan” kit, tells you in 20 minutes how many months you can last without a salary.",
    boton: "Get the kit",
    tuCorreo: "Your email",
    listo: "Done. We sent the kit to {correo}.",
    promociones: "If you don't see it in a few minutes, check your promotions folder.",
    error: "We couldn't register your email right now. Ask us for the kit on {wa} and we'll send it to you.",
    waMensaje: "Hi, I'd like to get the “Exit plan” kit.",
    enEspanol: "The kit and the email are in Spanish.",
  },
  descarga: {
    kit: {
      h: "Download the kit",
      intro: "A fillable PDF with Carmen's and Javier's examples and each country's rule.",
      button: "Download the kit",
      next: "Start with K.1: it takes 20 minutes and gives you the number the whole method starts from.",
      wa: "the “Exit plan” kit",
      enEspanol: "The kit and the email are in Spanish.",
    },
    workbook: {
      h: "Download the workbook",
      intro: "The book's 31 templates in one PDF. Fill it in on a tablet, a computer or on paper.",
      button: "Download the workbook",
      next: "Open “Your level on the ladder” first, at the start of the workbook, and write down your level with the date.",
      wa: "the Doble Agente workbook",
      enEspanol: "The workbook and the email are in Spanish.",
    },
    escribeNombre: "Write your name.",
    situacion: "What's your situation?",
    listo: "Done, {nombre}. Here is your PDF.",
    tambien: " We also sent it to {correo}.",
    descargarPdf: "Download the PDF",
    error: "We couldn't register your email right now. If you'd like news about the book, write to us on {wa}.",
    waMensaje: "Hi, I'm {nombre}. I downloaded {producto} and I'd like to get news at {correo}.",
    fallbackLabel: "Download the workbook with the kit",
    fallbackNota: "The K.1 to K.5 kit is at the start of the workbook, on pages 5 to 13.",
  },
  resenas: {
    aria: "Participant reviews",
    carrusel: "carousel",
    diapositiva: "slide",
    pausar: "Pause autoplay",
    reanudar: "Resume autoplay",
    anterior: "Previous review",
    siguiente: "Next review",
    nDeTotal: "{n} of {total}",
    elegir: "Choose a review",
    irA: "Go to review {n}",
  },

  /* ------------------------------------------------------------ calculadora K.1 */
  runway: {
    ejemplos: {
      carmen: {
        name: "Carmen",
        a: 61600,
        b: 8800,
        bio: "47, finance manager in Lima. She has a job and starts the kit with K.1.",
        lectura:
          "Chapter 2 refines the cost of living. If Carmen adds what the mining company pays for today, such as her EPS health plan, her phone and her life insurance, her cost rises to USD 9,400 and her runway drops to 6.6 months.",
      },
      javier: {
        name: "Javier",
        a: 61150,
        b: 12500,
        bio: "52, former commercial VP in Bogotá. He just left his company and does K.1 with his severance included.",
        lectura: "With the cut he agreed on at home, Javier's cost of living drops to USD 10,000 and his runway rises to 6.1 months.",
      },
    },
    numeros: ["", "one", "two", "three", "four", "five", "six"],
    tituloVacio: "Enter your two numbers to see your runway",
    cubre: "{nombre} covers",
    cubres: "You cover",
    mas: "{quien} {runway} months without a salary, {dif} more than the 6-month minimum cushion",
    justo: "{quien} {runway} months without a salary, exactly the 6-month minimum cushion",
    menos: "{quien} {runway} months without a salary, {dif} short of the 6-month minimum cushion",
    calculadora: "K.1 calculator",
    ejemploCon: "Example with {nombre}",
    tusNumeros: "Your numbers",
    ejemplo: "Example",
    campoA: "A  Liquid savings",
    campoB: "B  Monthly cost of living",
    moneda: "In dollars or your own currency, the same in both.",
    estimar: "Estimate B from three months",
    meses: ["Month 1", "Month 2", "Month 3", "Annual expenses over the last year"],
    formulaB: "B = (month 1 + month 2 + month 3) ÷ 3 + annual expenses ÷ 12",
    escribeMeses: "Enter the three months",
    usarB: "Use {b} as B",
    formula: "Runway = A ÷ B",
    mesesSinSueldo: "Months you can live without a salary",
    mesesUnidad: "months",
    costoCero: "The cost of living has to be greater than zero.",
    misNumeros: "Calculate with my numbers",
    volver: "Back to {nombre}'s example",
    marco: ["Framework 1.1", "Your runway"],
    barra: "Bar: {runway} months of runway; the recommended minimum is 6.",
    barraVacia: "Bar with no data",
    minimo: "Minimum 6",
    mesesBarra: "{runway} months",
    nota: "Liquid savings is the money you can use within a week without a big penalty. Your pension fund, your home and your car are left out.",
    siguiente: "Next: your three runways (template 1.1)",
  },

  /* ------------------------------------------------------------ calculadora de las plantillas */
  calc: {
    titulo: "Online calculator",
    ejemploCon: "Example with {nombre}",
    arquetipo: "the archetype",
    tusNumeros: "Your numbers",
    moneda: "Use your own currency or dollars, the same one across the whole workbook.",
    detalle: "It does the math of {code} with the same rows as the workbook.",
    guardados: "You have saved data from another template: {lista}.",
    traer: "Bring it here",
    elige: "Choose",
    bajoMinimo: "below the minimum balance",
    misNumeros: "Calculate with my numbers",
    volver: "Back to {nombre}'s example",
    csv: "Download my numbers (CSV)",
    csvFila: "Row",
    csvValor: "Value",
    csvArchivo: "doble-agente-{id}.csv",
    navegador: "Your numbers are saved only in this browser. You don't need an account.",
    terminaste: "You'll know you're done when…",
    siguiente: "Next template",
    si: "Yes",
    no: "No",
    mes: "month {n}",
    ninguno: "none",
  },

  /* ------------------------------------------------------------ páginas */
  inicio: {
    meta: {
      titulo: "Future Founders | Your experience can work for more than one company",
      descripcion:
        "A level-by-level method for senior executives in Latin America: you split your work into part-time roles, one at a time, until your own income covers your cost of living.",
    },
    listaLd: "Future Founders resources and programs by level",
    cuantas: ["one", "two", "three", "four", "five"],
    hero: {
      label: ["For senior executives in Latin America", "A level-by-level method"],
      lead: "Future Founders helps managers, directors and VPs split their work into part-time roles, one at a time, until their own income covers their cost of living.",
      lead2: "You move forward openly, with your job in view, and without betting your stability on a single leap.",
      kitCorto: "Download the free kit",
      kitLargo: "Download the “Exit plan” kit",
      libro: "See the book",
      datos: ["Free kit", "Five templates", "About 2 hours"],
      imgAlt: "Duotone illustration: a hand on a chess piece, your job and your own plan on the same board",
    },
    cifras: "Future Founders in numbers",
    metodo: {
      label: ["The method"],
      title: "You move up a level when a signal shows up in your bank statement",
      marco: ["Framework 0.1", "The ladder"],
      h3: "Seventeen of the 21 chapters prepare your first client",
      diag: "The Level check places you with your own numbers in {n} questions.",
      diagLink: "Take the Level check",
    },
    quien: {
      label: ["Who it's for"],
      title: "Your starting point decides your first template",
      sub: "For managers, directors and VPs aged 38 to 55, with 12 to 25 years of career at large companies in Latin America.",
      nivelPartida: "Starting level: {k}",
      empiezaPor: "Start with",
    },
    libro: {
      portadaAlt: "Cover of Doble Agente, book and workbook, 2nd edition",
      label: ["The book", "Eddie Ajalcriña and Lorenzo Ortiz"],
      title: "Doble Agente takes you from your first part-time role to independence",
      lead: "21 chapters in five parts, with one workbook template per chapter. The book is in Spanish.",
      metodo: "See the method in 21 ideas",
    },
    programas: {
      label: ["Programs", "By level"],
      title: "Each level has its program, and you start for free",
      ver: "See the programs and apply",
      dudas: "Not sure where to start?",
    },
    nosotros: {
      label: ["About us", "Authors of the book"],
      title: "Eddie and Lorenzo wrote the book and run the programs",
      retrato: "Duotone portrait of {nombre}",
      linkedin: "LinkedIn",
      linkedinSr: " profile of {nombre} (opens in a new tab)",
    },
    resenas: { label: ["Reviews"], title: "What people who went through the programs say" },
  },

  libro: {
    meta: {
      titulo: "Doble Agente, the book",
      descripcion:
        "Doble Agente, by Eddie Ajalcriña and Lorenzo Ortiz: the method in 21 ideas, with a workbook to go from your first part-time role to independence without leaving your job overnight.",
    },
    ld: {
      /** Es el subtítulo real del libro, que está en español: se queda en español. */
      alternateName: "Doble Agente: el método para ejecutivos con salario",
      bookEdition: "2nd edition",
      description:
        "21 chapters in five parts, with a workbook, to turn executive experience into your own income by levels: salary, first part-time role, portfolio and independence. The book is in Spanish.",
    },
    nivel1: "Level {a}",
    nivel2: "Levels {a} and {b}",
    nivelN: "Levels {a} to {b}",
    toc: {
      apertura: { n1: "Opening", n2: "and kit", items: [["", "Manifesto: two roles in the open"], ["", "The four archetypes"], ["", "The ladder: from one salary to several incomes"], ["", "How to use this book"], ["K", "“Exit plan” kit, templates K.1 to K.5"]] },
      capitulos: {
        "01": [["1", "The risk you don't see"], ["2", "Your real cost of living"], ["3", "Your executive judgment is sellable"], ["4", "Fair play: contract, conflict of interest and transparency"], ["5", "If you're let go tomorrow"]],
        "02": [["6", "The USD 100,000 problem"], ["7", "Your entry point"], ["8", "Who decides and why they buy"], ["9", "Is the market big enough?"]],
        "03": [["10", "Your value proposition, in numbers"], ["11", "Your first part-time role: format, price and contract"], ["12", "From service to product"], ["13", "Unit economics"]],
        "04": [["14", "Your network as a channel"], ["15", "The diagnostic conversation"], ["16", "The first contract and the first invoice"], ["17", "Your schedule, your energy and your family"]],
        "05": [["18", "From first role to portfolio"], ["19", "The point of no return"], ["20", "The conversation with your employer"], ["21", "Independence: make the leap or stay"]],
      },
      cierre: { n1: "Closing", n2: "and appendices", items: [["", "What comes next"], ["", "Country appendices: Peru, Mexico, Colombia and Chile"], ["", "Glossary and indexes"]] },
    },
    muestras: [
      "Pages 8 and 9 of the book: the four archetypes, Carmen, Javier, Andrea and Rodrigo, with their starting numbers",
      "Pages 12 and 13 of the book: framework 0.1, the four-level ladder with the path through the 21 chapters",
      "Pages 34 and 38 of chapter 1: Carmen's case and framework 1.1, her three runways against the 6-month minimum and the 9-month goal",
      "Pages 41 and 42 of chapter 1: the worked example of template 1.1 and the close with the three actions",
    ],
    incluye: [
      { t: "“Exit plan” kit", d: "Five templates, K.1 to K.5, for your runway, your contract, your exit, your first 30 days and your first 20 calls." },
      { t: "21 templates, one per chapter", d: "Each takes 15 to 40 minutes with your data at hand and leaves you with a decision or a new fact about your situation." },
      { t: "The three actions of each chapter", d: "What you do that week, in writing and with a date." },
      { t: "The calculations for the four archetypes", d: "" },
    ],
    hero: {
      portadaAlt: "Cover of the book Doble Agente, by Eddie Ajalcriña and Lorenzo Ortiz",
      label: ["Book and workbook", "2nd edition"],
      title: "Doble Agente",
      sub: "The method for salaried executives",
      autores: "Eddie Ajalcriña and Lorenzo Ortiz",
      lead: "For two decades you built your career at large companies. This book helps you turn that experience into your own income, step by step and without hiding it from your employer.",
      formatos: ["Ebook", "Paperback", "PDF", "Free workbook"],
      enEspanol: "The book and the workbook are in Spanish.",
    },
    contratapa: {
      label: ["What it's about"],
      title: "A plan to get paid for what you already know how to do",
      p: [
        "If you run an area, you know how to solve problems that cost other companies hundreds of thousands of dollars. What's usually missing is a plan to get paid for that outside your job, and for the day a restructuring changes what you had planned.",
        "Four executives from Lima, Bogotá, Mexico City and Santiago work through the method with numbers you can check. Each chapter ends with a workbook template and three actions for the week.",
      ],
      aprender: "In these pages you'll learn to",
      lectura:
        "The four archetypes are built from conversations with more than 30 executives. Their salaries and expenses fall within each country's salary guides, and you can check every calculation in the book.",
    },
    metodo: {
      label: ["The method"],
      title: "The method in 21 ideas",
      verIdeas: "See the {n} ideas",
      verContenido: "See the contents",
      ocultar: "Hide",
      trabaja: "Works on levels {niveles}",
    },
    muestra: {
      label: ["Sample", "Inside pages"],
      title: "Each chapter opens with a case and closes with its template",
      sub: "In between, a named framework explains the idea with numbers.",
    },
    workbook: {
      label: ["Workbook", "Free"],
      title: "The book explains and the workbook is where you do it",
      sub: "The templates that do math have their own online calculator.",
      ver: "See the templates and download the workbook",
      imgAlt: "Page 8 of the workbook: template K.1, Your runway today, with Carmen's and Javier's liquid savings and cost of living and space for your numbers",
    },
    formatos: {
      label: ["Formats", "Where to buy"],
      title: "Ebook and paperback on Amazon, PDF with Mercado Pago",
      subPago:
        "The PDF edition is paid with Mercado Pago: credit card, debit card or account balance. After payment we send the PDF to the email you registered with Mercado Pago, within 6 hours at most.",
      subWa:
        "The PDF edition will be paid with Mercado Pago: credit card, debit card or account balance. While we set up online payment, you can order the PDF on WhatsApp.",
      ebookN: "Ebook and paperback",
      ebookD: "The ebook reads on Kindle, a tablet or a computer. The paperback is an executive pocket edition, 150 × 220 mm, printed by Amazon.",
      pdfN: "PDF edition",
      pdfDPago: "To read on a tablet or a computer. It reaches your email within 6 hours of payment at most.",
      pdfD: "To read on a tablet or a computer.",
      nota: "Everyone starts from a different salary, savings and market, and the book helps you measure yours.",
      enEspanol: "All three editions are in Spanish.",
    },
    autores: {
      label: ["Authors"],
      title: "Written by the founders of Future Founders",
      quienes: "Who Eddie and Lorenzo are",
    },
    cierre: {
      title: "Start before you buy",
      text: "The “Exit plan” kit is the first hands-on section of the book and you can download it for free. If it helps, the book picks up from there with Part 01.",
    },
  },

  kit: {
    meta: {
      titulo: "Work out how many months you can last without a salary",
      descripcion:
        "Free “Exit plan” kit: five templates, K.1 to K.5, to know how many months you can last without a salary, what your contract allows and what you do in your first 30 days if you leave.",
    },
    hero: {
      label: ["Free kit", "Exit plan"],
      title: "Work out how many months you can last without a salary",
      datos: [
        ["5", "templates, K.1 to K.5"],
        ["2", "hours, approximately"],
        ["4", "countries with their general rule"],
      ],
    },
    plantillas: {
      label: ["Contents", "K.1 to K.5"],
      title: "Each template ends in something you can check",
      terminaste: "You'll know you're done when…",
      tiempo: "Time",
      terminas: "You're done when ",
      terminasSr: "You'll know you're done when: ",
    },
    calculadora: {
      label: ["Calculator", "Template K.1"],
      title: "Try K.1 with Carmen's or Javier's numbers",
    },
    uso: {
      imgAlt: "Duotone illustration: a person walks toward a lit doorway",
      label: ["How to use it", "Before Part 01"],
      title: "The order depends on whether you have a job or have already left",
      empleo: "If you have a job",
      empleoD: "K.1, K.2 and K.3, then on to chapter 1. K.4 and K.5 come before chapter 5.",
      saliste: "If you've already left",
      salisteD: "Start with K.3 before you sign, go back to K.1 and continue with chapter 5.",
      paises: "The rules for Peru, Mexico, Colombia and Chile are each country's general rule. The book's appendix explains the exceptions and where to check the regulation in force.",
    },
    cierre: {
      title: "Fill it in this week",
      text: "K.1 takes 20 minutes and gives you the number the whole method starts from.",
      button: "Get the kit",
    },
  },

  diagnostico: {
    meta: {
      titulo: "Level check",
      descripcion:
        "Four questions about your situation, your first invoice, your own income and your cushion tell you which level of the ladder you're at and which template to fill in now.",
    },
    cuantas: ["One", "Two", "Three", "Four", "Five"],
    label: ["Free", "{n} questions"],
    title: "Level check",
    lead: "Answer with what you see in your bank statement today. The result tells you which template and which chapter come next.",
    niveles: "The four levels",
    nota: "Your answers stay in your browser. They're only sent if you ask for your result by email.",
    cuestionario: {
      pregunta: "Question {n} of {total}",
      anterior: "Previous",
      siguiente: "Next",
      verNivel: "See my level",
      preguntas: {
        situacion: { text: "What's your situation today?" },
        comprobante: {
          text: "Have you already invoiced a client of your own?",
          help: "An invoice is the factura, recibo por honorarios, CFDI or boleta de honorarios, depending on your country. A part-time role, an advisory job, a product or your company all count.",
          options: ["Not yet", "Yes, one client", "Yes, two or more clients"],
        },
        cobertura: {
          text: "Over the last three months, how much of your cost of living without a job did your net own income cover?",
          help: "Own income is income that doesn't come from an employer. Your cost of living without a job is what you spend today plus what your employer pays today that you would have to pay yourself (template 2.1).",
          options: [
            "Less than half",
            "Half or more, without covering all of it",
            "It covered it in some months, but not three in a row",
            "It covered it all three months in a row",
            "1.2 times or more, three months in a row",
          ],
        },
        colchon: {
          text: "How many months of that cost of living do your liquid savings cover today?",
          help: "That's your runway: the money you can use within a week without a big penalty, divided by your monthly cost of living.",
          options: ["Less than 3", "From 3 to less than 6", "6 or more", "I haven't calculated it"],
        },
      },
      sinIngresos: "No own income yet",
      why: {
        salioSinComprobante: "You no longer have a salary, but your level is set by your own income, and there's no invoice yet.",
        sinComprobante: "You don't invoice a client of your own yet.",
        nivel1: "You've already been paid by a client of your own. Your own income doesn't cover your cost of living three months in a row yet.",
        nivel2: "Your own income covers your cost of living three months in a row. For level 3 you need to reach 1.2 times.",
        sinColchonCalculado: "You already reach 1.2 times your cost of living. You still need to calculate your cushion with K.1, which takes 20 minutes.",
        colchonCorto: "You already reach 1.2 times your cost of living. You're missing the second condition, a 6-month cushion.",
        nivel3: "You meet both conditions of the point of no return.",
      },
      pasos: {
        salio: {
          capitulo: "Chapter 5",
          body: "Before you sign your exit, fill in K.3 and write down the deadline to challenge or claim. Review your settlement with an employment lawyer, then recalculate your runway with K.1.",
          boton: "Open K.3",
        },
        proyecto: {
          capitulo: "Chapter 13",
          body: "Calculate how much a client leaves you over the whole relationship and how much reaches your pocket after fixed costs and tax.",
          boton: "Open 13.1",
        },
        nivel0: {
          capitulo: "Chapter 1",
          body: "Calculate your runway and what your contract allows. These are the first two templates in the kit, about 50 minutes in total.",
          boton: "Download the kit",
        },
        nivel1: {
          capitulo: "Chapter 18",
          body: "Add a second role or a product without any client going over half of your income. Track your roles together on the first day of each month.",
          boton: "Open 18.1",
        },
        nivel2: {
          capitulo: "Chapters 19 and 20",
          body: "Each month, measure the two conditions of the point of no return and prepare the conversation with your employer.",
          boton: "Open 19.1",
        },
        nivel3: {
          capitulo: "Chapter 21",
          body: "Review your numbers every month and build a 90-day plan that lowers your biggest risk. If you want to turn your portfolio into a firm or a product, book a conversation with the team.",
          boton: "",
        },
      },
    },
    resultado: {
      tuResultado: "Your result",
      titulo: "Level {k}: {nombre}",
      nivelDe: "Level {k} of 3",
      siguientePaso: "Your next step",
      delLibro: "{capitulo} of the book",
      avisoColchon: "Your cushion is under 6 months or you haven't calculated it. Start with K.1 in the kit, which takes 20 minutes, and then continue with {lista}.",
      la: "{code}",
      y: " and ",
      abrirK1: "Open K.1",
      anota: "Write down your level with the date in “Your level on the ladder”, at the start of the workbook.",
      senal: "Signal to move up",
      sostener: "To sustain level 3",
      acompana: "Programs for this level",
      volver: "Start the Level check again",
      enviarTitulo: "Get your result and the kit by email",
      enviado: "Done. We sent your level and the “Exit plan” kit to {correo}.",
      enviar: "Send",
      error: "We couldn't register your details right now. Write to us on {wa} and we'll reply with your next step.",
      waMensaje: "Hi, I took the Level check and came out at level {k}, {nombre}.",
      enEspanol: "The email and the kit are in Spanish.",
    },
  },

  programas: {
    meta: {
      titulo: "Programs by level",
      descripcion:
        "“Your first part-time role” workshop, First Mandate program, Portfolio mastermind, one-on-one transition sessions and Co-building: each one for a level of the ladder.",
    },
    hero: {
      label: ["Programs", "By level"],
      title: "What supports you at each level",
      lead: "Five programs, from a two-session workshop to a 90-day sprint.",
      diag: "Don't know your level? Take the Level check",
      kit: "Level 0: start with the free kit",
    },
    aria: "Programs",
    formato: "Format",
    paraTi: "It's for you if",
    agendaSr: " for {nombre} (opens in a new tab)",
    postularSr: ": {nombre}",
    nota: "Each program works on your numbers and your market, and the decision of when to move forward is yours.",
    postular: {
      label: ["Applications", "Dates and places"],
      title: "We'll write to you with the dates of the next intake",
      sub: "Dates, places and conditions are published with each intake.",
      conversar: "Prefer to talk first?",
      wa: "or write to us on WhatsApp",
      waMensaje: "Hi, I'd like information about the Future Founders programs.",
    },
    lista: {
      taller: {
        levelLabel: "Level 0, preparing for 1",
        tag: "Workshop",
        name: "Your first part-time role",
        desc: "You write your offer on one page and price it, alongside executives at the same point.",
        format: "2 live sessions of 3 hours",
        forWho: "You've already measured your runway and what your contract allows, and you want to define what you offer and at what price.",
        cta: "See dates",
      },
      "primer-mandato": {
        levelLabel: "Level 0, preparing for 1",
        tag: "Program",
        name: "First Mandate",
        desc: "A live cohort to reach your first invoice, with an offer, a price, a model contract, 30 target accounts and 10 conversations.",
        format: "8 weeks, 12 to 20 people",
        forWho: "Your offer is clear and you want week-by-week support until you issue your first invoice.",
        cta: "Apply",
      },
      mastermind: {
        levelLabel: "Level 1, on the way to 2",
        tag: "Mastermind",
        name: "Portfolio",
        desc: "Peer groups that review opportunities, prices and referrals every two weeks.",
        format: "Groups of 8 to 10, for 6 to 12 months",
        forWho: "You already have at least one client of your own and want to add roles until your own income pays your household expenses.",
        cta: "Apply",
      },
      sesiones: {
        levelLabel: "Level 2, on the way to 3",
        tag: "Guidance",
        name: "One-on-one transition sessions",
        desc: "You plan your exit by measuring the two conditions of the point of no return.",
        format: "6 to 8 sessions",
        forWho: "Your own income is getting close to 1.2 times your cost of living and you're deciding whether to leave your job, and when.",
        cta: "Book 30 minutes",
      },
      coconstruccion: {
        levelLabel: "Level 3",
        tag: "Sprint",
        name: "Co-building",
        desc: "We turn your portfolio into a firm or a product, together with you.",
        format: "90-day sprint",
        forWho: "You live off your portfolio and want it to stop depending only on your hours.",
        cta: "Book 30 minutes",
      },
    },
    form: {
      programa: "Program",
      opcion: "{tag}: {nombre}",
      mensaje: "Your situation in two lines (optional)",
      mensajePh: "Role, years of career and which level of the ladder you think you're at",
      verFechas: "I want to see the dates",
      enviar: "Send application",
      recibida: "We received your application to {nombre}.",
      teEscribimos: "We'll write to {correo} with the dates, places and conditions of the next intake.",
      invalido: "Write your name and a valid email.",
      error: "We couldn't register your application right now. Write to us on {wa} and we'll reply with the dates.",
      waMensaje: "Hi, I'm {nombre}. I'd like to apply to {programa}.",
      enEspanol: "The confirmation email is in Spanish.",
    },
  },

  workbook: {
    meta: {
      titulo: "Doble Agente workbook",
      descripcion:
        "Download the Doble Agente workbook for free: the K.1 to K.5 kit, one template per chapter, the country appendices and the closing. Every QR code in the book leads here, and the templates that do math have an online calculator.",
      parteTitulo: "Workbook, Part {n}: {nombre}",
      parteDescripcion: "The workbook templates for Part {n}, {nombre}, of Doble Agente.",
      plantillaTitulo: "Template {code}: {titulo}",
      conCalculadora: " With an online calculator.",
    },
    tipo: { kit: "“Exit plan” kit", capitulo: "Part {n}", anexo: "Country appendix", cierre: "Closing of the book" },
    indice: {
      label: ["Doble Agente", "Free workbook"],
      title: "The workbook templates",
      qr: "Each chapter of the book ends with a QR code that leads to its template.",
      icono: "Templates with this icon do math and have an online calculator on their page.",
      calcTitle: "Online calculator",
      calcSr: ", with an online calculator",
      kit: "“Exit plan” kit",
      kitSub: "Comes before Part 01 of the book",
      parte: "Part {n}, {nombre}",
      verParte: "See the part",
      anexos: "Appendices and closing",
    },
    parte: {
      label: ["Workbook", "Part {n}"],
      lead: "Fill them in order, because each one uses data from the one before.",
      todas: "See all the templates",
    },
    plantilla: {
      workbook: "Workbook",
      plantilla: "Template {code}",
      tiempo: "Time",
      enLibro: "In the book",
      nivel: "Level",
      ejemplo: "Worked example",
      paginas: "Pages",
      libroPag: "book {n}",
      workbookPag: "workbook {n}",
      paraQue: "What it's for",
      antes: "Before you start",
      arriba: "At the top of the sheet",
      cadaDato: "{label}, each item in its own field:",
      trabajaCap: "What chapter {n} works on",
      trabajaSec: "What this section works on",
      necesitas: "You need first",
      terminaste: "You'll know you're done when…",
      donde: "Where to fill it in",
      dondeKit: "In the “Exit plan” kit or in the workbook. Both are free to download, as PDFs in Spanish.",
      dondeWb: "In the workbook, on a tablet, a computer or on paper. The PDF is in Spanish.",
      descargaKit: "Download the kit",
      descargaWb: "Download the workbook",
      calcK1: "K.1 online calculator",
      otras: "Other templates",
      anterior: "Previous",
      siguiente: "Next",
      parteN: "Part {n}, {nombre}",
      todas: "All the templates",
    },
  },

  actualizaciones: {
    meta: {
      titulo: "Annual figures",
      descripcion:
        "The Doble Agente figures that change every year (UIT, UMA, UVT, minimum wage, UF and withholding rates) in Peru, Mexico, Colombia and Chile, with the book's 2026 value and the official site to check the current one.",
    },
    label: ["Doble Agente", "Country appendices"],
    title: "Annual figures",
    lead: "The figures that change every year are marked “valor 2026” (2026 value) in the book.",
    leadPendiente: " When the authority sets this year's value, we add it to the table.",
    paises: "Countries",
    cols: { cifra: "Figure", v2026: "2026 value in the book", donde: "Where it's used", vigente: "Current value", verificar: "Where to check" },
    pendiente: "Pending",
    tramites: "Changes in progress",
    revision: "Last reviewed: {fecha}",
    nota: "Rules differ between countries and change over time. Before you sign a contract, accept a role or issue your first invoice, check your case with a specialist.",
    otroPais:
      "If your country isn't here, the method works the same way; take each appendix's questions to your employment lawyer and your accountant.",
    verPlantillas: "See the workbook templates",
    fecha: "October 30, 2026",
    datos: [
      {
        id: "peru",
        pais: "Peru",
        anexo: "Appendix A and template A.1",
        valores: [
          { nombre: "UIT", v2026: "S/ 5,500", donde: "Appendix A, sections 3 and 4", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
          {
            nombre: "Recibo por honorarios amount from which the client withholds 8%",
            v2026: "S/ 1,500",
            donde: "Chapter 16, templates 16.1 and A.1",
            fuente: { label: "SUNAT, fourth-category advance payments", href: "https://orientacion.sunat.gob.pe/node/283" },
          },
          {
            nombre: "Fourth- and fifth-category income cap for requesting a suspension of withholding",
            v2026: "S/ 48,125 (S/ 38,500 if you are a company director, trustee or agent)",
            donde: "Appendix A, section 3",
            fuente: { label: "SUNAT, R. S. 000390-2025/SUNAT", href: "https://www.sunat.gob.pe/legislacion/superin/2025/000390-2025.pdf" },
          },
          { nombre: "Cap on the 20% fourth-category deduction (24 UIT)", v2026: "S/ 132,000", donde: "Appendix A, section 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
          { nombre: "7 UIT deduction on employment income", v2026: "S/ 38,500", donde: "Appendix A, section 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
          { nombre: "Net income from which the 30% rate applies (45 UIT)", v2026: "S/ 247,500", donde: "Appendix A, section 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
        ],
        tramites: [
          "Pension contributions for independent workers: Ley 32445 made them voluntary. That was their status on October 30, 2026; confirm it with your accountant.",
          "CTS: for the liquid savings in K.1, count only the part you can withdraw today. That part changes when a law authorizes extraordinary withdrawals; confirm it with your bank in the month you calculate.",
        ],
      },
      {
        id: "mexico",
        pais: "Mexico",
        anexo: "Appendix B and template B.1",
        valores: [
          {
            nombre: "General minimum wage, per day",
            v2026: "MXN 315.04",
            donde: "Appendix B, seniority premium",
            fuente: { label: "Diario Oficial de la Federación", href: "https://www.dof.gob.mx" },
          },
          {
            nombre: "Daily cap on the seniority premium (twice the minimum wage)",
            v2026: "MXN 630.08",
            donde: "Appendix B, seniority premium",
            fuente: { label: "Diario Oficial de la Federación", href: "https://www.dof.gob.mx" },
          },
          {
            nombre: "UMA, per day",
            v2026: "MXN 117.31",
            donde: "Appendix B, ISR exemption on separation",
            fuente: { label: "INEGI, UMA 2026", href: "https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/uma/uma2026.pdf" },
          },
        ],
        tramites: [],
      },
      {
        id: "colombia",
        pais: "Colombia",
        anexo: "Appendix C and template C.1",
        valores: [
          { nombre: "Monthly minimum wage", v2026: "COP 1,750,905", donde: "Appendix C, sections 1 and 4", fuente: { label: "Consejo de Estado", href: "https://www.consejodeestado.gov.co" } },
          { nombre: "Ten minimum wages (basis for the comprehensive salary)", v2026: "COP 17,509,050", donde: "Appendix C, section 1", fuente: { label: "Ministerio del Trabajo", href: "https://www.mintrabajo.gov.co" } },
          { nombre: "UVT", v2026: "COP 52,374", donde: "Appendix C, sections 2 and 3", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "204 UVT (20% withholding on severance)", v2026: "COP 10,684,296", donde: "Appendix C, section 2", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "790 UVT (annual cap on the 25% exempt income)", v2026: "COP 41,375,460", donde: "Appendix C, section 2", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "3,500 UVT (VAT registration threshold)", v2026: "COP 183,309,000", donde: "Appendix C, section 3, and template C.1", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
          { nombre: "Cap on the contribution base (25 minimum wages)", v2026: "COP 43,772,625", donde: "Appendix C, section 4", fuente: { label: "UGPP", href: "https://www.ugpp.gov.co" } },
          { nombre: "Base from which you pay into the Fondo de Solidaridad Pensional (4 minimum wages)", v2026: "COP 7,003,620", donde: "Appendix C, section 4", fuente: { label: "UGPP", href: "https://www.ugpp.gov.co" } },
        ],
        tramites: [
          "Minimum wage: as of October 30, 2026, that year's minimum wage decree was under review at the Consejo de Estado. Use the minimum wage in force in the year you calculate.",
          "Pension reform: Ley 2381 de 2024 would change contribution rates. As of October 30, 2026 it wasn't clear when it takes effect; confirm it with your accountant before you pay your PILA.",
        ],
      },
      {
        id: "chile",
        pais: "Chile",
        anexo: "Appendix D and template D.1",
        valores: [
          {
            nombre: "Withholding on the boleta de honorarios",
            v2026: "15.25%",
            donde: "Chapter 16, templates 16.1 and D.1",
            fuente: { label: "SII, boletas de honorarios", href: "https://www.sii.cl/destacados/boletas_honorarios/index.html" },
          },
          {
            nombre: "UF the book uses for its calculations",
            v2026: "CLP 39,500",
            donde: "Appendix D and template D.1",
            fuente: { label: "SII, UF values", href: "https://www.sii.cl" },
          },
          { nombre: "90 UF cap for calculating severance", v2026: "CLP 3,555,000", donde: "Appendix D, section 2, and template D.1", fuente: { label: "Dirección del Trabajo", href: "https://www.dt.gob.cl" } },
        ],
        tramites: [
          "Personal data: Ley 21.719 broadly amends Ley 19.628 and creates the Agencia de Protección de Datos Personales. As of October 30, 2026 its entry into force was set for December 1, 2026, and there was a bill to postpone it. Check the current date on LeyChile before you prepare your data policy.",
        ],
      },
    ],
  },

  /**
   * /en/privacy y /en/terms: traducción fiel de es.ts, con el aviso «This is a translation…» al inicio (`aviso`).
   * Prevalece el español (supuesto del dueño, docs/reglas-diseno.md, sección 11). Las leyes van con su nombre oficial.
   */
  legal: {
    privacidad: {
      title: "Privacy policy",
      description:
        "What data Future Founders keeps when you fill in a form, where it's stored, what it's used for and how to stop receiving emails or ask us to delete it.",
      label: ["Legal", "Privacy"],
      vigente: VIGENTE,
      aviso: TRADUCCION,
      bloques: [
        { h: "Who is responsible for your data", p: [`${RESPONSABLE}. Contact: ${EMAIL}.`] },
        {
          h: "What data we keep",
          p: [
            "Only what you write in a form. When you ask for the “Exit plan” kit or the workbook: name, email, employment situation and country. When you ask for your Level check result: name, email, your level and your answers about your situation, own income and cushion. When you apply to a program: program, name, email, country and the message you write.",
            "Each record also keeps the date and time. Download forms also keep the page you sent it from.",
          ],
        },
        {
          h: "Where it's stored",
          p: [
            "The site is hosted on Vercel, which processes each form submission and passes it to a Google spreadsheet that only the founders of Future Founders can access. Google provides the spreadsheet and email service. Vercel and Google store data on servers outside Peru, mainly in the United States.",
          ],
        },
        {
          h: "What we use it for",
          p: [
            "To send you a confirmation email with the PDF you asked for or with the reply to your application, to let the team know your registration arrived and to write to you about the book and the programs. We don't sell or hand over your data.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "As long as you keep receiving our emails and up to 24 months after your last registration or your last reply. If you unsubscribe or ask us to delete your data, we stop writing to you right away and delete it from the spreadsheet within 30 days at most. Purchase data is kept for as long as tax law requires.",
          ],
        },
        {
          h: "How to stop receiving emails",
          p: [`Reply to any of our emails with the word “baja”. To correct or delete your data, write to ${EMAIL}.`],
        },
        {
          h: "The calculators",
          p: [
            "The numbers you enter in the site's calculators are saved only in your browser, in its local storage, so you find them when you come back. They don't reach our servers and they're deleted when you clear your browser data.",
          ],
        },
        { h: "The Level check", p: ["Your answers stay in your browser. They're only sent if you ask for your result by email."] },
        {
          h: "Applicable law and your rights",
          p: [
            `This policy is governed by Ley N.º 29733, Ley de Protección de Datos Personales of Peru, and its regulations. You can request access, rectification, cancellation or objection regarding your data by writing to ${EMAIL}, and we'll reply within the time limits of that law. If you're not satisfied with the reply, you can go to the Autoridad Nacional de Protección de Datos Personales of the Ministerio de Justicia y Derechos Humanos.`,
          ],
        },
        { h: "Cookies", p: ["The site doesn't use advertising or tracking cookies."] },
        {
          h: "Links to other services",
          p: ["The WhatsApp, Amazon, Mercado Pago and Google Calendar booking buttons open third-party services, with their own policies."],
        },
        { h: "Changes", p: ["If this policy changes, we'll publish the new version here with its date."] },
      ],
    },
    terminos: {
      title: "Terms of use",
      description:
        "Terms of use for futurefounders.pe: what the site offers, how to buy the book, the scope of the calculators and the Level check, and use of the material.",
      label: ["Legal", "Terms"],
      vigente: VIGENTE,
      aviso: TRADUCCION,
      bloques: [
        { h: "Who runs the site", p: [`${RESPONSABLE}. Contact: ${EMAIL}.`] },
        {
          h: "What it offers",
          p: ["Information about the book Doble Agente and the programs, the “Exit plan” kit and the workbook as free PDFs, the Level check and online calculators."],
        },
        {
          h: "No advice or promises",
          p: [
            "Nothing on this site is legal, tax or financial advice, or a promise of income. The country rules are the general rule; check the regulation in force and consult a professional before you decide.",
          ],
        },
        {
          h: "Calculators and Level check",
          p: ["They do math with the numbers you enter. The result depends on those numbers and is meant as a reference."],
        },
        {
          h: "Purchases",
          p: [
            "The ebook and the paperback are bought on Amazon, under Amazon's terms. The PDF edition is paid with Mercado Pago, under Mercado Pago's terms.",
            `After payment with Mercado Pago we send the PDF to the email you registered with the payment, within 6 hours at most. If it doesn't arrive in that time or the file won't open, write to us at ${EMAIL} and we'll send it again. If we can't deliver it, we refund the full payment. Because it's a digital product, once the PDF has been delivered there's only a refund if the file has a defect we can't fix.`,
          ],
        },
        { h: "Programs", p: ["The dates, places, price and conditions of each program are announced with each intake."] },
        {
          h: "Use of the material",
          p: [
            "The book, the workbook, the kit and the texts on the site belong to their authors. You can use the templates for your own plan; you can't resell them or publish them as your own.",
          ],
        },
        { h: "Characters", p: ["Carmen, Javier, Andrea and Rodrigo are archetypes from the book, built from real conversations."] },
        {
          h: "Applicable law",
          p: [
            `These terms are governed by the laws of Peru, including the Código de Protección y Defensa del Consumidor (Ley N.º 29571). To file a complaint, write to us at ${EMAIL}.`,
          ],
        },
        { h: "Changes", p: ["These terms may change. The version in force is the one published here, with its date."] },
      ],
    },
  },

  noEncontrada: {
    label: ["Error 404"],
    title: "This page doesn't exist",
    lead: "If you came from a QR code in the book, check the workbook index.",
    inicio: "Go to the home page",
    workbook: "See the workbook",
  },

  /** Imágenes para compartir (opengraph-image de cada página en /en): rótulo, titular y texto alternativo. */
  og: {
    inicio: { kicker: "For senior executives in Latin America", alt: "Future Founders: {titulo}" },
    libro: { kicker: "Book and workbook, 2nd edition", title: "Doble Agente", alt: "Doble Agente, by Eddie Ajalcriña and Lorenzo Ortiz. Book and workbook, in Spanish." },
    kit: {
      kicker: "Free kit, Exit plan",
      title: "Work out how many months you can last without a salary",
      alt: "Future Founders “Exit plan” kit: work out how many months you can last without a salary with five free templates",
    },
    diagnostico: { kicker: "Free, four questions", title: "Level check", alt: "Future Founders Level check: four questions to find out which level of the ladder you're at" },
    programas: { kicker: "Programs by level", title: "What supports you at each level", alt: "Future Founders programs, by level of the ladder" },
    workbook: { kicker: "Doble Agente, free workbook", title: "The workbook templates", alt: "Doble Agente workbook: the book's templates, free" },
    actualizaciones: { kicker: "Doble Agente, country appendices", title: "Annual figures", alt: "Annual figures for the Doble Agente country appendices" },
    privacidad: { kicker: "Legal", title: "Privacy policy", alt: "Future Founders privacy policy" },
    terminos: { kicker: "Legal", title: "Terms of use", alt: "Future Founders terms of use" },
  },
};
