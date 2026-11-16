import type { Metadata } from "next";
import Link from "next/link";
import DownloadForm from "@/components/site/DownloadForm";
import { Hero as HeroHead, Icon, Mono, Sc } from "@/components/site/ui";
import { DESCARGAS } from "@/lib/descargas";
import { PLANTILLAS, PARTES } from "@/content/workbook";
import { partTemplates, timeLabel } from "@/content/workbook-util";

export const metadata: Metadata = {
  title: "Workbook de Doble Agente",
  description: "Descarga gratis el workbook de Doble Agente: el kit K.1 a K.5, una plantilla por capítulo, los anexos por país y el cierre. Cada código QR del libro lleva aquí, y las plantillas que hacen cuentas tienen su calculadora en línea.",
  alternates: { canonical: "/workbook" },
};

function Row({ id, code, title, time, where, calc }: { id: string; code: string; title: string; time: string; where: string; calc: boolean }) {
  return (
    <li>
      <Link href={`/workbook/${id}`} className="group grid grid-cols-[72px_minmax(0,1fr)_auto] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,1fr)_110px] gap-x-4 gap-y-1 items-baseline py-4 border-t border-ink">
        <span className="num text-h2">{code}</span>
        <span className="text-cuerpo font-bold leading-[1.3]">
          <span className="lnk">
            <Sc text={title} />
          </span>
          {calc && (
            <span className="inline-block align-[-2px] ml-2" title="Calculadora en línea">
              <Icon name="formula" size={16} />
              <span className="sr-only">, con calculadora en línea</span>
            </span>
          )}
        </span>
        <span className="hidden lg:block text-recuadro text-ink2">
          <Sc text={where} />
        </span>
        <Mono tone="gris" as="span" className="text-right">
          {timeLabel(time)}
        </Mono>
      </Link>
    </li>
  );
}

export default function WorkbookIndex() {
  const kit = PLANTILLAS.filter((p) => p.kind === "kit");
  const rest = PLANTILLAS.filter((p) => p.kind === "anexo" || p.kind === "cierre");
  return (
    <section aria-labelledby="wb-h">
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24">
        <HeroHead id="wb-h" label={["Doble Agente", "Workbook gratis"]} title="Las plantillas del workbook" />
        <div className="grid gap-10 lg:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start mt-6 lg:mt-10">
          <div>
            <div className="lead max-w-[760px]">
              <p>Cada capítulo del libro cierra con un código QR que lleva a su plantilla. Aquí ves para qué sirve cada una y en qué capítulo está.</p>
              <p className="mt-3 flex gap-2 items-baseline">
                <span className="inline-block align-[-2px] shrink-0">
                  <Icon name="formula" size={16} />
                </span>
                <span>Las plantillas con este icono hacen cuentas y tienen su calculadora en línea en su página.</span>
              </p>
            </div>
            <h2 className="wh2 text-h2 mt-10 lg:mt-12">Kit «Plan de salida»</h2>
            <p className="text-recuadro text-ink2 mt-1">Va antes de la Parte 01 del libro</p>
            <ul className="mt-4 border-b border-ink">
              {kit.map((p) => (
                <Row key={p.id} id={p.id} code={p.code} title={p.title} time={p.time} where="" calc={Boolean(p.calc)} />
              ))}
            </ul>
          </div>
          <div id="descarga">
            <DownloadForm producto="workbook" file={DESCARGAS.workbook} />
          </div>
        </div>

        {Object.entries(PARTES).map(([num, name]) => (
          <div key={num} className="mt-12 lg:mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="wh2 text-h2">
                Parte {num}, {name}
              </h2>
              <Link href={`/workbook/parte-${num}`} className="ul text-recuadro font-semibold whitespace-nowrap">
                Ver la parte<span className="sr-only"> {num}, {name}</span>
              </Link>
            </div>
            <ul className="mt-4 border-b border-ink">
              {partTemplates(num).map((p) => (
                <Row key={p.id} id={p.id} code={p.code} title={p.title} time={p.time} where={p.where} calc={Boolean(p.calc)} />
              ))}
            </ul>
          </div>
        ))}

        <h2 className="wh2 text-h2 mt-12 lg:mt-14">Anexos y cierre</h2>
        <ul className="mt-4 border-b border-ink">
          {rest.map((p) => (
            <Row key={p.id} id={p.id} code={p.code} title={p.title} time={p.time} where={p.where} calc={Boolean(p.calc)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
