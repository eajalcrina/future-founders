import Navbar from "./Navbar";
import Footer from "./Footer";
import RevealObserver from "./RevealObserver";
import { dict } from "@/i18n/dict";
import type { Locale } from "@/i18n/rutas";

/** Marco de cada página del sitio en los dos idiomas: salto al contenido, encabezado, contenido, pie. */
export default function Sitio({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = dict(locale);
  return (
    <div className="site">
      <a href="#contenido" className="skip">
        {t.comun.saltar}
      </a>
      <Navbar locale={locale} t={t.nav} idioma={t.idioma} />
      <main id="contenido">{children}</main>
      <Footer locale={locale} />
      <RevealObserver />
    </div>
  );
}
