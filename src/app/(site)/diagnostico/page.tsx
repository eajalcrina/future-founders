import type { Metadata } from "next";
import Diagnostico from "@/components/site/Diagnostico";
import { Hero as HeroHead, Mono, Nota } from "@/components/site/ui";
import { LEVELS, LOOK } from "@/content/sitio";
import { QS } from "@/lib/diagnostico";

const CUANTAS = ["Una", "Dos", "Tres", "Cuatro", "Cinco"][QS.length - 1];

export const metadata: Metadata = {
  title: "Diagnóstico de nivel",
  description:
    "Cuatro preguntas sobre tu situación, tu primer comprobante, tus ingresos propios y tu colchón te dicen en qué nivel de la escalera estás y qué plantilla llenar ahora.",
  alternates: { canonical: "/diagnostico" },
  openGraph: { title: "Diagnóstico de nivel", url: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <section aria-labelledby="diag-h">
      {/* En celular: titular, bajada, cuestionario y después la lista de niveles. Desde 64rem: dos columnas. */}
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24 grid gap-10 lg:gap-x-16 xl:gap-x-20 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] items-start">
        <div>
          <HeroHead id="diag-h" label={["Gratis", `${CUANTAS} preguntas`]} title="Diagnóstico de nivel" />
          <p className="lead mt-5 lg:mt-7">
            Responde con lo que ves hoy en tu estado de cuenta. El resultado te ubica en uno de los cuatro niveles de la escalera y te dice qué plantilla y qué capítulo
            siguen.
          </p>
        </div>
        <div className="rv lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <Diagnostico />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <Mono tone="gris" className="mb-2">
            Los cuatro niveles
          </Mono>
          <ol className="border-b border-ink rv-kids">
            {LEVELS.map((l, k) => (
              <li key={l} className="grid grid-cols-[40px_minmax(0,1fr)] gap-2 py-3 border-t border-ink">
                <span className="num text-figura">{k}</span>
                <span>
                  <span className="block text-cuerpo font-bold">{l}</span>
                  <span className="block text-recuadro leading-[1.4] text-ink2 mt-0.5">{LOOK[k]}</span>
                </span>
              </li>
            ))}
          </ol>
          <Nota className="mt-5">Tus respuestas se quedan en tu navegador. Solo se envían si pides el resultado por correo.</Nota>
        </div>
      </div>
    </section>
  );
}
