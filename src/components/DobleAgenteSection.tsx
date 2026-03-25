"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DobleAgenteSection() {
  return (
    <section id="doble-agente" className="py-24 bg-[#0d0d14] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Book cover card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Card — same style as Bootcamp price card */}
            <div className="relative rounded-3xl border border-white/12 bg-white/3 shadow-2xl shadow-black/60 overflow-hidden">
              {/* Gradient glow inside */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9184a]/8 via-transparent to-[#1a27c9]/8 pointer-events-none" />
              {/* Top glow blob */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-48 rounded-full bg-[#f7e05f]/8 blur-3xl pointer-events-none" />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Badge row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#f7e05f]/10 border border-[#f7e05f]/20 text-[#f7e05f] text-xs font-semibold tracking-[0.15em] uppercase font-[family-name:var(--font-badge)]">
                    eBook PDF · 2026
                  </span>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white/30 text-base line-through font-[family-name:var(--font-dm-sans)]">$99</span>
                      <span className="text-4xl font-bold text-[#f7e05f] font-[family-name:var(--font-space-grotesk)]">$75</span>
                      <span className="text-lg font-normal text-white/40 font-[family-name:var(--font-dm-sans)]">USD</span>
                    </div>
                    <div className="text-xs text-white/35 font-[family-name:var(--font-dm-sans)]">PDF · Descarga inmediata</div>
                  </div>
                </div>

                {/* Book image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-black/50 mb-5">
                  <Image
                    src="/mockups/libro-mockup.jpg"
                    alt="Doble Agente — portada del libro"
                    width={560}
                    height={380}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 560px"
                    priority
                  />
                  {/* Classified stamp */}
                  <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none select-none rotate-[-8deg]" aria-hidden="true">
                    <div className="border-[3px] border-white rounded-lg px-3 py-1">
                      <p className="text-white font-black text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-badge)]">Declassified</p>
                    </div>
                  </div>
                </div>

                {/* CTA button */}
                <a
                  href="https://mpago.la/2bTNVGE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] font-bold text-sm transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-[#f7e05f]/25 font-[family-name:var(--font-dm-sans)]"
                >
                  COMPRAR AHORA
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f7e05f]/10 text-[#f7e05f] text-sm font-semibold mb-6 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-badge)" }}>
              El libro
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              El Manual para{" "}
              <em className="not-italic text-[#f7e05f]">Fundadores con Salario</em>
            </h2>

            <p className="text-xl text-white/55 font-medium mb-4 font-[family-name:var(--font-cormorant)] italic" style={{ fontSize: "1.15rem" }}>
              &ldquo;Infiltra el sistema. Extrae tu valor. Regresa a casa.&rdquo;
            </p>

            <p className="text-white/55 text-base leading-relaxed mb-6 font-[family-name:var(--font-dm-sans)]">
              El sutil arte de construir una empresa rentable sin abandonar el mundo corporativo.
              20 misiones · 5 fases · 1 framework completo para ejecutivos que no quieren elegir.
            </p>

            <div className="border-l-2 border-[#f7e05f]/30 pl-5 mb-8 space-y-4">
              <p className="text-white/55 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                Hemos pasado los últimos años infiltrados en el núcleo de las corporaciones más grandes de la región, no siguiendo los manuales de otros, sino extrayendo la verdad de lo que realmente funciona en las sombras. Entendimos que esos años de &ldquo;juego corporativo&rdquo; no fueron tiempo perdido; fueron la fase de recolección de los activos que hoy son la base de nuestras empresas.
              </p>
              <p className="text-white/55 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                En algún lugar del camino, aprendimos algo crucial: <span className="text-white/80 font-medium">la autonomía nace de la transparencia operativa.</span> ¿Eres realmente quien dices ser cuando se apagan las luces de la oficina? La libertad requiere que dejes de actuar para otros y empieces a operar para tu propio linaje.
              </p>
              <p className="text-[#f7e05f]/80 text-sm font-medium font-[family-name:var(--font-dm-sans)] italic">
                Tu activo no es lo que haces de 9 a 5. Es quién eres tú después de las 6:00 PM.
              </p>
            </div>

            {/* Book stats */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "20 misiones", desc: "accionables" },
                { label: "5 fases", desc: "progresivas" },
                { label: "1 framework", desc: "completo" },
              ].map((stat) => (
                <div key={stat.label} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white font-bold text-sm font-[family-name:var(--font-space-grotesk)]">{stat.label}</div>
                  <div className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)]">{stat.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
