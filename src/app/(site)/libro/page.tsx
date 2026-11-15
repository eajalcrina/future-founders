import type { Metadata } from "next";
import Image from "next/image";
import ReadingProgress from "@/components/site/ReadingProgress";
import BookButtons from "@/components/site/BookButtons";
import FinalCta from "@/components/site/FinalCta";
import Parallax from "@/components/site/Parallax";
import { AMAZON_URL, FOUNDERS, LEARN, SITE_URL } from "@/content/sitio";
import { checkoutHref } from "@/components/site/BookButtons";
import { PART_LEVELS, PARTES } from "@/content/workbook";
import { CropMarks, Hero as HeroHead, Icon, Jn, JsonLd, Lectura, LinkArrow, Lvl, Mono, Nota, Sc, SecHead } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Doble Agente, el libro",
  description:
    "Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz: 21 capítulos en cinco partes, con un workbook para pasar de tu primer rol parcial a la independencia sin dejar tu cargo de golpe.",
  alternates: { canonical: "/libro" },
  openGraph: { title: "Doble Agente, el libro", url: "/libro", type: "book" },
};

type Toc = { code: string; n1: string; n2: string; lv: number[] | null; items: [string, string][] };

/** «Nivel 0», «Niveles 0 y 1», «Niveles 0 a 2»: el rótulo sale de los niveles que exporta gen-workbook.py. */
function levelLabel(lv: number[]) {
  if (lv.length === 1) return `Nivel ${lv[0]}`;
  if (lv.length === 2) return `Niveles ${lv[0]} y ${lv[1]}`;
  return `Niveles ${lv[0]} a ${lv[lv.length - 1]}`;
}
const part = (code: string, items: [string, string][]): Toc => ({ code, n1: PARTES[code], n2: levelLabel(PART_LEVELS[code]), lv: PART_LEVELS[code], items });

const TOC: Toc[] = [
  { code: "AP", n1: "Apertura", n2: "y kit", lv: null, items: [["", "Manifiesto: dos roles a la vista"], ["", "Los cuatro arquetipos"], ["", "La escalera: de un sueldo a varios ingresos"], ["", "Cómo usar este libro"], ["K", "Kit «Plan de salida», plantillas K.1 a K.5"]] },
  part("01", [["1", "El riesgo que no se ve"], ["2", "Tu costo de vida real"], ["3", "Tu criterio ejecutivo es vendible"], ["4", "Juego limpio: contrato, conflicto de interés y transparencia"], ["5", "Si te despiden mañana"]]),
  part("02", [["6", "El problema de los USD 100.000"], ["7", "Tu puerto de entrada"], ["8", "Quién decide y por qué compra"], ["9", "¿Alcanza el mercado?"]]),
  part("03", [["10", "Tu propuesta de valor, en números"], ["11", "Tu primer rol parcial: formato, precio y contrato"], ["12", "De servicio a producto"], ["13", "La unidad económica"]]),
  part("04", [["14", "Tu red como canal"], ["15", "La conversación de diagnóstico"], ["16", "El primer contrato y el primer comprobante"], ["17", "Tu agenda, tu energía y tu familia"]]),
  part("05", [["18", "Del primer rol al portafolio"], ["19", "El punto de no retorno"], ["20", "La conversación con tu empleador"], ["21", "Independencia: saltar o quedarte"]]),
  { code: "AN", n1: "Cierre", n2: "y anexos", lv: null, items: [["", "Lo que sigue"], ["", "Anexos por país: Perú, México, Colombia y Chile"], ["", "Glosario e índices"]] },
];

const SAMPLES = [
  { src: "/img/muestra-personajes.webp", alt: "Páginas 8 y 9 del libro: los cuatro arquetipos, Carmen, Javier, Andrea y Rodrigo, con sus números de partida" },
  { src: "/img/muestra-escalera.webp", alt: "Páginas 12 y 13 del libro: el marco 0.1, la escalera de cuatro niveles con la ruta de los 21 capítulos" },
  { src: "/img/muestra-caso-carmen.webp", alt: "Páginas 34 y 38 del capítulo 1: el caso de Carmen y el marco 1.1, sus tres runways frente al mínimo de 6 meses y la meta de 9" },
  { src: "/img/muestra-plantilla-1-1.webp", alt: "Páginas 41 y 42 del capítulo 1: el ejemplo resuelto de la plantilla 1.1 y el cierre con las tres acciones" },
];

const INCL: { icon: "plantilla" | "documento" | "accion" | "formula"; t: string; d: string }[] = [
  { icon: "plantilla", t: "Kit «Plan de salida»", d: "Cinco plantillas, K.1 a K.5, para tu runway, tu contrato, tu salida, tus primeros 30 días y tus primeras 20 llamadas." },
  { icon: "documento", t: "21 plantillas, una por capítulo", d: "Cada una toma de 15 a 40 minutos con los datos a mano y deja una decisión o un dato nuevo sobre tu situación." },
  { icon: "accion", t: "Las tres acciones de cada capítulo", d: "Lo que haces esa semana, escrito y con fecha." },
  { icon: "formula", t: "Los cálculos de los cuatro arquetipos", d: "Las cuentas de Carmen, Javier, Andrea y Rodrigo, para que compares con las tuyas." },
];

const BOOK_LD = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Doble Agente",
  alternateName: "Doble Agente: el método para ejecutivos con salario",
  bookEdition: "2.ª edición",
  inLanguage: "es",
  author: [
    { "@type": "Person", name: "Eddie Ajalcriña" },
    { "@type": "Person", name: "Lorenzo Ortiz" },
  ],
  publisher: { "@type": "Organization", name: "Future Founders", url: SITE_URL },
  image: `${SITE_URL}/img/doble-agente-portada.webp`,
  url: `${SITE_URL}/libro`,
  description:
    "21 capítulos en cinco partes, con un workbook, para convertir la experiencia ejecutiva en ingresos propios por niveles: salario, primer rol parcial, portafolio e independencia.",
  bookFormat: ["https://schema.org/EBook", "https://schema.org/Paperback"],
};

function Hero() {
  return (
    <section aria-labelledby="libro-h">
      <div className="wrap pt-9 pb-12 lg:pt-[72px] lg:pb-24 grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] items-center">
        <div className="crop bg-warm flex items-center justify-center py-10 lg:py-0 lg:h-[660px]">
          <Image
            src="/img/doble-agente-portada.webp"
            alt="Portada del libro Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz"
            width={372}
            height={546}
            sizes="(min-width: 1024px) 372px, 60vw"
            preload
            className="block w-[60%] max-w-[372px] lg:w-[372px] h-auto outline outline-1 outline-ink"
          />
          <CropMarks />
        </div>
        <div>
          <HeroHead id="libro-h" size="portada" label={["Libro y workbook", "2.ª edición"]} title="Doble Agente" />
          <p className="wh2 text-figura mt-4 lg:mt-6 max-w-[640px]">El método para ejecutivos con salario</p>
          <Mono tone="gris" className="mt-3 lg:mt-4">
            Eddie Ajalcriña y Lorenzo Ortiz
          </Mono>
          <p className="lead mt-5 lg:mt-7 max-w-[680px]">
            Durante dos décadas construiste tu carrera en empresas grandes. Este libro te ayuda a convertir esa experiencia en ingresos propios, paso a paso y a la vista de tu
            empleador.
          </p>
          <div className="mt-7 lg:mt-9">
            <BookButtons />
          </div>
          <Mono tone="gris" className="mt-4 lg:mt-5">
            <Jn parts={["Ebook", "Impreso", "PDF", "Workbook gratis"]} />
          </Mono>
        </div>
      </div>
    </section>
  );
}

function Back() {
  return (
    <section className="border-t border-ink" aria-labelledby="contratapa-t">
      <div className="wrap py-12 lg:py-[88px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <div>
          <SecHead id="contratapa-t" className="max-w-[760px]" label={["De qué trata"]} title="Un plan para cobrar por lo que ya sabes hacer" />
          <div className="wt mt-6 lg:mt-8 max-w-[720px] rv">
            <p>
              Si diriges un área, sabes resolver problemas que a otras empresas les cuestan cientos de miles de dólares. Lo que suele faltar es un plan para cobrar por eso fuera de
              tu cargo, y para el día en que una reestructuración cambie lo que tenías previsto.
            </p>
            <p>
              Doble Agente te acompaña paso a paso. Empiezas con un rol parcial mientras mantienes tu sueldo, se lo informas a tu empleador y avanzas por cuatro niveles hasta
              que tus ingresos propios cubren tu vida con margen.
            </p>
            <p>
              Cuatro ejecutivos de Lima, Bogotá, Ciudad de México y Santiago recorren el método con números que puedes revisar. Cada capítulo cierra con una plantilla del workbook y
              tres acciones para la semana.
            </p>
          </div>
        </div>
        <div className="lg:pt-2">
          <Mono className="mb-2">En estas páginas vas a aprender a</Mono>
          <ol className="rv-kids border-b border-ink">
            {LEARN.map((t, i) => (
              <li key={i} className="grid grid-cols-[44px_minmax(0,1fr)] py-4 border-t border-ink">
                <span className="num text-figura">0{i + 1}</span>
                <span className="text-cuerpo leading-[1.4]">
                  <Sc text={t} />
                </span>
              </li>
            ))}
          </ol>
          <Lectura
            className="mt-7"
            text="Los cuatro arquetipos están armados a partir de conversaciones con más de 30 ejecutivos. Sus sueldos y gastos están en el rango de las guías salariales de cada país, y puedes revisar cada cálculo en el libro."
          />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section id="indice" className="scroll-mt-4" aria-labelledby="indice-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-end gap-10">
          <SecHead id="indice-t" className="max-w-[760px]" label={["Índice"]} title="21 capítulos en cinco partes, ordenados por nivel" />
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 lg:mt-0" aria-label="Leyenda de niveles">
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="inline-flex items-center gap-2">
                <span className="inline-block w-[9px] h-[9px]" style={k === 0 ? { background: "var(--color-ink)" } : { border: "1px solid var(--color-ink3)" }} aria-hidden="true" />
                <Mono tone="gris" as="span">
                  Nivel {k}
                </Mono>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 lg:mt-11 pt-3 border-t border-ink">
          <h3 className="ws text-figura">Las cinco partes siguen los niveles</h3>
          <p className="text-recuadro text-ink3 mt-1.5">Las cuatro primeras partes llevan hasta tu primer cliente; la quinta, desde ahí hasta la independencia</p>
        </div>
        <div className="mt-7 border-b border-ink">
          {TOC.map((r) => (
            <div key={r.code} className="rv grid gap-3 lg:gap-6 grid-cols-[72px_minmax(0,1fr)] lg:grid-cols-[120px_300px_minmax(0,1fr)] pt-5 pb-[18px] border-t border-ink">
              <span className="num text-display-md">{r.code}</span>
              <div>
                <div className="wh2 text-figura">{r.n1}</div>
                <div className="text-recuadro text-ink2 mt-1">{r.n2}</div>
                {r.lv && (
                  <div className="mt-3">
                    <Lvl on={r.lv} label={`Trabaja los niveles ${r.lv.join(", ")}`} />
                  </div>
                )}
              </div>
              <ol className="col-span-2 lg:col-span-1 sm:columns-2 gap-10">
                {r.items.map(([c, t]) => (
                  <li key={t} className="grid grid-cols-[44px_minmax(0,1fr)] py-[7px] text-cuerpo leading-[1.3] break-inside-avoid">
                    <span className="font-mono font-bold text-rotulo text-ink2 pt-[4px]">{c}</span>
                    <span>
                      <Sc text={t} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Samples() {
  return (
    <section className="bg-warm" aria-labelledby="muestra-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="muestra-t"
          className="max-w-[860px]"
          label={["Muestra", "Páginas del interior"]}
          title="Cada capítulo abre con un caso y cierra con su plantilla"
          sub="El caso es de uno de los cuatro arquetipos. En el medio va un marco con nombre que explica la idea con números."
        />
        <div className="rv-kids grid gap-8 lg:gap-x-10 lg:gap-y-12 md:grid-cols-2 mt-8 lg:mt-12">
          {SAMPLES.map((s) => (
            <figure key={s.src} className="m-0">
              <Image src={s.src} alt={s.alt} width={1200} height={880} sizes="(min-width: 1440px) 636px, (min-width: 768px) 46vw, 100vw" className="block w-full h-auto outline outline-1 outline-ink20" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workbook() {
  return (
    <section aria-labelledby="wb-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24 grid grid-cols-[minmax(0,1fr)] gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] items-start">
        <div>
          <SecHead
            id="wb-t"
            className="max-w-[640px]"
            label={["Workbook", "Gratis"]}
            title="El libro explica y el workbook es donde lo haces"
            sub="Llenas las plantillas en una tableta, en la computadora o en papel. Las que hacen cuentas tienen su calculadora en línea."
          />
          <ul className="rv-kids mt-8 lg:mt-9 border-b border-ink">
            {INCL.map((x) => (
              <li key={x.t} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 py-4 border-t border-ink">
                <span className="pt-1">
                  <Icon name={x.icon} size={18} />
                </span>
                <div>
                  <div className="wh3 text-h3">{x.t}</div>
                  <p className="text-recuadro leading-[1.45] text-ink2 mt-1.5">{x.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <LinkArrow href="/workbook" className="mt-6 text-cuerpo">
            Ver las plantillas y descargar el workbook
          </LinkArrow>
        </div>
        <div className="lg:pt-3 rv">
          <Image
            src="/img/workbook-k1.webp"
            alt="Página 8 del workbook: la plantilla K.1, Tu runway hoy, con el ahorro líquido y el costo de vida de Carmen y Javier y el espacio para tus números"
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

function Formats() {
  const ck = checkoutHref();
  const fmts = [
    { n: "Ebook", w: "Amazon", d: "Para leer en Kindle, en una tableta o en la computadora.", b: "Comprar en Amazon", href: AMAZON_URL, k: 1 },
    { n: "Impreso", w: "Amazon", d: "Edición de bolsillo ejecutivo de 150 × 220 mm, impresa por Amazon.", b: "Comprar en Amazon", href: AMAZON_URL, k: 2 },
    {
      n: "Libro en PDF",
      w: "Compra directa",
      d: "El libro en PDF, para leer en una tableta o en la computadora. El workbook se descarga gratis.",
      b: "Comprar el PDF",
      href: ck,
      k: 2,
    },
  ];
  return (
    <section id="formatos" className="bg-warm scroll-mt-4" aria-labelledby="formatos-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead
          id="formatos-t"
          className="max-w-[860px]"
          label={["Formatos", "Dónde comprar"]}
          title="Ebook e impreso en Amazon, PDF en compra directa"
          sub="El libro en PDF se compra directo a Future Founders, desde esta página. El workbook es gratis para todos."
        />
        <div className="rv-kids grid gap-5 lg:gap-6 md:grid-cols-3 mt-8 lg:mt-12">
          {fmts.map((f) => (
            <div key={f.n} className="card flex flex-col bg-paper p-6 lg:px-7 lg:pt-7 lg:pb-[30px]">
              <Mono tone="gris">{f.w}</Mono>
              <h3 className="wh2 text-h2 mt-3">{f.n}</h3>
              <p className="text-recuadro leading-[1.45] mt-3 text-ink2">{f.d}</p>
              <div className="mt-auto pt-7">
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn2 wrap-ok w-full">
                  <span>{f.b}</span>
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        {!process.env.NEXT_PUBLIC_CHECKOUT_URL && (
          <p className="text-recuadro text-ink2 mt-4">La compra directa se coordina por WhatsApp: te enviamos el enlace de pago y, al confirmarlo, el libro en PDF.</p>
        )}
        <Nota className="mt-6 lg:mt-8 max-w-[980px]">
          El libro no promete ingresos ni plazos. Cada persona parte de un sueldo, un ahorro y un mercado distintos, y el libro te ayuda a medir los tuyos. Nada de lo que contiene
          es asesoría legal, tributaria ni financiera.
        </Nota>
      </div>
    </section>
  );
}

function Authors() {
  return (
    <section className="border-t border-ink" aria-labelledby="autores-t">
      <div className="wrap pt-12 pb-14 lg:pt-[88px] lg:pb-24">
        <SecHead id="autores-t" label={["Autores"]} title="Lo escribieron los fundadores de Future Founders" />
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 mt-8 lg:mt-11">
          {FOUNDERS.map((f) => (
            <div key={f.key} className="rv grid gap-5 sm:gap-7 grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)] items-start">
              <Parallax src={f.photo} alt={`Retrato de ${f.name} en duotono`} sizes="160px" className="w-full aspect-[160/196] bg-warm border border-ink" position="center 30%"
                zoom={f.zoom} />
              <div>
                <Mono tone="gris">{f.role}</Mono>
                <h3 className="wh2 text-h2 mt-2.5">{f.name}</h3>
                <p className="text-cuerpo font-semibold mt-2">{f.cred}</p>
                <p className="wt mt-2.5">{f.bio}</p>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="wm ul inline-block mt-3 [overflow-wrap:anywhere]">
                  {f.li}
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LibroPage() {
  return (
    <>
      <ReadingProgress />
      <JsonLd data={BOOK_LD} />
      <Hero />
      <Back />
      <Index />
      <Samples />
      <Workbook />
      <Authors />
      <Formats />
      <FinalCta
        title="Empieza antes de comprar"
        text="El kit «Plan de salida» es la primera sección práctica del libro y lo descargas gratis. Si te sirve, el libro sigue desde ahí con la Parte 01."
      />
    </>
  );
}
