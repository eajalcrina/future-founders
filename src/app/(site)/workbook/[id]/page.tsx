import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookButtons from "@/components/site/BookButtons";
import { Arrow, Icon, Jn, Lines, Mono, Nota, Sc } from "@/components/site/ui";
import { PLANTILLAS, PARTES, type Plantilla } from "@/content/workbook";
import { allWorkbookIds, kindLabel, partTemplates } from "@/content/workbook-util";

export const dynamicParams = false;

export function generateStaticParams() {
  return allWorkbookIds().map((id) => ({ id }));
}

function partNum(id: string) {
  const m = id.match(/^parte-(\d{2})$/);
  return m && PARTES[m[1]] ? m[1] : null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const pn = partNum(id);
  if (pn)
    return {
      title: `Workbook, Parte ${pn}: ${PARTES[pn]}`,
      description: `Las plantillas del workbook de la Parte ${pn}, ${PARTES[pn]}, de Doble Agente.`,
      alternates: { canonical: `/workbook/${id}` },
    };
  const p = PLANTILLAS.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `Plantilla ${p.code}: ${p.title}`,
    description: `${p.purpose ?? p.intro ?? ""} ${p.where}.`.trim(),
    alternates: { canonical: `/workbook/${id}` },
  };
}

function Meta({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-8 lg:mt-10">
      {items.map(([k, v]) => (
        <div key={k} className="border-t-2 border-ink pt-2.5">
          <dt className="wm text-ink2">{k}</dt>
          <dd className="m-0 text-[16px] lg:text-[17px] mt-1.5 leading-[1.35]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function PartPage({ num }: { num: string }) {
  const items = partTemplates(num);
  return (
    <section className="grain">
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24">
        <Mono color="var(--color-magt)">
          <Jn parts={["Workbook", `Parte ${num}`]} />
        </Mono>
        <h1 className="wh lines mt-4 lg:mt-[22px] text-[56px] lg:text-[104px]">
          <Lines text={PARTES[num]} />
        </h1>
        <p className="wt mt-5 max-w-[760px]">
          La Parte {num} tiene {items.length} capítulos y una plantilla por capítulo. Llénalas en orden, porque cada una usa datos de la anterior.
        </p>
        <ul className="mt-10 border-b border-ink">
          {items.map((p) => (
            <li key={p.id}>
              <Link href={`/workbook/${p.id}`} className="group grid grid-cols-[72px_minmax(0,1fr)_auto] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_110px] gap-x-4 gap-y-1 items-baseline py-4 border-t border-ink">
                <span className="wh text-[28px] lg:text-[32px]">{p.code}</span>
                <span className="text-[17px] lg:text-[18px] font-bold">
                  <span className="lnk">{p.title}</span>
                </span>
                <span className="hidden lg:block text-[15px] text-ink2">{p.where}</span>
                <span className="wm text-ink2 text-right">{p.time}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/workbook" className="ul inline-block mt-8 text-[16px] font-semibold">
          Ver todas las plantillas
        </Link>
      </div>
    </section>
  );
}

function TemplatePage({ p }: { p: Plantilla }) {
  const idx = PLANTILLAS.findIndex((x) => x.id === p.id);
  const prev = PLANTILLAS[idx - 1];
  const next = PLANTILLAS[idx + 1];
  const meta: [string, string][] = [
    ["Tiempo", p.time],
    ["En el libro", p.where],
    ...(p.level ? ([["Nivel", p.level]] as [string, string][]) : []),
    ...(p.who ? ([["Ejemplo resuelto", p.who]] as [string, string][]) : []),
  ];
  return (
    <>
      <section className="grain">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <Mono color="var(--color-magt)">
            <Jn parts={["Workbook", kindLabel(p), `Plantilla ${p.code}`]} />
          </Mono>
          <h1 className="wh lines mt-4 lg:mt-[22px] text-[48px] sm:text-[64px] lg:text-[96px] max-w-[1150px]">
            <Lines text={p.title} />
          </h1>
          <Meta items={meta} />
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="wrap py-12 lg:py-[88px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-start">
          <div className="rv">
            <div className="wm text-ink2">Para qué sirve</div>
            <p className="ws text-[24px] lg:text-[30px] leading-[1.2] mt-3">
              <Sc text={p.purpose ?? p.intro ?? ""} />
            </p>
            {p.intro && p.purpose && (
              <>
                <div className="wm text-ink2 mt-8">Antes de empezar</div>
                <p className="wt mt-2.5">
                  <Sc text={p.intro} />
                </p>
              </>
            )}
            {p.trae && (
              <p className="text-[16px] mt-4 px-3 py-2.5 bg-warm inline-block">
                <Sc text={p.trae} />
              </p>
            )}
            {p.summary.length > 0 && (
              <>
                <div className="wm text-ink2 mt-9 mb-1.5">Lo que trabaja {p.chapter ? `el capítulo ${p.chapter.n}` : "esta sección"}</div>
                <ul className="border-b border-ink">
                  {p.summary.map((s) => (
                    <li key={s} className="grid grid-cols-[28px_minmax(0,1fr)] py-3 border-t border-ink">
                      <span className="block w-2 h-2 mt-2 bg-ink" aria-hidden="true" />
                      <span className="text-[17px] leading-[1.45]">
                        <Sc text={s} />
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <aside className="grid gap-5">
            {p.toolkit && (
              <div className="card bg-paper p-6">
                <div className="flex gap-2.5 items-center">
                  <Icon name="formula" size={20} />
                  <span className="wm">Calculadora del toolkit</span>
                </div>
                <p className="ws text-[22px] mt-3">{p.toolkit.label}</p>
                <p className="text-[15px] text-ink2 mt-2">Hace la misma cuenta que esta plantilla, con tus números.</p>
                <Link href={p.toolkit.href} className="btn2 w-full mt-5">
                  <span>Abrir la calculadora</span>
                  <Arrow />
                </Link>
              </div>
            )}
            {p.id === "k1" && (
              <Link href="/kit#calculadora" className="group card bg-sal p-6 block" style={{ borderLeft: "2px solid var(--color-sald)" }}>
                <span className="wm" style={{ color: "var(--color-sald)" }}>
                  Prueba en línea
                </span>
                <span className="block ws text-[20px] mt-2">
                  <span className="lnk">K.1 con los números de Carmen</span>
                </span>
              </Link>
            )}
            <div className="bg-warm p-6">
              <div className="wm text-ink2">Dónde se llena</div>
              <p className="text-[16px] leading-[1.45] mt-2">
                {p.kind === "kit"
                  ? "En el kit «Plan de salida», gratis, o en el workbook del libro."
                  : "En el workbook del libro, en el iPad o en papel. Viene con el ejemplo resuelto y una columna para tus números."}
              </p>
              <div className="mt-5">
                {p.kind === "kit" ? (
                  <Link href="/kit" className="btn w-full">
                    <span>Descarga el kit</span>
                    <Arrow />
                  </Link>
                ) : (
                  <BookButtons full />
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <nav aria-label="Otras plantillas" className="border-t border-ink">
        <div className="wrap py-8 grid gap-4 sm:grid-cols-3 items-center">
          <div>
            {prev && (
              <Link href={`/workbook/${prev.id}`} className="group block">
                <span className="wm text-ink2 block">Anterior</span>
                <span className="text-[16px] font-bold">
                  <span className="lnk">
                    {prev.code} {prev.title}
                  </span>
                </span>
              </Link>
            )}
          </div>
          <div className="sm:text-center">
            <Link href={p.part ? `/workbook/parte-${p.part.num}` : "/workbook"} className="ul text-[15px] font-semibold">
              {p.part ? `Parte ${p.part.num}, ${p.part.name}` : "Todas las plantillas"}
            </Link>
          </div>
          <div className="sm:text-right">
            {next && (
              <Link href={`/workbook/${next.id}`} className="group block">
                <span className="wm text-ink2 block">Siguiente</span>
                <span className="text-[16px] font-bold">
                  <span className="lnk">
                    {next.code} {next.title}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="wrap pb-10">
          <Nota>Las plantillas te ayudan a ordenar tus números. No son asesoría legal, tributaria ni financiera.</Nota>
        </div>
      </nav>
    </>
  );
}

export default async function WorkbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pn = partNum(id);
  if (pn) return <PartPage num={pn} />;
  const p = PLANTILLAS.find((x) => x.id === id);
  if (!p) notFound();
  return <TemplatePage p={p} />;
}
