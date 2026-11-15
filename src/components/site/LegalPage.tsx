import { Hero as HeroHead, Mono } from "./ui";
import type { Legal } from "@/content/legal";

/** Plantilla de /privacidad y /terminos: héroe con rótulo «Legal», cuerpo a 720 px y la fecha de vigencia. Sin cierre ni animación. */
export default function LegalPage({ doc, id }: { doc: Legal; id: string }) {
  return (
    <section aria-labelledby={id}>
      <div className="wrap pt-10 pb-14 lg:pt-20 lg:pb-24">
        <HeroHead id={id} label={doc.label} title={doc.title} />
        <Mono tone="gris" as="p" className="mt-5 lg:mt-7">
          {doc.vigente}
        </Mono>
        {/* El subtítulo queda fuera de `.wt` para que tome Archivo, como en el resto del sitio; solo los párrafos van en serif */}
        <div className="mt-8 lg:mt-12 max-w-[720px] border-b border-ink">
          {doc.bloques.map((b) => (
            <div key={b.h} className="border-t border-ink pt-4 pb-6 lg:pt-5 lg:pb-7">
              <h2 className="wh3 text-h3">{b.h}</h2>
              <div className="wt">
                {b.p.map((t) => (
                  <p key={t} className="mt-2.5">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
