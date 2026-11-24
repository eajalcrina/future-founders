import Link from "next/link";
import Logo from "./Logo";
import SelectorIdioma from "./SelectorIdioma";
import { Jn } from "./ui";
import { EMAIL, INSTAGRAM_URL, WHATSAPP_LABEL, whatsappUrl } from "@/content/sitio";
import { dict } from "@/i18n/dict";
import { f } from "@/i18n/f";
import { lh, type Locale } from "@/i18n/rutas";

type L = { label: string; href: string; ext?: boolean };

/** Enlaces del pie con objetivo táctil de al menos 24 px de alto (WCAG 2.2, 2.5.8). */
const LNK = "lnk text-recuadro leading-[1.3] [overflow-wrap:anywhere] inline-flex items-center min-h-6";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const cols: { title: string; links: L[] }[] = [
    ...t.footer.cols.map((c) => ({ title: c.title, links: c.links.map((l) => ({ ...l, href: lh(locale, l.href) })) })),
    {
      title: t.footer.contacto,
      links: [
        { label: EMAIL, href: `mailto:${EMAIL}`, ext: true },
        { label: f(t.footer.whatsapp, { numero: WHATSAPP_LABEL }), href: whatsappUrl(t.footer.waMensaje), ext: true },
        { label: t.footer.instagram, href: INSTAGRAM_URL, ext: true },
      ],
    },
  ];
  return (
    <footer className="bg-warm">
      <div className="wrap pt-11 pb-8 lg:pt-[72px] lg:pb-10">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[340px_repeat(4,minmax(0,1fr))]">
          <div>
            <span className="lg:hidden"><Logo h={34} /></span>
            <span className="hidden lg:block"><Logo h={40} /></span>
            <p className="wt mt-4 lg:mt-5 max-w-[340px] text-ink2">{t.footer.lema}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {cols.map((c, i) => (
              <div key={c.title} className={i === cols.length - 1 ? "col-span-2 lg:col-span-1" : ""}>
                <h2 className="text-recuadro font-bold mb-3">{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label} className="mb-1.5">
                      {l.ext ? (
                        <a href={l.href} className={LNK} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={LNK}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-14 pt-4 border-t border-ink grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-10 text-recuadro text-ink2">
          <p className="text-ink">
            <Jn parts={t.footer.copyright} />
          </p>
          <div className="lg:row-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end">
            <p>
              <Link className="lnk inline-flex items-center min-h-6" href={lh(locale, "/privacidad")}>
                {t.footer.privacidad}
              </Link>
              <span className="vr" aria-hidden="true" />
              <Link className="lnk inline-flex items-center min-h-6" href={lh(locale, "/terminos")}>
                {t.footer.terminos}
              </Link>
            </p>
            <SelectorIdioma locale={locale} t={t.idioma} className="text-ink" />
          </div>
          <p>{t.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
