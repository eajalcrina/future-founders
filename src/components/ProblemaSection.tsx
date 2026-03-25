"use client";

import { motion } from "framer-motion";
import { Puzzle, Flame, Zap, TrendingDown } from "lucide-react";

const problems = [
  {
    number: "01",
    icon: Puzzle,
    title: "La Trampa del Ultra-Especialista",
    description: "Eres maestro en tu campo, pero extraño en la dirección total de un negocio.",
    detail: "Tu expertise profundo se convierte en una jaula cuando intentas construir algo propio.",
    highlight: "maestro en tu campo",
  },
  {
    number: "02",
    icon: Flame,
    title: "El Drenaje de Capital",
    description: "Capital sin arquitectura es dinero quemado.",
    detail: "Tienes recursos pero no el sistema para multiplicarlos. Cada inversión se convierte en gasto sin retorno visible.",
    highlight: "sin retorno visible",
  },
  {
    number: "03",
    icon: Zap,
    title: "La Disonancia de Agilidad",
    description: "El mindset corporativo paraliza al emprendedor.",
    detail: "Dos mundos que colisionan en tu cabeza. Los procesos que te hicieron exitoso en la empresa ahora te frenan.",
    highlight: "colisionan en tu cabeza",
  },
  {
    number: "04",
    icon: TrendingDown,
    title: "Valor de Experto, Precio de Principiante",
    description: "Tu trayectoria vale miles, pero se vende por cientos.",
    detail: "Sin el framework correcto, tu experiencia acumulada no se traduce en ingresos proporcionales.",
    highlight: "vale miles, pero se vende por cientos",
  },
];

export default function ProblemaSection() {
  return (
    <section id="problema" className="py-28 bg-[#0d0d14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-5 py-1.5 rounded-full bg-[#1a27c9]/15 text-[#4d5fd4] text-xs mb-6 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-badge)" }}
          >
            El Problema Real
          </span>

          <h2
            className="text-5xl sm:text-6xl md:text-7xl text-white mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Te{" "}
            <em className="not-italic text-[#f7e05f]">identificas?</em>
          </h2>

          <p
            className="text-lg sm:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-subtitle)" }}
          >
            La mayoría de ejecutivos senior enfrentan los mismos obstáculos al intentar construir algo propio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative p-7 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-[#1a27c9]/50 hover:bg-[#1a27c9]/[0.06] hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-default overflow-hidden flex flex-col"
            >
              {/* Large background number */}
              <div
                className="absolute -top-4 -right-2 text-[110px] font-bold leading-none text-white/[0.04] group-hover:text-[#1a27c9]/[0.08] transition-colors duration-400 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-display)" }}
                aria-hidden="true"
              >
                {problem.number}
              </div>

              {/* Gold left border on hover */}
              <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#f7e05f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#1a27c9]/15 group-hover:bg-[#1a27c9]/25 flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#1a27c9]/20">
                  <problem.icon size={26} className="text-[#4d5fd4] group-hover:text-[#f7e05f] transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl text-white mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {problem.title}
                </h3>

                {/* Short highlighted line */}
                <p
                  className="text-base text-[#f7e05f]/80 mb-3 leading-snug font-medium"
                  style={{ fontFamily: "var(--font-subtitle)" }}
                >
                  {problem.description}
                </p>

                {/* Detail */}
                <p className="text-sm text-white/45 leading-loose font-[family-name:var(--font-dm-sans)]">
                  {problem.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
