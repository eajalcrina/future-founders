import type { Metadata } from "next";
import Diagnostico from "@/components/site/Diagnostico";
import { Jn, Lines, Mono, Nota } from "@/components/site/ui";
import { LEVELS, SIGNAL } from "@/content/sitio";

export const metadata: Metadata = {
  title: "Diagnóstico de nivel",
  description:
    "Cinco preguntas sobre tus ingresos propios, tus clientes y tu colchón te dicen en qué nivel de la escalera estás y cuál es tu siguiente paso.",
  alternates: { canonical: "/diagnostico" },
  openGraph: { title: "Diagnóstico de nivel", url: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <section className="grid-paper" aria-labelledby="diag-h">
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24 grid gap-10 lg:gap-20 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] items-start">
        <div>
          <Mono color="var(--color-magt)">
            <Jn parts={["Gratis", "Cinco preguntas"]} />
          </Mono>
          <h1 id="diag-h" className="wh lines mt-4 lg:mt-[22px] text-[52px] lg:text-[88px]">
            <Lines text="Diagnóstico de nivel" />
          </h1>
          <p className="wt mt-5 lg:mt-7">
            Responde con lo que ves hoy en tu estado de cuenta. El resultado te ubica en uno de los cuatro niveles de la escalera y te dice qué toca hacer ahora.
          </p>
          <ol className="mt-8 border-b border-ink rv-kids">
            {LEVELS.map((l, k) => (
              <li key={l} className="grid grid-cols-[40px_minmax(0,1fr)] gap-2 py-3 border-t border-ink">
                <span className="wh text-[28px]">{k}</span>
                <span>
                  <span className="block text-[17px] font-bold">{l}</span>
                  <span className="block text-[14px] leading-[1.4] text-ink2 mt-0.5">{k < 3 ? `Pasas al siguiente cuando: ${SIGNAL[k].charAt(0).toLowerCase()}${SIGNAL[k].slice(1)}` : SIGNAL[k]}</span>
                </span>
              </li>
            ))}
          </ol>
          <Nota className="mt-5">Tus respuestas no se guardan ni se envían, salvo que decidas recibir el resultado por correo.</Nota>
        </div>
        <div className="rv">
          <Diagnostico />
        </div>
      </div>
    </section>
  );
}
