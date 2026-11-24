import type { Metadata } from "next";
import Diagnostico from "@/components/site/Diagnostico";
import { Hero as HeroHead, Mono, Nota } from "@/components/site/ui";
import { plantillas } from "@/content/workbook-i18n";
import { FICHAS_IDS, type Fichas, type TextosDiag } from "@/lib/diagnostico";
import { canon, dict, type Dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { metaPagina } from "@/i18n/metadatos";
import type { Locale } from "@/i18n/rutas";

/** Número de preguntas del diagnóstico (situación, comprobante, cobertura y colchón). */
const N_PREGUNTAS = 4;

export function metadataDiagnostico(locale: Locale): Metadata {
  const t = dict(locale).diagnostico.meta;
  return metaPagina("diagnostico", locale, { title: t.titulo, description: t.descripcion, og: { title: t.titulo } });
}

const textos = (t: Dict): TextosDiag => ({ c: t.diagnostico.cuestionario, levels: t.sitio.levels, situaciones: t.sitio.situaciones });

export default function DiagnosticoPagina({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const d = t.diagnostico;
  const lista = plantillas(locale);
  const fichas: Fichas = Object.fromEntries(
    FICHAS_IDS.map((id) => {
      const p = lista.find((x) => x.id === id)!;
      return [id, { code: p.code, title: p.title }];
    }),
  );
  return (
    <section aria-labelledby="diag-h">
      {/* En celular: titular, bajada, cuestionario y después la lista de niveles. Desde 64rem: dos columnas. */}
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24 grid gap-10 lg:gap-x-16 xl:gap-x-20 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] items-start">
        <div>
          <HeroHead id="diag-h" label={d.label.map((l) => f(l, { n: d.cuantas[N_PREGUNTAS - 1] }))} title={d.title} />
          <p className="lead mt-5 lg:mt-7">{d.lead}</p>
        </div>
        <div className="rv lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <Diagnostico locale={locale} td={textos(t)} canon={textos(canon)} fichas={fichas} r={d.resultado} c={t.comun} signal={t.sitio.signal} with={t.sitio.with} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <Mono tone="gris" className="mb-2">
            {d.niveles}
          </Mono>
          <ol className="border-b border-ink rv-kids">
            {t.sitio.levels.map((l, k) => (
              <li key={l} className="grid grid-cols-[40px_minmax(0,1fr)] gap-2 py-3 border-t border-ink">
                <span className="num text-figura">{k}</span>
                <span>
                  <span className="block text-cuerpo font-bold">{l}</span>
                  <span className="block text-recuadro leading-[1.4] text-ink2 mt-0.5">{t.sitio.look[k]}</span>
                </span>
              </li>
            ))}
          </ol>
          <Nota label={t.comun.nota} className="mt-5">
            {d.nota}
          </Nota>
        </div>
      </div>
    </section>
  );
}
