import type { Metadata } from "next";
import Link from "next/link";
import ProgramForm from "@/components/site/ProgramForm";
import { Arrow, Jn, Lines, Lvl, Mono, Nota, SecHead } from "@/components/site/ui";
import { PROGRAMAS } from "@/content/programas";
import { LEVELS, agendaUrl, whatsappUrl } from "@/content/sitio";

export const metadata: Metadata = {
  title: "Programas por nivel",
  description:
    "Taller «Tu primer rol parcial», programa Primer Mandato, mastermind Portafolio, sesiones 1:1 de transición y coconstrucción: cada uno para un nivel de la escalera.",
  alternates: { canonical: "/programas" },
  openGraph: { title: "Programas por nivel", url: "/programas" },
};

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];

export default function ProgramasPage() {
  const agenda = agendaUrl();
  return (
    <>
      <section className="grain" aria-labelledby="prog-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <Mono color="var(--color-magt)">
            <Jn parts={["Programas", "Ordenados por nivel"]} />
          </Mono>
          <h1 id="prog-h" className="wh lines mt-4 lg:mt-[22px] text-[50px] sm:text-[72px] lg:text-[104px] max-w-[1100px]">
            <Lines text="Lo que te acompaña en cada nivel" />
          </h1>
          <p className="wt mt-5 lg:mt-8 max-w-[760px]">
            Empiezas por lo gratuito y avanzas cuando aparece la señal de tu nivel. Ningún programa se vende a empresas: todos te hablan a ti. Las fechas, los cupos y las
            condiciones se publican con cada convocatoria.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-7 lg:mt-9">
            <Link href="/diagnostico" className="ul self-start text-[17px] font-bold">
              ¿No sabes tu nivel? Haz el diagnóstico
            </Link>
            <Link href="/kit" className="ul self-start text-[17px] font-bold">
              Nivel 0: empieza por el kit gratuito
            </Link>
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
                    <span className="wm" style={{ color: p.level === 3 ? "var(--color-ink20)" : "var(--color-ink2)" }}>
                      Nivel {p.level}
                    </span>
                    <div className="wh text-[26px] lg:text-[30px] mt-1.5">{LEVELS[p.level]}</div>
                  </div>
                  <Lvl
                    on={Array.from({ length: p.level + 1 }, (_, i) => i)}
                    size={10}
                    fg={p.level === 3 ? "var(--color-paper)" : "var(--color-ink)"}
                    off={p.level === 3 ? "var(--color-ink20)" : "var(--color-ink3)"}
                  />
                </div>
                <div className="px-5 py-6 lg:p-8">
                  <Mono className="text-ink2">{p.tag}</Mono>
                  <h2 id={`${p.id}-t`} className="wh text-[36px] lg:text-[48px] mt-2.5">
                    {p.name}
                  </h2>
                  <p className="wt mt-3.5">{p.desc}</p>
                  <div className="wm text-ink2 mt-5">Formato</div>
                  <p className="text-[17px] mt-1.5">{p.format}</p>
                </div>
                <div className="px-5 pb-6 lg:p-8 lg:border-l border-ink lg:bg-warm flex flex-col">
                  <div className="wm text-ink2">Es para ti si</div>
                  <p className="text-[17px] leading-[1.45] mt-2">{p.forWho}</p>
                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    {primary.ext ? (
                      <a href={primary.href} target="_blank" rel="noopener noreferrer" className="btn w-full">
                        <span>{p.cta}</span>
                        <Arrow />
                        <span className="sr-only"> (se abre en otra pestaña)</span>
                      </a>
                    ) : (
                      <a href={primary.href} className="btn w-full">
                        <span>{p.cta}</span>
                        <Arrow />
                      </a>
                    )}
                    <a
                      href={whatsappUrl(`Hola, quiero información sobre ${p.tag.toLowerCase()} «${p.name}» de Future Founders.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ul self-center text-[15px] font-semibold"
                    >
                      Pregunta por WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
          <Nota>Ningún programa promete ingresos ni plazos. Cada uno trabaja sobre tus números y tu mercado, y la decisión de cuándo avanzar es tuya.</Nota>
        </div>
      </section>

      <section id="postular" className="bg-warm grid-paper scroll-mt-4" aria-labelledby="postular-t">
        {PROGRAMAS.map((p) => (
          <span key={p.id} id={`postular-${p.id}`} className="block relative -top-6" aria-hidden="true" />
        ))}
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24 grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] items-start">
          <div>
            <SecHead
              id="postular-t"
              size="md"
              label={["Postulación", "Fechas y cupos"]}
              title="Postula o pide las fechas"
              sub="Te escribimos con la próxima convocatoria del programa que elijas: fechas, cupos y condiciones. Si prefieres conversar antes, agenda 30 minutos con el equipo."
            />
            <a href={agenda} target="_blank" rel="noopener noreferrer" className="ul inline-block mt-6 text-[17px] font-bold">
              Agenda 30 minutos
            </a>
          </div>
          <ProgramForm />
        </div>
      </section>
    </>
  );
}
