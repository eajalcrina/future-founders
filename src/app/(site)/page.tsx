import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Ladder from "@/components/site/Ladder";
import Parallax from "@/components/site/Parallax";
import CountUp from "@/components/site/CountUp";
import Testimonials from "@/components/site/Testimonials";
import FinalCta from "@/components/site/FinalCta";
import BookButtons from "@/components/site/BookButtons";
import { Arrow, CropMarks, Jn, Lectura, Lines, Lvl, Mono, Nota, Sc, Scene, SecHead } from "@/components/site/ui";
import { ARCH, ARCH_NOTE, FOUNDERS, LEARN, LECTURA, LEVELS, PRODUCTS, STATS } from "@/content/sitio";
import { TESTIMONIOS } from "@/content/testimonios";

export const metadata: Metadata = {
  title: { absolute: "Future Founders | Tu experiencia puede trabajar para más de una empresa" },
  description:
    "Método por niveles para ejecutivos senior de Latinoamérica: fraccionas tu trabajo en roles parciales, uno a uno, hasta que tus ingresos propios cubren tu costo de vida.",
  alternates: { canonical: "/" },
};

const FILL = ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)", "var(--color-ink)"];
const TXT = ["var(--color-ink)", "var(--color-ink)", "var(--color-ink)", "var(--color-paper)"];

function Hero() {
  return (
    <section className="grain" aria-labelledby="hero-t">
      <div className="wrap pt-9 pb-11 lg:pt-16 lg:pb-[88px]">
        <Mono color="var(--color-magt)">
          <span className="lg:hidden">Para ejecutivos senior en Latinoamérica</span>
          <span className="hidden lg:inline">
            <Jn parts={["Para ejecutivos senior en Latinoamérica", "Método por niveles"]} />
          </span>
        </Mono>
        <h1 id="hero-t" className="wh lines mt-4 lg:mt-[22px] max-w-[1312px] text-[50px] leading-[0.9] sm:text-[72px] lg:text-[104px] lg:leading-[0.88]">
          <Lines text={"Tu experiencia puede trabajar para más de una empresa. O para la tuya."} />
        </h1>
        <div className="grid gap-8 lg:gap-[72px] mt-5 lg:mt-11 lg:grid-cols-[minmax(0,600fr)_minmax(0,640fr)] items-start">
          <div>
            <p className="wt" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.5 }}>
              Future Founders acompaña a gerentes, directores y VP a fraccionar su trabajo en roles parciales, uno a uno, hasta que sus ingresos propios cubren su
              costo de vida. Avanzas con tu cargo a la vista y sin apostar tu estabilidad a un solo salto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 lg:mt-10">
              <Link href="/kit" className="btn">
                <span className="sm:hidden">Descarga el kit gratis</span>
                <span className="hidden sm:inline">Descarga el kit «Plan de salida»</span>
                <Arrow />
              </Link>
              <Link href="/libro" className="btn2">
                Conoce el libro
              </Link>
            </div>
            <Mono className="text-ink2 mt-3 lg:mt-4 text-center sm:text-left">
              <span className="sm:hidden">
                <Jn parts={["Cinco plantillas", "Unas 2 horas"]} />
              </span>
              <span className="hidden sm:inline">
                <Jn parts={["Kit gratuito", "Cinco plantillas", "Unas 2 horas"]} />
              </span>
            </Mono>
          </div>
          <figure className="m-0 rv">
            <div className="crop">
              <Parallax
                src="/img/duo-ajedrez.webp"
                alt="Ilustración en duotono: una mano sobre una pieza de ajedrez"
                sizes="(min-width: 1440px) 640px, (min-width: 1024px) 45vw, 100vw"
                preload
                className="w-full aspect-[640/338]"
              >
                <span aria-hidden="true" className="absolute bg-mag" style={{ left: "60.5%", top: "66.95%", width: "3.15%", aspectRatio: "1" }} />
              </Parallax>
              <CropMarks />
            </div>
            <figcaption className="mt-3 lg:mt-4 pt-2.5 lg:pt-3 border-t border-ink grid gap-1.5 lg:gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
              <div className="wm">Dos roles a la vista</div>
              <p className="text-[15px] lg:text-[16px] leading-[1.45] text-ink2">
                Tu cargo actual, que cumples bien, y el plan propio que construyes en paralelo, sin usar nada de tu empleador.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="metodo" className="border-t border-ink grid-paper scroll-mt-4" aria-labelledby="metodo-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-start lg:gap-16">
          <SecHead
            id="metodo-t"
            className="max-w-[820px]"
            label={["El método", "La escalera"]}
            title="¿En qué nivel estás?"
            sub={
              <>
                <span className="lg:hidden">Cada nivel se define por una señal que puedes comprobar en tu estado de cuenta. Toca el tuyo y mira qué te toca hacer ahora.</span>
                <span className="hidden lg:inline">
                  El método tiene cuatro niveles y cada uno se define por una señal que puedes comprobar en tu estado de cuenta. Elige el peldaño que describe tu
                  situación y mira qué te toca hacer ahora.
                </span>
              </>
            }
          />
          <Lectura text={LECTURA} className="hidden lg:block w-[420px] shrink-0 rv" />
        </div>
        <div className="hidden lg:block mt-14 pt-3.5 border-t-2 border-ink">
          <h3 className="ws text-[24px] leading-[1.2]">Se sube de nivel con una señal que puedes comprobar, no con una fecha</h3>
          <p className="text-[16px] text-ink2 mt-1.5">Los cuatro niveles, la ruta de los 21 capítulos del libro y dónde empieza cada arquetipo</p>
        </div>
        <div className="mt-7 lg:mt-[68px]">
          <Ladder />
        </div>
        <Lectura text={LECTURA} className="lg:hidden mt-5" />
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-6 lg:mt-7">
          <p className="hidden lg:block text-[16px] text-ink2">¿No sabes cuál es tu nivel? El diagnóstico te lo dice con tus números.</p>
          <Link href="/diagnostico" className="ul self-start text-[17px] font-bold">
            Hacer el diagnóstico de nivel
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArchCard({ a }: { a: (typeof ARCH)[number] }) {
  return (
    <article className="bg-sal p-6 lg:p-7 flex flex-col h-full" style={{ borderLeft: "2px solid var(--color-sald)" }}>
      <div className="flex gap-4 lg:gap-5 items-start">
        <Scene who={a.who} className="shrink-0 w-[112px] xl:w-[150px]" />
        <div className="min-w-0">
          <Mono color="var(--color-sald)">{a.tag}</Mono>
          <h3 className="wh text-[40px] lg:text-[48px] mt-2.5">{a.name}</h3>
          <p className="text-[15px] leading-[1.4] mt-2.5 text-ink2">{a.role}</p>
        </div>
      </div>
      <dl className="mt-5 border-b" style={{ borderColor: "var(--color-sald)" }}>
        {a.rows.map(([l, v]) => (
          <div key={l} className="grid grid-cols-[118px_minmax(0,1fr)] lg:grid-cols-[130px_minmax(0,1fr)] gap-3 py-[9px] border-t" style={{ borderColor: "var(--color-sald)" }}>
            <dt className="wm" style={{ color: "var(--color-sald)", fontSize: 11 }}>
              {l}
            </dt>
            <dd className="text-[16px] leading-[1.3] m-0">
              <Sc text={v} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="wt mt-[18px] pl-3.5" style={{ fontSize: 17, color: "var(--color-sald)", borderLeft: "3px solid var(--color-sald)" }}>
        <Sc text={a.voice} />
      </p>
      <div className="mt-auto pt-5">
        <Mono color="var(--color-sald)">Empieza por</Mono>
        <Link href={a.href} className="group block text-[17px] font-bold mt-1.5 leading-[1.3]">
          <span className="lnk">{a.start}</span>
        </Link>
      </div>
    </article>
  );
}

function Who() {
  return (
    <section id="para-quien" className="border-t border-ink grain scroll-mt-4" aria-labelledby="quien-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <SecHead
          id="quien-t"
          className="max-w-[980px]"
          label={["Para quién es", "Tres puntos de partida"]}
          title="Para quién es"
          sub="Para gerentes, directores y VP de 38 a 55 años, con 12 a 25 años de carrera en empresas grandes de Latinoamérica. Cada punto de partida empieza por una plantilla distinta del kit."
        />
        <div className="rv-kids grid gap-4 lg:gap-8 lg:grid-cols-3 mt-7 lg:mt-14">
          {ARCH.map((a) => (
            <ArchCard key={a.who} a={a} />
          ))}
        </div>
        <Nota className="mt-4 lg:mt-5">{ARCH_NOTE}</Nota>
      </div>
    </section>
  );
}

function Book() {
  return (
    <section className="bg-ink text-paper on-ink halftone overflow-hidden" aria-labelledby="libro-t">
      <span className="folio" aria-hidden="true" style={{ right: "-0.03em", top: "-0.08em", fontSize: "clamp(150px, 24vw, 360px)" }}>
        21
      </span>
      <div className="wrap py-[52px] lg:py-[88px] grid gap-6 lg:gap-[112px] lg:grid-cols-[360px_minmax(0,1fr)] items-start">
        <div className="hidden lg:block rv">
          <Image src="/img/doble-agente-portada.webp" alt="Portada del libro Doble Agente" width={360} height={528} sizes="360px" className="block w-[360px] h-auto outline outline-1 outline-ink" />
          <Mono className="text-ink20 mt-4">
            <Jn parts={["Libro y workbook", "2.ª edición"]} />
          </Mono>
        </div>
        <div>
          <Mono color="var(--color-magl)">
            <span className="lg:hidden">
              <Jn parts={["El método, en un libro", "2.ª edición"]} />
            </span>
            <span className="hidden lg:inline">
              <Jn parts={["El método, en un libro", "Eddie Ajalcriña y Lorenzo Ortiz"]} />
            </span>
          </Mono>
          <h2 id="libro-t" className="wh lines text-[60px] lg:text-[112px] mt-3 lg:mt-[18px]">
            <Lines text="Doble Agente" />
          </h2>
          <div className="lg:hidden flex gap-4 mt-[22px] items-end">
            <Image src="/img/doble-agente-portada.webp" alt="Portada del libro Doble Agente" width={180} height={264} sizes="180px" className="block w-[180px] h-auto outline outline-1 outline-ink" />
            <div className="wm text-ink20">
              Eddie Ajalcriña y Lorenzo Ortiz
              <br />
              <br />
              Libro y workbook
            </div>
          </div>
          <p className="wt mt-5 lg:mt-[22px] max-w-[700px]" style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}>
            <span className="hidden lg:inline">Durante dos décadas construiste tu carrera en empresas grandes. </span>El libro te lleva paso a paso, en 21 capítulos, desde tu
            primer rol parcial hasta la independencia, con un workbook para hacer cada paso.
          </p>
          <div className="wm text-ink20 mt-7 lg:mt-10 mb-1">Qué aprendes</div>
          <ol className="border-b border-ink3">
            {LEARN.map((t, i) => (
              <li key={i} className="grid grid-cols-[36px_minmax(0,1fr)] lg:grid-cols-[48px_minmax(0,1fr)] py-3 lg:py-3.5 border-t border-ink3">
                <span className="wm text-magl">0{i + 1}</span>
                <span className="text-[16px] lg:text-[18px] leading-[1.4]">
                  <Sc text={t} />
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-7 lg:mt-10">
            <BookButtons variant="ink" />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-4 lg:mt-[18px]">
            <Mono className="text-ink20">
              <Jn parts={["Ebook e impreso en Amazon", "PDF con workbook en compra directa"]} />
            </Mono>
            <Link href="/libro#indice" className="ul self-start text-[16px] font-bold text-magl">
              Ver el índice y páginas de muestra
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
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <SecHead
          id="prod-t"
          className="max-w-[900px]"
          label={["Programas", "Ordenados por nivel"]}
          title="Lo que te acompaña en cada nivel"
          sub="Empiezas por lo gratuito y avanzas cuando aparece la señal de tu nivel. Ningún programa se vende a empresas: todos te hablan a ti."
        />
        <div className="rv-kids grid gap-5 md:grid-cols-2 xl:grid-cols-4 mt-7 lg:mt-14 items-start">
          {PRODUCTS.map((col, k) => (
            <div key={k}>
              <div className="border border-ink px-[18px] pt-3.5 pb-4" style={{ background: FILL[k], color: TXT[k] }}>
                <div className="flex justify-between items-center">
                  <span className="wm" style={{ color: k === 3 ? "var(--color-ink20)" : "var(--color-ink2)" }}>
                    Nivel {k}
                  </span>
                  <Lvl on={Array.from({ length: k + 1 }, (_, i) => i)} size={10} fg={k === 3 ? "var(--color-paper)" : "var(--color-ink)"} off={k === 3 ? "var(--color-ink20)" : "var(--color-ink3)"} />
                </div>
                <h3 className="wh text-[26px] xl:text-[28px] mt-1.5 whitespace-nowrap">{LEVELS[k]}</h3>
              </div>
              <ul className="flex flex-col gap-3.5 mt-3.5">
                {col.map((p) => (
                  <li key={p.name}>
                    <Link href={p.href} className="card group flex flex-col bg-paper px-5 pt-5 pb-[18px] h-full">
                      <Mono color={p.tag === "Gratis" ? "var(--color-magt)" : "var(--color-ink2)"}>{p.tag}</Mono>
                      <span className="ws block text-[23px] leading-[1.12] mt-2.5">{p.name}</span>
                      <span className="block text-[15.5px] leading-[1.45] mt-2.5 text-ink2">{p.desc}</span>
                      <span className="wm block text-ink2 mt-3.5" style={{ fontSize: 11 }}>
                        {p.meta}
                      </span>
                      <span className="mt-auto pt-3.5 flex gap-2 items-center text-[16px] font-bold">
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
        <p className="text-[15px] lg:text-[16px] text-ink2 mt-7">
          Las fechas, los cupos y las condiciones de cada programa se publican con cada convocatoria. Si dudas por dónde empezar, agenda 30 minutos con el equipo.
        </p>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section id="nosotros" className="border-t border-ink scroll-mt-4" aria-labelledby="nos-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <SecHead
          id="nos-t"
          className="max-w-[900px]"
          label={["Nosotros", "Autores del libro"]}
          title="Quiénes están detrás"
          sub="Eddie y Lorenzo escribieron Doble Agente y dirigen los programas de Future Founders."
        />
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 mt-7 lg:mt-14">
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
                <Mono color="var(--color-magt)">{f.role}</Mono>
                <h3 className="wh text-[38px] lg:text-[52px] mt-2 lg:mt-3">{f.name}</h3>
                <div className="text-[16px] lg:text-[17px] font-semibold mt-2 lg:mt-3">{f.cred}</div>
                <p className="wt mt-2.5 lg:mt-3.5" style={{ fontSize: "clamp(17px, 1.3vw, 18px)" }}>
                  {f.bio}
                </p>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="wm ul inline-block mt-3 lg:mt-[18px]">
                  {f.li}
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="bg-warm grain" aria-labelledby="cifras-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-end gap-10">
          <SecHead id="cifras-t" label={["En cifras", "Trayectoria"]} title="Future Founders en cifras" />
          <p className="text-[14px] lg:text-[15px] text-ink2 mt-4 lg:mt-0 lg:max-w-[360px] lg:text-right">Cifras que Future Founders publica hoy en futurefounders.pe.</p>
        </div>
        <dl className="rv-kids grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 lg:gap-8 mt-7 lg:mt-12">
          {STATS.map((s) => (
            <div key={s.label} className="border-t-2 border-ink pt-2.5 lg:pt-4 flex flex-col-reverse justify-end">
              <dt className="text-[15px] lg:text-[18px] mt-2 lg:mt-3">{s.label}</dt>
              <dd className="wh m-0 whitespace-nowrap" style={{ fontSize: "clamp(34px, 5.2vw, 80px)", lineHeight: 0.85 }}>
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 lg:mt-16">
          <Testimonials items={TESTIMONIOS} />
        </div>
        {TESTIMONIOS.some((t) => t.ejemplo) && (
          <Nota className="mt-5">Las reseñas de esta sección son de ejemplo y se reemplazarán por reseñas reales de participantes, con su nombre y su permiso.</Nota>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Method />
      <Who />
      <Book />
      <Products />
      <Founders />
      <Proof />
      <FinalCta />
    </>
  );
}
