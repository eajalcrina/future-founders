import type { Lang } from "./site";

// Registro de la Red Fractional: una sola definición de campos para el formulario
// (cliente) y la validación (servidor). Se guardan los ids, no las etiquetas, para
// que los perfiles en español e inglés queden en la misma base.

type Opt = { id: string; es: string; en: string };
const o = (id: string, es: string, en: string): Opt => ({ id, es, en });

export const OPTIONS = {
  country: [
    o("pe", "Perú", "Peru"),
    o("mx", "México", "Mexico"),
    o("co", "Colombia", "Colombia"),
    o("cl", "Chile", "Chile"),
    o("ar", "Argentina", "Argentina"),
    o("ec", "Ecuador", "Ecuador"),
    o("bo", "Bolivia", "Bolivia"),
    o("latam", "Otro país de América Latina", "Other Latin American country"),
    o("es", "España", "Spain"),
    o("us", "Estados Unidos", "United States"),
    o("other", "Otro", "Other"),
  ],
  role: [
    o("finance", "Finanzas (CFO)", "Finance (CFO)"),
    o("commercial", "Comercial y ventas (CCO, CRO)", "Sales and commercial (CCO, CRO)"),
    o("marketing", "Marketing (CMO)", "Marketing (CMO)"),
    o("operations", "Operaciones y cadena de suministro (COO)", "Operations and supply chain (COO)"),
    o("technology", "Tecnología y datos (CTO, CIO)", "Technology and data (CTO, CIO)"),
    o("people", "Personas y talento (CHRO)", "People and talent (CHRO)"),
    o("legal", "Legal y cumplimiento", "Legal and compliance"),
    o("sustainability", "Sostenibilidad y ESG", "Sustainability and ESG"),
    o("general", "Dirección general y estrategia (CEO)", "General management and strategy (CEO)"),
    o("other", "Otra", "Other"),
  ],
  experience: [
    o("lt10", "Menos de 10 años", "Less than 10 years"),
    o("10-14", "10 a 14 años", "10 to 14 years"),
    o("15-19", "15 a 19 años", "15 to 19 years"),
    o("20-24", "20 a 24 años", "20 to 24 years"),
    o("25+", "25 años o más", "25 years or more"),
  ],
  industries: [
    o("consumer", "Consumo masivo", "Consumer goods"),
    o("retail", "Retail y e-commerce", "Retail and e-commerce"),
    o("agri", "Agroindustria y alimentos", "Agribusiness and food"),
    o("fishing", "Pesca y acuicultura", "Fishing and aquaculture"),
    o("mining", "Minería y energía", "Mining and energy"),
    o("manufacturing", "Manufactura e industria", "Manufacturing and industry"),
    o("finance", "Servicios financieros", "Financial services"),
    o("tech", "Tecnología y software", "Technology and software"),
    o("health", "Salud y farma", "Health and pharma"),
    o("construction", "Construcción e inmobiliario", "Construction and real estate"),
    o("logistics", "Logística y transporte", "Logistics and transport"),
    o("education", "Educación", "Education"),
    o("public", "Sector público y cooperación", "Public sector and development"),
    o("other", "Otra", "Other"),
  ],
  situation: [
    o("employed", "Empleado a tiempo completo", "Full-time employee"),
    o("independent", "Independiente o consultor", "Independent or consultant"),
    o("transition", "En transición", "In transition"),
    o("fractional", "Ya trabajo como fractional o interim", "Already working as fractional or interim"),
  ],
  availability: [
    o("lt8", "Hasta 8 horas por semana", "Up to 8 hours a week"),
    o("8-16", "8 a 16 horas por semana", "8 to 16 hours a week"),
    o("16-24", "16 a 24 horas por semana", "16 to 24 hours a week"),
    o("24+", "Más de 24 horas por semana", "More than 24 hours a week"),
  ],
  start: [
    o("now", "De inmediato", "Right away"),
    o("1-3m", "En 1 a 3 meses", "In 1 to 3 months"),
    o("3-6m", "En 3 a 6 meses", "In 3 to 6 months"),
    o("exploring", "Solo estoy explorando", "Just exploring"),
  ],
  modality: [o("remote", "Remota", "Remote"), o("onsite", "Presencial", "On-site"), o("hybrid", "Híbrida", "Hybrid")],
  languages: [o("es", "Español", "Spanish"), o("en", "Inglés", "English"), o("pt", "Portugués", "Portuguese")],
  fee: [
    o("lt1500", "Menos de USD 1.500", "Under USD 1,500"),
    o("1500-3000", "USD 1.500 a 3.000", "USD 1,500 to 3,000"),
    o("3000-5000", "USD 3.000 a 5.000", "USD 3,000 to 5,000"),
    o("5000+", "Más de USD 5.000", "Over USD 5,000"),
    o("na", "Prefiero no decirlo", "Prefer not to say"),
  ],
} satisfies Record<string, Opt[]>;

export type OptionKey = keyof typeof OPTIONS;

export const LIMITS = { name: 80, email: 160, phone: 40, url: 200, city: 80, roleOther: 80, summary: 500, maxIndustries: 3 };

export type FractionalProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  country: string;
  city: string;
  role: string;
  roleOther: string;
  experience: string;
  industries: string[];
  situation: string;
  availability: string;
  start: string;
  modality: string[];
  languages: string[];
  fee: string;
  summary: string;
  consent: boolean;
  newsletter: boolean;
  lang: Lang;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINKEDIN_RE = /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const one = (v: unknown, key: OptionKey) => {
  const s = typeof v === "string" ? v : "";
  return OPTIONS[key].some((x) => x.id === s) ? s : "";
};
const many = (v: unknown, key: OptionKey) =>
  Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && OPTIONS[key].some((y) => y.id === x)))] : [];

export type FieldError = { field: keyof FractionalProfile; code: "required" | "invalid" | "max" };

// Limpia y valida lo que llega del navegador. Lo que no está en las listas se descarta.
export function parseProfile(input: Record<string, unknown>): { profile: FractionalProfile; errors: FieldError[] } {
  const profile: FractionalProfile = {
    firstName: str(input.firstName, LIMITS.name),
    lastName: str(input.lastName, LIMITS.name),
    email: str(input.email, LIMITS.email).toLowerCase(),
    phone: str(input.phone, LIMITS.phone),
    linkedin: str(input.linkedin, LIMITS.url),
    country: one(input.country, "country"),
    city: str(input.city, LIMITS.city),
    role: one(input.role, "role"),
    roleOther: str(input.roleOther, LIMITS.roleOther),
    experience: one(input.experience, "experience"),
    industries: many(input.industries, "industries"),
    situation: one(input.situation, "situation"),
    availability: one(input.availability, "availability"),
    start: one(input.start, "start"),
    modality: many(input.modality, "modality"),
    languages: many(input.languages, "languages"),
    fee: one(input.fee, "fee"),
    summary: str(input.summary, LIMITS.summary),
    consent: input.consent === true,
    newsletter: input.newsletter === true,
    lang: input.lang === "en" ? "en" : "es",
  };

  const errors: FieldError[] = [];
  const required: (keyof FractionalProfile)[] = [
    "firstName", "lastName", "email", "linkedin", "country", "role", "experience", "situation", "availability", "start", "summary",
  ];
  for (const f of required) if (!profile[f]) errors.push({ field: f, code: "required" });
  if (profile.email && !EMAIL_RE.test(profile.email)) errors.push({ field: "email", code: "invalid" });
  if (profile.linkedin && !LINKEDIN_RE.test(profile.linkedin)) errors.push({ field: "linkedin", code: "invalid" });
  if (profile.industries.length === 0) errors.push({ field: "industries", code: "required" });
  if (profile.industries.length > LIMITS.maxIndustries) errors.push({ field: "industries", code: "max" });
  if (profile.modality.length === 0) errors.push({ field: "modality", code: "required" });
  if (profile.role === "other" && !profile.roleOther) errors.push({ field: "roleOther", code: "required" });
  if (!profile.consent) errors.push({ field: "consent", code: "required" });
  return { profile, errors };
}

export function label(key: OptionKey, id: string, lang: Lang) {
  return OPTIONS[key].find((x) => x.id === id)?.[lang] ?? id;
}

// Textos del formulario.
export const FORM_TEXT = {
  es: {
    sections: ["Datos de contacto", "Tu experiencia", "Tu disponibilidad", "Tu propuesta"],
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    phone: "Teléfono o WhatsApp (opcional)",
    linkedin: "Perfil de LinkedIn",
    linkedinHint: "https://www.linkedin.com/in/…",
    country: "País de residencia",
    city: "Ciudad (opcional)",
    role: "Función principal",
    roleOther: "¿Cuál?",
    experience: "Años de experiencia profesional",
    industries: "Industrias donde tienes experiencia (hasta 3)",
    situation: "Situación actual",
    availability: "Tiempo que podrías dedicar",
    start: "¿Desde cuándo?",
    modality: "Modalidad",
    languages: "Idiomas de trabajo",
    fee: "Honorario mensual esperado por empresa (opcional)",
    summary: "¿Qué problema resuelves para una empresa?",
    summaryHint: "En 2 o 3 frases: el problema, para quién y qué resultado has logrado.",
    consent: "Acepto que Future Founders trate mis datos para evaluar mi perfil y contactarme con oportunidades fractional, según la",
    privacyLink: "política de privacidad",
    newsletter: "Quiero recibir novedades de Future Founders por correo (opcional).",
    select: "Selecciona",
    submit: "Registrar mi perfil",
    sending: "Enviando…",
    required: "Este campo es obligatorio.",
    invalidEmail: "Revisa el correo.",
    invalidLinkedin: "Pega la URL completa de tu perfil de LinkedIn.",
    maxIndustries: "Elige hasta 3.",
    errorGeneric: "No pudimos registrar tu perfil. Inténtalo de nuevo o escríbenos.",
    errorRate: "Recibimos varios envíos desde tu conexión. Inténtalo en una hora.",
    successTitle: "Perfil registrado.",
    successText: "Gracias. Revisaremos tu perfil y te escribiremos cuando haya una conversación o una oportunidad que encaje contigo.",
    successCta: "Mientras tanto, agenda 30 minutos",
  },
  en: {
    sections: ["Contact details", "Your experience", "Your availability", "Your offer"],
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone or WhatsApp (optional)",
    linkedin: "LinkedIn profile",
    linkedinHint: "https://www.linkedin.com/in/…",
    country: "Country of residence",
    city: "City (optional)",
    role: "Main function",
    roleOther: "Which one?",
    experience: "Years of professional experience",
    industries: "Industries you have experience in (up to 3)",
    situation: "Current situation",
    availability: "Time you could commit",
    start: "From when?",
    modality: "Work mode",
    languages: "Working languages",
    fee: "Expected monthly fee per company (optional)",
    summary: "What problem do you solve for a company?",
    summaryHint: "In 2 or 3 sentences: the problem, for whom, and what result you have achieved.",
    consent: "I agree that Future Founders may process my data to review my profile and contact me about fractional opportunities, under its",
    privacyLink: "privacy policy",
    newsletter: "I'd like to receive Future Founders news by email (optional).",
    select: "Select",
    submit: "Register my profile",
    sending: "Sending…",
    required: "This field is required.",
    invalidEmail: "Please check your email.",
    invalidLinkedin: "Paste the full URL of your LinkedIn profile.",
    maxIndustries: "Choose up to 3.",
    errorGeneric: "We couldn't register your profile. Please try again or write to us.",
    errorRate: "We received several submissions from your connection. Please try again in an hour.",
    successTitle: "Profile registered.",
    successText: "Thank you. We will review your profile and write to you when there is a conversation or an opportunity that fits you.",
    successCta: "In the meantime, book 30 minutes",
  },
} as const;
