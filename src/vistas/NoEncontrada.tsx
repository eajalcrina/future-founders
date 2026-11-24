import Link from "next/link";
import Sitio from "@/components/site/Sitio";
import { Hero as HeroHead } from "@/components/site/ui";
import { dict } from "@/i18n/dict";
import { lh, type Locale } from "@/i18n/rutas";

/** Página 404 en el idioma de la ruta pedida (app/global-not-found.tsx decide cuál). */
export default function NoEncontrada({ locale }: { locale: Locale }) {
  const t = dict(locale).noEncontrada;
  return (
    <Sitio locale={locale}>
      <div className="wrap pt-16 pb-20 lg:pt-28 lg:pb-32">
        <HeroHead label={t.label} title={t.title} />
        <p className="lead mt-6 max-w-[640px]">{t.lead}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
          <Link href={lh(locale, "/")} className="btn">
            {t.inicio}
          </Link>
          <Link href={lh(locale, "/workbook")} className="btn2">
            {t.workbook}
          </Link>
        </div>
      </div>
    </Sitio>
  );
}
