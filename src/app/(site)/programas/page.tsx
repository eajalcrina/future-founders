import type { Metadata } from "next";
import ProgramForm from "@/components/site/ProgramForm";
import { Hero as HeroHead, LinkArrow, Lvl, Mono, Nota, SecHead } from "@/components/site/ui";
import { PROGRAMAS } from "@/content/programas";
import { LEVELS, agendaUrl, whatsappUrl } from "@/content/sitio";

export const metadata: Metadata = {
  title: "Programas por nivel",
  description:
    "Taller «Tu primer rol parcial», programa Primer Mandato, mastermind Portafolio, sesiones individuales de transición y coconstrucción: cada uno para un nivel de la escalera.",
  alternates: { canonical: "/programas" },
  openGraph: { title: "Programas por nivel", url: "/programas" },
};

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];

export default function ProgramasPage() {
  const agenda = agendaUrl();
  return (
    <>
      <section aria-labelledby="prog-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <HeroHead id="prog-h" label={["Programas", "Ordenados por nivel"]} title="Lo que te acompaña en cada nivel" className="max-w-[1100px]" />
          <p className="lead mt-5 lg:mt-8 max-w-[760px]">Empiezas por lo gratuito y avanzas cuando aparece la señal de tu nivel.</p>
          <p className="text-cuerpo text-ink2 mt-3 max-w-[760px]">Las fechas, los cupos y las condiciones se publican con cada convocatoria.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 mt-7 lg:mt-9">
            <LinkArrow href="/diagnostico" className="text-cuerpo">
              ¿No sabes tu nivel? Haz el diagnóstico
            </LinkArrow>
            <LinkArrow href="/kit" className="text-cuerpo">
              Nivel 0: empieza por el kit gratuito
            </LinkArrow>
          </div>
        </div>
      </section>

      <section className="border-t border-ink" aria-label="Programas">
        <div className="wrap py-12 lg:py-[88px] grid gap-6 lg:gap-8">
          {PROGRAMAS.map((p) => {
            const primary = p.cta === "Agenda 30 minutos" || p.cta === "Conversemos" ? { href: agenda, ext: true } : { href: `#postular-${p.id}`, ext: false };
            return (
              <article key={p.id} id={p.id} className="rv card scroll-mt-6 bg-paper grid lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,360px)]" aria-labelledby={`${p.id}-t`}>
                <div className="px-5 py-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-ink flex lg:flex-col justify-between gap-3" style={{ background: FILL[p.level], color: p.level === 3 ? "var(--color-paper)" : undefined }}>
                  <div>
                    <Mono tone={p.level === 3 ? "claro" : "gris"} as="span">
                      {p.levelLabel}
                    </Mono>
                    <div className="wh2 text-figura mt-1.5">{LEVELS[p.level]}</div>
                  </div>
                  <Lvl
                    on={Array.from({ length: p.level + 1 }, (_, i) => i)}
                    fg={p.level === 3 ? "var(--color-paper)" : "var(--color-ink)"}
                    off={p.level === 3 ? "var(--color-ink20)" : "var(--color-ink3)"}
                  />
                </div>
                <div className="px-5 py-6 lg:p-8">
                  <Mono tone="gris">{p.tag}</Mono>
                  <h2 id={`${p.id}-t`} className="wh2 text-h2 mt-2.5">
                    {p.name}
                  </h2>
                  <p className="wt mt-3.5">{p.desc}</p>
                  <Mono tone="gris" className="mt-5">
                    Formato
                  </Mono>
                  <p className="text-cuerpo mt-1.5">{p.format}</p>
                </div>
                <div className="px-5 pb-6 lg:p-8 lg:border-l border-ink lg:bg-warm flex flex-col">
                  <Mono tone="gris">Es para ti si</Mono>
                  <p className="text-cuerpo leading-[1.45] mt-2">{p.forWho}</p>
                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    {primary.ext ? (
                      <a href={primary.href} target="_blank" rel="noopener noreferrer" className="btn2 w-full">
                        <span>{p.cta}</span>
                        <span className="sr-only"> (se abre en otra pestaña)</span>
                      </a>
                    ) : (
                      <a href={primary.href} className="btn2 w-full">
                        {p.cta}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
          <p className="text-cuerpo">
            ¿Dudas sobre algún programa?{" "}
            <a
              href={whatsappUrl("Hola, quiero información sobre los programas de Future Founders.")}
              target="_blank"
              rel="noopener noreferrer"
              className="ul font-semibold"
            >
              Pregunta por WhatsApp
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </p>
          <Nota>Ningún programa promete ingresos ni plazos. Cada uno trabaja sobre tus números y tu mercado, y la decisión de cuándo avanzar es tuya.</Nota>
        </div>
      </section>

      <section id="postular" className="bg-warm scroll-mt-4" aria-labelledby="postular-t">
        {PROGRAMAS.map((p) => (
          <span key={p.id} id={`postular-${p.id}`} className="block relative -top-6" aria-hidden="true" />
        ))}
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24 grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] items-start">
          <div>
            <SecHead
              id="postular-t"
              label={["Postulación", "Fechas y cupos"]}
              title="Te escribimos con las fechas de la próxima convocatoria"
              sub="Elige el programa y te enviamos sus fechas, cupos y condiciones. Si prefieres conversar antes, agenda 30 minutos con el equipo."
            />
            <a href={agenda} target="_blank" rel="noopener noreferrer" className="ul inline-block mt-6 text-cuerpo font-bold">
              Agenda 30 minutos
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </div>
          <ProgramForm />
        </div>
      </section>
    </>
  );
}
