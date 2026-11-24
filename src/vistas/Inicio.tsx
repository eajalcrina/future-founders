import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Ladder from "@/components/site/Ladder";
import Parallax from "@/components/site/Parallax";
import CountUp from "@/components/site/CountUp";
import ResenasDiferidas from "@/components/site/ResenasDiferidas";
import FinalCta from "@/components/site/FinalCta";
import BookButtons from "@/components/site/BookButtons";
import { AgendaLink, Arrow, CropMarks, Hero as HeroHead, Jn, JsonLd, LinkArrow, Lvl, Mono, Nota, Sc, Scene, SecHead } from "@/components/site/ui";
import { FOUNDERS, SITE_URL } from "@/content/sitio";
import { RESENAS_PUBLICABLES, TESTIMONIOS } from "@/content/testimonios";
import { dict, type Dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { metaPagina } from "@/i18n/metadatos";
import { lh, type Locale } from "@/i18n/rutas";

/** Número de preguntas del diagnóstico (situación, comprobante, cobertura y colchón). */
const N_PREGUNTAS = 4;

export function metadataInicio(locale: Locale): Metadata {
  const t = dict(locale).inicio.meta;
  return metaPagina("inicio", locale, { title: { absolute: t.titulo }, description: t.descripcion });
}

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];

/** Reseñas: la sección solo aparece cuando src/content/testimonios.ts tiene reseñas reales con permiso. */
const RESENAS = RESENAS_PUBLICABLES(TESTIMONIOS);

/** Lista de recursos y programas para los buscadores y asistentes (datos estructurados de la portada). */
function listaLd(t: Dict, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.inicio.listaLd,
    itemListElement: t.sitio.products.flat().map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}${lh(locale, p.href)}` })),
  };
}

type P = { t: Dict; locale: Locale };

function Hero({ t, locale }: P) {
  const h = t.inicio.hero;
  return (
    <section aria-labelledby="hero-t">
      <div className="wrap pt-9 pb-12 lg:pt-16 lg:pb-[88px]">
        <HeroHead id="hero-t" label={h.label} title={t.sitio.heroTitle} className="max-w-[1312px]" />
        <div className="grid gap-8 lg:gap-[72px] mt-6 lg:mt-12 lg:grid-cols-[minmax(0,600fr)_minmax(0,640fr)] items-start">
          <div>
            <p className="lead">{h.lead}</p>
            <p className="lead mt-3">{h.lead2}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 lg:mt-10">
              <Link href={lh(locale, "/kit")} className="btn">
                <span className="sm:hidden">{h.kitCorto}</span>
                <span className="hidden sm:inline">{h.kitLargo}</span>
              </Link>
              <Link href={lh(locale, "/libro")} className="btn2">
                {h.libro}
              </Link>
            </div>
            <Mono tone="gris" className="mt-3 lg:mt-4">
              <Jn parts={h.datos} />
            </Mono>
          </div>
          <div className="crop rv">
            <Parallax
              src="/img/duo-ajedrez.webp"
              alt={h.imgAlt}
              sizes="(min-width: 1440px) 640px, (min-width: 1024px) 45vw, 100vw"
              preload
              className="w-full aspect-[640/338]"
            >
              <span aria-hidden="true" className="absolute bg-mag" style={{ left: "60.5%", top: "66.95%", width: "3.15%", aspectRatio: "1" }} />
            </Parallax>
            <CropMarks />
          </div>
        </div>
      </div>
    </section>
  );
}

function Method({ t, locale }: P) {
  const m = t.inicio.metodo;
  return (
    <section id="metodo" className="border-t border-ink" aria-labelledby="metodo-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-end lg:gap-16">
          <SecHead
            id="metodo-t"
            className="max-w-[820px]"
            label={m.label}
            title={m.title}
          />
        </div>
        <div className="mt-10 lg:mt-14 border-t border-ink pt-3">
          <Mono>
            <Jn parts={m.marco} />
          </Mono>
          <h3 className="ws text-figura mt-2">{m.h3}</h3>
        </div>
        <div className="mt-6 lg:mt-14">
          <Ladder
            t={t.ladder}
            nivel={t.comun.nivel}
            sitio={{ levels: t.sitio.levels, look: t.sitio.look, signal: t.sitio.signal, chaps: t.sitio.chaps, doNow: t.sitio.doNow, here: t.sitio.here }}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-2 mt-6 lg:mt-8">
          <p className="text-cuerpo text-ink2">{f(m.diag, { n: t.inicio.cuantas[N_PREGUNTAS - 1] })}</p>
          <LinkArrow href={lh(locale, "/diagnostico")} className="text-cuerpo">
            {m.diagLink}
          </LinkArrow>
        </div>
      </div>
    </section>
  );
}

function ArchCard({ a, t, locale }: P & { a: Dict["sitio"]["arch"][number] }) {
  const q = t.inicio.quien;
  return (
    <article className="bg-sage p-5 lg:p-6 flex flex-col h-full">
      <div className="flex gap-4 lg:gap-5 items-start">
        <Scene who={a.who} className="shrink-0 w-[104px] xl:w-[132px]" />
        <div className="min-w-0 flex-1">
          <Mono tone="salvia">{a.tag}</Mono>
          <div className="flex justify-between items-baseline gap-3 mt-2">
            <h3 className="wh2 text-h2">{a.name}</h3>
            <Lvl on={Array.from({ length: a.level + 1 }, (_, i) => i)} label={f(q.nivelPartida, { k: a.level })} />
          </div>
          <p className="text-recuadro leading-[1.4] mt-2 text-ink2">{a.role}</p>
        </div>
      </div>
      <dl className="mt-5">
        {a.rows.map(([l, v], i) => {
          // Runway y nivel de partida (las dos últimas filas de la ficha) van en negrita.
          const fuerte = i >= a.rows.length - 2;
          return (
            <div
              key={l}
              className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 py-[7px]"
              style={{ borderTop: `var(--filete-fino) solid ${i === 0 ? "var(--color-saged)" : "var(--color-ink20)"}` }}
            >
              <dt className="wm text-saged" style={{ letterSpacing: "0.05em" }}>
                {l}
              </dt>
              <dd className={`text-recuadro leading-[1.35] m-0 ${fuerte ? "font-bold" : ""}`}>
                <Sc text={v} />
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="filete-sup salvia text-recuadro leading-[1.45] text-ink2 mt-1">
        <Sc text={a.voice} />
      </p>
      <div className="mt-auto pt-5">
        <Mono tone="salvia">{q.empiezaPor}</Mono>
        <LinkArrow href={lh(locale, a.href)} className="text-cuerpo mt-1.5 leading-[1.3]">
          {a.start}
        </LinkArrow>
      </div>
    </article>
  );
}

function Who({ t, locale }: P) {
  const q = t.inicio.quien;
  return (
    <section id="para-quien" className="border-t border-ink" aria-labelledby="quien-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="quien-t"
          className="max-w-[980px]"
          label={q.label}
          title={q.title}
          sub={q.sub}
        />
        <div className="rv-kids grid gap-4 lg:gap-6 md:grid-cols-2 2xl:grid-cols-4 mt-8 lg:mt-14">
          {t.sitio.arch.map((a) => (
            <ArchCard key={a.who} a={a} t={t} locale={locale} />
          ))}
        </div>
        <Nota label={t.comun.nota} className="mt-5 lg:mt-6 max-w-[880px]">
          {t.sitio.archNote}
        </Nota>
      </div>
    </section>
  );
}

function Book({ t, locale }: P) {
  const b = t.inicio.libro;
  return (
    <section className="bg-ink text-paper on-ink" aria-labelledby="libro-t">
      <div className="wrap py-14 lg:py-[88px] grid gap-8 lg:gap-[112px] lg:grid-cols-[260px_minmax(0,1fr)] items-start lg:items-center">
        <div className="hidden lg:block rv">
          <Image src="/img/doble-agente-portada.webp" alt={b.portadaAlt} width={260} height={381} sizes="260px" className="block w-[260px] h-auto" />
        </div>
        <div>
          <SecHead
            id="libro-t"
            dark
            label={b.label}
            title={b.title}
          />
          <Image
            src="/img/doble-agente-portada.webp"
            alt={b.portadaAlt}
            width={160}
            height={235}
            sizes="160px"
            className="lg:hidden block w-[160px] h-auto mt-6"
          />
          <p className="lead mt-5 lg:mt-6 max-w-[700px]">{b.lead}</p>
          <div className="mt-8 lg:mt-10">
            <BookButtons t={t} />
          </div>
          <Link href={lh(locale, "/libro#metodo")} className="group flecha font-bold text-cuerpo inline-block mt-6 lg:mt-7">
            <span className="lnk">{b.metodo}</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Programas por nivel: una fila por nivel, con su casilla a la izquierda (como /programas) y sus recursos a la derecha. El detalle vive en /programas. */
function Products({ t, locale }: P) {
  const pr = t.inicio.programas;
  return (
    <section id="programas" className="border-t border-ink" aria-labelledby="prod-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="prod-t" className="max-w-[900px]" label={pr.label} title={pr.title} />
        <ol className="mt-8 lg:mt-12 border-b border-ink">
          {t.sitio.with.map((items, k) => (
            <li key={k} className="rv grid lg:grid-cols-[280px_minmax(0,1fr)] border-t border-ink">
              <div
                className="px-5 py-4 lg:px-6 lg:py-5 flex lg:flex-col justify-between gap-3"
                style={{ background: FILL[k], color: k === 3 ? "var(--color-paper)" : undefined }}
              >
                <div>
                  <Mono tone={k === 3 ? "claro" : "gris"} as="span">
                    {f(t.comun.nivel, { k })}
                  </Mono>
                  <div className="wh2 text-figura mt-1">{t.sitio.levels[k]}</div>
                </div>
                <Lvl
                  on={Array.from({ length: k + 1 }, (_, i) => i)}
                  fg={k === 3 ? "var(--color-paper)" : "var(--color-ink)"}
                  off={k === 3 ? "var(--color-ink20)" : "var(--color-ink3)"}
                />
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 px-5 lg:px-8 py-2 lg:py-3 content-center">
                {items.map((w) => (
                  <li key={w.name}>
                    <Link href={lh(locale, w.href)} className="group flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-baseline sm:gap-4 py-3">
                      <span className="text-cuerpo font-bold leading-[1.3]">
                        <span className="lnk">{w.name}</span>
                      </span>
                      <Mono tone="gris" as="span" className="sm:text-right sm:shrink-0">
                        {w.meta}
                      </Mono>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-3 mt-6 lg:mt-8">
          <LinkArrow href={lh(locale, "/programas")} className="text-cuerpo">
            {pr.ver}
          </LinkArrow>
          <p className="text-cuerpo text-ink2 flex flex-wrap items-baseline gap-x-2">
            <span>{pr.dudas}</span>
            <AgendaLink c={t.comun} className="text-ink" />
          </p>
        </div>
      </div>
    </section>
  );
}

function Founders({ t }: P) {
  const n = t.inicio.nosotros;
  return (
    <section id="nosotros" className="border-t border-ink" aria-labelledby="nos-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="nos-t" className="max-w-[900px]" label={n.label} title={n.title} />
        {/* Filas compartidas (subgrid): cargo, nombre y enlaces arrancan a la misma altura en las dos columnas.
            La credencial va dentro del bloque de la bio, para que la bio quede pegada al nombre aunque solo una ficha la traiga. */}
        <div className="grid gap-y-10 lg:gap-x-16 lg:gap-y-0 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_1fr] mt-8 lg:mt-14">
          {FOUNDERS.map((fu) => ({ ...fu, ...t.sitio.founders[fu.key] })).map((fu) => (
            <article
              key={fu.key}
              className="rv grid sm:gap-x-8 sm:grid-cols-[200px_minmax(0,1fr)] sm:grid-rows-[auto_auto_auto_1fr] lg:row-span-4 lg:grid-rows-subgrid xl:grid-cols-[240px_minmax(0,1fr)]"
            >
              <Parallax
                src={fu.photo}
                alt={f(n.retrato, { nombre: fu.name })}
                sizes="(min-width: 1280px) 240px, (min-width: 640px) 200px, 180px"
                className="w-[180px] sm:w-full aspect-[240/296] bg-warm border border-ink sm:row-span-4 self-start"
                position="center 30%"
                quieto
              />
              <Mono tone="gris" className="mt-4 sm:mt-0">
                {fu.role}
              </Mono>
              <h3 className="wh2 text-h2 mt-2 lg:mt-3">{fu.name}</h3>
              <div>
                {fu.cred ? <p className="text-cuerpo font-semibold mt-2.5 lg:mt-3">{fu.cred}</p> : null}
                <p className="wt mt-2.5 lg:mt-3">
                  <Sc text={fu.bio} />
                </p>
              </div>
              <p className="self-end pt-3 lg:pt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a href={fu.webUrl} target="_blank" rel="noopener noreferrer" className="wm ul inline-flex items-end min-h-6">
                  {fu.web}
                  <span className="sr-only">{t.comun.nuevaPestana}</span>
                </a>
                <a href={fu.linkedin} target="_blank" rel="noopener noreferrer" className="wm ul inline-flex items-end min-h-6">
                  {n.linkedin}
                  <span className="sr-only">{f(n.linkedinSr, { nombre: fu.name })}</span>
                </a>
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

/** Cifras de la casa, a un scroll del titular: franja con filete arriba y abajo, sin titular grande. */
function Stats({ t, locale }: P) {
  return (
    <section className="border-t border-ink" aria-labelledby="cifras-t">
      <div className="wrap pt-8 pb-10 lg:pt-12 lg:pb-14">
        <Mono as="p">
          <span id="cifras-t">{t.inicio.cifras}</span>
        </Mono>
        <dl className="rv-kids grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 lg:gap-8 mt-5 lg:mt-6">
          {t.sitio.stats.map((s) => (
            <div key={s.label} className="border-t border-ink pt-3 lg:pt-4 flex flex-col-reverse justify-end">
              <dt className="text-cuerpo mt-2 lg:mt-3 text-ink2">{s.label}</dt>
              <dd className="num text-kpi lg:text-display-lg m-0 whitespace-nowrap">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>
        <Nota label={t.comun.nota} className="mt-6 lg:mt-8 max-w-[880px]">
          {t.sitio.cifrasNota}
        </Nota>
      </div>
    </section>
  );
}

/** Reseñas reales de participantes. Oculta mientras TESTIMONIOS esté vacío. Al activarla va entre Nosotros y el cierre; el carrusel se carga diferido. */
function Reviews({ t }: P) {
  if (RESENAS.length === 0) return null;
  return (
    <section className="bg-warm" aria-labelledby="resenas-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="resenas-t" label={t.inicio.resenas.label} title={t.inicio.resenas.title} />
        <div className="mt-8 lg:mt-12">
          <ResenasDiferidas items={RESENAS} t={t.resenas} />
        </div>
      </div>
    </section>
  );
}

export default function Inicio({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const p = { t, locale };
  return (
    <>
      <JsonLd data={listaLd(t, locale)} />
      <Hero {...p} />
      <Stats {...p} />
      <Method {...p} />
      <Who {...p} />
      <Book {...p} />
      <Products {...p} />
      <Founders {...p} />
      <Reviews {...p} />
      <FinalCta locale={locale} />
    </>
  );
}
