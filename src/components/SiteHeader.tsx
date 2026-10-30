import Link from "next/link";
import { getContent } from "@/lib/content";
import { CALENDAR_URL, ROUTES, type Lang, type RouteKey } from "@/lib/site";
import { TrackLink } from "./TrackLink";

export function SiteHeader({ lang, current }: { lang: Lang; current: RouteKey }) {
  const t = getContent(lang).nav;
  const home = ROUTES.home[lang];
  const other: Lang = lang === "es" ? "en" : "es";
  const anchor = (id: string) => (current === "home" ? `#${id}` : `${home}#${id}`);
  return (
    <header className="site-header rule-b">
      <div className="wrap">
        <Link href={home} className="logo-link" aria-label="Future Founders">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.svg" alt="future founders" width={96} height={42} style={{ height: 42, width: "auto" }} />
        </Link>
        <nav aria-label={lang === "es" ? "Principal" : "Main"} className="label">
          <a href={anchor("oportunidad")} className="hide-md">{t.opportunity}</a>
          <a href={anchor("ruta")} className="hide-md">{t.routes}</a>
          <Link href={ROUTES.fractional[lang]} className="hide-md">{t.fractional}</Link>
          <Link href={ROUTES[current][other]} hrefLang={other} lang={other} aria-label={t.switchLabel}>{t.switchShort}</Link>
          <TrackLink event="cta_calendar" where="header" href={CALENDAR_URL} target="_blank" rel="noopener" className="cta">{t.book.split(" ")[0]}<span className="hide-sm">&nbsp;{t.book.split(" ").slice(1).join(" ")}</span></TrackLink>
        </nav>
      </div>
    </header>
  );
}
