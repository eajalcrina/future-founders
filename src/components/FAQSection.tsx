"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Es demasiado básico para mi nivel de negocio?",
    answer:
      "Al contrario. Future Founders está diseñado específicamente para ejecutivos senior con 10+ años de experiencia corporativa. No enseñamos conceptos genéricos de emprendimiento. Enseñamos cómo aprovechar tu red, tus credenciales y tu expertise acumulado para construir un activo empresarial premium. Los egresados suelen comentar que es el primer programa que habla su idioma.",
  },
  {
    question: "¿En qué se diferencia del contenido gratuito que existe?",
    answer:
      "El contenido gratuito te da información aislada. Future Founders te da un sistema completo, probado por más de 155 ejecutivos, con una secuencia lógica que va de la validación de tu oferta al cierre de clientes. Además, te da acceso a una comunidad de pares —otros ejecutivos que están exactamente en tu misma situación— y el accountability que el contenido gratuito nunca puede darte.",
  },
  {
    question: "¿Cómo funciona el programa exactamente?",
    answer:
      "El programa se divide en 4 pilares: Diseña tu oferta, Crea tu negocio, Cobra lo que mereces y Conecta y cierra. Cada pilar tiene módulos de contenido en video, guías de implementación y ejercicios prácticos. Todo está diseñado para completarse en 8 semanas dedicando 3-5 horas por semana, sin interrumpir tu carrera corporativa. Tienes acceso de por vida, así puedes avanzar a tu propio ritmo.",
  },
  {
    question: "¿Qué pasa si ya tengo una empresa en marcha?",
    answer:
      "El programa es igual de valioso. Muchos participantes llegan con negocios existentes que no están creciendo como esperan. Los módulos de pricing, sistemas y canales de venta suelen generar resultados inmediatos en empresas ya operativas. De hecho, algunos de los casos de éxito más rápidos son de ejecutivos que ya tenían un negocio y solo necesitaban el sistema correcto.",
  },
  {
    question: "¿Hay garantía de devolución?",
    answer:
      "Sí. Tienes 30 días completos para explorar todo el programa. Si por cualquier razón no estás satisfecho con el contenido, el sistema o los resultados, simplemente escríbenos a ff@redesignlab.org y te devolvemos el 100% de tu inversión sin preguntas. Creemos tanto en el programa que asumimos el riesgo nosotros.",
  },
  {
    question: "¿En qué idioma está el programa?",
    answer:
      "El programa está completamente en español latinoamericano. El contenido fue creado pensando en ejecutivos de Perú, Colombia, México, Chile, Argentina y toda la región. Los ejemplos, casos de estudio y contexto regulatorio son 100% relevantes para la realidad latinoamericana.",
  },
  {
    question: "¿Cuánto tiempo necesito dedicarle por semana?",
    answer:
      "El programa está diseñado para ejecutivos con agendas apretadas. Con 3 a 5 horas semanales puedes completarlo en 8 semanas. Muchos participantes dividen el tiempo entre las mañanas antes de entrar a la oficina y los fines de semana. Lo importante es la consistencia, no la intensidad. Tienes acceso de por vida, así que si una semana es imposible, retomas sin perder el hilo.",
  },
];

function FAQItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-white/8 rounded-2xl overflow-hidden bg-white/3"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-white/4 transition-colors duration-150"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-white leading-snug font-[family-name:var(--font-space-grotesk)]">
          {faq.question}
        </span>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#f7e05f]/10 flex items-center justify-center transition-colors duration-150">
          {open ? (
            <Minus size={16} className="text-[#f7e05f]" />
          ) : (
            <Plus size={16} className="text-[#f7e05f]" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-white/8 mb-4" />
              <p className="text-sm text-white/50 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-24 bg-[#050508]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a27c9]/15 text-[#2d3fd4] text-sm font-semibold mb-4 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-badge)" }}>
            Resolvemos tus dudas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-white/50 font-[family-name:var(--font-dm-sans)]">
            Todo lo que necesitas saber antes de unirte al programa.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>

        {/* CTA below FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center p-8 rounded-2xl bg-white/3 border border-white/8"
        >
          <p className="text-white/55 text-sm mb-4 font-[family-name:var(--font-dm-sans)]">
            ¿Tienes más preguntas? Escríbenos directamente.
          </p>
          <a
            href="mailto:ff@redesignlab.org"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a27c9] hover:bg-[#2d3fd4] text-white text-sm font-semibold transition-colors duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)]"
          >
            ff@redesignlab.org
          </a>
        </motion.div>
      </div>
    </section>
  );
}
