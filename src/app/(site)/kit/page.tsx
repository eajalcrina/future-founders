import type { Metadata } from "next";
import Link from "next/link";
import DownloadForm from "@/components/site/DownloadForm";
import { DESCARGAS, kitFallback } from "@/lib/descargas";
import RunwayCalc from "@/components/site/RunwayCalc";
import FinalCta from "@/components/site/FinalCta";
import Parallax from "@/components/site/Parallax";
import { Icon, Jn, Lines, Mono, SecHead } from "@/components/site/ui";
import { KIT } from "@/content/sitio";

export const metadata: Metadata = {
  title: "Kit «Plan de salida» gratis",
  description:
    "Cinco plantillas gratuitas, K.1 a K.5, para saber cuántos meses aguantas sin sueldo, qué permite tu contrato y qué haces en tus primeros 30 días si sales. Incluye la calculadora de runway.",
  alternates: { canonical: "/kit" },
  openGraph: { title: "Kit «Plan de salida»", url: "/kit" },
};

export default function KitPage() {
  return (
    <>
      <section className="grain" aria-labelledby="kit-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[104px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start">
          <div>
            <Mono color="var(--color-magt)">
              <Jn parts={["Kit gratuito", "Plan de salida"]} />
            </Mono>
            <h1 id="kit-h" className="wh lines mt-4 lg:mt-[22px] text-[52px] sm:text-[80px] xl:text-[112px]">
              <Lines text="¿Tienes un plan si te despiden mañana?" />
            </h1>
            <p className="wt mt-6 lg:mt-8 max-w-[680px]" style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}>
              Si todavía tienes empleo, el kit te dice cuánto tiempo tendrías y qué harías si mañana tu cargo desaparece. Si ya saliste de tu empresa, ordena las decisiones de las
              primeras semanas, cuando se firman los documentos de salida.
            </p>
            <dl className="rv-kids grid grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-11 max-w-[700px]">
              {[
                ["5", "plantillas, K.1 a K.5"],
                ["2", "horas en total, aproximadamente"],
                ["4", "países con su regla general"],
              ].map(([v, l]) => (
                <div key={l} className="border-t-2 border-ink pt-3 flex flex-col-reverse justify-end">
                  <dt className="text-[14px] lg:text-[16px] mt-1.5 text-ink2">{l}</dt>
                  <dd className="wh m-0 text-[44px] lg:text-[52px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="formulario" className="scroll-mt-6">
            <DownloadForm producto="kit" file={DESCARGAS.kit} fallback={kitFallback()} />
          </div>
        </div>
      </section>

      <section className="bg-warm" aria-labelledby="que-t">
        <div className="wrap py-12 lg:py-[88px] grid gap-8 lg:gap-24 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] items-start">
          <figure className="m-0 rv">
            <Parallax
              src="/img/duo-puerta.webp"
              alt="Ilustración en duotono: una persona camina hacia una puerta iluminada"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="w-full aspect-[600/318]"
            />
            <figcaption className="wm text-ink2 mt-3">Va antes de la Parte 01 del libro</figcaption>
          </figure>
          <div>
            <SecHead id="que-t" size="md" className="max-w-[640px]" label={["Qué es", "Cómo se usa"]} title="Cinco plantillas, en orden" />
            <div className="wt mt-5 lg:mt-[26px] rv">
              <p>
                Llénalo en el orden en que aparece; las plantillas usan datos de las anteriores. Si ya te despidieron y todavía no firmaste tu salida, empieza hoy por la K.3 y
                después vuelve a la K.1.
              </p>
              <p>
                Los ejemplos usan a Carmen, que tiene empleo, y a Javier, que acaba de salir. Las reglas de Perú, México, Colombia y Chile son la regla general de cada país; el
                anexo del libro explica las excepciones y dónde verificar la norma vigente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="plantillas-t">
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
          <SecHead
            id="plantillas-t"
            size="md"
            className="max-w-[860px]"
            label={["Contenido", "K.1 a K.5"]}
            title="Las cinco plantillas"
            sub="Cada una termina en algo que puedes comprobar: un número, una respuesta o una lista de nombres."
          />
          <ol className="mt-8 lg:mt-11 border-b border-ink">
            {KIT.map((k) => (
              <li key={k.code} className="rv">
                <Link
                  href={`/workbook/${k.id}`}
                  className="group grid gap-x-4 gap-y-3 lg:gap-6 grid-cols-[64px_minmax(0,1fr)_auto] lg:grid-cols-[92px_48px_340px_minmax(0,1fr)_100px] items-start py-5 lg:py-6 border-t border-ink"
                >
                  <span className="wh text-[36px] lg:text-[44px]">{k.code}</span>
                  <span className="hidden lg:block">
                    <Icon name={k.icon as "reloj"} size={30} />
                  </span>
                  <div>
                    <h3 className="ws text-[21px] lg:text-[24px]">
                      <span className="lnk">{k.title}</span>
                    </h3>
                    <p className="text-[16px] lg:text-[17px] leading-[1.4] text-ink2 mt-1.5">{k.purpose}</p>
                  </div>
                  <div className="col-start-2 lg:col-start-auto row-start-2 lg:row-start-auto">
                    <div className="wm text-ink2">Sabrás que terminaste cuando</div>
                    <p className="wt mt-1.5" style={{ fontSize: 17 }}>
                      {k.done}
                    </p>
                  </div>
                  <span className="wm text-right col-start-3 row-start-1 lg:col-start-auto lg:row-start-auto">{k.time}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="calculadora" className="bg-warm grid-paper scroll-mt-4" aria-labelledby="calc-t">
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
          <SecHead
            id="calc-t"
            size="md"
            className="max-w-[900px]"
            label={["Calculadora", "Plantilla K.1"]}
            title="Prueba la K.1 con los números de Carmen o de Javier"
            sub="Así funciona la primera plantilla del kit. Cambia los dos números por los tuyos y verás tu runway con un decimal."
          />
          <div className="mt-8 lg:mt-12">
            <RunwayCalc />
          </div>
        </div>
      </section>

      <FinalCta
        title="Llénalo esta semana"
        text="La K.1 toma 20 minutos y te deja el dato del que parte todo el método. Las cinco suman unas 2 horas."
        button="Enviarme el kit"
        folio="K.5"
      />
    </>
  );
}
