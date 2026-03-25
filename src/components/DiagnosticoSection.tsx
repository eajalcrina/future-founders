"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Download, RefreshCw, CheckCircle2, ChevronRight, Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type State = "idle" | "quiz" | "gate" | "result";

interface Option {
  id: string;
  text: string;
  score: number;
}

interface Question {
  id: number;
  block: string;
  text: string;
  options: Option[];
}

interface Answers {
  [questionId: number]: { optionId: string; score: number; text: string };
}

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  yearsExperience: string;
}

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    block: "Situacion Actual",
    text: "¿Cuál describe mejor tu situación actual?",
    options: [
      { id: "A", text: "Ejecutivo o directivo en empresa privada (C-suite, gerencia, jefatura senior)", score: 3 },
      { id: "B", text: "Funcionario o ejecutivo en empresa pública / multinacional", score: 3 },
      { id: "C", text: "Dueño de PYME buscando escalar o sistematizar", score: 3 },
      { id: "D", text: "Profesional independiente / consultor sin estructura empresarial", score: 1 },
      { id: "E", text: "En transición (cambio de trabajo, entre proyectos)", score: 1 },
    ],
  },
  {
    id: 2,
    block: "Situacion Actual",
    text: "¿Cuántos años llevas en el mundo corporativo o empresarial?",
    options: [
      { id: "A", text: "Menos de 5 años", score: 0 },
      { id: "B", text: "Entre 5 y 10 años", score: 1 },
      { id: "C", text: "Entre 10 y 20 años", score: 2 },
      { id: "D", text: "Más de 20 años", score: 3 },
    ],
  },
  {
    id: 3,
    block: "Situacion Actual",
    text: "¿Con cuál de estas afirmaciones te identificas más en este momento?",
    options: [
      { id: "A", text: "Gano bien, pero siento que mi ingreso depende 100% de que yo siga trabajando.", score: 3 },
      { id: "B", text: "Tengo una idea de negocio pero no sé por dónde empezar sin arriesgar mi estabilidad.", score: 3 },
      { id: "C", text: "Ya emprendí, pero mi negocio no crece o depende demasiado de mí.", score: 3 },
      { id: "D", text: "Quiero salir del corporativo pero me da miedo perder el salario antes de tener algo sólido.", score: 2 },
      { id: "E", text: "Siento que mi experiencia vale mucho más de lo que me pagan.", score: 2 },
    ],
  },
  {
    id: 4,
    block: "Activos Disponibles",
    text: "¿Qué activo tienes hoy que sientes que no estás aprovechando bien?",
    options: [
      { id: "A", text: "Una red de contactos sólida en mi industria", score: 3 },
      { id: "B", text: "Conocimiento especializado que podría monetizarse", score: 3 },
      { id: "C", text: "Tiempo parcial disponible fuera del horario laboral", score: 2 },
      { id: "D", text: "Capital o ahorros para invertir en un proyecto", score: 2 },
      { id: "E", text: "Ninguno de los anteriores / no estoy seguro", score: 0 },
    ],
  },
  {
    id: 5,
    block: "Activos Disponibles",
    text: "¿Cuántas horas a la semana podrías dedicar, de manera realista, a construir tu propio negocio sin afectar tu trabajo actual?",
    options: [
      { id: "A", text: "Menos de 3 horas", score: 0 },
      { id: "B", text: "Entre 3 y 7 horas", score: 1 },
      { id: "C", text: "Entre 7 y 15 horas", score: 2 },
      { id: "D", text: "Más de 15 horas", score: 3 },
    ],
  },
  {
    id: 6,
    block: "Activos Disponibles",
    text: "¿Has tenido algún intento previo de emprendimiento o proyecto paralelo?",
    options: [
      { id: "A", text: "No, es una idea que siempre postergué", score: 1 },
      { id: "B", text: "Sí, exploré una idea pero no llegué a validarla", score: 2 },
      { id: "C", text: "Sí, lancé algo pero no generó ingresos sostenibles", score: 2 },
      { id: "D", text: "Sí, tengo algo funcionando pero quiero escalarlo", score: 3 },
    ],
  },
  {
    id: 7,
    block: "Mentalidad y Urgencia",
    text: "Si hoy tuvieras la certeza de que tu proyecto propio puede reemplazar tu salario en 18-24 meses, ¿qué harías?",
    options: [
      { id: "A", text: "Empezaría a construirlo en paralelo inmediatamente", score: 3 },
      { id: "B", text: "Lo pensaría muy bien antes de actuar", score: 1 },
      { id: "C", text: "Necesitaría más pruebas antes de creer eso", score: 0 },
      { id: "D", text: "Ya lo estoy haciendo / ya tomé la decisión", score: 3 },
    ],
  },
  {
    id: 8,
    block: "Mentalidad y Urgencia",
    text: "¿Qué tan dispuesto estarías a invertir en un programa estructurado que te guíe paso a paso?",
    options: [
      { id: "A", text: "No estoy en posición de invertir ahora mismo", score: 0 },
      { id: "B", text: "Podría invertir si hay garantías claras de resultado", score: 1 },
      { id: "C", text: "Estoy dispuesto a invertir si veo el valor", score: 2 },
      { id: "D", text: "Ya he invertido en programas similares y busco algo más avanzado", score: 3 },
    ],
  },
  {
    id: 9,
    block: "Mentalidad y Urgencia",
    text: "¿Cuándo te gustaría tener tu primer cliente o tu primera fuente de ingreso fuera del empleo?",
    options: [
      { id: "A", text: "En los próximos 3 meses", score: 3 },
      { id: "B", text: "En los próximos 6 meses", score: 3 },
      { id: "C", text: "En el próximo año", score: 2 },
      { id: "D", text: "No tengo un plazo definido aún", score: 0 },
    ],
  },
];

// ─── Archetypes ───────────────────────────────────────────────────────────────

interface Archetype {
  number: number;
  name: string;
  tagline: string;
  perfil: string;
  mensaje: string;
  accentColor: string;
  ctaText: string;
  ctaHref: string;
  fortalezas: string[];
  oportunidades: string[];
  proximosPasos: string[];
}

function getArchetype(score: number): Archetype {
  if (score <= 9) {
    return {
      number: 3,
      name: "El Ejecutivo de Alto Riesgo",
      tagline: "Tienes el mapa. Falta la urgencia.",
      perfil: "Alto potencial, experiencia sólida, pero sin estructura ni urgencia para actuar.",
      mensaje:
        "Tu mayor activo es tu experiencia. Tu mayor riesgo es esperar a que la empresa decida por ti. Este es el momento de conocer el mapa antes de que lo necesites.",
      accentColor: "#2d3fd4",
      ctaText: "Conoce el programa",
      ctaHref: "#bootcamp",
      fortalezas: [
        "Experiencia corporativa sólida y acumulada a lo largo de los años",
        "Visión estratégica desarrollada en entornos de alta exigencia",
        "Red de contactos valiosa en tu industria, sin explotar aún",
      ],
      oportunidades: [
        "Activar la urgencia: cada mes sin actuar es capital y tiempo perdido",
        "Construir un sistema mínimo que funcione en paralelo al trabajo actual",
      ],
      proximosPasos: [
        "Descarga el Libro Doble Agente — es tu primera misión de reconocimiento",
        "Mapea tus 3 activos más monetizables esta semana (red, expertise, tiempo)",
        "Agenda una llamada de diagnóstico con el equipo de Future Founders",
      ],
    };
  } else if (score <= 17) {
    return {
      number: 1,
      name: "El Potencial Bloqueado",
      tagline: "El talento está. Falta el sistema.",
      perfil: "Ejecutivo con experiencia y conocimiento, pero sin claridad ni estructura para arrancar.",
      mensaje:
        "Tienes todos los ingredientes para construir un activo de alto valor. Lo que te falta no es talento — es el mapa y el sistema para ejecutar sin arriesgar lo que ya construiste.",
      accentColor: "#f7e05f",
      ctaText: "Ver el Bootcamp",
      ctaHref: "#bootcamp",
      fortalezas: [
        "Alto nivel de expertise acumulado con valor real de mercado",
        "Motivación genuina de cambio y construcción de independencia",
        "Claridad sobre el problema o industria que quieres resolver",
      ],
      oportunidades: [
        "Productizar el expertise en una oferta concreta y vendible",
        "Superar el miedo a ejecutar con un sistema de pasos probados",
      ],
      proximosPasos: [
        "Diseña tu primera oferta de alto valor esta semana usando el Framework Doble Agente",
        "Construye tu SOP mínimo sin dejar el corporativo — son 5 horas a la semana",
        "Únete al Bootcamp para tener el sistema completo y una comunidad que ejecuta",
      ],
    };
  } else if (score <= 22) {
    return {
      number: 2,
      name: "El Doble Agente en Formación",
      tagline: "Ya arrancaste. Ahora necesitas el sistema.",
      perfil: "Empezó a explorar, tiene algo de tracción pero sin metodología ni sistemas escalables.",
      mensaje:
        "Ya diste el paso más difícil: probar. Ahora necesitas convertir ese intento en una máquina que funcione sin depender de tu energía diaria.",
      accentColor: "#f7e05f",
      ctaText: "Inscríbete al Bootcamp",
      ctaHref: "#bootcamp",
      fortalezas: [
        "Validación inicial real: ya probaste que el mercado existe",
        "Mentalidad emprendedora activada y disposición para invertir en crecimiento",
        "Experiencia de primera mano con clientes o proyectos reales",
      ],
      oportunidades: [
        "Instalar sistemas de entrega que no dependan de tu presencia diaria",
        "Reposicionar el pricing para cobrar por valor, no por hora ni esfuerzo",
      ],
      proximosPasos: [
        "Documenta y delega: construye tu primer SOP de entrega esta semana",
        "Rediseña tu oferta para que el precio refleje el resultado, no el tiempo",
        "Escala a $5K–$20K/mes implementando el sistema completo en el Bootcamp",
      ],
    };
  } else {
    return {
      number: 4,
      name: "El Fundador Listo",
      tagline: "Perfil de cierre. Hora de actuar.",
      perfil: "Lead con urgencia, recursos y disposición total. Perfil directo a resultados.",
      mensaje:
        "Tu diagnóstico es claro: tienes el perfil exacto de los ejecutivos que han escalado a su primer $50K en los últimos 18 meses con nuestro sistema. No hay razón para esperar más.",
      accentColor: "#f7e05f",
      ctaText: "INSCRÍBETE AHORA",
      ctaHref: "#bootcamp",
      fortalezas: [
        "Urgencia real y disposición de inversión: sabes que el tiempo vale más que el dinero",
        "Recursos disponibles para ejecutar hoy sin esperar condiciones perfectas",
        "Mentalidad de fundador ya instalada — solo falta el sistema correcto",
      ],
      oportunidades: [
        "Elegir el vehículo correcto para no volver a construir sobre bases equivocadas",
        "Actuar esta semana: el riesgo más grande ahora es la inacción",
      ],
      proximosPasos: [
        "Inscríbete al Bootcamp esta semana para comenzar en la próxima cohorte",
        "Reserva tu sesión 1:1 de onboarding con el equipo de Future Founders",
        "Lanza tu primera oferta validada en los próximos 30 días con nuestro acompañamiento",
      ],
    };
  }
}

// ─── SpeedometerGauge ─────────────────────────────────────────────────────────

function arcPt(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function SpeedometerGauge({ score, maxScore, color }: { score: number; maxScore: number; color: string }) {
  const [displayPct, setDisplayPct] = useState(0);
  const pct = Math.min(score / maxScore, 1);
  useEffect(() => {
    let frame: number;
    const t0 = performance.now();
    const duration = 1600;
    const targetPct = Math.round(pct * 100);
    function step(now: number) {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayPct(Math.round(eased * targetPct));
      if (t < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [pct]);

  const cx = 100, cy = 98, R = 74;
  const arcLen = Math.PI * R; // 232.5

  // Zone boundary points on the arc (arc goes from 180° to 0°)
  const p37 = arcPt(cx, cy, R, 180 - 0.37 * 180); // 113.4°
  const p67 = arcPt(cx, cy, R, 180 - 0.67 * 180); // 59.4°

  const needleRotate = pct * 180 - 90; // -90° (left) → 90° (right)

  return (
    <div className="flex flex-col items-center w-60 sm:w-72">
      <svg viewBox="0 0 200 140" className="w-full" aria-label={`Puntaje ${score} de ${maxScore}`}>
        {/* Zone backgrounds */}
        <path d={`M 26 98 A ${R} ${R} 0 0 1 ${p37.x.toFixed(1)} ${p37.y.toFixed(1)}`}
          fill="none" stroke="rgba(239,68,68,0.20)" strokeWidth="11" strokeLinecap="butt" />
        <path d={`M ${p37.x.toFixed(1)} ${p37.y.toFixed(1)} A ${R} ${R} 0 0 1 ${p67.x.toFixed(1)} ${p67.y.toFixed(1)}`}
          fill="none" stroke="rgba(245,158,11,0.20)" strokeWidth="11" strokeLinecap="butt" />
        <path d={`M ${p67.x.toFixed(1)} ${p67.y.toFixed(1)} A ${R} ${R} 0 0 1 174 98`}
          fill="none" stroke="rgba(34,197,94,0.20)" strokeWidth="11" strokeLinecap="butt" />

        {/* Track */}
        <path d="M 26 98 A 74 74 0 0 1 174 98"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="11" strokeLinecap="round" />

        {/* Progress arc */}
        <motion.path d="M 26 98 A 74 74 0 0 1 174 98"
          fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${arcLen} ${arcLen}`}
          initial={{ strokeDashoffset: arcLen }}
          animate={{ strokeDashoffset: arcLen * (1 - pct) }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        />

        {/* Needle */}
        <motion.g style={{ transformOrigin: `${cx}px ${cy}px` }}
          initial={{ rotate: -90 }}
          animate={{ rotate: needleRotate }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        >
          <line x1={cx} y1={cy} x2={cx} y2={cy - 58}
            stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + 9}
            stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </motion.g>

        {/* Hub */}
        <circle cx={cx} cy={cy} r="6" fill={color} />
        <circle cx={cx} cy={cy} r="2.5" fill="#050508" />

        {/* Percentage score — below the hub, clear of needle */}
        <text x={cx} y={cy + 26} textAnchor="middle" fill="white" fontSize="24" fontWeight="700" fontFamily="Space Grotesk,sans-serif">
          {displayPct}%
        </text>
        <text x={cx} y={cy + 40} textAnchor="middle" fill="rgba(255,255,255,0.30)" fontSize="7.5" fontFamily="DM Sans,sans-serif" letterSpacing="1.5">
          PERFIL COMPLETADO
        </text>
      </svg>
      {/* Zone labels below SVG */}
      <div className="flex justify-between text-[10px] tracking-widest mt-1 px-2 w-full" style={{ fontFamily: "var(--font-badge)" }}>
        <span className="text-red-400/60">BAJO</span>
        <span className="text-amber-400/60">MEDIO</span>
        <span className="text-green-500/60">ALTO</span>
      </div>
    </div>
  );
}

// ─── BlockScoreRow ─────────────────────────────────────────────────────────────

function BlockScoreRow({ label, score, max = 9, delay = 0 }: { label: string; score: number; max?: number; delay?: number }) {
  const pct = score / max;
  const isLow = pct < 0.37;
  const isMid = pct >= 0.37 && pct < 0.67;
  const isHigh = pct >= 0.67;
  const barColor = isLow ? "#ef4444" : isMid ? "#f59e0b" : "#22c55e";
  const statusLabel = isLow ? "Por desarrollar" : isMid ? "En desarrollo" : "Sólido";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3"
    >
      {/* Traffic light dots */}
      <div className="flex gap-1 flex-shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full transition-all ${isLow ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" : "bg-red-500/15"}`} />
        <div className={`w-2.5 h-2.5 rounded-full transition-all ${isMid ? "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" : "bg-amber-400/15"}`} />
        <div className={`w-2.5 h-2.5 rounded-full transition-all ${isHigh ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" : "bg-green-500/15"}`} />
      </div>

      {/* Label + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-white/60 font-[family-name:var(--font-dm-sans)] truncate">{label}</span>
          <span className="text-sm font-bold ml-2 flex-shrink-0" style={{ color: barColor, fontFamily: "var(--font-badge)" }}>
            {Math.round((score / max) * 100)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: barColor }}
            initial={{ width: 0 }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: delay + 0.3 }}
          />
        </div>
        <div className="text-[10px] mt-0.5 font-[family-name:var(--font-dm-sans)]" style={{ color: `${barColor}99` }}>
          {statusLabel}
        </div>
      </div>
    </motion.div>
  );
}

const BLOCK_LABELS: Record<string, string> = {
  "Situacion Actual": "BLOQUE 1 — SITUACIÓN ACTUAL",
  "Activos Disponibles": "BLOQUE 2 — ACTIVOS DISPONIBLES",
  "Mentalidad y Urgencia": "BLOQUE 3 — MENTALIDAD Y URGENCIA",
};

const COUNTRIES = [
  "Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Ecuador",
  "El Salvador", "España", "Guatemala", "Honduras", "México", "Nicaragua",
  "Panamá", "Paraguay", "Perú", "República Dominicana", "Uruguay", "Venezuela", "Otro",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DiagnosticoSection() {
  const [state, setState] = useState<State>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    yearsExperience: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ archetype: Archetype; score: number } | null>(null);
  const [diagCount, setDiagCount] = useState(265);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("ff_diag_count") || "0");
    const target = 265 + stored;
    let current = target - 5;
    setDiagCount(current);
    const timer = setInterval(() => {
      current++;
      setDiagCount(current);
      if (current >= target) clearInterval(timer);
    }, 110);
    return () => clearInterval(timer);
  }, []);

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);

  function startQuiz() {
    setState("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
  }

  function selectOption(opt: Option) {
    setSelectedOption(opt.id);
    setAnswers((prev) => ({
      ...prev,
      [question.id]: { optionId: opt.id, score: opt.score, text: opt.text },
    }));
  }

  function goNext() {
    if (!selectedOption) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOption(answers[QUESTIONS[currentQ + 1]?.id]?.optionId ?? null);
    } else {
      setState("gate");
    }
  }

  function goPrev() {
    if (currentQ > 0) {
      const prevQ = currentQ - 1;
      setCurrentQ(prevQ);
      setSelectedOption(answers[QUESTIONS[prevQ].id]?.optionId ?? null);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const score = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    const archetype = getArchetype(score);

    // Fire and forget — don't block UI
    fetch("/api/brevo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        country: leadData.country,
        yearsExperience: leadData.yearsExperience,
        archetype: archetype.name,
        archetypeNumber: archetype.number,
        score,
        maxScore: 27,
        situacion: answers[1]?.text ?? "",
        disposicionInversion: answers[8]?.text ?? "",
        urgencia: answers[9]?.text ?? "",
      }),
    }).catch(() => {});

    // Increment marketing counter
    const stored = parseInt(localStorage.getItem("ff_diag_count") || "0");
    localStorage.setItem("ff_diag_count", String(stored + 1));

    setResult({ archetype, score });
    setState("result");
    setSubmitting(false);
  }

  function handleDownload() {
    if (!result) return;
    const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
    const year = new Date().getFullYear();
    const scorePct = Math.round((result.score / 27) * 100);
    const blockScores = [
      { label: "Situación Actual", score: (answers[1]?.score ?? 0) + (answers[2]?.score ?? 0) + (answers[3]?.score ?? 0), max: 9 },
      { label: "Activos Disponibles", score: (answers[4]?.score ?? 0) + (answers[5]?.score ?? 0) + (answers[6]?.score ?? 0), max: 9 },
      { label: "Mentalidad y Urgencia", score: (answers[7]?.score ?? 0) + (answers[8]?.score ?? 0) + (answers[9]?.score ?? 0), max: 9 },
    ];
    const blockRows = blockScores.map(b => {
      const pct = Math.round((b.score / b.max) * 100);
      const color = pct < 37 ? "#ef4444" : pct < 67 ? "#f59e0b" : "#22c55e";
      const status = pct < 37 ? "Por desarrollar" : pct < 67 ? "En desarrollo" : "Sólido";
      return `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:12px;color:#333;">${b.label}</span>
            <span style="font-size:12px;font-weight:700;color:${color};">${pct}% — ${status}</span>
          </div>
          <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${color};border-radius:3px;"></div>
          </div>
        </div>`;
    }).join("");

    const fortalezas = result.archetype.fortalezas.map(f =>
      `<li style="font-size:12px;color:#1e1e2e;line-height:1.7;margin-bottom:4px;">${f}</li>`).join("");
    const oportunidades = result.archetype.oportunidades.map(o =>
      `<li style="font-size:12px;color:#1e1e2e;line-height:1.7;margin-bottom:4px;">${o}</li>`).join("");
    const pasos = result.archetype.proximosPasos.map((p, i) =>
      `<li style="font-size:12px;color:#1e1e2e;line-height:1.8;margin-bottom:6px;"><strong style="color:#1a27c9;">Paso ${i + 1}:</strong> ${p}</li>`).join("");

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Diagnóstico Future Founders — ${leadData.firstName} ${leadData.lastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1e1e2e; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    .no-print {
      text-align: center;
      padding: 16px;
      background: #f3f4f6;
      border-bottom: 1px solid #e5e7eb;
    }
    .no-print button {
      padding: 10px 28px;
      background: #1a27c9;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      margin: 0 6px;
    }
    .no-print button.secondary {
      background: transparent;
      color: #666;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.print()">🖨 Imprimir / Guardar PDF</button>
    <button class="secondary" onclick="window.close()">Cerrar</button>
  </div>

  <!-- Header band -->
  <div style="background:#050508;color:white;padding:20px 32px;display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <div style="font-size:20px;font-weight:900;color:#f7e05f;letter-spacing:0.05em;">FUTURE FOUNDERS</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Diagnóstico de Perfil Fundador</div>
    </div>
    <div style="text-align:right;font-size:11px;color:rgba(255,255,255,0.5);">
      <div>futurefounders.pe · ff@redesignlab.org</div>
      <div style="margin-top:2px;">${date}</div>
    </div>
  </div>

  <!-- Person info band -->
  <div style="background:#1a27c9;color:white;padding:14px 32px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      <div style="font-size:16px;font-weight:700;">${leadData.firstName} ${leadData.lastName}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;">${leadData.email}${leadData.country ? ` · ${leadData.country}` : ""}${leadData.yearsExperience ? ` · ${leadData.yearsExperience.replace("menos-5","<5 años").replace("5-10","5–10 años").replace("10-20","10–20 años").replace("mas-20",">20 años")} de experiencia` : ""}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:rgba(255,255,255,0.7);">Puntaje obtenido</div>
      <div style="font-size:26px;font-weight:900;color:#f7e05f;">${scorePct}%</div>
    </div>
  </div>

  <!-- Archetype hero -->
  <div style="background:#0d0d14;color:white;padding:28px 32px 24px;border-bottom:3px solid #f7e05f;">
    <div style="font-size:10px;font-weight:700;letter-spacing:0.2em;color:#f7e05f;margin-bottom:6px;">ARQUETIPO ${result.archetype.number}</div>
    <div style="font-size:28px;font-weight:900;color:white;margin-bottom:6px;">${result.archetype.name}</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.65);font-style:italic;">${result.archetype.tagline}</div>
  </div>

  <!-- Body -->
  <div style="padding:28px 32px;background:#f9f9fb;">

    <!-- Mensaje -->
    <div style="background:#1a27c910;border-left:3px solid #1a27c9;padding:14px 18px;border-radius:4px;margin-bottom:24px;">
      <p style="font-size:13px;line-height:1.7;color:#1e1e2e;font-style:italic;">"${result.archetype.mensaje}"</p>
    </div>

    <!-- Score bars -->
    <div style="margin-bottom:24px;">
      <div style="font-size:10px;font-weight:700;color:#1a27c9;letter-spacing:0.15em;margin-bottom:10px;border-bottom:1.5px solid #1a27c9;padding-bottom:4px;">ANÁLISIS POR BLOQUE</div>
      ${blockRows}
    </div>

    <!-- 2-col: Fortalezas + Oportunidades -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;">
      <div>
        <div style="font-size:10px;font-weight:700;color:#1a27c9;letter-spacing:0.15em;margin-bottom:8px;border-bottom:1.5px solid #1a27c9;padding-bottom:4px;">FORTALEZAS</div>
        <ul style="margin:0;padding-left:16px;">${fortalezas}</ul>
      </div>
      <div>
        <div style="font-size:10px;font-weight:700;color:#c9184a;letter-spacing:0.15em;margin-bottom:8px;border-bottom:1.5px solid #c9184a;padding-bottom:4px;">ÁREAS DE OPORTUNIDAD</div>
        <ul style="margin:0;padding-left:16px;">${oportunidades}</ul>
      </div>
    </div>

    <!-- Próximos pasos -->
    <div>
      <div style="font-size:10px;font-weight:700;color:#1a27c9;letter-spacing:0.15em;margin-bottom:10px;border-bottom:1.5px solid #1a27c9;padding-bottom:4px;">PRÓXIMOS PASOS</div>
      <ol style="margin:0;padding-left:18px;">${pasos}</ol>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#050508;color:rgba(255,255,255,0.4);padding:14px 32px;font-size:10px;display:flex;justify-content:space-between;">
    <span>© ${year} Future Founders — Documento confidencial</span>
    <span>futurefounders.pe · ff@redesignlab.org</span>
  </div>
</body>
</html>`;

    const popup = window.open("", "_blank", "width=900,height=1100,scrollbars=yes");
    if (popup) {
      popup.document.write(html);
      popup.document.close();
    }
  }

  function reset() {
    setState("idle");
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
    setLeadData({ firstName: "", lastName: "", email: "", phone: "", country: "", yearsExperience: "" });
    setResult(null);
  }

  return (
    <section
      id="diagnostico"
      className="relative py-0 bg-[#050508] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#1a27c9]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#1a27c9]/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 py-36">
        <AnimatePresence mode="wait">
          {/* ── IDLE ── */}
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Card container — same style as Plataforma CTA */}
              <div className="relative rounded-3xl border border-[#1a27c9]/30 bg-[#1a27c9]/[0.06] overflow-hidden p-10 sm:p-16 text-center">
                {/* Blue glow blob */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#1a27c9]/15 blur-3xl" />
                </div>

                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-[#f7e05f]/30 bg-[#f7e05f]/8 text-[#f7e05f] text-xs font-semibold tracking-widest mb-8 font-[family-name:var(--font-dm-sans)]">
                    DIAGNÓSTICO GRATUITO · 3 MINUTOS
                  </span>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight max-w-3xl mx-auto" style={{ fontFamily: "var(--font-display)" }}>
                    Descubre en 3 minutos si estás listo para{" "}
                    <span className="text-[#f7e05f]">construir tu activo</span>
                  </h1>

                  <p className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-14 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                    Responde 9 preguntas y recibe un diagnóstico personalizado basado en el sistema que han usado más de 155 ejecutivos en Latam.
                  </p>

                  {/* Live counter */}
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="flex -space-x-1.5">
                      {["bg-[#1a27c9]/60","bg-[#2d3fd4]/60","bg-[#4d5fd4]/60","bg-[#6b7be0]/60"].map((c, i) => (
                        <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-[#0d0d14]`} />
                      ))}
                    </div>
                    <p className="text-white/70 text-base font-[family-name:var(--font-dm-sans)]">
                      <span className="text-[#f7e05f] font-bold tabular-nums text-2xl">{diagCount}</span>
                      {" "}ejecutivos ya realizaron su diagnóstico
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={startQuiz}
                    className="inline-flex items-center justify-center gap-3 px-14 py-5 rounded-2xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] font-bold text-lg transition-all duration-200 cursor-pointer hover:shadow-2xl hover:shadow-[#f7e05f]/30 mb-5 font-[family-name:var(--font-dm-sans)]"
                  >
                    COMENZAR DIAGNÓSTICO
                    <ArrowRight size={22} />
                  </motion.button>

                  <p className="text-xs text-white/35 font-[family-name:var(--font-dm-sans)]">
                    Gratuito · Sin tarjeta de crédito · Resultado inmediato
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── QUIZ ── */}
          {state === "quiz" && (
            <motion.div
              key={`quiz-${currentQ}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40 font-[family-name:var(--font-dm-sans)]">
                    {BLOCK_LABELS[question.block] ?? question.block.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/40 font-[family-name:var(--font-dm-sans)]">
                    Pregunta {currentQ + 1} de {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#f7e05f] rounded-full"
                    initial={{ width: `${(currentQ / QUESTIONS.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug font-[family-name:var(--font-space-grotesk)]">
                {question.text}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-10">
                {question.options.map((opt, i) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => selectOption(opt)}
                      className={`
                        w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer
                        font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed
                        ${isSelected
                          ? "border-[#f7e05f] bg-[#f7e05f]/8 text-white"
                          : "border-white/10 bg-white/3 text-white/75 hover:border-[#1a27c9] hover:bg-[#1a27c9]/8 hover:text-white"
                        }
                      `}
                    >
                      <span
                        className={`inline-block w-6 h-6 rounded-md border text-xs font-bold mr-3 text-center leading-5 flex-shrink-0
                          ${isSelected ? "border-[#f7e05f] bg-[#f7e05f] text-[#050508]" : "border-white/20 text-white/40"}
                        `}
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle" }}
                      >
                        {opt.id}
                      </span>
                      {opt.text}
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                {currentQ > 0 ? (
                  <button
                    onClick={goPrev}
                    className="flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
                  >
                    <ArrowLeft size={16} />
                    Anterior
                  </button>
                ) : (
                  <div />
                )}

                <motion.button
                  whileHover={selectedOption ? { scale: 1.02 } : {}}
                  whileTap={selectedOption ? { scale: 0.98 } : {}}
                  onClick={goNext}
                  disabled={!selectedOption}
                  className={`
                    inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)]
                    ${selectedOption
                      ? "bg-[#f7e05f] text-[#050508] hover:bg-[#e8d04e] hover:shadow-xl hover:shadow-[#f7e05f]/20"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                    }
                  `}
                >
                  {currentQ < QUESTIONS.length - 1 ? "Siguiente" : "Ver mi diagnóstico"}
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── GATE ── */}
          {state === "gate" && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-[family-name:var(--font-space-grotesk)]">
                  Tu diagnóstico está listo
                </h3>
                <p className="text-white/55 font-[family-name:var(--font-dm-sans)]">
                  Antes de ver tu diagnóstico, dinos a dónde enviarlo:
                </p>
              </div>

              <form onSubmit={submitLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 font-[family-name:var(--font-dm-sans)]">
                      Nombre <span className="text-[#f7e05f]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leadData.firstName}
                      onChange={(e) => setLeadData((p) => ({ ...p, firstName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#f7e05f]/50 focus:bg-white/8 transition-all duration-200 text-sm font-[family-name:var(--font-dm-sans)]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 font-[family-name:var(--font-dm-sans)]">
                      Apellido <span className="text-[#f7e05f]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leadData.lastName}
                      onChange={(e) => setLeadData((p) => ({ ...p, lastName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#f7e05f]/50 focus:bg-white/8 transition-all duration-200 text-sm font-[family-name:var(--font-dm-sans)]"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 font-[family-name:var(--font-dm-sans)]">
                    Email <span className="text-[#f7e05f]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={leadData.email}
                    onChange={(e) => setLeadData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#f7e05f]/50 focus:bg-white/8 transition-all duration-200 text-sm font-[family-name:var(--font-dm-sans)]"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 font-[family-name:var(--font-dm-sans)]">
                      Celular
                    </label>
                    <input
                      type="tel"
                      value={leadData.phone}
                      onChange={(e) => setLeadData((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#f7e05f]/50 focus:bg-white/8 transition-all duration-200 text-sm font-[family-name:var(--font-dm-sans)]"
                      placeholder="+51 999 999 999"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 font-[family-name:var(--font-dm-sans)]">
                      País
                    </label>
                    <select
                      value={leadData.country}
                      onChange={(e) => setLeadData((p) => ({ ...p, country: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#f7e05f]/50 focus:bg-white/8 transition-all duration-200 text-sm font-[family-name:var(--font-dm-sans)] cursor-pointer"
                    >
                      <option value="" className="bg-[#0d0d14]">Selecciona tu país</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-[#0d0d14]">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 font-[family-name:var(--font-dm-sans)]">
                    Años de experiencia profesional
                  </label>
                  <select
                    value={leadData.yearsExperience}
                    onChange={(e) => setLeadData((p) => ({ ...p, yearsExperience: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#f7e05f]/50 focus:bg-white/8 transition-all duration-200 text-sm font-[family-name:var(--font-dm-sans)] cursor-pointer"
                  >
                    <option value="" className="bg-[#0d0d14]">Selecciona</option>
                    <option value="menos-5" className="bg-[#0d0d14]">Menos de 5 años</option>
                    <option value="5-10" className="bg-[#0d0d14]">Entre 5 y 10 años</option>
                    <option value="10-20" className="bg-[#0d0d14]">Entre 10 y 20 años</option>
                    <option value="mas-20" className="bg-[#0d0d14]">Más de 20 años</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] font-bold text-base transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-[#f7e05f]/20 font-[family-name:var(--font-dm-sans)] disabled:opacity-70"
                >
                  {submitting ? "Procesando..." : "VER MI DIAGNÓSTICO"}
                </motion.button>

                <p className="text-center text-xs text-white/30 font-[family-name:var(--font-dm-sans)]">
                  Tus datos son privados y no serán compartidos con terceros.
                </p>
              </form>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {state === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* ── Header ── */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 mb-4"
                >
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/45 text-xs tracking-widest" style={{ fontFamily: "var(--font-badge)" }}>
                    TU DIAGNÓSTICO
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-widest"
                    style={{
                      fontFamily: "var(--font-badge)",
                      backgroundColor: `${result.archetype.accentColor}22`,
                      border: `1px solid ${result.archetype.accentColor}50`,
                      color: result.archetype.accentColor,
                    }}
                  >
                    ARQUETIPO {result.archetype.number}
                  </span>
                </motion.div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl text-white mb-1 font-[family-name:var(--font-cormorant)]">
                  {result.archetype.name}
                </h3>
                <p className="text-xl font-[family-name:var(--font-cormorant)] italic mb-1" style={{ color: result.archetype.accentColor }}>
                  {result.archetype.tagline}
                </p>
                <p className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)] max-w-md mx-auto">
                  {result.archetype.perfil}
                </p>
              </div>

              {/* ── Gauges row ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Velocímetro total */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7 sm:p-8 flex flex-col items-center">
                  <p className="text-xs text-white/40 mb-3 tracking-widest uppercase" style={{ fontFamily: "var(--font-badge)" }}>PUNTAJE GLOBAL</p>
                  <SpeedometerGauge
                    score={result.score}
                    maxScore={27}
                    color={result.archetype.accentColor}
                  />
                </div>

                {/* Semáforos por bloque */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7 sm:p-8 flex flex-col justify-center gap-4">
                  <p className="text-xs text-white/40 tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-badge)" }}>ANÁLISIS POR BLOQUE</p>
                  <BlockScoreRow
                    label="Situación Actual"
                    score={(answers[1]?.score ?? 0) + (answers[2]?.score ?? 0) + (answers[3]?.score ?? 0)}
                    delay={0.1}
                  />
                  <BlockScoreRow
                    label="Activos Disponibles"
                    score={(answers[4]?.score ?? 0) + (answers[5]?.score ?? 0) + (answers[6]?.score ?? 0)}
                    delay={0.2}
                  />
                  <BlockScoreRow
                    label="Mentalidad y Urgencia"
                    score={(answers[7]?.score ?? 0) + (answers[8]?.score ?? 0) + (answers[9]?.score ?? 0)}
                    delay={0.3}
                  />
                </div>
              </div>

              {/* ── Mensaje diagnóstico ── */}
              <div
                className="p-5 sm:p-7 rounded-2xl border mb-7"
                style={{
                  backgroundColor: `${result.archetype.accentColor}08`,
                  borderColor: `${result.archetype.accentColor}28`,
                }}
              >
                <p
                  className="leading-relaxed font-[family-name:var(--font-cormorant)] italic"
                  style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.15rem" }}
                >
                  &ldquo;{result.archetype.mensaje}&rdquo;
                </p>
              </div>

              {/* ── Fortalezas + Oportunidades ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                {/* Fortalezas */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-badge)" }}>FORTALEZAS</p>
                  <div className="space-y-2.5">
                    {result.archetype.fortalezas.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                        <p className="text-white/75 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">{f}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Oportunidades */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-badge)" }}>OPORTUNIDADES</p>
                  <div className="space-y-2.5">
                    {result.archetype.oportunidades.map((o, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="flex items-start gap-2.5"
                      >
                        <Zap size={14} className="flex-shrink-0 mt-0.5" style={{ color: result.archetype.accentColor }} />
                        <p className="text-white/75 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">{o}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Próximos Pasos ── */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-7">
                <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "var(--font-badge)" }}>PRÓXIMOS PASOS</p>
                <div className="space-y-3">
                  {result.archetype.proximosPasos.map((paso, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold font-[family-name:var(--font-space-grotesk)]"
                        style={{ backgroundColor: `${result.archetype.accentColor}20`, color: result.archetype.accentColor, border: `1px solid ${result.archetype.accentColor}40` }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-white/75 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">{paso}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── CTAs ── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <a
                  href={result.archetype.ctaHref}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-5 px-8 rounded-2xl font-bold text-base transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-xl font-[family-name:var(--font-dm-sans)]"
                  style={{
                    backgroundColor: result.archetype.accentColor,
                    color: result.archetype.accentColor === "#f7e05f" ? "#050508" : "#ffffff",
                    boxShadow: `0 0 0 0 ${result.archetype.accentColor}00`,
                  }}
                >
                  <ChevronRight size={16} />
                  {result.archetype.ctaText}
                </a>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 py-4 px-5 rounded-2xl border border-white/12 text-white/60 hover:text-white hover:border-white/25 font-semibold text-sm transition-all duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)]"
                >
                  <Download size={15} />
                  Descargar diagnóstico
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/55 transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
                >
                  <RefreshCw size={12} />
                  Volver a empezar
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
