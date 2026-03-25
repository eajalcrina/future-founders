"use client";

import { motion } from "framer-motion";
import { Lightbulb, Building2, DollarSign, Network } from "lucide-react";

const pillars = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Diseña una oferta",
    description:
      "Valida y productiza tu expertise. Crea algo que el mercado desee pagar. Transforma décadas de conocimiento corporativo en una propuesta de valor irresistible.",
    highlight: "Validación de mercado",
  },
  {
    number: "02",
    icon: Building2,
    title: "Crea un negocio",
    description:
      "SOPs, automatización y sistemas que no dependan de ti. Construye una maquinaria que opere mientras tú mantienes tu carrera corporativa.",
    highlight: "Sistemas y operaciones",
  },
  {
    number: "03",
    icon: DollarSign,
    title: "Cobra lo que mereces",
    description:
      "Precios por valor, no por hora. Tu experiencia vale más de lo que crees. Aprende a posicionarte en el nivel premium que corresponde a tu trayectoria.",
    highlight: "Pricing estratégico",
  },
  {
    number: "04",
    icon: Network,
    title: "Conecta y cierra",
    description:
      "Canales de venta consultivos y relaciones que convierten. Aprovecha tu red corporativa y construye flujos de clientes sin depender de publicidad masiva.",
    highlight: "Ventas consultivas",
  },
];

export default function MetodologiaSection() {
  return (
    <section
      id="metodologia"
      className="py-24 bg-[#050508]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a27c9]/15 text-[#2d3fd4] text-sm font-semibold mb-4 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-badge)" }}>
            Nuestra metodología
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Nuestra fórmula para construir un{" "}
            <span className="text-[#f7e05f]">activo empresarial rentable</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto font-[family-name:var(--font-dm-sans)]">
            Menos operación, más sistemas de valor.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/8 bg-white/3 hover:border-[#1a27c9]/40 hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a27c9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 flex gap-5">
                {/* Number + icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#1a27c9]/15 border border-[#1a27c9]/20 flex items-center justify-center group-hover:bg-[#1a27c9]/30 transition-colors duration-300">
                    <pillar.icon size={22} className="text-[#f7e05f]" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-white/8 leading-none font-[family-name:var(--font-space-grotesk)]">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-3 font-[family-name:var(--font-dm-sans)]">
                    {pillar.description}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1a27c9]/15 text-[#2d3fd4] text-xs font-semibold font-[family-name:var(--font-dm-sans)]">
                    {pillar.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/35 text-sm font-[family-name:var(--font-dm-sans)] mb-4">
            Los 4 pilares trabajan en conjunto para crear tu activo empresarial
          </p>
          <a
            href="#bootcamp"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a27c9] hover:bg-[#2d3fd4] text-white text-sm font-semibold transition-colors duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)]"
          >
            Accede al programa completo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
