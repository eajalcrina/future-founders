import { AgendaLink, Mono, Jn, Sc } from "./ui";
import EmailCta from "./EmailCta";

/** Cierre de página sobre tinta: el kit «Plan de salida» por correo y la agenda como alternativa. */
export default function FinalCta({
  title = "Empieza por tu runway",
  text = "El kit «Plan de salida» trae cinco plantillas que llenas en unas 2 horas. La primera te dice en 20 minutos cuántos meses aguantas sin sueldo.",
  button = "Recibir el kit",
}: {
  title?: string;
  text?: string;
  button?: string;
}) {
  return (
    <section className="bg-ink text-paper on-ink" aria-labelledby="cta-final">
      <div className="wrap py-14 lg:py-[88px] grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-end">
        <div>
          <Mono tone="papel">
            <Jn parts={["Kit gratuito", "Plan de salida"]} />
          </Mono>
          <h2 id="cta-final" className="wh2 text-display-md mt-3 lg:mt-4">
            {title}
          </h2>
          <p className="lead mt-4 lg:mt-5 max-w-[640px]">
            <Sc text={text} />
          </p>
        </div>
        <div className="rv">
          <EmailCta button={button} />
          <p className="mt-5 lg:mt-6 text-cuerpo">
            <AgendaLink />
          </p>
        </div>
      </div>
    </section>
  );
}
