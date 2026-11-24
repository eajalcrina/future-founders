import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlantillaCalc from "@/components/site/PlantillaCalc";
import RunwayCalc from "@/components/site/RunwayCalc";
import { Hero as HeroHead, LinkArrow, Mono, Sc } from "@/components/site/ui";
import { PARTES, PLANTILLAS, type Plantilla } from "@/content/workbook";
import { partes, plantillas } from "@/content/workbook-i18n";
import { allWorkbookIds, partTemplates, timeLabel } from "@/content/workbook-util";
import { dict, type Dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { metaPagina } from "@/i18n/metadatos";
import { lh, type Locale } from "@/i18n/rutas";

/** /workbook/<id> y /en/workbook/<id>: los mismos id (los QR impresos del libro apuntan a la versión en español). */
export function paramsWorkbook() {
  return allWorkbookIds().map((id) => ({ id }));
}

function partNum(id: string) {
  const m = id.match(/^parte-(\d{2})$/);
  return m && PARTES[m[1]] ? m[1] : null;
}

export function metadataPlantilla(id: string, locale: Locale): Metadata {
  const t = dict(locale).workbook.meta;
  const pn = partNum(id);
  if (pn) {
    const nombre = partes(locale)[pn];
    return metaPagina("workbook", locale, { id, title: f(t.parteTitulo, { n: pn, nombre }), description: f(t.parteDescripcion, { n: pn, nombre }) });
  }
  const p = plantillas(locale).find((x) => x.id === id);
  if (!p) return {};
  return metaPagina("workbook", locale, {
    id,
    title: f(t.plantillaTitulo, { code: p.code, titulo: p.title }),
    description: `${p.purpose ?? p.intro ?? ""} ${p.where}.${p.calc ? t.conCalculadora : ""}`.replace(/<\/?em>/g, "").trim(),
  });
}

/** Rótulo del tipo de plantilla: «Kit «Plan de salida»», «Parte 01», «Anexo por país», «Cierre del libro». */
function kindLabel(p: Plantilla, t: Dict["workbook"]["tipo"]): string {
  return { kit: t.kit, capitulo: f(t.capitulo, { n: p.part?.num ?? "" }), anexo: t.anexo, cierre: t.cierre }[p.kind];
}

type P = { t: Dict; locale: Locale };

function Meta({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-5 mt-8 lg:mt-10">
      {items.map(([k, v]) => (
        <div key={k} className="border-t border-ink pt-2.5">
          <dt className="wm text-ink2">{k}</dt>
          <dd className="m-0 text-cuerpo mt-1.5 leading-[1.35]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function PartPage({ num, t, locale }: P & { num: string }) {
  const w = t.workbook.parte;
  const items = partTemplates(num, plantillas(locale));
  return (
    <section>
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24">
        <HeroHead label={w.label.map((l) => f(l, { n: num }))} title={partes(locale)[num]} />
        <p className="lead mt-5 lg:mt-7 max-w-[760px]">{w.lead}</p>
        <ul className="mt-10 border-b border-ink">
          {items.map((p) => (
            <li key={p.id}>
              <Link href={lh(locale, `/workbook/${p.id}`)} className="group grid grid-cols-[72px_minmax(0,1fr)_auto] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_110px] gap-x-4 gap-y-1 items-baseline py-4 border-t border-ink">
                <span className="num text-h2">{p.code}</span>
                <span className="text-cuerpo font-bold">
                  <span className="lnk">
                    <Sc text={p.title} />
                  </span>
                </span>
                <span className="hidden lg:block text-recuadro text-ink2">
                  <Sc text={p.where} />
                </span>
                <Mono tone="gris" as="span" className="text-right">
                  {timeLabel(p.time)}
                </Mono>
              </Link>
            </li>
          ))}
        </ul>
        <LinkArrow href={lh(locale, "/workbook")} className="mt-8 text-cuerpo">
          {w.todas}
        </LinkArrow>
      </div>
    </section>
  );
}

function TemplatePage({ p, t, locale }: P & { p: Plantilla }) {
  const w = t.workbook.plantilla;
  const lista = plantillas(locale);
  const idx = lista.findIndex((x) => x.id === p.id);
  const prev = lista[idx - 1];
  const next = lista[idx + 1];
  const meta: [string, string][] = [
    [w.tiempo, p.time],
    [w.enLibro, p.where],
    ...(p.level ? ([[w.nivel, p.level]] as [string, string][]) : []),
    ...(p.who ? ([[w.ejemplo, p.who]] as [string, string][]) : []),
    ...(p.pages.libro || p.pages.workbook
      ? ([
          [
            w.paginas,
            [p.pages.libro && f(w.libroPag, { n: p.pages.libro }), p.pages.workbook && f(w.workbookPag, { n: p.pages.workbook })].filter(Boolean).join(", "),
          ],
        ] as [string, string][])
      : []),
  ];
  const hasCalc = Boolean(p.calc) && p.id !== "k1";
  // R7: «Antes de empezar» y el recuadro «trae» no se pintan cuando solo repiten «Necesitas antes» o el texto de arriba.
  // Se decide con el texto español del libro (las reglas leen palabras en español) y vale igual para el inglés.
  const pe = PLANTILLAS.find((x) => x.id === p.id) ?? p;
  const introVisible = Boolean(pe.intro && pe.purpose) && !(pe.uses.length > 0 && soloPlantillas(pe.intro ?? ""));
  const traeVisible = Boolean(pe.trae) && !(pe.uses.length > 0 && soloPlantillas(pe.trae ?? "")) && !cubierto(pe.trae ?? "", introVisible ? (pe.intro ?? "") : "", pe.uses.map((u) => u.code));
  return (
    <>
      <section>
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <HeroHead label={[w.workbook, kindLabel(p, t.workbook.tipo), f(w.plantilla, { code: p.code })]} title={p.title} className="max-w-[1150px]" />
          <Meta items={meta} />
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="wrap py-12 lg:py-[88px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-start">
          {/* La columna más corta queda fija al recorrer, para que no quede un vacío largo junto a la otra */}
          <div className={`rv ${hasCalc ? "lg:sticky lg:top-[calc(var(--header-h)+env(safe-area-inset-top)+24px)]" : ""}`}>
            <Mono>{w.paraQue}</Mono>
            <p className="ws text-figura mt-3">
              <Sc text={p.purpose ?? p.intro ?? ""} />
            </p>
            {introVisible && (
              <>
                <Mono className="mt-8">{w.antes}</Mono>
                <p className="wt mt-2.5">
                  <Sc text={p.intro ?? ""} />
                </p>
              </>
            )}
            {traeVisible && p.trae && (
              <p className="text-recuadro mt-4 px-3 py-2.5 bg-warm inline-block">
                <Sc text={p.trae} />
              </p>
            )}
            {p.head.map((h) => (
              <div key={h.label} className="mt-8">
                <Mono>{w.arriba}</Mono>
                <p className="text-cuerpo leading-[1.45] mt-2.5">
                  <Sc text={f(w.cadaDato, { label: h.label })} />
                </p>
                <ul className="grid grid-cols-3 gap-3 lg:gap-5 mt-3 max-w-[560px]">
                  {h.parts.map((x) => (
                    <li key={x.field} className="border-b border-ink3 pb-7">
                      <span className="wm text-ink2">{x.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {p.summary.length > 0 && (
              <>
                <Mono className="mt-9 mb-1.5">{p.chapter ? f(w.trabajaCap, { n: p.chapter.n }) : w.trabajaSec}</Mono>
                <ul className="border-b border-ink">
                  {p.summary.map((s) => (
                    <li key={s} className="grid grid-cols-[28px_minmax(0,1fr)] py-3 border-t border-ink">
                      <span className="block w-[5px] h-[5px] mt-2.5 bg-ink" aria-hidden="true" />
                      <span className="text-cuerpo leading-[1.45]">
                        <Sc text={s} />
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {p.uses.length > 0 && (
              <>
                <Mono className="mt-9">{w.necesitas}</Mono>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-2.5">
                  {p.uses.map((u) => {
                    const usada = lista.find((x) => x.id === u.id);
                    return (
                      <li key={u.id}>
                        <Link href={lh(locale, `/workbook/${u.id}`)} className="ul text-cuerpo font-semibold">
                          {u.code} {usada?.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {p.check.length > 0 && !hasCalc && (
              <>
                <Mono className="mt-9 mb-1.5">{w.terminaste}</Mono>
                <ul className="border-b border-ink">
                  {p.check.map((c) => (
                    <li key={c} className="grid grid-cols-[28px_minmax(0,1fr)] py-3 border-t border-ink">
                      <span className="block w-3.5 h-3.5 mt-1 border-[1.5px] border-ink" aria-hidden="true" />
                      <span className="text-cuerpo leading-[1.45]">
                        <Sc text={c} />
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <aside className={`grid gap-5 ${hasCalc ? "" : "lg:sticky lg:top-[calc(var(--header-h)+env(safe-area-inset-top)+24px)]"}`}>
            {hasCalc && p.calc && (
              <PlantillaCalc
                locale={locale}
                t={t.calc}
                detalle={t.comun.detalle}
                id={p.id}
                code={p.code}
                calc={p.calc}
                avisos={p.avisos}
                who={p.who}
                check={p.check}
                next={next ? { id: next.id, code: next.code, title: next.title } : null}
              />
            )}
            <div id="donde" className="bg-warm p-6">
              <Mono>{w.donde}</Mono>
              <p className="text-recuadro leading-[1.45] mt-2">{p.kind === "kit" ? w.dondeKit : w.dondeWb}</p>
              <div className="mt-5">
                {p.kind === "kit" ? (
                  <Link href={lh(locale, "/kit")} className="btn w-full">
                    {w.descargaKit}
                  </Link>
                ) : (
                  <Link href={lh(locale, "/workbook#descarga")} className="btn w-full">
                    {w.descargaWb}
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {p.id === "k1" && (
        <section id="calculadora" className="border-t border-ink" aria-label={w.calcK1}>
          <div className="wrap py-12 lg:py-[88px]">
            <RunwayCalc nivel={2} locale={locale} t={t.runway} c={t.comun} />
          </div>
        </section>
      )}

      <nav aria-label={w.otras} className="border-t border-ink">
        <div className="wrap py-8 grid gap-4 sm:grid-cols-3 items-center">
          <div>
            {prev && (
              <Link href={lh(locale, `/workbook/${prev.id}`)} className="group block">
                <span className="wm text-ink2 block">{w.anterior}</span>
                <span className="text-recuadro font-bold">
                  <span className="lnk">
                    {prev.code} {prev.title}
                  </span>
                </span>
              </Link>
            )}
          </div>
          <div className="sm:text-center">
            <Link href={lh(locale, p.part ? `/workbook/parte-${p.part.num}` : "/workbook")} className="ul text-recuadro font-semibold">
              {p.part ? f(w.parteN, { n: p.part.num, nombre: p.part.name }) : w.todas}
            </Link>
          </div>
          <div className="sm:text-right">
            {next && (
              <Link href={lh(locale, `/workbook/${next.id}`)} className="group block">
                <span className="wm text-ink2 block">{w.siguiente}</span>
                <span className="text-recuadro font-bold">
                  <span className="lnk">
                    {next.code} {next.title}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

/** «Trae la K.1 y la K.3.», «Usa tus números de la K.1 y la K.3.»: el texto no dice nada más que los códigos de otras plantillas. */
function soloPlantillas(t: string) {
  return t.replace(/(?<![\p{L}])(Trae|Usa|tus?|la|las|de|números|plantillas?|y)(?![\p{L}])/gu, "").replace(/K\.\d+|\d+\.\d+/g, "").replace(/[\s.,]/g, "") === "";
}

const VACIAS = new Set(["trae", "tu", "de", "la", "el", "en", "al", "si", "es", "un", "ya", "tus", "las", "los", "del", "una", "con", "que", "para", "por", "también"]);

/**
 * «Trae tu contrato y el código de ética de tu empresa.» tras «Busca tu contrato, … el código de ética …»;
 * «Trae la 11.1, tu lista de la 14.1 y tu mapa del comprador de la 8.1.» con las tres en «Necesitas antes».
 * Cada parte del recuadro nombra una plantilla de «Necesitas antes» o solo usa palabras que ya están en «Antes de empezar».
 */
function cubierto(trae: string, intro: string, usos: string[]) {
  // Solo cuenta como cubierto por palabras si la introducción enumera materiales («Necesitas…», «Usa…», «Ten a la mano…», «Busca…»).
  const base = /(?<!\p{L})(Necesitas|Usa|Ten|Busca)(?!\p{L})/u.test(intro) ? intro.toLowerCase() : "";
  const partes = trae.split(/,|\s(?:y|o)\s/).map((x) => x.trim()).filter(Boolean);
  return partes.every((parte) => {
    // Una condición («… si tu ruta es un rol parcial») es un dato que «Necesitas antes» no dice: el recuadro se queda.
    if (/(?<!\p{L})si(?!\p{L})/u.test(parte)) return false;
    const codigos = parte.match(/K\.\d+|\d+\.\d+/g) ?? [];
    if (codigos.length > 0) return codigos.every((c) => usos.includes(c) || intro.includes(c));
    const palabras = (parte.toLowerCase().match(/\p{L}{2,}/gu) ?? []).filter((w) => !VACIAS.has(w));
    return palabras.length > 0 && Boolean(base) && palabras.every((w) => new RegExp(`(?<!\\p{L})${w}(?!\\p{L})`, "u").test(base));
  });
}

export default function WorkbookPlantilla({ id, locale }: { id: string; locale: Locale }) {
  const t = dict(locale);
  const pn = partNum(id);
  if (pn) return <PartPage num={pn} t={t} locale={locale} />;
  const p = plantillas(locale).find((x) => x.id === id);
  if (!p) notFound();
  return <TemplatePage p={p} t={t} locale={locale} />;
}
