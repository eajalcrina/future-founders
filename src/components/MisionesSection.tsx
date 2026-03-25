"use client";

import { motion } from "framer-motion";
import { ArrowRight, EyeOff, Crosshair, Package, Lock, TrendingUp } from "lucide-react";

const phases = [
  {
    number: "01",
    icon: EyeOff,
    title: "Infiltración",
    range: "Misiones 01–04",
    description: "Cuestiona la jaula de oro. Evalúa tu situación real, identifica tus activos ocultos y traza el inventario completo de lo que ya tienes para operar.",
    color: "#4d5fd4",
  },
  {
    number: "02",
    icon: Crosshair,
    title: "Reconocimiento",
    range: "Misiones 05–08",
    description: "Encuentra el problema que vale $100K. Define tu segmento con precisión táctica y calcula el mercado que puedes capturar sin inversión externa.",
    color: "#6b7be0",
  },
  {
    number: "03",
    icon: Package,
    title: "El Producto",
    range: "Misiones 09–12",
    description: "Construye tu propuesta de valor cuantificada. Diseña el núcleo del negocio y desarrolla el MVP mínimo para validar sin arriesgar tu estabilidad.",
    color: "#f7e05f",
  },
  {
    number: "04",
    icon: Lock,
    title: "Ops. Encubiertas",
    range: "Misiones 13–16",
    description: "Activa tu primer canal de adquisición. Domina el guión del Doble Agente y cierra tu primer depósito real mientras sigues en nómina.",
    color: "#e8a93b",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Extracción",
    range: "Misiones 17–20",
    description: "Alcanza el punto de no retorno. Ejecuta tu plan de transición y construye el sistema que escala y genera valor sin depender de tu presencia.",
    color: "#f7e05f",
  },
];

export default function MisionesSection() {
  return (
    <section className="py-24 bg-[#050508] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a27c9]/15 text-[#4d5fd4] text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ fontFamily: "var(--font-badge)" }}>
            5 Fases · 20 Misiones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            El mapa completo de tu{" "}
            <em className="not-italic text-[#f7e05f]">misión de extracción</em>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-[family-name:var(--font-dm-sans)]">
            20 misiones ejecutables distribuidas en 5 fases — de la jaula de oro a la libertad financiera.
          </p>
        </motion.div>

        {/* Phases diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-20">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden group hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="h-[3px] w-full" style={{ backgroundColor: `${phase.color}50` }} />

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Phase icon + number */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${phase.color}18` }}>
                    <phase.icon size={14} style={{ color: phase.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase leading-none" style={{ color: `${phase.color}80`, fontFamily: "var(--font-badge)" }}>
                      Fase {phase.number}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white mb-1 leading-snug font-[family-name:var(--font-space-grotesk)]">
                  {phase.title}
                </h3>
                <p className="text-[10px] text-white/30 mb-3 font-[family-name:var(--font-dm-sans)]">
                  {phase.range}
                </p>

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed font-[family-name:var(--font-dm-sans)] flex-1">
                  {phase.description}
                </p>
              </div>

              {/* Connector arrow (all except last) */}
              {index < phases.length - 1 && (
                <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#050508] border border-white/10 items-center justify-center">
                  <ArrowRight size={10} className="text-white/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Platform CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-[#1a27c9]/30 bg-[#1a27c9]/[0.06] overflow-hidden p-10 sm:p-14 text-center"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#1a27c9]/12 blur-3xl" />
          </div>

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f7e05f]/10 border border-[#f7e05f]/20 text-[#f7e05f] text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "var(--font-badge)" }}>
              Plataforma exclusiva · Dobles Agentes
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 max-w-2xl mx-auto leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Accede a la plataforma de trabajo para{" "}
              <em className="not-italic text-[#f7e05f]">Dobles Agentes</em>
            </h2>

            <p className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed font-[family-name:var(--font-dm-sans)]">
              Ya leíste el libro. Ya sabes lo que hay que hacer. Ahora necesitas el sistema que lo ejecuta.
              La plataforma convierte cada misión en pasos medibles, con los indicadores exactos que necesitas
              para avanzar — sin perderte, sin pausas, sin excusas. Tu misión de extracción empieza cuando tú decides.
            </p>

            <a
              href="/toolkit"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] font-bold text-base transition-all duration-200 cursor-pointer hover:shadow-2xl hover:shadow-[#f7e05f]/30 hover:-translate-y-0.5 font-[family-name:var(--font-dm-sans)]"
            >
              INGRESAR A LA PLATAFORMA
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <p className="text-xs text-white/30 mt-5 font-[family-name:var(--font-dm-sans)]">
              Acceso exclusivo para lectores del libro Doble Agente
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
