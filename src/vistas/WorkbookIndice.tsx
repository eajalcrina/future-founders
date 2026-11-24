import type { Metadata } from "next";
import Link from "next/link";
import DownloadForm from "@/components/site/DownloadForm";
import { Hero as HeroHead, Icon, Mono, Sc } from "@/components/site/ui";
import { DESCARGAS } from "@/lib/descargas";
import { partes, plantillas } from "@/content/workbook-i18n";
import { partTemplates, timeLabel } from "@/content/workbook-util";
import { canonFormulario, dict, type Dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { metaPagina } from "@/i18n/metadatos";
import { lh, type Locale } from "@/i18n/rutas";

export function metadataWorkbook(locale: Locale): Metadata {
  const t = dict(locale).workbook.meta;
  return metaPagina("workbook", locale, { title: t.titulo, description: t.descripcion });
}

function Row({ id, code, title, time, where, calc, locale, t }: { id: string; code: string; title: string; time: string; where: string; calc: boolean; locale: Locale; t: Dict["workbook"]["indice"] }) {
  return (
    <li>
      <Link href={lh(locale, `/workbook/${id}`)} className="group grid grid-cols-[72px_minmax(0,1fr)_auto] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_110px] gap-x-4 gap-y-1 items-baseline py-4 border-t border-ink">
        <span className="num text-h2">{code}</span>
        <span className="text-cuerpo font-bold leading-[1.3]">
          <span className="lnk">
            <Sc text={title} />
          </span>
          {calc && (
            <span className="inline-block align-[-2px] ml-2" title={t.calcTitle}>
              <Icon name="formula" size={16} />
              <span className="sr-only">{t.calcSr}</span>
            </span>
          )}
        </span>
        <span className="hidden lg:block text-recuadro text-ink2">
          <Sc text={where} />
        </span>
        <Mono tone="gris" as="span" className="text-right">
          {timeLabel(time)}
        </Mono>
      </Link>
    </li>
  );
}

export default function WorkbookIndice({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const w = t.workbook.indice;
  const lista = plantillas(locale);
  const kit = lista.filter((p) => p.kind === "kit");
  const rest = lista.filter((p) => p.kind === "anexo" || p.kind === "cierre");
  const rp = { locale, t: w };
  return (
    <section aria-labelledby="wb-h">
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24">
        <HeroHead id="wb-h" label={w.label} title={w.title} />
        <div className="grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start mt-6 lg:mt-10">
          <div>
            <div className="lead max-w-[760px]">
              <p>{w.qr}</p>
              <p className="mt-3 flex gap-2 items-baseline">
                <span className="inline-block align-[-2px] shrink-0">
                  <Icon name="formula" size={16} />
                </span>
                <span>{w.icono}</span>
              </p>
            </div>
            <h2 className="wh2 text-h2 mt-10 lg:mt-12">{w.kit}</h2>
            <p className="text-recuadro text-ink2 mt-1">{w.kitSub}</p>
            <ul className="mt-4 border-b border-ink">
              {kit.map((p) => (
                <Row key={p.id} {...rp} id={p.id} code={p.code} title={p.title} time={p.time} where="" calc={Boolean(p.calc)} />
              ))}
            </ul>
          </div>
          <div id="descarga">
            <DownloadForm locale={locale} t={t.descarga} c={t.comun} situaciones={t.sitio.situaciones} canon={canonFormulario} producto="workbook" file={DESCARGAS.workbook} />
          </div>
        </div>

        {Object.entries(partes(locale)).map(([num, name]) => (
          <div key={num} className="mt-12 lg:mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="wh2 text-h2">{f(w.parte, { n: num, nombre: name })}</h2>
              <Link href={lh(locale, `/workbook/parte-${num}`)} className="ul text-recuadro font-semibold whitespace-nowrap">
                {w.verParte}
                <span className="sr-only">
                  {" "}
                  {num}, {name}
                </span>
              </Link>
            </div>
            <ul className="mt-4 border-b border-ink">
              {partTemplates(num, lista).map((p) => (
                <Row key={p.id} {...rp} id={p.id} code={p.code} title={p.title} time={p.time} where={p.where} calc={Boolean(p.calc)} />
              ))}
            </ul>
          </div>
        ))}

        <h2 className="wh2 text-h2 mt-12 lg:mt-14">{w.anexos}</h2>
        <ul className="mt-4 border-b border-ink">
          {rest.map((p) => (
            <Row key={p.id} {...rp} id={p.id} code={p.code} title={p.title} time={p.time} where={p.where} calc={Boolean(p.calc)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
