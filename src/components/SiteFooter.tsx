import Link from "next/link";
import { getContent } from "@/lib/content";
import { EMAIL, ROUTES, mailto, type Lang } from "@/lib/site";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  return (
    <footer className="ink-block">
      <div className="wrap" style={{ padding: "56px var(--gutter) 32px", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-blanco.svg" alt="future founders" width={150} height={66} style={{ height: 66, width: "auto", alignSelf: "flex-start" }} />
            <p className="body" style={{ margin: 0, color: "#d6d6da" }}>{t.footer.tagline}</p>
          </div>
          <nav className="label" aria-label={t.footer.contact} style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <a href={mailto(t.close.mailSubject)}>{EMAIL}</a>
            <Link href={ROUTES.fractional[lang]}>{t.footer.fractional}</Link>
            <Link href={ROUTES.privacy[lang]}>{t.footer.privacy}</Link>
            <Link href={lang === "es" ? ROUTES.home.en : ROUTES.home.es} hrefLang={lang === "es" ? "en" : "es"}>{t.nav.switchLabel}</Link>
          </nav>
        </div>
        <p className="label-s" style={{ margin: 0, color: "#a6a6ad", borderTop: "1px solid #3a3a42", paddingTop: 20 }}>
          © 2026 Future Founders · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
