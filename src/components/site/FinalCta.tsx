import { AgendaLink, Mono, Jn, Sc } from "./ui";
import EmailCta from "./EmailCta";
import { dict } from "@/i18n/dict";
import type { Locale } from "@/i18n/rutas";

/** Cierre de página sobre tinta: el kit «Plan de salida» por correo y la agenda como alternativa. */
export default function FinalCta({ locale, title, text, button }: { locale: Locale; title?: string; text?: string; button?: string }) {
  const t = dict(locale);
  const c = t.cierre;
  return (
    <section className="bg-ink text-paper on-ink" aria-labelledby="cta-final">
      <div className="wrap py-14 lg:py-[88px] grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-end">
        <div>
          <Mono tone="papel">
            <Jn parts={c.rotulo} />
          </Mono>
          <h2 id="cta-final" className="wh2 text-display-md mt-3 lg:mt-4">
            {title ?? c.titulo}
          </h2>
          <p className="lead mt-4 lg:mt-5 max-w-[640px]">
            <Sc text={text ?? c.texto} />
          </p>
        </div>
        <div className="rv">
          <EmailCta locale={locale} button={button ?? c.boton} t={c} c={t.comun} />
          <p className="mt-5 lg:mt-6 text-cuerpo">
            <AgendaLink c={t.comun} />
          </p>
        </div>
      </div>
    </section>
  );
}
