"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Shield,
  Clock,
  Zap,
  Users,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    text: "Acceso inmediato a todos los módulos del programa",
  },
  {
    icon: Zap,
    text: "4 pilares completos con metodología probada",
  },
  {
    icon: Users,
    text: "Comunidad privada con otros fundadores ejecutivos",
  },
  {
    icon: RefreshCw,
    text: "Actualizaciones del programa de por vida",
  },
  {
    icon: BookOpen,
    text: "Framework Doble Agente incluido",
  },
];

export default function BootcampSection() {
  return (
    <section
      id="bootcamp"
      className="py-24 bg-[#0d0d14]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f7e05f]/10 text-[#f7e05f] text-sm font-semibold mb-4 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-badge)" }}>
            Únete al programa
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Future Founders{" "}
            <em className="not-italic text-[#f7e05f]">Bootcamp</em>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-left sm:text-center">
            <p className="text-xl sm:text-2xl font-semibold text-white/90 leading-snug font-[family-name:var(--font-space-grotesk)]">
              El 99% de emprendedores fallan la primera vez.
              <br />
              <span className="text-white/55 font-normal text-lg">Pero no por falta de capacidad.</span>
            </p>
            <p className="text-base text-white/50 leading-relaxed font-[family-name:var(--font-dm-sans)]">
              Nuestra misión es ayudarte a resolver los desafíos críticos que paralizan al ejecutivo sénior para que logres transformar tu experiencia en un producto o servicio de alto valor, construyendo una empresa diseñada desde el primer día para maximizar la generación de ese valor y asegurar tu libertad.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-6 font-[family-name:var(--font-space-grotesk)]">
              Lo que obtienes:
            </h3>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/8"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f7e05f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#f7e05f]" />
                </div>
                <p className="text-white/65 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {benefit.text}
                </p>
              </motion.div>
            ))}

            {/* Guarantee badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/10 border border-emerald-800/30 mt-2"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                <Shield size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-400 font-[family-name:var(--font-space-grotesk)]">
                  Garantía de satisfacción 30 días
                </p>
                <p className="text-xs text-emerald-500/70 font-[family-name:var(--font-dm-sans)]">
                  Si no estás 100% satisfecho en los primeros 30 días, te devolvemos tu inversión completa.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white/3 rounded-3xl p-8 border border-[#f7e05f]/20 shadow-2xl shadow-[#f7e05f]/5 overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f7e05f]/5 via-transparent to-[#1a27c9]/5 pointer-events-none" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f7e05f]/10 border border-[#f7e05f]/20 text-[#f7e05f] text-sm font-semibold mb-6 font-[family-name:var(--font-dm-sans)]">
                  <span className="w-2 h-2 rounded-full bg-[#f7e05f] animate-pulse" />
                  Oferta de lanzamiento
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-white/30 text-xl line-through font-[family-name:var(--font-dm-sans)]">
                      $5,000 USD
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-[#f7e05f] font-[family-name:var(--font-space-grotesk)]">
                      $2,995
                    </span>
                    <span className="text-white/50 text-lg font-[family-name:var(--font-dm-sans)]">USD</span>
                  </div>
                  <p className="text-white/35 text-sm mt-1 font-[family-name:var(--font-dm-sans)]">
                    Acceso inmediato a todos los módulos
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/51989338401?text=Hola%2C+estoy+interesado+en+el+bootcamp+de+future+founders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full text-center py-4 px-6 rounded-2xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] font-bold text-base transition-all duration-200 cursor-pointer hover:shadow-2xl hover:shadow-[#f7e05f]/30 hover:-translate-y-0.5 mb-4 font-[family-name:var(--font-dm-sans)]"
                >
                  INSCRÍBETE AHORA
                </a>

                {/* Urgency */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Clock size={14} className="text-[#f7e05f]/70" />
                  <span className="text-[#f7e05f]/70 text-xs font-semibold font-[family-name:var(--font-dm-sans)]">
                    Cupos limitados — próxima cohorte disponible
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white/30 text-xs text-center mb-4 font-[family-name:var(--font-dm-sans)]">
                    Acceso inmediato al completar tu pago
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: "Módulos", value: "4" },
                      { label: "Semanas", value: "8" },
                      { label: "Horas/sem", value: "3-5" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/5 rounded-xl p-3">
                        <div className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                          {item.value}
                        </div>
                        <div className="text-white/35 text-xs font-[family-name:var(--font-dm-sans)]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
