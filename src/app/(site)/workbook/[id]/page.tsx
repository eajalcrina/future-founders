import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlantillaCalc from "@/components/site/PlantillaCalc";
import RunwayCalc from "@/components/site/RunwayCalc";
import { Hero as HeroHead, LinkArrow, Mono, Sc } from "@/components/site/ui";
import { PLANTILLAS, PARTES, type Plantilla } from "@/content/workbook";
import { allWorkbookIds, kindLabel, partTemplates, timeLabel } from "@/content/workbook-util";

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
    description: `${p.purpose ?? p.intro ?? ""} ${p.where}.${p.calc ? " Con calculadora en línea." : ""}`.replace(/<\/?em>/g, "").trim(),
    alternates: { canonical: `/workbook/${id}` },
  };
}

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

function PartPage({ num }: { num: string }) {
  const items = partTemplates(num);
  return (
    <section>
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24">
        <HeroHead label={["Workbook", `Parte ${num}`]} title={PARTES[num]} />
        <p className="lead mt-5 lg:mt-7 max-w-[760px]">
          La Parte {num} tiene {items.length} capítulos y una plantilla por capítulo. Llénalas en orden, porque cada una usa datos de la anterior.
        </p>
        <ul className="mt-10 border-b border-ink">
          {items.map((p) => (
            <li key={p.id}>
              <Link href={`/workbook/${p.id}`} className="group grid grid-cols-[72px_minmax(0,1fr)_auto] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_110px] gap-x-4 gap-y-1 items-baseline py-4 border-t border-ink">
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
        <LinkArrow href="/workbook" className="mt-8 text-cuerpo">
          Ver todas las plantillas
        </LinkArrow>
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
    ...(p.pages.libro || p.pages.workbook
      ? ([["Páginas", [p.pages.libro && `libro ${p.pages.libro}`, p.pages.workbook && `workbook ${p.pages.workbook}`].filter(Boolean).join(", ")]] as [string, string][])
      : []),
  ];
  const hasCalc = Boolean(p.calc) && p.id !== "k1";
  return (
    <>
      <section>
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <HeroHead label={["Workbook", kindLabel(p), `Plantilla ${p.code}`]} title={p.title} className="max-w-[1150px]" />
          <Meta items={meta} />
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="wrap py-12 lg:py-[88px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-start">
          {/* La columna más corta queda fija al recorrer, para que no quede un vacío largo junto a la otra */}
          <div className={`rv ${hasCalc ? "lg:sticky lg:top-[calc(var(--header-h)+env(safe-area-inset-top)+24px)]" : ""}`}>
            <Mono>Para qué sirve</Mono>
            <p className="ws text-figura mt-3">
              <Sc text={p.purpose ?? p.intro ?? ""} />
            </p>
            {p.intro && p.purpose && (
              <>
                <Mono className="mt-8">Antes de empezar</Mono>
                <p className="wt mt-2.5">
                  <Sc text={p.intro} />
                </p>
              </>
            )}
            {p.trae && (
              <p className="text-recuadro mt-4 px-3 py-2.5 bg-warm inline-block">
                <Sc text={p.trae} />
              </p>
            )}
            {p.head.map((h) => (
              <div key={h.label} className="mt-8">
                <Mono>Arriba de la hoja</Mono>
                <p className="text-cuerpo leading-[1.45] mt-2.5">
                  <Sc text={`${h.label}, cada dato en su campo:`} />
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
                <Mono className="mt-9 mb-1.5">Lo que trabaja {p.chapter ? `el capítulo ${p.chapter.n}` : "esta sección"}</Mono>
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
                <Mono className="mt-9">Necesitas antes</Mono>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-2.5">
                  {p.uses.map((u) => {
                    const t = PLANTILLAS.find((x) => x.id === u.id);
                    return (
                      <li key={u.id}>
                        <Link href={`/workbook/${u.id}`} className="ul text-cuerpo font-semibold">
                          {u.code} {t?.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {p.check.length > 0 && !hasCalc && (
              <>
                <Mono className="mt-9 mb-1.5">Sabrás que terminaste cuando…</Mono>
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
              <Mono>Dónde se llena</Mono>
              <p className="text-recuadro leading-[1.45] mt-2">
                {p.kind === "kit"
                  ? "En el kit «Plan de salida» o en el workbook. Los dos se descargan gratis."
                  : "En el workbook, en una tableta, en la computadora o en papel. La plantilla te dice en qué página del libro está su ejemplo resuelto."}
              </p>
              <div className="mt-5">
                {p.kind === "kit" ? (
                  <Link href="/kit#formulario" className="btn w-full">
                    Descarga el kit
                  </Link>
                ) : (
                  <Link href="/workbook#descarga" className="btn w-full">
                    Descarga el workbook
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {p.id === "k1" && (
        <section id="calculadora" className="border-t border-ink" aria-label="Calculadora en línea de la K.1">
          <div className="wrap py-12 lg:py-[88px]">
            <RunwayCalc />
          </div>
        </section>
      )}

      <nav aria-label="Otras plantillas" className="border-t border-ink">
        <div className="wrap py-8 grid gap-4 sm:grid-cols-3 items-center">
          <div>
            {prev && (
              <Link href={`/workbook/${prev.id}`} className="group block">
                <span className="wm text-ink2 block">Anterior</span>
                <span className="text-recuadro font-bold">
                  <span className="lnk">
                    {prev.code} {prev.title}
                  </span>
                </span>
              </Link>
            )}
          </div>
          <div className="sm:text-center">
            <Link href={p.part ? `/workbook/parte-${p.part.num}` : "/workbook"} className="ul text-recuadro font-semibold">
              {p.part ? `Parte ${p.part.num}, ${p.part.name}` : "Todas las plantillas"}
            </Link>
          </div>
          <div className="sm:text-right">
            {next && (
              <Link href={`/workbook/${next.id}`} className="group block">
                <span className="wm text-ink2 block">Siguiente</span>
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

export default async function WorkbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pn = partNum(id);
  if (pn) return <PartPage num={pn} />;
  const p = PLANTILLAS.find((x) => x.id === id);
  if (!p) notFound();
  return <TemplatePage p={p} />;
}
