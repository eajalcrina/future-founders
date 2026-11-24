import type { Metadata } from "next";
import Link from "next/link";
import { Hero as HeroHead, Mono, Nota } from "@/components/site/ui";
import { dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { metaPagina } from "@/i18n/metadatos";
import { lh, type Locale } from "@/i18n/rutas";

export function metadataActualizaciones(locale: Locale): Metadata {
  const t = dict(locale).actualizaciones.meta;
  return metaPagina("actualizaciones", locale, { title: t.titulo, description: t.descripcion });
}

export default function Actualizaciones({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const a = t.actualizaciones;
  const ACTUALIZACIONES = a.datos;
  /** La columna «Valor vigente» aparece cuando al menos una cifra tiene su valor del año; mientras tanto, el aviso va una vez bajo el titular. */
  const HAY_VIGENTE = ACTUALIZACIONES.some((c) => c.valores.some((v) => v.vigente));
  const COLS = HAY_VIGENTE ? "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]";
  return (
    <>
      <section aria-labelledby="act-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <HeroHead id="act-h" label={a.label} title={a.title} />
          <p className="lead mt-5 lg:mt-7 max-w-[780px]">
            {a.lead}
            {HAY_VIGENTE ? "" : a.leadPendiente}
          </p>
          <nav aria-label={a.paises} className="flex flex-wrap gap-x-6 gap-y-2 mt-7">
            {ACTUALIZACIONES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="ul text-cuerpo font-bold">
                {c.pais}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {ACTUALIZACIONES.map((c) => (
        <section key={c.id} id={c.id} className="border-t border-ink" aria-labelledby={`${c.id}-h`}>
          <div className="wrap py-12 lg:py-[72px]">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 id={`${c.id}-h`} className="wh2 text-display-md">
                {c.pais}
              </h2>
              <Mono tone="gris" as="span">
                {c.anexo}
              </Mono>
            </div>
            <div className="mt-6 border-b border-t border-ink lg:border-t-0">
              <div className={`hidden lg:grid ${COLS} gap-6 py-2 wm text-ink3 font-medium border-t border-b border-ink`} aria-hidden="true">
                <span>{a.cols.cifra}</span>
                <span>{a.cols.v2026}</span>
                <span>{a.cols.donde}</span>
                {HAY_VIGENTE && <span>{a.cols.vigente}</span>}
                <span>{a.cols.verificar}</span>
              </div>
              <ul>
                {c.valores.map((v) => (
                  <li key={v.nombre} className={`grid gap-x-6 gap-y-2 py-4 border-t border-ink3 first:border-t-0 ${COLS}`}>
                    <span className="text-cuerpo font-bold leading-[1.35]">{v.nombre}</span>
                    <span className="text-cuerpo">
                      <span className="wm text-ink2 lg:hidden block">{a.cols.v2026}</span>
                      {v.v2026}
                    </span>
                    <span className="text-recuadro text-ink2 leading-[1.4]">
                      <span className="wm text-ink2 lg:hidden block">{a.cols.donde}</span>
                      {v.donde}
                    </span>
                    {HAY_VIGENTE && (
                      <span className="text-recuadro leading-[1.4]">
                        <span className="wm text-ink2 lg:hidden block">{a.cols.vigente}</span>
                        {v.vigente ?? <span className="text-ink2">{a.pendiente}</span>}
                      </span>
                    )}
                    <span className="text-recuadro leading-[1.4]">
                      <span className="wm text-ink2 lg:hidden block">{a.cols.verificar}</span>
                      <a href={v.fuente.href} target="_blank" rel="noopener noreferrer" className="ul font-semibold [overflow-wrap:anywhere]">
                        {v.fuente.label}
                        <span className="sr-only">{t.comun.nuevaPestana}</span>
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {c.tramites.length > 0 && (
              <div className="mt-8 max-w-[860px]">
                <Mono>{a.tramites}</Mono>
                <ul className="mt-2 grid gap-3">
                  {c.tramites.map((x) => (
                    <li key={x} className="filete-sup text-cuerpo leading-[1.45]">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="border-t border-ink bg-warm">
        <div className="wrap py-10 lg:py-14 grid gap-3 max-w-[900px]">
          <p className="text-cuerpo font-bold">{f(a.revision, { fecha: a.fecha })}</p>
          <Nota label={t.comun.nota}>{a.nota}</Nota>
          <p className="text-recuadro">
            {a.otroPais}{" "}
            <Link href={lh(locale, "/workbook")} className="ul font-semibold">
              {a.verPlantillas}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
