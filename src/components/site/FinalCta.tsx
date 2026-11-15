import { Mono, Jn, Lines, Sc } from "./ui";
import EmailCta from "./EmailCta";
import { agendaUrl } from "@/content/sitio";

export default function FinalCta({
  title = "Empieza por tu runway",
  text = "El kit «Plan de salida» trae cinco plantillas que llenas en unas 2 horas. La primera te dice en 20 minutos cuántos meses aguantas sin sueldo.",
  button = "Recibir el kit",
  folio = "K.1",
}: {
  title?: string;
  text?: string;
  button?: string;
  folio?: string;
}) {
  return (
    <section className="bg-ink text-paper on-ink halftone overflow-hidden" aria-labelledby="cta-final">
      <span className="folio" aria-hidden="true" style={{ right: "-0.04em", bottom: "-0.12em", fontSize: "clamp(160px, 26vw, 380px)" }}>
        {folio}
      </span>
      <div className="wrap py-[52px] lg:py-[88px] grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-end">
        <div>
          <Mono color="var(--color-magl)">
            <Jn parts={["Kit gratuito", "Plan de salida"]} />
          </Mono>
          <h2 id="cta-final" className="wh lines text-[48px] lg:text-[96px] mt-3 lg:mt-[18px]">
            <Lines text={title} />
          </h2>
          <p className="wt mt-4 lg:mt-[22px] max-w-[640px]" style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}>
            <Sc text={text} />
          </p>
        </div>
        <div className="rv">
          <EmailCta button={button} />
          <a
            href={agendaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ul inline-block mt-5 lg:mt-[22px] text-[16px] lg:text-[17px] font-bold text-magl"
          >
            ¿Prefieres conversar? Agenda 30 minutos
          </a>
        </div>
      </div>
    </section>
  );
}
