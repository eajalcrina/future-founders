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
import { ARCH, ARCH_NOTE, CIFRAS_NOTA, FOUNDERS, HERO_TITLE, LEVELS, PRODUCTS, SITE_URL, STATS, WITH } from "@/content/sitio";
import { QS } from "@/lib/diagnostico";
import { RESENAS_PUBLICABLES, TESTIMONIOS } from "@/content/testimonios";

export const metadata: Metadata = {
  title: { absolute: "Future Founders | Tu experiencia puede trabajar para más de una empresa" },
  description:
    "Método por niveles para ejecutivos senior de Latinoamérica: fraccionas tu trabajo en roles parciales, uno a uno, hasta que tus ingresos propios cubren tu costo de vida.",
  alternates: { canonical: "/" },
};

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];
const CUANTAS = ["una", "dos", "tres", "cuatro", "cinco"][QS.length - 1];

/** Reseñas: la sección solo aparece cuando src/content/testimonios.ts tiene reseñas reales con permiso. */
const RESENAS = RESENAS_PUBLICABLES(TESTIMONIOS);

/** Lista de recursos y programas para los buscadores y asistentes (datos estructurados de la portada). */
const LISTA_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Recursos y programas de Future Founders por nivel",
  itemListElement: PRODUCTS.flat().map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}${p.href}` })),
};

function Hero() {
  return (
    <section aria-labelledby="hero-t">
      <div className="wrap pt-9 pb-12 lg:pt-16 lg:pb-[88px]">
        <HeroHead id="hero-t" label={["Para ejecutivos senior en Latinoamérica", "Método por niveles"]} title={HERO_TITLE} className="max-w-[1312px]" />
        <div className="grid gap-8 lg:gap-[72px] mt-6 lg:mt-12 lg:grid-cols-[minmax(0,600fr)_minmax(0,640fr)] items-start">
          <div>
            <p className="lead">
              Future Founders acompaña a gerentes, directores y VP a fraccionar su trabajo en roles parciales, uno a uno, hasta que sus ingresos propios cubren su costo de vida.
            </p>
            <p className="lead mt-3">Avanzas con tu cargo a la vista y sin apostar tu estabilidad a un solo salto.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 lg:mt-10">
              <Link href="/kit" className="btn">
                <span className="sm:hidden">Descarga el kit gratis</span>
                <span className="hidden sm:inline">Descarga el kit «Plan de salida»</span>
              </Link>
              <Link href="/libro" className="btn2">
                Conoce el libro
              </Link>
            </div>
            <Mono tone="gris" className="mt-3 lg:mt-4">
              <Jn parts={["Kit gratuito", "Cinco plantillas", "Unas 2 horas"]} />
            </Mono>
          </div>
          <div className="crop rv">
            <Parallax
              src="/img/duo-ajedrez.webp"
              alt="Ilustración en duotono: una mano sobre una pieza de ajedrez, tu cargo y tu plan propio en el mismo tablero"
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

function Method() {
  return (
    <section id="metodo" className="border-t border-ink" aria-labelledby="metodo-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-end lg:gap-16">
          <SecHead
            id="metodo-t"
            className="max-w-[820px]"
            label={["El método"]}
            title="Subes de nivel cuando aparece una señal en tu estado de cuenta"
            sub="Son cuatro niveles, de un sueldo a varios ingresos propios. Elige el peldaño que describe tu situación y mira qué te toca hacer ahora."
          />
        </div>
        <div className="mt-10 lg:mt-14 border-t border-ink pt-3">
          <Mono>
            <Jn parts={["Marco 0.1", "La escalera"]} />
          </Mono>
          <h3 className="ws text-figura mt-2">Diecisiete de los 21 capítulos preparan tu primer cliente</h3>
        </div>
        <div className="mt-6 lg:mt-14">
          <Ladder />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-2 mt-6 lg:mt-8">
          <p className="text-cuerpo text-ink2">El diagnóstico de nivel te ubica con tus números en {CUANTAS} preguntas.</p>
          <LinkArrow href="/diagnostico" className="text-cuerpo">
            Hacer el diagnóstico de nivel
          </LinkArrow>
        </div>
      </div>
    </section>
  );
}

function ArchCard({ a }: { a: (typeof ARCH)[number] }) {
  return (
    <article className="bg-sage p-5 lg:p-6 flex flex-col h-full">
      <div className="flex gap-4 lg:gap-5 items-start">
        <Scene who={a.who} className="shrink-0 w-[104px] xl:w-[132px]" />
        <div className="min-w-0 flex-1">
          <Mono tone="salvia">{a.tag}</Mono>
          <div className="flex justify-between items-baseline gap-3 mt-2">
            <h3 className="wh2 text-h2">{a.name}</h3>
            <Lvl on={Array.from({ length: a.level + 1 }, (_, i) => i)} label={`Nivel de partida: ${a.level}`} />
          </div>
          <p className="text-recuadro leading-[1.4] mt-2 text-ink2">{a.role}</p>
        </div>
      </div>
      <dl className="mt-5">
        {a.rows.map(([l, v], i) => {
          const fuerte = l === "Runway" || l === "Nivel de partida";
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
        <Mono tone="salvia">Empieza por</Mono>
        <LinkArrow href={a.href} className="text-cuerpo mt-1.5 leading-[1.3]">
          {a.start}
        </LinkArrow>
      </div>
    </article>
  );
}

function Who() {
  return (
    <section id="para-quien" className="border-t border-ink" aria-labelledby="quien-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="quien-t"
          className="max-w-[980px]"
          label={["Para quién es"]}
          title="Tu punto de partida decide tu primera plantilla"
          sub={
            <>
              <span className="block">Para gerentes, directores y VP de 38 a 55 años, con 12 a 25 años de carrera en empresas grandes de Latinoamérica.</span>
              <span className="block mt-2">El libro sigue a cuatro arquetipos. Busca el que se parece a tu situación.</span>
            </>
          }
        />
        <div className="rv-kids grid gap-4 lg:gap-6 md:grid-cols-2 2xl:grid-cols-4 mt-8 lg:mt-14">
          {ARCH.map((a) => (
            <ArchCard key={a.who} a={a} />
          ))}
        </div>
        <Nota className="mt-5 lg:mt-6 max-w-[880px]">{ARCH_NOTE}</Nota>
      </div>
    </section>
  );
}

function Book() {
  return (
    <section className="bg-ink text-paper on-ink" aria-labelledby="libro-t">
      <div className="wrap py-14 lg:py-[88px] grid gap-8 lg:gap-[112px] lg:grid-cols-[260px_minmax(0,1fr)] items-start lg:items-center">
        <div className="hidden lg:block rv">
          <Image src="/img/doble-agente-portada.webp" alt="Portada de Doble Agente, libro y workbook, 2.ª edición" width={260} height={381} sizes="260px" className="block w-[260px] h-auto" />
        </div>
        <div>
          <SecHead
            id="libro-t"
            dark
            label={["El libro", "Eddie Ajalcriña y Lorenzo Ortiz"]}
            title="Doble Agente te lleva de tu primer rol parcial a la independencia"
          />
          <Image
            src="/img/doble-agente-portada.webp"
            alt="Portada de Doble Agente, libro y workbook, 2.ª edición"
            width={160}
            height={235}
            sizes="160px"
            className="lg:hidden block w-[160px] h-auto mt-6"
          />
          <p className="lead mt-5 lg:mt-6 max-w-[700px]">Son 21 capítulos en cinco partes, con una plantilla del workbook por capítulo.</p>
          <div className="mt-8 lg:mt-10">
            <BookButtons />
          </div>
          <Link href="/libro#metodo" className="group flecha font-bold text-cuerpo inline-block mt-6 lg:mt-7">
            <span className="lnk">Ver el método en 21 ideas</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Programas por nivel: una fila por nivel, con su casilla a la izquierda (como /programas) y sus recursos a la derecha. El detalle vive en /programas. */
function Products() {
  return (
    <section id="programas" className="border-t border-ink" aria-labelledby="prod-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="prod-t" className="max-w-[900px]" label={["Programas", "Ordenados por nivel"]} title="Cada nivel tiene su programa y empiezas gratis" />
        <ol className="mt-8 lg:mt-12 border-b border-ink">
          {WITH.map((items, k) => (
            <li key={k} className="rv grid lg:grid-cols-[280px_minmax(0,1fr)] border-t border-ink">
              <div
                className="px-5 py-4 lg:px-6 lg:py-5 flex lg:flex-col justify-between gap-3"
                style={{ background: FILL[k], color: k === 3 ? "var(--color-paper)" : undefined }}
              >
                <div>
                  <Mono tone={k === 3 ? "claro" : "gris"} as="span">
                    Nivel {k}
                  </Mono>
                  <div className="wh2 text-figura mt-1">{LEVELS[k]}</div>
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
                    <Link href={w.href} className="group flex justify-between items-baseline gap-4 py-3">
                      <span className="text-cuerpo font-bold leading-[1.3]">
                        <span className="lnk">{w.name}</span>
                      </span>
                      <Mono tone="gris" as="span" className="text-right shrink-0">
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
          <LinkArrow href="/programas" className="text-cuerpo">
            Ver los programas y postular
          </LinkArrow>
          <p className="text-cuerpo text-ink2 flex flex-wrap items-baseline gap-x-2">
            <span>Si dudas por dónde empezar,</span>
            <AgendaLink className="text-ink" />
          </p>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section id="nosotros" className="border-t border-ink" aria-labelledby="nos-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="nos-t" className="max-w-[900px]" label={["Nosotros", "Autores del libro"]} title="Eddie y Lorenzo escribieron el libro y dirigen los programas" />
        {/* Filas compartidas (subgrid): cargo, nombre, credencial, bio y enlaces arrancan a la misma altura en las dos columnas,
            aunque solo una bio traiga credencial. */}
        <div className="grid gap-y-10 lg:gap-x-16 lg:gap-y-0 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_auto_1fr] mt-8 lg:mt-14">
          {FOUNDERS.map((f) => (
            <article
              key={f.key}
              className="rv grid sm:gap-x-8 sm:grid-cols-[200px_minmax(0,1fr)] sm:grid-rows-[auto_auto_auto_auto_1fr] lg:row-span-5 lg:grid-rows-subgrid xl:grid-cols-[240px_minmax(0,1fr)]"
            >
              <Parallax
                src={f.photo}
                alt={`Retrato de ${f.name} en duotono`}
                sizes="(min-width: 1280px) 240px, (min-width: 640px) 200px, 180px"
                className="w-[180px] sm:w-full aspect-[240/296] bg-warm border border-ink sm:row-span-5 self-start"
                position="center 30%"
              />
              <Mono tone="gris" className="mt-4 sm:mt-0">
                {f.role}
              </Mono>
              <h3 className="wh2 text-h2 mt-2 lg:mt-3">{f.name}</h3>
              <div className={f.cred ? "text-cuerpo font-semibold mt-2" : ""}>{f.cred}</div>
              <p className="wt mt-2.5 lg:mt-3">
                <Sc text={f.bio} />
              </p>
              <p className="self-end pt-3 lg:pt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a href={f.webUrl} target="_blank" rel="noopener noreferrer" className="wm ul inline-flex items-end min-h-6">
                  {f.web}
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="wm ul inline-flex items-end min-h-6">
                  LinkedIn
                  <span className="sr-only"> de {f.name} (se abre en otra pestaña)</span>
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
function Stats() {
  return (
    <section className="border-t border-ink" aria-labelledby="cifras-t">
      <div className="wrap pt-8 pb-10 lg:pt-12 lg:pb-14">
        <Mono as="p">
          <span id="cifras-t">Future Founders en cifras</span>
        </Mono>
        <dl className="rv-kids grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 lg:gap-8 mt-5 lg:mt-6">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-ink pt-3 lg:pt-4 flex flex-col-reverse justify-end">
              <dt className="text-cuerpo mt-2 lg:mt-3 text-ink2">{s.label}</dt>
              <dd className="num text-kpi lg:text-display-lg m-0 whitespace-nowrap">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        <Nota className="mt-6 lg:mt-8 max-w-[880px]">{CIFRAS_NOTA}</Nota>
      </div>
    </section>
  );
}

/** Reseñas reales de participantes. Oculta mientras TESTIMONIOS esté vacío. Al activarla va entre Nosotros y el cierre; el carrusel se carga diferido. */
function Reviews() {
  if (RESENAS.length === 0) return null;
  return (
    <section className="bg-warm" aria-labelledby="resenas-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="resenas-t" label={["Reseñas"]} title="Lo que cuentan quienes ya pasaron por los programas" />
        <div className="mt-8 lg:mt-12">
          <ResenasDiferidas items={RESENAS} />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={LISTA_LD} />
      <Hero />
      <Stats />
      <Method />
      <Who />
      <Book />
      <Products />
      <Founders />
      <Reviews />
      <FinalCta />
    </>
  );
}
