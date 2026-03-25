"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, DollarSign, Users, Linkedin } from "lucide-react";
import Image from "next/image";

const metrics = [
  { icon: Building2, value: "10+", label: "empresas construidas" },
  { icon: TrendingUp, value: "$20M+", label: "facturados" },
  { icon: DollarSign, value: "$1.5M+", label: "capital levantado" },
  { icon: Users, value: "155+", label: "ejecutivos formados" },
];

const founders = [
  {
    photo: "/eddie.jpg",
    name: "Eddie Ajalcriña",
    badgeLabel: "CEO & Co-fundador",
    role: "Mentor MIT Professional Education",
    linkedinUrl: "https://www.linkedin.com/in/eddieajalcrina/",
    bio: "Eddie construyó y vendió su primer activo mientras seguía en nómina. Desde entonces ha acompañado a más de 300 ejecutivos en LATAM a hacer lo mismo.",
    bullets: [
      "Mentor del programa de educación ejecutiva del MIT",
      "Lo que enseña no lo aprendió en un aula — lo ejecutó en el mundo real",
      "Su tesis: el conocimiento de 20 años vale más de lo que refleja tu cuenta bancaria",
    ],
  },
  {
    photo: "/lorenzo.jpg",
    name: "Lorenzo Ortiz",
    badgeLabel: "COO & Co-fundador",
    role: "Singularity University Fellow",
    linkedinUrl: "https://www.linkedin.com/in/lorenzoortiz/",
    bio: "Lorenzo sabe exactamente lo que se siente escalar en el mundo corporativo y seguir sintiéndose atrapado. Lo vivió antes de construir su salida.",
    bullets: [
      "Singularity University Fellow y arquitecto de sistemas empresariales",
      "Ha diseñado los modelos de negocio detrás de múltiples casos de éxito",
      "Especialidad: convertir conocimiento corporativo en sistemas generadores de caja",
    ],
  },
];

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="py-24 bg-[#12121c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a27c9]/15 text-[#2d3fd4] text-sm font-semibold mb-4 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-badge)" }}>
            Los fundadores
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Hemos estado exactamente{" "}
            <span className="text-[#f7e05f]">donde estás tú.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto font-[family-name:var(--font-dm-sans)]">
            No enseñamos teoría. Enseñamos lo que funciona porque lo vivimos primero.
          </p>
        </motion.div>

        {/* Founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex bg-white/3 rounded-2xl border border-white/8 overflow-hidden hover:border-[#1a27c9]/40 hover:shadow-2xl hover:shadow-[#1a27c9]/10 transition-all duration-400 cursor-default"
            >
              {/* Photo — fixed width portrait */}
              <div className="relative w-44 flex-shrink-0 overflow-hidden">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
                  style={{ filter: "grayscale(0.25) brightness(1.06) contrast(1.1) saturate(0.8)" }}
                  sizes="176px"
                />
                {/* Right fade into card */}
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-[#12121c]/80 group-hover:to-[#1a27c9]/20 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-space-grotesk)]">
                    {founder.name}
                  </h3>
                  {/* Role badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-[#f7e05f]/15 border border-[#f7e05f]/25 text-[#f7e05f] text-xs font-bold tracking-wide mb-3 font-[family-name:var(--font-badge)]">
                    {founder.badgeLabel}
                  </span>
                  <p className="text-white/55 text-sm leading-relaxed mb-4 font-[family-name:var(--font-dm-sans)]">
                    {founder.bio}
                  </p>
                  {/* Bullets */}
                  <ul className="space-y-2 mb-4">
                    {founder.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-white/45 font-[family-name:var(--font-dm-sans)]">
                        <span className="text-[#f7e05f]/60 font-bold flex-shrink-0 mt-0.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* LinkedIn */}
                <div className="flex items-center gap-2">
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${founder.name}`}
                    className="w-8 h-8 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/40 hover:text-[#f7e05f] hover:border-[#f7e05f]/30 transition-all duration-200"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metric bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-[#0d0d14] px-6 py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#f7e05f]/10 flex items-center justify-center mx-auto mb-3">
                <metric.icon size={18} className="text-[#f7e05f]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#f7e05f] mb-1 font-[family-name:var(--font-space-grotesk)]">
                {metric.value}
              </div>
              <div className="text-xs text-white/40 font-[family-name:var(--font-dm-sans)]">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
