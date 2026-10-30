import type { Lang } from "./site";

// Todo el texto público del sitio, en los dos idiomas.
// Bios: solo hechos con versión «público» validada en la base de perfil (perfil-eddie/nucleo/hechos.yaml).

const es = {
  meta: {
    title: "Future Founders · Ejecutivos Fractional y empresa propia",
    description:
      "Acompañamos a ejecutivos con trayectoria a convertir su experiencia en ingresos propios: como ejecutivos fractional para varias empresas o con su propia compañía.",
  },
  nav: {
    opportunity: "Oportunidad",
    routes: "La ruta",
    fractional: "Red Fractional",
    about: "Nosotros",
    book: "Agendar conversación",
    switchLabel: "English",
    switchShort: "EN",
    menu: "Menú",
  },
  hero: {
    kicker: "[ Para ejecutivos con trayectoria ]",
    titleA: "Tu experiencia puede trabajar para más de una empresa.",
    titleB: "O para la tuya.",
    lead: "Te ayudamos a convertir tu trayectoria corporativa en ingresos propios: como ejecutivo fractional o como fundador de tu propia compañía. Sin saltar al vacío.",
    ctaPrimary: "Agenda 30 minutos",
    ctaSecondary: "Escríbenos",
    route: [
      { label: "Hoy", title: "Salario y experiencia" },
      { label: "Ruta A", title: "Fractional" },
      { label: "Ruta B", title: "Empresa propia" },
      { label: "Destino", title: "Ingresos que no dependen de un solo empleador" },
    ],
  },
  opportunity: {
    kicker: "01 · La oportunidad",
    title: "Las empresas necesitan criterio senior. No siempre a tiempo completo.",
    points: [
      { title: "Las empresas compran experiencia por partes", text: "Muchas pymes necesitan a alguien senior dos días por semana, no cinco." },
      { title: "Tu salario no es tu único activo", text: "Tu red, tu método y tu reputación pueden generar ingresos propios." },
      { title: "Renunciar es una decisión de números", text: "Se construye en paralelo y se decide cuando los números ya lo dicen." },
    ],
  },
  routes: {
    kicker: "02 · Dos rutas, un destino",
    title: "Un mismo punto de partida: lo que ya sabes hacer.",
    a: {
      label: "Ruta A",
      tag: "Ingresos en semanas",
      title: "Fractional",
      text: "Vende tu experiencia por partes, como CFO, CMO o COO de varias empresas a la vez.",
      items: ["Una oferta que una pyme entienda en una frase", "Primeros clientes desde tu red", "Honorarios por valor, no por hora"],
      link: "Registra tu perfil fractional →",
    },
    b: {
      label: "Ruta B",
      tag: "Un activo propio",
      title: "Empresa propia",
      text: "Construye un activo que genere valor aunque tú no estés en la operación diaria.",
      items: ["Valida una oferta con clientes reales", "Un negocio que no dependa de ti", "Deja el salario cuando los números lo digan"],
    },
  },
  how: {
    kicker: "03 · Cómo trabajamos",
    title: "Empieza por una conversación, no por un curso.",
    steps: [
      { title: "Conversación de 30 minutos", text: "Sin costo. Tu trayectoria, tu situación y lo que buscas." },
      { title: "Diagnóstico", text: "Qué parte de tu experiencia paga el mercado y por dónde empezar." },
      { title: "Ruta acompañada", text: "Una propuesta a tu medida, con hitos claros." },
    ],
  },
  about: {
    kicker: "04 · Quiénes somos",
    title: "Eddie Ajalcriña y Lorenzo Ortiz",
    intro: "Future Founders nace de construir empresas en paralelo a una carrera corporativa. Esa experiencia es la base de nuestro método y de nuestro libro, Doble Agente.",
    eddie: {
      name: "Eddie Ajalcriña",
      role: "CEO y cofundador de Redesign Lab",
      bio: "Construyó Redesign Lab, impact venture studio de América Latina, y sus primeros emprendimientos en paralelo a su carrera corporativa. Docente en MIT Professional Education desde 2022 y MBA por ESAN, con más de 15 años de experiencia y más de 10 empresas invertidas en América Latina.",
      link: "Perfil completo en eddieajalcrina.com →",
    },
    lorenzo: {
      name: "Lorenzo Ortiz",
      role: "Cofundador de Redesign Lab",
      bio: "Cofundador de Redesign Lab y coautor de Doble Agente.",
    },
    photoAltEddie: "Retrato de Eddie Ajalcriña",
    photoAltLorenzo: "Retrato de Lorenzo Ortiz",
  },
  book: {
    kicker: "05 · El libro",
    title: "Doble Agente",
    subtitle: "El manual para fundadores con salario",
    text: "Nuestro método, en un libro: cómo construir ingresos propios sin renunciar antes de tiempo. Está en edición y saldrá en español y en inglés.",
    cta: "Quiero recibir el primer capítulo",
    mailSubject: "Quiero recibir el primer capítulo de Doble Agente",
    alt: "Ejemplares del libro Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz",
  },
  faq: {
    kicker: "06 · Preguntas frecuentes",
    title: "Antes de agendar",
    items: [
      {
        q: "¿Qué es un ejecutivo fractional?",
        a: "Un profesional senior que trabaja por partes para varias empresas a la vez, por ejemplo como CFO dos días por semana, con objetivos y honorarios definidos, en lugar de ocupar un cargo a tiempo completo.",
      },
      {
        q: "¿Tengo que renunciar a mi trabajo?",
        a: "No. Empezamos por entender tu situación: contrato, tiempo disponible y colchón financiero. Muchas rutas se construyen en paralelo, y la decisión de dejar el salario se toma cuando los números la respaldan. Revisa siempre las cláusulas de exclusividad de tu contrato.",
      },
      {
        q: "¿Es un curso?",
        a: "No. Es un acompañamiento: empieza con una conversación de 30 minutos y, si tiene sentido, sigue con una ruta a tu medida, con hitos claros.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "La primera conversación no tiene costo. Si decidimos trabajar juntos, te enviamos una propuesta con alcance y precio cerrados.",
      },
      {
        q: "¿Para quién no es?",
        a: "Para quien busca ingresos rápidos sin esfuerzo, o para quien todavía no tiene una trayectoria que el mercado pague. Si es tu caso, te lo diremos en la primera conversación.",
      },
    ],
  },
  close: {
    titleA: "Hablemos de tu",
    titleB: "siguiente etapa.",
    cta: "Elegir día y hora",
    note: "Sin costo · Por videollamada · Hora de Lima",
    mailSubject: "Quiero conversar con Future Founders",
  },
  footer: {
    tagline: "Del sueldo a lo propio: Fractional y empresa propia.",
    contact: "Contacto",
    privacy: "Privacidad",
    fractional: "Red Fractional",
    rights: "Lima, Perú",
  },
  fractional: {
    meta: {
      title: "Red Fractional · Registra tu perfil",
      description:
        "Registra tu perfil si quieres trabajar como ejecutivo fractional en América Latina. Armamos una red de profesionales senior para conectarla con empresas.",
    },
    kicker: "[ Red Fractional · América Latina ]",
    titleA: "Registra tu perfil",
    titleB: "fractional.",
    lead: "Estamos armando una red de profesionales senior dispuestos a trabajar por partes para varias empresas. Si es tu caso, cuéntanos quién eres y qué problema resuelves.",
    steps: [
      { title: "Registras tu perfil", text: "Unos 5 minutos. Solo lo esencial." },
      { title: "Lo revisamos", text: "Leemos cada perfil. No es automático." },
      { title: "Te contactamos", text: "Cuando haya una conversación o una oportunidad que encaje contigo." },
    ],
    honest: "Registrarte no garantiza encargos: es el primer paso para conocerte.",
    formTitle: "Tu perfil",
  },
  privacy: {
    meta: { title: "Política de privacidad", description: "Cómo trata Future Founders los datos personales que recibe a través de este sitio." },
  },
};

export type Content = typeof es;

const en: Content = {
  meta: {
    title: "Future Founders · Fractional executives and your own company",
    description:
      "We help experienced executives turn their careers into income of their own: as fractional executives for several companies, or with a company of their own.",
  },
  nav: {
    opportunity: "Opportunity",
    routes: "The route",
    fractional: "Fractional network",
    about: "About us",
    book: "Book a call",
    switchLabel: "Español",
    switchShort: "ES",
    menu: "Menu",
  },
  hero: {
    kicker: "[ For experienced executives ]",
    titleA: "Your experience can work for more than one company.",
    titleB: "Or for your own.",
    lead: "We help you turn your corporate career into income of your own: as a fractional executive, or as the founder of your own company. Without a leap in the dark.",
    ctaPrimary: "Book 30 minutes",
    ctaSecondary: "Write to us",
    route: [
      { label: "Today", title: "Salary and experience" },
      { label: "Route A", title: "Fractional" },
      { label: "Route B", title: "Your own company" },
      { label: "Destination", title: "Income that doesn't depend on a single employer" },
    ],
  },
  opportunity: {
    kicker: "01 · The opportunity",
    title: "Companies need senior judgment. Not always full time.",
    points: [
      { title: "Companies buy experience in parts", text: "Many small and mid-sized firms need someone senior two days a week, not five." },
      { title: "Your salary is not your only asset", text: "Your network, your method and your reputation can generate income of your own." },
      { title: "Quitting is a numbers decision", text: "You build in parallel and decide when the numbers say so." },
    ],
  },
  routes: {
    kicker: "02 · Two routes, one destination",
    title: "The same starting point: what you already know how to do.",
    a: {
      label: "Route A",
      tag: "Income within weeks",
      title: "Fractional",
      text: "Sell your experience in parts, as CFO, CMO or COO of several companies at once.",
      items: ["An offer a company understands in one sentence", "First clients from your own network", "Fees based on value, not hours"],
      link: "Register your fractional profile →",
    },
    b: {
      label: "Route B",
      tag: "An asset of your own",
      title: "Your own company",
      text: "Build an asset that creates value even when you are not in day-to-day operations.",
      items: ["Validate an offer with real clients", "A business that doesn't depend on you", "Leave your salary when the numbers say so"],
    },
  },
  how: {
    kicker: "03 · How we work",
    title: "It starts with a conversation, not a course.",
    steps: [
      { title: "A 30-minute conversation", text: "Free of charge. Your career, your situation and what you are looking for." },
      { title: "Diagnosis", text: "Which part of your experience the market pays for, and where to start." },
      { title: "A guided route", text: "A proposal tailored to you, with clear milestones." },
    ],
  },
  about: {
    kicker: "04 · About us",
    title: "Eddie Ajalcriña and Lorenzo Ortiz",
    intro: "Future Founders was born from building companies alongside a corporate career. That experience is the basis of our method and of our book, Doble Agente.",
    eddie: {
      name: "Eddie Ajalcriña",
      role: "CEO and co-founder of Redesign Lab",
      bio: "He built Redesign Lab, a Latin American impact venture studio, and his first ventures alongside his corporate career. Instructor at MIT Professional Education since 2022 and MBA from ESAN, with more than 15 years of experience and more than 10 companies invested in across Latin America.",
      link: "Full profile at eddieajalcrina.com →",
    },
    lorenzo: {
      name: "Lorenzo Ortiz",
      role: "Co-founder of Redesign Lab",
      bio: "Co-founder of Redesign Lab and co-author of Doble Agente.",
    },
    photoAltEddie: "Portrait of Eddie Ajalcriña",
    photoAltLorenzo: "Portrait of Lorenzo Ortiz",
  },
  book: {
    kicker: "05 · The book",
    title: "Doble Agente",
    subtitle: "The handbook for founders with a salary",
    text: "Our method, in a book: how to build income of your own without quitting too early. It is being edited and will be published in Spanish and English.",
    cta: "Send me the first chapter",
    mailSubject: "Please send me the first chapter of Doble Agente",
    alt: "Copies of the book Doble Agente, by Eddie Ajalcriña and Lorenzo Ortiz",
  },
  faq: {
    kicker: "06 · Questions",
    title: "Before you book",
    items: [
      {
        q: "What is a fractional executive?",
        a: "A senior professional who works part-time for several companies at once, for example as CFO two days a week, with defined goals and fees, instead of holding a full-time position.",
      },
      {
        q: "Do I have to quit my job?",
        a: "No. We start by understanding your situation: contract, available time and financial cushion. Many routes are built in parallel, and the decision to leave your salary is made when the numbers support it. Always check the exclusivity clauses in your contract.",
      },
      {
        q: "Is this a course?",
        a: "No. It is guidance: it starts with a 30-minute conversation and, if it makes sense, continues with a route tailored to you, with clear milestones.",
      },
      {
        q: "How much does it cost?",
        a: "The first conversation is free. If we decide to work together, we send you a proposal with a fixed scope and price.",
      },
      {
        q: "Who is it not for?",
        a: "People looking for quick income without effort, or who do not yet have a track record the market will pay for. If that is your case, we will tell you in the first conversation.",
      },
    ],
  },
  close: {
    titleA: "Let's talk about your",
    titleB: "next stage.",
    cta: "Choose a day and time",
    note: "Free · Video call · Lima time (GMT-5)",
    mailSubject: "I'd like to talk with Future Founders",
  },
  footer: {
    tagline: "From salary to your own: fractional work and your own company.",
    contact: "Contact",
    privacy: "Privacy",
    fractional: "Fractional network",
    rights: "Lima, Peru",
  },
  fractional: {
    meta: {
      title: "Fractional network · Register your profile",
      description:
        "Register your profile if you want to work as a fractional executive in Latin America. We are building a network of senior professionals to connect with companies.",
    },
    kicker: "[ Fractional network · Latin America ]",
    titleA: "Register your",
    titleB: "fractional profile.",
    lead: "We are building a network of senior professionals ready to work part-time for several companies. If that is you, tell us who you are and which problem you solve.",
    steps: [
      { title: "You register your profile", text: "About 5 minutes. Only the essentials." },
      { title: "We review it", text: "We read every profile. Nothing is automatic." },
      { title: "We get in touch", text: "When there is a conversation or an opportunity that fits you." },
    ],
    honest: "Registering does not guarantee assignments: it is the first step for us to get to know you.",
    formTitle: "Your profile",
  },
  privacy: {
    meta: { title: "Privacy policy", description: "How Future Founders handles the personal data it receives through this website." },
  },
};

export function getContent(lang: Lang): Content {
  return lang === "en" ? en : es;
}
