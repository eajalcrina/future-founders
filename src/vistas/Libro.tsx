import type { Metadata } from "next";
import Image from "next/image";
import BookButtons, { AmazonBtn, MercadoPagoBtn } from "@/components/site/BookButtons";
import FinalCta from "@/components/site/FinalCta";
import ParteMetodo from "@/components/site/ParteMetodo";
import Parallax from "@/components/site/Parallax";
import { CHECKOUT_URL, FOUNDERS, SITE_URL } from "@/content/sitio";
import { PART_LEVELS } from "@/content/workbook";
import { ideas, partes } from "@/content/workbook-i18n";
import { CropMarks, Hero as HeroHead, Icon, Jn, JsonLd, Lectura, LinkArrow, Lvl, Mono, Nota, Sc, SecHead } from "@/components/site/ui";
import { dict, type Dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { metaPagina } from "@/i18n/metadatos";
import { lh, ruta, type Locale } from "@/i18n/rutas";

export function metadataLibro(locale: Locale): Metadata {
  const t = dict(locale).libro.meta;
  return metaPagina("libro", locale, { title: t.titulo, description: t.descripcion, og: { title: t.titulo, type: "book" } });
}

type Toc = { code: string; n1: string; n2: string; lv: number[] | null; items: [string, string][] };

/** «Nivel 0», «Niveles 0 y 1», «Niveles 0 a 2»: el rótulo sale de los niveles que exporta gen-workbook.py. */
function levelLabel(lv: number[], t: Dict["libro"]) {
  if (lv.length === 1) return f(t.nivel1, { a: lv[0] });
  if (lv.length === 2) return f(t.nivel2, { a: lv[0], b: lv[1] });
  return f(t.nivelN, { a: lv[0], b: lv[lv.length - 1] });
}

function toc(t: Dict["libro"], nombres: Record<string, string>): Toc[] {
  const { apertura, capitulos, cierre } = t.toc;
  return [
    { code: "AP", ...apertura, lv: null },
    ...Object.entries(capitulos).map(([code, items]) => ({ code, n1: nombres[code], n2: levelLabel(PART_LEVELS[code], t), lv: PART_LEVELS[code], items })),
    { code: "AN", ...cierre, lv: null },
  ];
}

const SAMPLES = ["/img/muestra-personajes.webp", "/img/muestra-escalera.webp", "/img/muestra-caso-carmen.webp", "/img/muestra-plantilla-1-1.webp"];

const INCL_ICON = ["plantilla", "documento", "accion", "formula"] as const;

function bookLd(t: Dict, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Doble Agente",
    alternateName: t.libro.ld.alternateName,
    bookEdition: t.libro.ld.bookEdition,
    inLanguage: "es",
    author: FOUNDERS.map((fu) => ({ "@type": "Person", name: fu.name, url: fu.webUrl, jobTitle: t.sitio.founders[fu.key].role, sameAs: [fu.webUrl, fu.linkedin] })),
    publisher: { "@type": "Organization", name: "Future Founders", url: SITE_URL },
    image: `${SITE_URL}/img/doble-agente-portada.webp`,
    url: `${SITE_URL}${ruta("libro", locale)}`,
    description: t.libro.ld.description,
    bookFormat: ["https://schema.org/EBook", "https://schema.org/Paperback"],
  };
}

type P = { t: Dict; locale: Locale };

function Hero({ t }: P) {
  const h = t.libro.hero;
  return (
    <section aria-labelledby="libro-h">
      <div className="wrap pt-9 pb-12 lg:pt-[72px] lg:pb-24 grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] items-center">
        <div className="crop bg-warm flex items-center justify-center py-10 lg:py-0 lg:h-[660px]">
          <Image
            src="/img/doble-agente-portada.webp"
            alt={h.portadaAlt}
            width={372}
            height={546}
            sizes="(min-width: 1024px) 372px, 60vw"
            preload
            className="block w-[60%] max-w-[372px] lg:w-[372px] h-auto outline outline-1 outline-ink"
          />
          <CropMarks />
        </div>
        <div>
          <HeroHead id="libro-h" size="portada" label={h.label} title={h.title} />
          <p className="wh2 text-figura mt-4 lg:mt-6 max-w-[640px]">{h.sub}</p>
          <Mono tone="gris" className="mt-3 lg:mt-4">
            {h.autores}
          </Mono>
          <p className="lead mt-5 lg:mt-7 max-w-[680px]">{h.lead}</p>
          <div className="mt-7 lg:mt-9">
            <BookButtons t={t} />
          </div>
          <Mono tone="gris" className="mt-4 lg:mt-5">
            <Jn parts={h.formatos} />
          </Mono>
        </div>
      </div>
    </section>
  );
}

function Back({ t }: P) {
  const c = t.libro.contratapa;
  return (
    <section className="border-t border-ink" aria-labelledby="contratapa-t">
      <div className="wrap py-12 lg:py-[88px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <div>
          <SecHead id="contratapa-t" className="max-w-[760px]" label={c.label} title={c.title} />
          <div className="wt mt-6 lg:mt-8 max-w-[720px] rv">
            {c.p.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
        </div>
        <div className="lg:pt-2">
          <Mono className="mb-2">{c.aprender}</Mono>
          <ol className="rv-kids border-b border-ink">
            {t.sitio.learn.map((x, i) => (
              <li key={i} className="grid grid-cols-[44px_minmax(0,1fr)] py-4 border-t border-ink">
                <span className="num text-figura">0{i + 1}</span>
                <span className="text-cuerpo leading-[1.4]">
                  <Sc text={x} />
                </span>
              </li>
            ))}
          </ol>
          <Lectura className="mt-7" label={t.comun.lectura} text={c.lectura} />
        </div>
      </div>
    </section>
  );
}

/** El método en 21 ideas: una fila por parte y, dentro, cada capítulo con «La idea» del libro (src/content/ideas.ts, generado). */
function Method({ t, locale }: P) {
  const m = t.libro.metodo;
  const idea = ideas(locale);
  return (
    <section id="metodo" className="border-t border-ink" aria-labelledby="metodo-t">
      <span id="indice" aria-hidden="true" />
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="metodo-t" className="max-w-[760px]" label={m.label} title={m.title} />
        <div className="mt-8 lg:mt-12 border-b border-ink">
          {toc(t.libro, partes(locale)).map((r, i) => (
            <ParteMetodo
              key={r.code}
              code={r.code}
              defaultOpen={i === 1}
              verLabel={r.lv ? f(m.verIdeas, { n: r.items.length }) : m.verContenido}
              ocultar={m.ocultar}
              head={
                <>
                  <div className="wh2 text-figura">{r.n1}</div>
                  <div className="text-recuadro text-ink2 mt-1">{r.n2}</div>
                  {r.lv && (
                    <div className="mt-3">
                      <Lvl on={r.lv} label={f(m.trabaja, { niveles: r.lv.join(", ") })} />
                    </div>
                  )}
                </>
              }
            >
              {r.lv ? (
                <ol>
                  {r.items.map(([c, t]) => (
                    <li key={t} className="grid grid-cols-[44px_minmax(0,1fr)] lg:grid-cols-[44px_280px_minmax(0,1fr)] gap-x-0 lg:gap-x-6 gap-y-1.5 py-3.5 border-t border-ink20 first:border-t-0 first:pt-1">
                      <span className="num text-h2">{c}</span>
                      <h3 className="ws text-h3">
                        <Sc text={t} />
                      </h3>
                      <p className="col-start-2 lg:col-start-3 lg:row-start-1 text-recuadro leading-[1.45] text-ink2 max-w-[640px]">
                        <Sc text={idea[Number(c)]} />
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                /* Apertura y cierre usan las columnas de los capítulos: código, título (280 px) y segunda columna donde va la idea */
                <ol className="lg:grid lg:grid-cols-[44px_280px_minmax(0,1fr)] lg:gap-x-6">
                  {r.items.map(([c, t], k) =>
                    k % 2 === 0 ? (
                      <li key={t} className="grid grid-cols-[44px_minmax(0,1fr)] lg:grid-cols-subgrid lg:col-start-1 lg:col-span-2 py-[7px] text-cuerpo leading-[1.3]">
                        <span className="font-mono font-bold text-rotulo text-ink2 pt-[4px]">{c}</span>
                        <span>
                          <Sc text={t} />
                        </span>
                      </li>
                    ) : (
                      <li key={t} className="grid grid-cols-[44px_minmax(0,1fr)] lg:block lg:col-start-3 py-[7px] text-cuerpo leading-[1.3]">
                        <span className="font-mono font-bold text-rotulo text-ink2 pt-[4px] lg:hidden">{c}</span>
                        <span>
                          <Sc text={t} />
                        </span>
                      </li>
                    ),
                  )}
                </ol>
              )}
            </ParteMetodo>
          ))}
        </div>
        <Lectura className="mt-8 lg:mt-10 max-w-[880px]" label={t.comun.lectura} text={<Sc text={t.sitio.lectura} />} />
      </div>
    </section>
  );
}

function Samples({ t }: P) {
  const m = t.libro.muestra;
  return (
    <section className="bg-warm" aria-labelledby="muestra-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="muestra-t"
          className="max-w-[860px]"
          label={m.label}
          title={m.title}
          sub={m.sub}
        />
        <div className="rv-kids grid gap-8 lg:gap-x-10 lg:gap-y-12 md:grid-cols-2 mt-8 lg:mt-12">
          {SAMPLES.map((src, i) => (
            <figure key={src} className="m-0">
              <Image src={src} alt={t.libro.muestras[i]} width={1200} height={880} sizes="(min-width: 1440px) 636px, (min-width: 768px) 46vw, 100vw" className="block w-full h-auto outline outline-1 outline-ink20" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workbook({ t, locale }: P) {
  const w = t.libro.workbook;
  return (
    <section aria-labelledby="wb-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24 grid grid-cols-[minmax(0,1fr)] gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] items-start">
        <div>
          <SecHead
            id="wb-t"
            className="max-w-[640px]"
            label={w.label}
            title={w.title}
            sub={w.sub}
          />
          <ul className="rv-kids mt-8 lg:mt-9 border-b border-ink">
            {t.libro.incluye.map((x, i) => (
              <li key={x.t} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 py-4 border-t border-ink">
                <span className="pt-1">
                  <Icon name={INCL_ICON[i]} size={18} />
                </span>
                <div>
                  <div className="wh3 text-h3">{x.t}</div>
                  {x.d && <p className="text-recuadro leading-[1.45] text-ink2 mt-1.5">{x.d}</p>}
                </div>
              </li>
            ))}
          </ul>
          <LinkArrow href={lh(locale, "/workbook")} className="mt-6 text-cuerpo">
            {w.ver}
          </LinkArrow>
        </div>
        <div className="lg:pt-3 rv">
          <Image
            src="/img/workbook-k1.webp"
            alt={w.imgAlt}
            width={900}
            height={1320}
            sizes="(min-width: 1024px) 420px, 90vw"
            className="block w-full max-w-[420px] h-auto mx-auto outline outline-1 outline-ink20"
          />
        </div>
      </div>
    </section>
  );
}

function Formats({ t }: P) {
  const fo = t.libro.formatos;
  const fmts = [
    { n: fo.ebookN, w: "Amazon", d: fo.ebookD, btn: <AmazonBtn t={t} className="w-full" /> },
    { n: fo.pdfN, w: CHECKOUT_URL ? "Mercado Pago" : "PDF", d: CHECKOUT_URL ? fo.pdfDPago : fo.pdfD, btn: <MercadoPagoBtn t={t} className="w-full" /> },
  ];
  return (
    <section id="formatos" className="bg-warm" aria-labelledby="formatos-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="formatos-t"
          className="max-w-[860px]"
          label={fo.label}
          title={fo.title}
          sub={CHECKOUT_URL ? fo.subPago : fo.subWa}
        />
        <div className="rv-kids grid grid-cols-[minmax(0,1fr)] gap-5 lg:gap-6 md:grid-cols-2 mt-8 lg:mt-12">
          {fmts.map((f) => (
            <div key={f.n} className="card flex flex-col bg-paper p-5 sm:p-6 lg:px-7 lg:pt-7 lg:pb-[30px]">
              <Mono tone="gris">{f.w}</Mono>
              <h3 className="wh2 text-h2 mt-3">{f.n}</h3>
              <p className="text-recuadro leading-[1.45] mt-3 text-ink2">{f.d}</p>
              <div className="mt-auto pt-7">{f.btn}</div>
            </div>
          ))}
        </div>
        <Nota label={t.comun.nota} className="mt-6 lg:mt-8 max-w-[980px]">
          {fo.nota}
        </Nota>
      </div>
    </section>
  );
}

/** Autores, versión corta: las bios completas viven una sola vez, en la portada (/#nosotros). */
function Authors({ t, locale }: P) {
  const a = t.libro.autores;
  return (
    <section className="border-t border-ink" aria-labelledby="autores-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="autores-t" label={a.label} title={a.title} />
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 mt-8 lg:mt-11">
          {FOUNDERS.map((fu) => ({ ...fu, ...t.sitio.founders[fu.key] })).map((fu) => (
            <div key={fu.key} className="rv grid gap-5 grid-cols-[96px_minmax(0,1fr)] lg:grid-cols-[120px_minmax(0,1fr)] items-start">
              <Parallax src={fu.photo} alt={f(t.inicio.nosotros.retrato, { nombre: fu.name })} sizes="120px" className="w-full aspect-[160/196] bg-warm border border-ink" position="center 30%" quieto />
              <div>
                <Mono tone="gris">{fu.role}</Mono>
                <h3 className="wh2 text-h2 mt-2.5">{fu.name}</h3>
                {fu.cred ? <p className="text-cuerpo font-semibold mt-2">{fu.cred}</p> : null}
              </div>
            </div>
          ))}
        </div>
        <LinkArrow href={lh(locale, "/#nosotros")} className="text-cuerpo mt-8 lg:mt-10">
          {a.quienes}
        </LinkArrow>
      </div>
    </section>
  );
}

export default function Libro({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const p = { t, locale };
  return (
    <>
      <JsonLd data={bookLd(t, locale)} />
      <Hero {...p} />
      <Back {...p} />
      <Method {...p} />
      <Samples {...p} />
      <Workbook {...p} />
      <Authors {...p} />
      <Formats {...p} />
      <FinalCta locale={locale} title={t.libro.cierre.title} text={t.libro.cierre.text} />
    </>
  );
}
