import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Ladder from "@/components/site/Ladder";
import Parallax from "@/components/site/Parallax";
import CountUp from "@/components/site/CountUp";
import Testimonials from "@/components/site/Testimonials";
import FinalCta from "@/components/site/FinalCta";
import BookButtons from "@/components/site/BookButtons";
import { Arrow, CropMarks, Hero as HeroHead, Jn, JsonLd, Lectura, LinkArrow, Lvl, Mono, Nota, Sc, Scene, SecHead } from "@/components/site/ui";
import { ARCH, ARCH_NOTE, FOUNDERS, HERO_TITLE, LEARN, LECTURA, LEVELS, PRODUCTS, SITE_URL, STATS } from "@/content/sitio";
import { TESTIMONIOS } from "@/content/testimonios";

export const metadata: Metadata = {
  title: { absolute: "Future Founders | Tu experiencia puede trabajar para más de una empresa" },
  description:
    "Método por niveles para ejecutivos senior de Latinoamérica: fraccionas tu trabajo en roles parciales, uno a uno, hasta que tus ingresos propios cubren tu costo de vida.",
  alternates: { canonical: "/" },
};

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];
const TXT = ["var(--color-ink)", "var(--color-ink)", "var(--color-ink)", "var(--color-paper)"];

/** Reseñas: la sección solo aparece cuando hay reseñas reales (ejemplo: false) en src/content/testimonios.ts. */
const RESENAS = TESTIMONIOS.filter((t) => !t.ejemplo);

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
              alt="Ilustración en duotono: una mano sobre una pieza de ajedrez, los dos roles a la vista"
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
    <section id="metodo" className="border-t border-ink scroll-mt-4" aria-labelledby="metodo-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-end lg:gap-16">
          <SecHead
            id="metodo-t"
            className="max-w-[820px]"
            label={["El método", "La escalera"]}
            title="Subes de nivel cuando aparece una señal en tu estado de cuenta"
            sub="Son cuatro niveles, de un sueldo a varios ingresos propios. Elige el peldaño que describe tu situación y mira qué te toca hacer ahora."
          />
          <Lectura text={LECTURA} className="hidden lg:block w-[400px] shrink-0 rv" />
        </div>
        <div className="mt-10 lg:mt-14 border-t border-ink pt-3">
          <Mono>
            <Jn parts={["Marco 0.1", "La escalera"]} />
          </Mono>
          <h3 className="ws text-figura mt-2">Diecisiete de los 21 capítulos preparan tu primer cliente</h3>
          <p className="text-recuadro text-ink3 mt-1">Los cuatro niveles, la ruta de los capítulos del libro y dónde empieza cada arquetipo</p>
        </div>
        <div className="mt-6 lg:mt-14">
          <Ladder />
        </div>
        <Lectura text={LECTURA} className="lg:hidden mt-5" />
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-2 mt-6 lg:mt-8">
          <p className="text-cuerpo text-ink2">El diagnóstico de nivel te ubica con tus números en cinco preguntas.</p>
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
    <section id="para-quien" className="border-t border-ink scroll-mt-4" aria-labelledby="quien-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="quien-t"
          className="max-w-[980px]"
          label={["Para quién es"]}
          title="Tu punto de partida decide tu primera plantilla"
          sub="Para gerentes, directores y VP de 38 a 55 años, con 12 a 25 años de carrera en empresas grandes de Latinoamérica. El libro sigue a cuatro arquetipos: busca el que se parece a tu situación."
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
      <div className="wrap py-14 lg:py-[88px] grid gap-8 lg:gap-[112px] lg:grid-cols-[360px_minmax(0,1fr)] items-start">
        <div className="hidden lg:block rv">
          <Image src="/img/doble-agente-portada.webp" alt="Portada del libro Doble Agente" width={360} height={528} sizes="360px" className="block w-[360px] h-auto" />
          <Mono tone="claro" className="mt-4">
            <Jn parts={["Libro y workbook", "2.ª edición"]} />
          </Mono>
        </div>
        <div>
          <SecHead
            id="libro-t"
            dark
            label={["El libro", "Eddie Ajalcriña y Lorenzo Ortiz"]}
            title="Doble Agente te lleva de tu primer rol parcial a la independencia"
          />
          <div className="lg:hidden flex gap-4 mt-6 items-end">
            <Image src="/img/doble-agente-portada.webp" alt="Portada del libro Doble Agente" width={160} height={235} sizes="160px" className="block w-[160px] h-auto" />
            <Mono tone="claro">
              <Jn parts={["Libro y workbook", "2.ª edición"]} />
            </Mono>
          </div>
          <p className="lead mt-5 lg:mt-6 max-w-[700px]">
            Son 21 capítulos en cinco partes, con un workbook para hacer cada paso. Cuatro ejecutivos de Lima, Bogotá, Ciudad de México y Santiago recorren el método con
            números que puedes revisar.
          </p>
          <Mono tone="claro" className="mt-8 lg:mt-10 mb-1">
            Qué aprendes
          </Mono>
          <ol className="border-b border-ink3">
            {LEARN.map((t, i) => (
              <li key={i} className="grid grid-cols-[36px_minmax(0,1fr)] lg:grid-cols-[48px_minmax(0,1fr)] py-3 lg:py-3.5 border-t border-ink3">
                <span className="font-mono font-bold text-rotulo text-paper pt-[3px]">0{i + 1}</span>
                <span className="text-cuerpo leading-[1.4]">
                  <Sc text={t} />
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8 lg:mt-10">
            <BookButtons variant="ink" />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-3 mt-4 lg:mt-5">
            <Mono tone="claro">
              <Jn parts={["Ebook e impreso en Amazon", "PDF en compra directa"]} />
            </Mono>
            <Link href="/libro#indice" className="group flecha font-bold text-cuerpo self-start">
              <span className="lnk">Ver el índice y páginas de muestra</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="programas" className="border-t border-ink" aria-labelledby="prod-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="prod-t"
          className="max-w-[900px]"
          label={["Programas", "Ordenados por nivel"]}
          title="Empiezas gratis y avanzas cuando aparece la señal de tu nivel"
          sub="Cada recurso y cada programa corresponde a un nivel de la escalera. Las fechas, los cupos y las condiciones se publican con cada convocatoria."
        />
        <div className="rv-kids grid gap-5 md:grid-cols-2 xl:grid-cols-4 mt-8 lg:mt-14 items-start">
          {PRODUCTS.map((col, k) => (
            <div key={k}>
              <div className="border border-ink px-[18px] pt-3.5 pb-4" style={{ background: FILL[k], color: TXT[k] }}>
                <div className="flex justify-between items-center">
                  <Mono tone={k === 3 ? "claro" : "gris"}>Nivel {k}</Mono>
                  <Lvl
                    on={Array.from({ length: k + 1 }, (_, i) => i)}
                    fg={k === 3 ? "var(--color-paper)" : "var(--color-ink)"}
                    off={k === 3 ? "var(--color-ink20)" : "var(--color-ink3)"}
                  />
                </div>
                <h3 className="wh2 text-figura mt-1.5 whitespace-nowrap">{LEVELS[k]}</h3>
              </div>
              <ul className="flex flex-col gap-3.5 mt-3.5">
                {col.map((p) => (
                  <li key={p.name}>
                    <Link href={p.href} className="card group flex flex-col bg-paper px-5 pt-5 pb-[18px] h-full">
                      <Mono tone={p.tag === "Gratis" ? "ink" : "gris"}>{p.tag}</Mono>
                      <span className="ws block text-figura mt-2.5">{p.name}</span>
                      <span className="block text-recuadro leading-[1.45] mt-2.5 text-ink2">{p.desc}</span>
                      <Mono tone="gris" as="span" className="block mt-3.5">
                        {p.meta}
                      </Mono>
                      <span className="flecha mt-auto pt-3.5 text-recuadro font-bold">
                        <span className="lnk">{p.cta}</span>
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-recuadro text-ink2 mt-7">
          Si dudas por dónde empezar, agenda 30 minutos con el equipo desde la página de{" "}
          <Link href="/programas#postular" className="ul font-semibold">
            programas
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section id="nosotros" className="border-t border-ink scroll-mt-4" aria-labelledby="nos-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="nos-t" className="max-w-[900px]" label={["Nosotros", "Autores del libro"]} title="Eddie y Lorenzo escribieron el libro y dirigen los programas" />
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 mt-8 lg:mt-14">
          {FOUNDERS.map((f) => (
            <article key={f.key} className="rv grid gap-4 sm:gap-8 sm:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
              <Parallax
                src={f.photo}
                alt={`Retrato de ${f.name} en duotono`}
                sizes="(min-width: 1280px) 240px, (min-width: 640px) 200px, 100vw"
                className="w-full aspect-square sm:aspect-[240/296] bg-warm border border-ink"
                position="center 30%"
              />
              <div>
                <Mono tone="gris">{f.role}</Mono>
                <h3 className="wh2 text-h2 mt-2 lg:mt-3">{f.name}</h3>
                <div className="text-cuerpo font-semibold mt-2">{f.cred}</div>
                <p className="wt mt-2.5 lg:mt-3">{f.bio}</p>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="wm ul inline-block mt-3 lg:mt-4">
                  {f.li}
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 lg:mt-20" aria-labelledby="cifras-t">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-1">
            <h3 id="cifras-t" className="ws text-figura">
              Future Founders en cifras
            </h3>
            <p className="text-recuadro text-ink3">Cifras que Future Founders publica hoy en futurefounders.pe</p>
          </div>
          <dl className="rv-kids grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 lg:gap-8 mt-5 lg:mt-7">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-ink pt-3 lg:pt-4 flex flex-col-reverse justify-end">
                <dt className="text-cuerpo mt-2 lg:mt-3 text-ink2">{s.label}</dt>
                <dd className="num text-kpi lg:text-display-lg m-0 whitespace-nowrap">
                  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Reseñas reales de participantes. Oculta mientras testimonios.ts solo tenga reseñas de ejemplo. */
function Reviews() {
  if (RESENAS.length === 0) return null;
  return (
    <section className="bg-warm" aria-labelledby="resenas-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="resenas-t" label={["Reseñas"]} title="Lo que cuentan quienes ya pasaron por los programas" />
        <div className="mt-8 lg:mt-12">
          <Testimonials items={RESENAS} />
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
