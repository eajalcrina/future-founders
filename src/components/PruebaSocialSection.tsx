"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "CM",
    name: "Carlos M.",
    role: "Director de Operaciones",
    company: "empresa retail de Chile",
    stars: 5,
    text: "Future Founders me ayudó a estructurar mi primera empresa consultora en 90 días, sin dejar mi puesto directivo. El framework Doble Agente es exactamente lo que necesitaba para no tener que elegir entre mi carrera y mi negocio.",
  },
  {
    initials: "AP",
    name: "Ana P.",
    role: "Gerente de Proyectos",
    company: "empresa telefónica de Perú",
    stars: 4,
    text: "Llevaba tres años intentando lanzar mi agencia de consultoría sin éxito. En ocho semanas con Future Founders no solo la lancé, sino que cerré mi primer cliente enterprise. El sistema de precios por valor cambió completamente mi perspectiva.",
  },
  {
    initials: "RV",
    name: "Rodrigo V.",
    role: "CFO",
    company: "empresa cementera de Perú",
    stars: 5,
    text: "Como CFO, pensé que sabía todo sobre finanzas de negocio. El programa me mostró que saber gestionar el dinero de otros no te prepara para construir el tuyo. Los módulos de validación y pricing son extraordinariamente prácticos.",
  },
  {
    initials: "MF",
    name: "Marcela F.",
    role: "Directora de Marketing",
    company: "empresa retail de Colombia",
    stars: 4.5,
    text: "El bootcamp no es teoría vacía. Es un sistema probado por personas que ya lo hicieron antes que yo. Lancé mi firma de branding estratégico y en el primer trimestre recuperé la inversión del programa con creces.",
  },
  {
    initials: "JA",
    name: "Javier A.",
    role: "VP de Tecnología",
    company: "empresa financiera de Perú",
    stars: 5,
    text: "Lo que más valoro es la comunidad. Estar rodeado de ejecutivos que piensan igual, que entienden la dualidad corporativo-emprendedor, es un activo que no tiene precio. El programa me dio claridad, sistema y red.",
  },
  {
    initials: "LT",
    name: "Luisa T.",
    role: "Gerente General",
    company: "empresa de consumo masivo de México",
    stars: 4,
    text: "Dudé en invertir porque ya había tomado otros cursos de emprendimiento que no me sirvieron. Future Founders es completamente diferente: está diseñado para ejecutivos senior, no para recién egresados. La diferencia se nota desde el módulo uno.",
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = stars >= i;
        const half = !filled && stars >= i - 0.5;
        return (
          <span key={i} className="relative inline-block">
            {/* Base (empty) star */}
            <Star size={14} className="text-white/20" />
            {/* Filled overlay */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "55%" }}
              >
                <Star size={14} className="text-[#f7e05f] fill-[#f7e05f]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function PruebaSocialSection() {
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="prueba-social" className="py-24 bg-[#050508] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a27c9]/15 text-[#2d3fd4] text-sm font-semibold mb-4 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-badge)" }}>
            Casos de éxito
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Gracias al respaldo de más de{" "}
            <span className="text-[#f7e05f]">155 ejecutivos</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto font-[family-name:var(--font-dm-sans)]">
            Ejecutivos de las principales empresas de América Latina ya transformaron su carrera en patrimonio.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
          className="flex gap-6 w-max"
        >
          {allTestimonials.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="w-80 sm:w-96 flex-shrink-0 bg-white/3 rounded-2xl border border-white/8 p-6"
            >
              <StarRating stars={t.stars} />

              <p className="text-white/65 text-sm leading-relaxed mb-5 font-[family-name:var(--font-dm-sans)]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a27c9] to-[#2d3fd4] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold font-[family-name:var(--font-space-grotesk)]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white font-[family-name:var(--font-dm-sans)]">
                    {t.name}
                  </div>
                  <div className="text-xs text-white/40 font-[family-name:var(--font-dm-sans)]">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
