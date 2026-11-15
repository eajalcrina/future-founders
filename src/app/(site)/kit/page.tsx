import type { Metadata } from "next";
import Link from "next/link";
import DownloadForm from "@/components/site/DownloadForm";
import { DESCARGAS, kitFallback } from "@/lib/descargas";
import RunwayCalc from "@/components/site/RunwayCalc";
import FinalCta from "@/components/site/FinalCta";
import Parallax from "@/components/site/Parallax";
import { Hero as HeroHead, Icon, Mono, SecHead } from "@/components/site/ui";
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
      <section aria-labelledby="kit-h">
        <div className="wrap pt-10 pb-12 lg:pt-20 lg:pb-[104px] grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start">
          <div>
            <HeroHead id="kit-h" label={["Kit gratuito", "Plan de salida"]} title="¿Tienes un plan si te despiden mañana?" />
            <p className="lead mt-6 lg:mt-8 max-w-[680px]">
              Si todavía tienes empleo, el kit te dice cuánto tiempo tendrías y qué harías si mañana tu cargo desaparece. Si ya saliste de tu empresa, ordena las decisiones de las
              primeras semanas, cuando se firman los documentos de salida.
            </p>
            <dl className="rv-kids grid grid-cols-[1fr_auto_1fr] sm:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-11 max-w-[700px]">
              {[
                ["5", "plantillas, K.1 a K.5"],
                ["2", "horas, aproximadamente"],
                ["4", "países con su regla general"],
              ].map(([v, l]) => (
                <div key={l} className="border-t border-ink pt-3 flex flex-col-reverse justify-end">
                  <dt className="text-recuadro mt-1.5 text-ink2">{l}</dt>
                  <dd className="num text-display-lg m-0">{v}</dd>
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
          <div className="rv">
            <Parallax
              src="/img/duo-puerta.webp"
              alt="Ilustración en duotono: una persona camina hacia una puerta iluminada"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="w-full aspect-[600/318]"
            />
          </div>
          <div>
            <SecHead id="que-t" className="max-w-[640px]" label={["Cómo se usa", "Antes de la Parte 01"]} title="Cada plantilla usa datos de la anterior" />
            <div className="wt mt-5 lg:mt-7 rv">
              <p>
                El kit va antes de la Parte 01 del libro. Si ya te despidieron y todavía no firmaste tu salida, empieza hoy por la K.3 y después vuelve a la K.1.
              </p>
              <p>
                Si tienes empleo, con la K.1, la K.2 y la K.3 ya puedes seguir con el capítulo 1 del libro; la K.4 y la K.5 se llenan antes del capítulo 5. Si ya saliste, termina
                el kit y sigue con el capítulo 5.
              </p>
              <p>
                Los ejemplos usan a Carmen, que tiene empleo, y a Javier, que acaba de salir. Las reglas de Perú, México, Colombia y Chile son la regla general de cada país; el
                anexo del libro explica las excepciones y dónde verificar la norma vigente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink" aria-labelledby="plantillas-t">
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
          <SecHead
            id="plantillas-t"
            className="max-w-[860px]"
            label={["Contenido", "K.1 a K.5"]}
            title="Cada plantilla termina en algo que puedes comprobar"
            sub="Un número, una respuesta o una lista de nombres. Toca una plantilla para ver qué pide y qué datos necesitas."
          />
          <div className="hidden lg:grid lg:grid-cols-[92px_48px_340px_minmax(0,1fr)_100px] gap-6 mt-11 pb-2" aria-hidden="true">
            <span className="col-start-4">
              <Mono tone="gris">Sabrás que terminaste cuando…</Mono>
            </span>
            <Mono tone="gris" as="span" className="text-right">
              Tiempo
            </Mono>
          </div>
          <ol className="mt-8 lg:mt-0 border-b border-ink">
            {KIT.map((k) => (
              <li key={k.code} className="rv">
                <Link
                  href={`/workbook/${k.id}`}
                  className="group grid gap-x-4 gap-y-3 lg:gap-6 grid-cols-[64px_minmax(0,1fr)_auto] lg:grid-cols-[92px_48px_340px_minmax(0,1fr)_100px] items-start py-5 lg:py-6 border-t border-ink"
                >
                  <span className="num text-kpi">{k.code}</span>
                  <span className="hidden lg:block pt-1.5">
                    <Icon name={k.icon as "reloj"} size={18} />
                  </span>
                  <div>
                    <h3 className="ws text-figura">
                      <span className="lnk">{k.title}</span>
                    </h3>
                    <p className="text-recuadro leading-[1.4] text-ink2 mt-1.5">{k.purpose}</p>
                  </div>
                  <div className="col-start-2 lg:col-start-auto row-start-2 lg:row-start-auto">
                    <p className="wt">
                      <span className="lg:hidden">Terminas cuando </span>
                      <span className="sr-only hidden lg:inline">Sabrás que terminaste cuando: </span>
                      {k.done.charAt(0).toLowerCase() + k.done.slice(1)}
                    </p>
                  </div>
                  <Mono tone="gris" as="span" className="text-right col-start-3 row-start-1 lg:col-start-auto lg:row-start-auto pt-1">
                    {k.time}
                  </Mono>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="calculadora" className="scroll-mt-4" aria-labelledby="calc-t">
        <div className="wrap pt-12 pb-[52px] lg:pt-[88px] lg:pb-24">
          <SecHead
            id="calc-t"
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
      />
    </>
  );
}
