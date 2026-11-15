import type { Metadata } from "next";
import Link from "next/link";
import { Jn, Lines, Mono, Nota } from "@/components/site/ui";
import { ACTUALIZACIONES, REVISION } from "@/content/actualizaciones";

export const metadata: Metadata = {
  title: "Valores del año",
  description:
    "Las cifras de Doble Agente que cambian cada año (UIT, UMA, UVT, salario mínimo, UF y tasas de retención) en Perú, México, Colombia y Chile, con el valor 2026 del libro y el sitio oficial donde verificar el vigente.",
  alternates: { canonical: "/actualizaciones" },
};

export default function ActualizacionesPage() {
  return (
    <>
      <section className="grain" aria-labelledby="act-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[88px]">
          <Mono color="var(--color-magt)">
            <Jn parts={["Doble Agente", "Anexos por país"]} />
          </Mono>
          <h1 id="act-h" className="wh lines mt-4 lg:mt-[22px] text-[56px] lg:text-[104px]">
            <Lines text="Valores del año" />
          </h1>
          <p className="wt mt-5 lg:mt-7 max-w-[780px]">
            Las cifras que cambian cada año van marcadas «valor 2026» en el libro. Aquí está cada una con el capítulo o la plantilla que la usa y el sitio oficial donde
            verificas la del año en que calculas.
          </p>
          <nav aria-label="Países" className="flex flex-wrap gap-x-6 gap-y-2 mt-7">
            {ACTUALIZACIONES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="ul text-[17px] font-bold">
                {c.pais}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {ACTUALIZACIONES.map((c) => (
        <section key={c.id} id={c.id} className="border-t border-ink scroll-mt-4" aria-labelledby={`${c.id}-h`}>
          <div className="wrap py-12 lg:py-[72px]">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 id={`${c.id}-h`} className="wh text-[40px] lg:text-[56px]">
                {c.pais}
              </h2>
              <span className="wm text-ink2">{c.anexo}</span>
            </div>
            <div className="mt-6 border-b border-ink">
              <div className="hidden lg:grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-6 pb-2 wm text-ink2" aria-hidden="true">
                <span>Cifra</span>
                <span>Valor 2026 en el libro</span>
                <span>Dónde se usa</span>
                <span>Valor vigente</span>
                <span>Dónde verificar</span>
              </div>
              <ul>
                {c.valores.map((v) => (
                  <li key={v.nombre} className="grid gap-x-6 gap-y-2 py-4 border-t border-ink lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
                    <span className="text-[17px] font-bold leading-[1.35]">{v.nombre}</span>
                    <span className="text-[17px] tab">
                      <span className="wm text-ink2 lg:hidden block">Valor 2026 en el libro</span>
                      {v.v2026}
                    </span>
                    <span className="text-[15px] text-ink2 leading-[1.4]">
                      <span className="wm lg:hidden block">Dónde se usa</span>
                      {v.donde}
                    </span>
                    <span className="text-[15px] leading-[1.4]">
                      <span className="wm text-ink2 lg:hidden block">Valor vigente</span>
                      {v.vigente ?? <span className="text-ink2">Se publica cuando la autoridad lo fija</span>}
                    </span>
                    <span className="text-[15px] leading-[1.4]">
                      <span className="wm text-ink2 lg:hidden block">Dónde verificar</span>
                      <a href={v.fuente.href} target="_blank" rel="noopener noreferrer" className="ul font-semibold break-words">
                        {v.fuente.label}
                        <span className="sr-only"> (se abre en otra pestaña)</span>
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {c.tramites.length > 0 && (
              <div className="mt-8 max-w-[860px]">
                <div className="wm text-ink2">Trámites en curso</div>
                <ul className="mt-2 grid gap-3">
                  {c.tramites.map((t) => (
                    <li key={t} className="text-[17px] leading-[1.45] pl-3.5 border-l-2 border-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="border-t border-ink bg-warm">
        <div className="wrap py-10 lg:py-14 grid gap-3 max-w-[900px]">
          <p className="text-[17px] font-bold">Última revisión: {REVISION}.</p>
          <Nota>
            Este libro es orientación general. No es asesoría legal, tributaria ni financiera, y las reglas cambian entre países y con el tiempo. Antes de firmar un contrato,
            aceptar un rol o emitir tu primer comprobante, valida tu caso con un especialista.
          </Nota>
          <p className="text-[16px]">
            Si tu país no está aquí, el método funciona igual; lleva las preguntas de cada anexo a tu abogado o abogada laboral y a tu contador o contadora.{" "}
            <Link href="/workbook" className="ul font-semibold">
              Ver las plantillas del workbook
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
