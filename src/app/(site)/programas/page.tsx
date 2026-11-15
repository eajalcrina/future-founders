import type { Metadata } from "next";
import ProgramForm from "@/components/site/ProgramForm";
import { AgendaLink, Hero as HeroHead, Icon, LinkArrow, Lvl, Mono, Nota, SecHead } from "@/components/site/ui";
import { PROGRAMAS } from "@/content/programas";
import { HAY_AGENDA, LEVELS, agendaUrl, whatsappUrl } from "@/content/sitio";

export const metadata: Metadata = {
  title: "Programas por nivel",
  description:
    "Taller «Tu primer rol parcial», programa Primer Mandato, mastermind Portafolio, sesiones individuales de transición y coconstrucción: cada uno para un nivel de la escalera.",
  alternates: { canonical: "/programas" },
  openGraph: { title: "Programas por nivel", url: "/programas" },
};

/** Programas seguidos del mismo nivel van en un grupo con una sola casilla de nivel. */
const GRUPOS = PROGRAMAS.reduce<(typeof PROGRAMAS)[number][][]>((acc, p) => {
  const last = acc[acc.length - 1];
  if (last && last[0].level === p.level) last.push(p);
  else acc.push([p]);
  return acc;
}, []);

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];

export default function ProgramasPage() {
  const agenda = agendaUrl();
  return (
    <>
      <section aria-labelledby="prog-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <HeroHead id="prog-h" label={["Programas", "Ordenados por nivel"]} title="Lo que te acompaña en cada nivel" className="max-w-[1100px]" />
          <p className="lead mt-5 lg:mt-8 max-w-[760px]">
            Cinco programas, del taller de dos sesiones al sprint de 90 días. Cada uno dice para qué nivel es y qué necesitas tener antes.
          </p>
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
          {GRUPOS.map((g) => {
            const lv = g[0].level;
            return (
              /* Una casilla de nivel por grupo: el taller y Primer Mandato comparten el nivel 0 y no lo repiten */
              <div key={g[0].id} className="rv card bg-paper grid lg:grid-cols-[260px_minmax(0,1fr)]">
                <div className="px-5 py-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-ink flex lg:flex-col justify-between gap-3" style={{ background: FILL[lv], color: lv === 3 ? "var(--color-paper)" : undefined }}>
                  <div>
                    <Mono tone={lv === 3 ? "claro" : "gris"} as="span">
                      {g[0].levelLabel}
                    </Mono>
                    <div className="wh2 text-figura mt-1.5">{LEVELS[lv]}</div>
                  </div>
                  <Lvl
                    on={Array.from({ length: lv + 1 }, (_, i) => i)}
                    fg={lv === 3 ? "var(--color-paper)" : "var(--color-ink)"}
                    off={lv === 3 ? "var(--color-ink20)" : "var(--color-ink3)"}
                  />
                </div>
                <div>
                  {g.map((p, i) => {
                    const primary = p.cta === "Agenda 30 minutos" ? { href: agenda, ext: true } : { href: `#postular-${p.id}`, ext: false };
                    return (
                      <article key={p.id} id={p.id} className={`grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] ${i > 0 ? "border-t border-ink" : ""}`} aria-labelledby={`${p.id}-t`}>
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
                                <Icon name="calendario" size={18} />
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
                </div>
              </div>
            );
          })}
          <Nota>Ningún programa promete ingresos ni plazos. Cada uno trabaja sobre tus números y tu mercado, y la decisión de cuándo avanzar es tuya.</Nota>
        </div>
      </section>

      <section id="postular" className="bg-warm" aria-labelledby="postular-t">
        {PROGRAMAS.map((p) => (
          <span key={p.id} id={`postular-${p.id}`} className="block" aria-hidden="true" />
        ))}
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24 grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] items-start">
          <div>
            <SecHead
              id="postular-t"
              label={["Postulación", "Fechas y cupos"]}
              title="Te escribimos con las fechas de la próxima convocatoria"
              sub="Elige el programa. Las fechas, los cupos y las condiciones se publican con cada convocatoria y te las enviamos por correo."
            />
            <p className="text-cuerpo mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span>Si prefieres conversar antes,</span>
              <AgendaLink />
              {HAY_AGENDA && (
                <a
                  href={whatsappUrl("Hola, quiero información sobre los programas de Future Founders.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ul font-semibold"
                >
                  o escríbenos por WhatsApp
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              )}
            </p>
          </div>
          <ProgramForm />
        </div>
      </section>
    </>
  );
}
