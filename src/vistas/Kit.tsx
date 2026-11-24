import type { Metadata } from "next";
import Link from "next/link";
import DownloadForm from "@/components/site/DownloadForm";
import { DESCARGAS, kitFallback } from "@/lib/descargas";
import RunwayCalc from "@/components/site/RunwayCalc";
import FinalCta from "@/components/site/FinalCta";
import Parallax from "@/components/site/Parallax";
import { Hero as HeroHead, Icon, Mono, SecHead } from "@/components/site/ui";
import { canonFormulario, dict } from "@/i18n/dict";
import { metaPagina } from "@/i18n/metadatos";
import { lh, type Locale } from "@/i18n/rutas";

export function metadataKit(locale: Locale): Metadata {
  const t = dict(locale).kit.meta;
  return metaPagina("kit", locale, { title: t.titulo, description: t.descripcion, og: { title: t.titulo } });
}

export default function Kit({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const k = t.kit;
  return (
    <>
      <section aria-labelledby="kit-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[104px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start">
          <div>
            <HeroHead id="kit-h" label={k.hero.label} title={k.hero.title} />
            <dl className="rv-kids grid grid-cols-[1fr_auto_1fr] sm:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-11 max-w-[700px]">
              {k.hero.datos.map(([v, l]) => (
                <div key={l} className="border-t border-ink pt-3 flex flex-col-reverse justify-end">
                  <dt className="text-recuadro mt-1.5 text-ink2">{l}</dt>
                  <dd className="num text-display-lg m-0">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="formulario">
            <DownloadForm locale={locale} t={t.descarga} c={t.comun} situaciones={t.sitio.situaciones} canon={canonFormulario} producto="kit" file={DESCARGAS.kit} fallback={kitFallback(t.descarga)} />
          </div>
        </div>
      </section>

      <section className="border-y border-ink" aria-labelledby="plantillas-t">
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
          <SecHead
            id="plantillas-t"
            className="max-w-[860px]"
            label={k.plantillas.label}
            title={k.plantillas.title}
          />
          <div className="hidden lg:grid lg:grid-cols-[92px_48px_340px_minmax(0,1fr)_100px] gap-6 mt-11 pb-2" aria-hidden="true">
            <span className="col-start-4">
              <Mono tone="gris">{k.plantillas.terminaste}</Mono>
            </span>
            <Mono tone="gris" as="span" className="text-right">
              {k.plantillas.tiempo}
            </Mono>
          </div>
          <ol className="mt-8 lg:mt-0 border-b border-ink">
            {t.sitio.kit.map((k) => (
              <li key={k.code} className="rv">
                <Link
                  href={lh(locale, `/workbook/${k.id}`)}
                  className="group grid gap-x-4 gap-y-3 lg:gap-6 grid-cols-[64px_minmax(0,1fr)_auto] lg:grid-cols-[92px_48px_340px_minmax(0,1fr)_100px] items-start py-5 lg:py-6 border-t border-ink"
                >
                  <span className="num text-kpi">{k.code}</span>
                  <span className="hidden lg:block pt-1.5">
                    <Icon name={k.icon as "reloj"} size={18} />
                  </span>
                  <div>
                    <h3 className="ws text-figura">
                      <span className="lnk">{k.title}</span>
                    </h3>
                    <p className="text-recuadro leading-[1.4] text-ink2 mt-1.5">{k.purpose}</p>
                  </div>
                  <div className="col-start-2 lg:col-start-auto row-start-2 lg:row-start-auto">
                    <p className="wt">
                      <span className="lg:hidden">{t.kit.plantillas.terminas}</span>
                      <span className="sr-only hidden lg:inline">{t.kit.plantillas.terminasSr}</span>
                      {k.done.charAt(0).toLowerCase() + k.done.slice(1)}
                    </p>
                  </div>
                  <Mono tone="gris" as="span" className="text-right col-start-3 row-start-1 lg:col-start-auto lg:row-start-auto pt-1">
                    {k.time}
                  </Mono>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="calculadora" aria-labelledby="calc-t">
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
          <SecHead
            id="calc-t"
            className="max-w-[900px]"
            label={k.calculadora.label}
            title={k.calculadora.title}
          />
          <div className="mt-8 lg:mt-12">
            <RunwayCalc locale={locale} t={t.runway} c={t.comun} />
          </div>
        </div>
      </section>

      <section className="bg-warm" aria-labelledby="que-t">
        <div className="wrap py-12 lg:py-[88px] grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] items-start">
          <div className="rv">
            <Parallax
              src="/img/duo-puerta.webp"
              alt={k.uso.imgAlt}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="w-full aspect-[600/318]"
            />
          </div>
          <div>
            <SecHead id="que-t" className="max-w-[640px]" label={k.uso.label} title={k.uso.title} />
            <ul className="mt-6 lg:mt-8 border-b border-ink rv-kids">
              <li className="grid grid-cols-[minmax(0,1fr)] gap-1 py-4 border-t border-ink">
                <span className="wh3 text-h3">{k.uso.empleo}</span>
                <span className="wt">{k.uso.empleoD}</span>
              </li>
              <li className="grid grid-cols-[minmax(0,1fr)] gap-1 py-4 border-t border-ink">
                <span className="wh3 text-h3">{k.uso.saliste}</span>
                <span className="wt">{k.uso.salisteD}</span>
              </li>
            </ul>
            <p className="text-recuadro leading-[1.45] text-ink2 mt-4">{k.uso.paises}</p>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} title={k.cierre.title} text={k.cierre.text} button={k.cierre.button} />
    </>
  );
}
