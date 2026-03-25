"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, Building2 } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const stats = [
  { icon: Users, value: "155", label: "ejecutivos", suffix: "+" },
  { icon: TrendingUp, value: "$20M", label: "facturados", suffix: "+" },
  { icon: Building2, value: "10", label: "empresas", suffix: "+" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]">
      {/* Particle wave background */}
      <ParticleBackground />

      {/* Blue glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#1a27c9]/8 blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-[#1a27c9]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#1a27c9]/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f7e05f]/30 bg-[#f7e05f]/8 text-[#f7e05f] text-sm font-medium mb-8 font-[family-name:var(--font-dm-sans)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#f7e05f] animate-pulse" />
          BOOTCAMP · EJECUTIVOS SENIOR · LATAM
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Transforma tu{" "}
          <em
            className="text-[#f7e05f]"
            style={{ fontStyle: "italic" }}
          >
            experiencia
          </em>
          {" "}corporativa en patrimonio real.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed font-[family-name:var(--font-dm-sans)]"
        >
          Eres un ejecutivo senior que ha dedicado años a construir la empresa de otros.
          Es momento de que esa experiencia trabaje para ti y tu familia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#diagnostico"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] font-bold text-base transition-all duration-200 cursor-pointer hover:shadow-2xl hover:shadow-[#f7e05f]/25 hover:-translate-y-0.5 font-[family-name:var(--font-dm-sans)]"
          >
            DESCUBRE TU PERFIL DE FUNDADOR
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#doble-agente"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/30 text-white hover:bg-white/8 font-semibold text-base transition-all duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)]"
          >
            Conoce el Libro Doble Agente
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-6 sm:px-10 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {i > 0 && (
                <div className="hidden sm:block h-8 w-px bg-white/15" />
              )}
              <div className="w-9 h-9 rounded-xl bg-[#f7e05f]/15 flex items-center justify-center flex-shrink-0">
                <stat.icon size={18} className="text-[#f7e05f]" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-[#f7e05f] font-[family-name:var(--font-space-grotesk)]">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-white/45 font-[family-name:var(--font-dm-sans)]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
}
