import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReadingProgress from "@/components/site/ReadingProgress";
import BookButtons from "@/components/site/BookButtons";
import FinalCta from "@/components/site/FinalCta";
import Parallax from "@/components/site/Parallax";
import { AMAZON_URL, FOUNDERS, LEARN, SITE_URL } from "@/content/sitio";
import { checkoutHref } from "@/components/site/BookButtons";
import { PART_LEVELS, PARTES } from "@/content/workbook";
import { Arrow, CropMarks, Icon, Jn, JsonLd, Lectura, Lines, Lvl, Mono, Nota, Sc, SecHead } from "@/components/site/ui";

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
  { src: "/img/muestra-personajes.webp", cap: ["Páginas 8 y 9", "Los cuatro arquetipos"], alt: "Doble página del libro con los cuatro arquetipos: Carmen, Javier, Andrea y Rodrigo" },
  { src: "/img/muestra-escalera.webp", cap: ["Páginas 12 y 13", "Marco 0.1, la escalera"], alt: "Doble página del libro con la escalera de cuatro niveles y la ruta de los 21 capítulos" },
  { src: "/img/muestra-caso-carmen.webp", cap: ["Capítulo 1", "El caso de Carmen y el marco 1.1"], alt: "Doble página del capítulo 1 con el caso de Carmen y el marco 1.1" },
  { src: "/img/muestra-plantilla-1-1.webp", cap: ["Capítulo 1", "Plantilla 1.1 y cierre"], alt: "Doble página con la plantilla 1.1 del workbook y el cierre del capítulo 1" },
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
    <section className="grain" aria-labelledby="libro-h">
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
          <Mono color="var(--color-magt)">
            <Jn parts={["Libro y workbook", "2.ª edición"]} />
          </Mono>
          <h1 id="libro-h" className="wh lines mt-3 lg:mt-[18px] text-[64px] sm:text-[96px] xl:text-[148px]">
            <Lines text="Doble Agente" />
          </h1>
          <p className="mt-4 lg:mt-[22px] max-w-[640px] font-semibold" style={{ fontSize: "clamp(22px, 2.1vw, 30px)", lineHeight: 1.2, fontStretch: "90%" }}>
            Tu experiencia puede trabajar para más de una empresa. O para la tuya.
          </p>
          <p className="wm text-ink2 mt-4 lg:mt-[18px]">Eddie Ajalcriña y Lorenzo Ortiz</p>
          <p className="wt mt-5 lg:mt-[26px] max-w-[680px]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Durante dos décadas construiste tu carrera en empresas grandes. Este libro te ayuda a convertir esa experiencia en ingresos propios, paso a paso y a la vista de tu
            empleador.
          </p>
          <div className="mt-7 lg:mt-9">
            <BookButtons />
          </div>
          <Mono className="text-ink2 mt-4 lg:mt-[18px]">
            <Jn parts={["Ebook", "Impreso", "PDF", "Workbook gratis", "21 capítulos en 5 partes"]} />
          </Mono>
        </div>
      </div>
    </section>
  );
}

function Back() {
  return (
    <section className="bg-warm" aria-labelledby="contratapa-t">
      <div className="wrap py-12 lg:py-[88px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <div>
          <SecHead id="contratapa-t" size="md" className="max-w-[760px]" label={["Contratapa", "De qué trata"]} title="Un plan para cobrar por lo que ya sabes hacer" />
          <div className="wt mt-6 lg:mt-[30px] max-w-[720px] rv">
            <p>
              Si diriges un área, sabes resolver problemas que a otras empresas les cuestan cientos de miles de dólares. Lo que suele faltar es un plan para cobrar por eso fuera de
              tu cargo, y para el día en que una reestructuración cambie lo que tenías previsto.
            </p>
            <p>
              Doble Agente te acompaña paso a paso. Empiezas con un rol parcial mientras mantienes tu sueldo, lo haces a la vista de tu empleador y avanzas por cuatro niveles hasta
              que tus ingresos propios cubren tu vida con margen.
            </p>
            <p>
              Cuatro ejecutivos de Lima, Bogotá, Ciudad de México y Santiago recorren el método con números que puedes revisar. Cada capítulo cierra con una plantilla del workbook y
              tres acciones para la semana.
            </p>
          </div>
        </div>
        <div className="lg:pt-2">
          <div className="wm text-ink2 mb-1.5">En estas páginas vas a aprender a</div>
          <ol className="rv-kids border-b border-ink">
            {LEARN.map((t, i) => (
              <li key={i} className="grid grid-cols-[52px_minmax(0,1fr)] py-4 border-t border-ink">
                <span className="wh text-[30px] text-magt">0{i + 1}</span>
                <span className="text-[17px] lg:text-[18px] leading-[1.4]">
                  <Sc text={t} />
                </span>
              </li>
            ))}
          </ol>
          <Lectura
            className="mt-7"
            bg="var(--color-paper)"
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
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <div className="lg:flex lg:justify-between lg:items-end gap-10">
          <SecHead id="indice-t" className="max-w-[760px]" label={["Índice", "Por partes y niveles"]} title="Qué hay dentro" />
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 lg:mt-0" aria-label="Leyenda de niveles">
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3" style={k === 0 ? { background: "var(--color-ink)" } : { border: "1px solid var(--color-ink3)" }} aria-hidden="true" />
                <span className="wm text-ink2">Nivel {k}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 lg:mt-11 pt-3.5 border-t-2 border-ink">
          <h3 className="ws text-[20px] lg:text-[24px] leading-[1.2]">
            Las cuatro primeras partes te llevan hasta tu primer cliente y la quinta, desde ahí hasta la independencia
          </h3>
          <p className="text-[15px] lg:text-[16px] text-ink2 mt-1.5">Los 21 capítulos agrupados en cinco partes, con los niveles de la escalera que trabaja cada una</p>
        </div>
        <div className="mt-7 border-b border-ink">
          {TOC.map((r) => (
            <div key={r.code} className="rv grid gap-3 lg:gap-6 grid-cols-[72px_minmax(0,1fr)] lg:grid-cols-[120px_300px_minmax(0,1fr)] pt-5 pb-[18px] border-t border-ink">
              <span className="wh text-[44px] lg:text-[56px]">{r.code}</span>
              <div>
                <div className="ws text-[22px]">{r.n1}</div>
                <div className="text-[16px] text-ink2 mt-1">{r.n2}</div>
                {r.lv && (
                  <div className="mt-3">
                    <Lvl on={r.lv} size={12} label={`Trabaja los niveles ${r.lv.join(", ")}`} />
                  </div>
                )}
              </div>
              <ol className="col-span-2 lg:col-span-1 sm:columns-2 gap-10">
                {r.items.map(([c, t]) => (
                  <li key={t} className="grid grid-cols-[44px_minmax(0,1fr)] py-[7px] text-[16px] lg:text-[17px] leading-[1.3] break-inside-avoid">
                    <span className="wm text-ink2">{c}</span>
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
    <section className="bg-warm grain" aria-labelledby="muestra-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <SecHead
          id="muestra-t"
          size="md"
          className="max-w-[860px]"
          label={["Muestra", "Páginas del interior"]}
          title="Así se ven las páginas"
          sub="Papel, tinta y un solo acento magenta. Cada capítulo abre con el caso de un arquetipo, sigue con un marco con nombre y cierra con su plantilla."
        />
        <div className="rv-kids grid gap-8 lg:gap-x-10 lg:gap-y-12 md:grid-cols-2 mt-8 lg:mt-12">
          {SAMPLES.map((s) => (
            <figure key={s.src} className="m-0">
              <Image src={s.src} alt={s.alt} width={1200} height={880} sizes="(min-width: 1440px) 636px, (min-width: 768px) 46vw, 100vw" className="block w-full h-auto outline outline-1 outline-ink20" />
              <figcaption className="wm text-ink2 mt-3.5">
                <Jn parts={s.cap} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workbook() {
  const rows: [string, string, string, boolean][] = [
    ["A Ahorro líquido (USD)", "61.600", "61.150", false],
    ["B Costo de vida mensual (USD)", "8.800", "12.500", false],
    ["Runway = A ÷ B (meses)", "7,0", "4,9", true],
  ];
  return (
    <section aria-labelledby="wb-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24 grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] items-start">
        <div>
          <SecHead
            id="wb-t"
            size="md"
            className="max-w-[640px]"
            label={["Workbook", "Se usa junto al libro"]}
            title="El libro explica, el workbook es donde lo haces"
            sub="Llenas las plantillas en una tableta, en la computadora o en papel. Cada una te dice en qué página del libro está su ejemplo resuelto, y las que hacen cuentas tienen su calculadora en línea."
          />
          <ul className="rv-kids mt-8 lg:mt-9 border-b border-ink">
            {INCL.map((x) => (
              <li key={x.t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 py-[18px] border-t border-ink">
                <Icon name={x.icon} size={26} />
                <div>
                  <div className="text-[19px] lg:text-[20px] font-bold" style={{ fontStretch: "90%" }}>
                    {x.t}
                  </div>
                  <p className="text-[16px] leading-[1.45] text-ink2 mt-1.5">{x.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/workbook" className="ul inline-block mt-6 text-[17px] font-bold">
            Ver las plantillas y descargar el workbook gratis
          </Link>
        </div>
        <div className="lg:pt-3 rv">
          <div className="border border-ink bg-paper px-5 py-6 lg:px-[26px] lg:pt-6 lg:pb-[26px]">
            <div className="flex justify-between items-center">
              <div className="flex gap-2.5 items-center">
                <Icon name="plantilla" size={20} />
                <span className="wm">Plantilla K.1</span>
              </div>
              <span className="wm text-ink2">20 min</span>
            </div>
            <h3 className="ws text-[26px] lg:text-[28px] mt-3.5">Tu runway hoy</h3>
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full mt-4 text-[15px] lg:text-[16px] border-collapse min-w-[420px]">
                <caption className="sr-only">Plantilla K.1 con los números de Carmen y Javier</caption>
                <thead>
                  <tr>
                    {["Concepto", "Carmen", "Javier", "Tus números"].map((h, i) => (
                      <th key={h} scope="col" className={`wm font-medium text-ink2 py-2 border-b border-ink ${i === 0 ? "text-left" : "text-right"} ${i === 3 ? "pl-3" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="tab">
                  {rows.map(([a, b, c, bold]) => (
                    <tr key={a}>
                      <th scope="row" className="text-left font-normal py-2.5 border-b border-ink20">
                        <Sc text={a} />
                      </th>
                      <td className={`text-right border-b border-ink20 ${bold ? "font-bold" : ""}`}>{b}</td>
                      <td className={`text-right border-b border-ink20 ${bold ? "font-bold" : ""}`}>{c}</td>
                      <td className="border-b border-ink20 pl-3">
                        <div className="h-[26px] border border-ink3 bg-paper" aria-hidden="true" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[15px] text-ink2 mt-3.5">
              <i>Sabrás que terminaste cuando</i> tengas tu runway con un decimal.
            </p>
          </div>
          <Mono className="text-ink2 mt-3.5">
            <Jn parts={["Ejemplo del workbook", "Plantilla K.1 con los números del libro"]} />
          </Mono>
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
      b: "Compra directa: libro en PDF",
      href: ck,
      k: 2,
    },
  ];
  return (
    <section id="formatos" className="bg-warm grain scroll-mt-4" aria-labelledby="formatos-t">
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <SecHead
          id="formatos-t"
          size="md"
          className="max-w-[860px]"
          label={["Formatos", "Dónde comprar"]}
          title="Elige tu formato"
          sub="El ebook y el impreso se venden en Amazon. El libro en PDF se compra directo a Future Founders, desde esta página. El workbook es gratis para todos."
        />
        <div className="rv-kids grid gap-5 lg:gap-6 md:grid-cols-3 mt-8 lg:mt-12">
          {fmts.map((f) => (
            <div key={f.n} className="card flex flex-col bg-paper p-6 lg:px-7 lg:pt-7 lg:pb-[30px]">
              <Mono className="text-ink2">{f.w}</Mono>
              <h3 className="wh text-[36px] lg:text-[44px] mt-3">{f.n}</h3>
              <p className="text-[16px] lg:text-[17px] leading-[1.45] mt-3.5 text-ink2">{f.d}</p>
              <div className="mt-auto pt-7">
                <a href={f.href} target="_blank" rel="noopener noreferrer" className={`${f.k === 1 ? "btn" : "btn2"} w-full`} style={{ whiteSpace: "normal", textAlign: "center", paddingInline: 16, gap: 10 }}>
                  <span>{f.b}</span>
                  <Arrow />
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        {!process.env.NEXT_PUBLIC_CHECKOUT_URL && (
          <p className="text-[15px] text-ink2 mt-4">La compra directa se coordina por WhatsApp: te enviamos el enlace de pago y, al confirmarlo, el libro en PDF.</p>
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
      <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
        <SecHead id="autores-t" size="md" label={["Autores", "Future Founders"]} title="Quién lo escribió" />
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 mt-8 lg:mt-11">
          {FOUNDERS.map((f) => (
            <div key={f.key} className="rv grid gap-5 sm:gap-7 grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)] items-start">
              <Parallax src={f.photo} alt={`Retrato de ${f.name} en duotono`} sizes="160px" className="w-full aspect-[160/196] bg-warm border border-ink" position="center 30%" />
              <div>
                <Mono color="var(--color-magt)">{f.role}</Mono>
                <h3 className="wh text-[32px] lg:text-[40px] mt-2.5">{f.name}</h3>
                <p className="text-[16px] font-semibold mt-2">{f.cred}</p>
                <p className="wt mt-2.5" style={{ fontSize: 17 }}>
                  {f.bio}
                </p>
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
      <Formats />
      <Authors />
      <FinalCta
        title="Empieza antes de comprar"
        text="El kit «Plan de salida» es la primera sección práctica del libro y lo descargas gratis. Si te sirve, el libro sigue desde ahí con la Parte 01."
        folio="AP"
      />
    </>
  );
}
